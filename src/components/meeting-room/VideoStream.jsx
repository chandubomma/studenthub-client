import React from 'react';
import { FaMicrophone, FaMicrophoneSlash,FaVideoSlash } from 'react-icons/fa';

const VideoStream = ({ stream, isLocal, videoEnabled, audioEnabled, userName }) => {
  return (
    <div className="relative w-full max-h-[37rem] rounded-xl">
      {
      videoEnabled?
      <div>
        <video
          className="rounded-lg shadow-lg w-full h-full"
          ref={(video) => { if (video) video.srcObject = stream; }}
          autoPlay
          muted={isLocal}
        />
        <div className="absolute bottom-5 right-4 bg-gray-900 text-white rounded-full p-2">
          {audioEnabled ? <FaMicrophone className='' /> : <FaMicrophoneSlash />}
        </div>
        <div className="absolute bottom-3 left-3 font-semibold text-white rounded-full p-3">
          {userName}
        </div>
      </div>:
        <div className="bg-gray-800 flex flex-col items-center justify-center rounded-xl w-full h-[37rem] max-h-[37rem]">
          <span className='p-6 bg-gray-500 rounded-full mb-5'>
            <FaVideoSlash className='text-4xl ' />
          </span>
          <span className="text-white text-3xl">{userName}</span>
        </div>
      }
      
    </div>
  );
};

export default VideoStream;
