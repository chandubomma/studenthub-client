import React, { useContext, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MeetingRequestDialog from './MeetingRequestDialog';
import { TiTick } from "react-icons/ti";
import { BiSend } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const GuideCard = ({ guide }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestSent,setRequestSent] = useState(false);
  const {loading,user} = useContext(AuthContext)

  const openDialog = () => {
    if(!loading && !user)toast.warning('signin into your account to continue..')
    else setIsDialogOpen(true);
  }
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="mx-auto cursor-pointer md:h-[18rem] bg-white rounded-xl shadow-md hover:shadow-xl hover:shadow-gray-400 ease-in-out duration-200 w-fit max-w-[30rem]">
      <div className="md:flex">
        <div className="min-w-44">
          <img className="md:w-60 w-full md:h-[18rem] h-60 object-cover" src={guide.profile} alt="Guide Profile" />
        </div>
        <div className="p-3 pt-3 w-[22rem]">
          <Link to={`/user/${guide.id}`} className="uppercase tracking-wide text-sm text-indigo-500 font-semibold hover:underline">{guide.username}</Link>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-gray-700 ">{guide.collegeName}</a>
          <p className="mt-2 text-blue-400 border-blue-200 border-2 w-fit px-2 py-0.5 rounded-md shadow-sm text-sm"> {guide.batchYear}</p>
          <p className="mt-2 text-gray-500">{guide.about?guide.about.slice(0,62)+'..':'Student at '+guide.collegeName}</p>
          <div className="flex mt-3">
            <a href={guide.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <FaGithub size={24} />
            </a>
            <a href={guide.linkedin} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500 hover:text-blue-700">
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="mt-3 flex space-x-2 justify-between">
            <div></div>
            {
              requestSent?
              <button
                className="px-4 py-2 border-2 border-blue-500 text-blue-500 text-sm font-medium rounded cursor-not-allowed"
              >
                <TiTick className='inline text-xl mb-1'/>
                Request sent
              </button>:
              <button
                onClick={openDialog}
                className="px-4 py-2 border-2 border-blue-500 text-blue-500 text-sm font-medium rounded hover:bg-blue-500 hover:text-white"
              >
                Send Meeting Request
              </button>
            }
          </div>
        </div>
      </div>
      {isDialogOpen && <MeetingRequestDialog guide={guide} onClose={closeDialog} setRequestSent={setRequestSent} />}
    </div>
  );
};

export default GuideCard;
