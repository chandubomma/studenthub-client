import { useState, useRef, useEffect } from 'react';

const useWebRTC = (socket, meetingId) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isLocalStreamReady, setIsLocalStreamReady] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [peer,setPeer] = useState({
        videoEnabled : false,
        audioEnabled : false
    })
    const pc = useRef(null);
    const senders = useRef([])
    const [isPeerConnected, setIsPeerConnected] = useState(false);
    
    useEffect(() => {
        if (!socket) return;

        const initLocalStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: videoEnabled, audio: audioEnabled });
                setLocalStream(stream);
                setIsLocalStreamReady(true);
            } catch (e) {
                //console.log("error accessing media: " + e);
                setIsLocalStreamReady(true);
            }
        }
        initLocalStream();

        if (isLocalStreamReady) {
            socket.emit('joinMeeting', { meetingId });
        } else {
            const interval = setInterval(() => {
                if (isLocalStreamReady) {
                    socket.emit('joinMeeting', { meetingId });
                    clearInterval(interval);
                }
            }, 100);
        }

        const setUpPeerConnection = ({userId}) => {
            const peerConnection = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            });

            if (localStream) {
                localStream.getTracks().forEach(track => {
                    //console.log(`Adding track to peer connection`);
                   senders.current.push(peerConnection.addTrack(track, localStream));
                });
            }

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                   // console.log(`Sending ICE candidate to user ${userId}`);
                    socket.emit('signal', { meetingId, signal: event.candidate });
                }
            };

            peerConnection.addEventListener('track', (e) => {
                console.log(`Received track from user :${userId}`);
                setRemoteStream(null);
                setRemoteStream(e.streams[0]);
                // if(e.track.kind==='video')setPeer(prev=>({...prev,videoEnabled:!prev.videoEnabled}))
                // if(e.track.kind==='audio')setPeer(prev=>({...prev,audioEnabled:!prev.audioEnabled}))
            });
            setPeer(peer=>({...peer,userId}));

            return peerConnection;
        }

        const handleUserJoined = async ({ userId }) => {
           // console.log("user joined: " + userId);

            const peerConnection = setUpPeerConnection({userId});
            pc.current = peerConnection;

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

           // console.log(`Sending offer to user ${userId}`);
            socket.emit('signal', { meetingId, to: userId, signal: offer });
            setIsPeerConnected(true);
        }

        const handleSignal = async ({from, signal }) => {
           // console.log(`Received signal from user ${from}`, signal);

            let peerConnection = pc.current;

            if (!peerConnection) {
                peerConnection = setUpPeerConnection({userId:from});
                pc.current = peerConnection;
            }

            if (signal.type === 'offer') {
                console.log("Received offer");
                await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('signal', { meetingId, signal: answer,to:from });
                setIsPeerConnected(true);
            } else if (signal.type === 'answer') {
                console.log("Received answer");
                await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
            } else if (signal.candidate) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(signal));
            }
        }

        const handleUserLeft = ({userId}) => {
            let peerConnection = pc.current;
            if (peerConnection) {
                peerConnection.close();
                pc.current = null;
                setRemoteStream(null);
                console.log(`User left: ${userId}`);
                setIsPeerConnected(false);
            }
        }

        socket.on('user-joined', handleUserJoined);
        socket.on('signal', handleSignal);
        socket.on('user-left', handleUserLeft);
        socket.on('videoToggled',({userId,enabled})=>{
            setPeer(prevPeer => ({
                ...prevPeer,
                videoEnabled: enabled
            }));
        })
        socket.on('audioToggled',({userId,enabled})=>{
            setPeer(prevPeer => ({
                ...prevPeer,
                audioEnabled: enabled
            }));
        })

        return () => {
            if (pc.current) pc.current.close();
            socket.emit('leaveMeeting', { meetingId });
            socket.off('user-joined', handleUserJoined);
            socket.off('signal', handleSignal);
            socket.off('user-left', handleUserLeft);
            socket.off('videoToggled');
            socket.off('audioToggled');
        }
    }, [meetingId, socket, isLocalStreamReady]);


    const updateLocalStream = async(newVideoEnabled, newAudioEnabled)=>{
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
          }
          setVideoEnabled(newVideoEnabled);
          setAudioEnabled(newAudioEnabled);

          const getUserMediaConstraints = {
            audio: newAudioEnabled,
            video: newVideoEnabled
          };
          
          try{
            const newStream = await navigator.mediaDevices.getUserMedia(getUserMediaConstraints);
            setLocalStream(newStream);
           if(pc.current){
            pc.current.getSenders().forEach(sender => {
                if (sender.track) {
                  pc.current.removeTrack(sender);
                }
            });
            newStream.getTracks().forEach(track => pc.current.addTrack(track, newStream))
            const offer = await pc.current.createOffer();
            await pc.current.setLocalDescription(offer);
            socket.emit('signal', { meetingId, signal: offer,to:peer.userId });
           }
      
          }catch(e){
            console.error(e);
          }

    }

    const toggleAudio = ()=>{
        updateLocalStream(videoEnabled, !audioEnabled);
       socket.emit('toggleAudio',{meetingId,enabled:!audioEnabled})
    }

    const toggleVideo = ()=>{
        updateLocalStream(!videoEnabled, audioEnabled);
        socket.emit('toggleVideo',{meetingId,enabled:!videoEnabled})
    }


    const leaveMeeting = () => {
        if (pc.current) {
            pc.current.close();
            pc.current = null;
            setRemoteStream(null);
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        socket.emit('leaveMeeting', { meetingId });
    }

    return { localStream, remoteStream,peer, videoEnabled, audioEnabled, toggleVideo, toggleAudio, leaveMeeting,isPeerConnected,setPeer }
};

export default useWebRTC;
