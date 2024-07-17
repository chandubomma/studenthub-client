import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import useWebRTC from '../hooks/useWebRTC';
import Controls from '../components/meeting-room/Controls';
import VideoStream from '../components/meeting-room/VideoStream';
import SideDrawer from '../components/meeting-room/SideDrawer';
import { useNavigate } from 'react-router-dom';

const MeetingRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { localStream, peers, videoEnabled, audioEnabled, toggleVideo, toggleAudio, leaveMeeting } = useWebRTC(socket, id);
  console.log(peers)
  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLeaveMeeting =  () => {
    leaveMeeting();
    navigate(-1);
    window.history.pushState({}, document.title, window.location.pathname);
    window.location.href = '/guide/meetings';
  };

  return (
    <div className="h-screen w-screen flex relative bg-black">
      <div className={`${isDrawerOpen ? 'w-1/3' : 'w-1/2'} h-full p-8`}>
          <VideoStream
            stream={localStream}
            isLocal
            videoEnabled={videoEnabled}
            audioEnabled={audioEnabled}
            userName="You"
            profile=""
          />
      </div>
      <div className={`${isDrawerOpen ? 'w-1/3' : 'w-1/2'} h-full p-8`}>
        {peers.map((peer) => (
          <VideoStream
            key={peer.id}
            stream={peer.stream}
            videoEnabled={peer.videoEnabled}
            audioEnabled={peer.audioEnabled}
            userName={peer.userName}
            profile={peer.profilePicture}
          />
        ))}
      </div>
      <div className="absolute bottom-10 w-full flex justify-center">
        <Controls
          videoEnabled={videoEnabled}
          audioEnabled={audioEnabled}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          handleDrawerToggle={handleDrawerToggle}
          handleLeaveMeeting={handleLeaveMeeting}
        />
      </div>
      <SideDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </div>
  );
};

export default MeetingRoom;
