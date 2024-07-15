import React from 'react';

const MeetingRequestCard = ({ request }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Meeting Request</div>
          <p className="mt-2 text-gray-500">Preferred Time: {new Date(request.preferredDateTime).toLocaleString()}</p>
          <p className="mt-2 text-gray-500">Requested At: {new Date(request.requestedAt).toLocaleString()}</p>
          <p className="mt-2 text-gray-500">Status: {request.status}</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequestCard;
