import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import useWebRTC from '../hooks/useWebRTC';
import Controls from '../components/meeting-room/Controls';
import VideoStream from '../components/meeting-room/VideoStream';
import SideDrawer from '../components/meeting-room/SideDrawer';

const MeetingRoom = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { localStream, peers, videoEnabled, audioEnabled, toggleVideo, toggleAudio, } = useWebRTC(socket, id);
  console.log(peers);
  return (
    <div className="h-screen w-screen flex bg-black relative">
      <div className="w-1/2 h-full p-8">
        {localStream && (
          <VideoStream
            stream={localStream}
            isLocal
            videoEnabled={videoEnabled}
            audioEnabled={audioEnabled}
            userName="You"
            profile = {""}
          />
        )}
      </div>
      <div className="w-1/2 h-full p-8">
      {peers.map((peer) => (
          <VideoStream
            key={peer.id}
            stream={peer.stream}
            videoEnabled={peer.videoEnabled}
            audioEnabled={peer.audioEnabled}
            userName={peer.userName}
            profile = {peer.profilePicture}
          />
        ))}
      </div>
      <div className='absolute bottom-10 w-full flex justify-center'>
      <Controls
        videoEnabled={videoEnabled}
        audioEnabled={audioEnabled}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
      />
      </div>
      <SideDrawer />
    </div>
  );
};

export default MeetingRoom;
