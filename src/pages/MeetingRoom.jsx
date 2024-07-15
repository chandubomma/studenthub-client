// src/components/MeetingRoom.jsx

import React, { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import useWebRTC from '../hooks/useWebRTC';
import Controls from '../components/meeting-room/Controls';
import VideoStream from '../components/meeting-room/VideoStream';

const MeetingRoom = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { localStream, peers } = useWebRTC(socket, id);
  const localVideoRef = useRef();
  console.log(peers);
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="container mx-auto p-4">
      <h2>Meeting Room</h2>
      <div className="flex">
        {localStream && <video ref={localVideoRef} autoPlay muted className="w-1/2"></video>}
        {peers.map((peer) => (
          <VideoStream key={peer.id} stream={peer.stream} />
        ))}
      </div>
      <Controls localStream={localStream} meetingId={id} socket={socket} />
    </div>
  );
};

export default MeetingRoom;
