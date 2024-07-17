import React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaUsers, FaComments } from 'react-icons/fa';
import { MdCallEnd } from "react-icons/md";

const Controls = ({ videoEnabled, audioEnabled, toggleVideo, toggleAudio ,handleDrawerToggle,handleLeaveMeeting}) => {
  return (
    <div className="flex justify-center space-x-4  p-5 rounded-xl">
      <button
        onClick={toggleVideo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
      >
        {videoEnabled ? <FaVideo className='text-xl' /> : <FaVideoSlash className='text-xl' />}
      </button>
      <button
        onClick={toggleAudio}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
      >
        {audioEnabled ? <FaMicrophone className='text-xl'/> : <FaMicrophoneSlash className='text-xl' />}
      </button>
      <button
        onClick={() => console.log('Show participants')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
      >
        <FaUsers className='text-xl'/>
      </button>
      <button
        onClick={() => handleDrawerToggle()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
      >
        <FaComments className='text-xl'/>
      </button>
      <button
        onClick={() => handleLeaveMeeting()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-full"
      >
        <MdCallEnd className='text-xl'/>
      </button>
    </div>
  );
};

export default Controls;
