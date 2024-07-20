import React from 'react';

const GuideCardSkeleton = () => {
  return (
    <div className="mx-auto bg-white rounded-xl shadow-md animate-pulse">
      <div className="md:flex">
        <div className="min-w-44 bg-gray-300 h-48 md:h-full md:w-60"></div>
        <div className="p-5 w-[23rem] space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-8 bg-gray-300 rounded w-full"></div>
          <div className="flex mt-4 space-x-4">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="mt-4 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default GuideCardSkeleton;
