import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Controls = ({ localStream, socket }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const { id: meetingId } = useParams();
  const navigate = useNavigate();

  const toggleVideo = () => {
    if (localStream) {
      setIsVideoOn(prev => !prev);
      localStream.getVideoTracks()[0].enabled = !isVideoOn;
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      setIsAudioOn(prev => !prev);
      localStream.getAudioTracks()[0].enabled = !isAudioOn;
    }
  };

  const leaveMeeting = () => {
    socket.emit('leaveMeeting', { meetingId, userId: socket.id });
    navigate('/');
  };

  return (
    <div className="controls mt-4 flex space-x-4">
      <button onClick={toggleVideo}>
        {isVideoOn ? 'Turn Video Off' : 'Turn Video On'}
      </button>
      <button onClick={toggleAudio}>
        {isAudioOn ? 'Turn Audio Off' : 'Turn Audio On'}
      </button>
      <button onClick={() => { /* Add quality settings logic here */ }}>
        Settings
      </button>
      <button onClick={leaveMeeting}>
        Leave Meeting
      </button>
    </div>
  );
};

export default Controls;
