import { useState, useRef, useEffect } from 'react';

const useWebRTC = (socket, meetingId) => {
  const [peers, setPeers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isLocalStreamReady, setIsLocalStreamReady] = useState(false);
  const peerConnections = useRef({});

  useEffect(() => {
    if (!socket) return;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        setIsLocalStreamReady(true);
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });

    const handleUserJoined = async ({ userId }) => {
      if (!isLocalStreamReady) return;

      console.log("User joined: " + userId);
      if (peerConnections.current[userId]) {
        return; 
      }

      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      if (localStream) {
        localStream.getTracks().forEach(track => {
          console.log(`Adding track to peer connection for user ${userId}`);
          peerConnection.addTrack(track, localStream);
        });
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(`Sending ICE candidate to user ${userId}`);
          socket.emit('signal', { meetingId, to: userId, signal: event.candidate });
        }
      };

      peerConnection.ontrack = (event) => {
        console.log(`Received track from user ${userId}`);
        setPeers(prevPeers => {
          const existingPeer = prevPeers.find(peer => peer.id === userId);
          if (existingPeer) {
            return prevPeers.map(peer =>
              peer.id === userId ? { ...peer, stream: event.streams[0] } : peer
            );
          }
          return [...prevPeers, { id: userId, stream: event.streams[0] }];
        });
      };

      peerConnections.current[userId] = peerConnection;

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      console.log(`Sending offer to user ${userId}`);
      socket.emit('signal', { meetingId, to: userId, signal: offer });
    };

    const handleSignal = async ({ from, signal }) => {
      if (!isLocalStreamReady) return; 

      console.log(`Received signal from user ${from}`, signal);
      let peerConnection = peerConnections.current[from];

      if (!peerConnection) {
        peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        if (localStream) {
          localStream.getTracks().forEach(track => {
            console.log(`Adding track to peer connection for user ${from}`);
            peerConnection.addTrack(track, localStream);
          });
        }

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log(`Sending ICE candidate to user ${from}`);
            socket.emit('signal', { meetingId, to: from, signal: event.candidate });
          }
        };

        peerConnection.ontrack = (event) => {
          console.log(`Received track from user ${from}`);
          setPeers(prevPeers => {
            const existingPeer = prevPeers.find(peer => peer.id === from);
            if (existingPeer) {
              return prevPeers.map(peer =>
                peer.id === from ? { ...peer, stream: event.streams[0] } : peer
              );
            }
            return [...prevPeers, { id: from, stream: event.streams[0] }];
          });
        };

        peerConnections.current[from] = peerConnection;
      }

      if (signal.type === 'offer') {
        console.log("Received offer");
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('signal', { meetingId, to: from, signal: answer });
      } else if (signal.type === 'answer') {
        console.log("Received answer");
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
      } else if (signal.candidate) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(signal));
      }
    };

    const handleUserLeft = ({ userId }) => {
      if (peerConnections.current[userId]) {
        peerConnections.current[userId].close();
        delete peerConnections.current[userId];
        setPeers(prevPeers => prevPeers.filter(peer => peer.id !== userId));
        console.log(`User left: ${userId}`);
      }
    };

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

    socket.on('user-joined', handleUserJoined);
    socket.on('signal', handleSignal);
    socket.on('user-left', handleUserLeft);

    return () => {
      Object.values(peerConnections.current).forEach(pc => pc.close());
      socket.emit('leaveMeeting', { meetingId });
      socket.off('user-joined', handleUserJoined);
      socket.off('signal', handleSignal);
      socket.off('user-left', handleUserLeft);
    };
  }, [socket, meetingId, isLocalStreamReady]);

  return { localStream, peers };
};

export default useWebRTC;
