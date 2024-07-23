import React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideoSlash } from 'react-icons/fa';

const VideoStream = ({ stream, isLocal, videoEnabled, audioEnabled, userName,profile }) => {
  return (
    <div className="relative w-full max-h-80 md:max-h-[37rem] rounded-xl">
      <div>
        {videoEnabled ? (
            <video
              className="rounded-lg shadow-lg w-full h-full md:max-h-[37rem]"
              ref={(video) => { if (video) video.srcObject = stream; }}
              autoPlay
              muted={isLocal} // Mute the local video element
            />
        ) : (
        <div className="bg-gray-800 flex flex-col items-center justify-center rounded-xl w-full h-80 md:h-[37rem] md:max-h-[37rem]">
          <img src={profile} className='w-40 h-40 rounded-full mb-5'/>
          <span className="text-white md:text-3xl">{userName}</span>
        </div>)
        }
        <div className="absolute bottom-5 right-4 bg-gray-900 text-white rounded-full p-2">
            {audioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </div>
          {
            videoEnabled?
            <div className="absolute bottom-3 left-3 font-semibold text-white rounded-full p-3">
              {userName}
            </div>:
            <span className='absolute bottom-5 left-4 bg-gray-900 text-white rounded-full p-2'>
              <FaVideoSlash />
            </span>
          }
          
      </div>
      {/* Conditionally render audio element for remote stream when video is off */}
      {!isLocal && !videoEnabled && (
        <audio
          ref={(audio) => { if (audio) audio.srcObject = stream; }}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoStream;
