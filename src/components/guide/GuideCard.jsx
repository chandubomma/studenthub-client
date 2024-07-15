import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MeetingRequestDialog from './MeetingRequestDialog';

const GuideCard = ({ guide }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="mx-auto bg-white rounded-xl shadow-md">
      <div className="md:flex">
        <div className="min-w-44">
          <img className="h-48 w-full object-cover md:h-full md:w-60" src="https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180" alt="Guide Profile" />
        </div>
        <div className="p-5 w-[23rem]">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{guide.user.username}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{guide.user.collegeName}</a>
          <p className="mt-2 text-gray-500">Batch Year: {guide.user.batchYear}</p>
          <p className="mt-2 text-gray-500">CGPA: {guide.cgpa}</p>
          <p className="mt-2 text-gray-500">{guide.about}</p>
          <div className="flex mt-4">
            <a href={guide.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <FaGithub size={24} />
            </a>
            <a href={guide.linkedin} target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-500 hover:text-gray-900">
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={openDialog}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
            >
              Send Request
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600"
            >
              Mark Favorite
            </button>
          </div>
        </div>
      </div>
      {isDialogOpen && <MeetingRequestDialog guide={guide} onClose={closeDialog} />}
    </div>
  );
};

export default GuideCard;
