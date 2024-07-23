import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import useWebRTC from '../hooks/useWebRTC';
import Controls from '../components/meeting-room/Controls';
import VideoStream from '../components/meeting-room/VideoStream';
import SideDrawer from '../components/meeting-room/SideDrawer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

const MeetingRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { user} = useContext(AuthContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [meeting,setMeeting] = useState(null);
  const { localStream, remoteStream,peer, videoEnabled, audioEnabled, toggleVideo, toggleAudio, leaveMeeting ,isPeerConnected,setPeer} = useWebRTC(socket, id);

  useEffect(()=>{
    const getMeetingById = async (Id) => {
      try {
          const response = await axios.get(`/user/meeting/${Id}`);
          console.log(response.data);
          setMeeting(response.data);
      } catch (error) {
          console.error('Error fetching meeting details:', error);
          throw error;
      }
    };
    getMeetingById(id)
  },[])

  useEffect(()=>{
    if(meeting){
      meeting.participants.forEach(p=>{
        if( p.user.id!=user.id){
          setPeer(peer=>({...peer,username:p.user.username,profile:p.user.profile,userId:p.user.id}))
        }
      })
    }
  },[meeting])

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLeaveMeeting =  () => {
    leaveMeeting();
    navigate(-1);
    window.history.pushState({}, document.title, window.location.pathname);
    window.location.href = '/user/meetings';
  };

  return (
    <div className="min-h-screen w-screen flex relative bg-black">
     <div className={`flex-flex-col ${isDrawerOpen?' w-2/3':'w-full'}`}>
     <div className='flex w-full flex-col md:flex-row'>
      <div className={`md:w-1/2 h-full p-8`}>
        <VideoStream
              stream={localStream}
              isLocal
              videoEnabled={videoEnabled}
              audioEnabled={audioEnabled}
              userName="You"
              profile = {user.profile}
            />
        </div>
        <div className={`md:w-1/2 h-full p-8`}>
        <VideoStream
              stream={remoteStream}
              videoEnabled={peer.videoEnabled}
              audioEnabled={peer.audioEnabled}
              userName={isPeerConnected?peer.username:`waiting for ${peer.username?peer.username:'others'} to join ...`}
              profile = {peer.profile}
            />
        </div>
     </div>
      <div className="w-full flex justify-center">
        <Controls
          videoEnabled={videoEnabled}
          audioEnabled={audioEnabled}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          handleDrawerToggle={handleDrawerToggle}
          handleLeaveMeeting={handleLeaveMeeting}
        />
      </div>
     </div>
      <SideDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </div>
  );
};

export default MeetingRoom;
