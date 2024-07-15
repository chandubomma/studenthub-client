import React, { useRef, useEffect } from 'react';

const VideoStream = ({ stream }) => {
  const videoRef = useRef();
  console.log("yes");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-1/2">
      {stream ? (
        <video ref={videoRef} autoPlay className="w-full"></video>
      ) : (
        <div className="bg-gray-300 flex items-center justify-center h-full">
          <p>No Video Available</p>
        </div>
      )}
    </div>
  );
};

export default VideoStream;
