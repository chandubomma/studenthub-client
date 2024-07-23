import React, { useState } from 'react';
import axios from '../../api/axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const MeetingRequestCard = ({ request, index ,isGuide }) => {
  const { guide,user, preferredTime, requestedAt, status } = request;
  const formattedPreferredTime = new Date(preferredTime).toLocaleString();
  const formattedRequestedAt = new Date(requestedAt).toLocaleString();
  const [newStatus,setNewStatus] = useState(status);

  const handleGuideAction = async(status,requestId) => {
    try {
      const response = await axios.put('/guide/update-meeting-request-status', { requestId,status });
      if (response.status === 200) {
        toast.success(`Request updated successfully`);
        setNewStatus(status);
      } else {
        toast.error('Error updating request');
      }
    } catch (e) {
      console.error(e)
      toast.error('Server error. Please try again later');
    }
  }

  return (
    <tr className="border-b border-gray-300 text-lg font-medium text-gray-500">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3 ">
        <img src={isGuide?user.profile:guide.profile} alt="Guide Profile" className="h-12 w-12 rounded-full mx-auto" />
      </td>
      <td className="px-4 py-3 hover:underline">{isGuide?<Link to={`/user/${user.id}`}>{user.username}</Link>:<Link to={`/user/${guide.id}`}>{guide.username}</Link>}</td>
      <td className="px-4 py-3">{formattedPreferredTime}</td>
      <td className="px-4 py-3">{formattedRequestedAt}</td>
      <td className="px-4 py-3">{status}</td>
      <td className=''>{isGuide?<div>
        {
          newStatus=='PENDING'?
          <div className='flex justify-evenly'>
            <button onClick={()=>handleGuideAction("ACCEPTED",request.id)} className='text-blue-500 bg-white border-2 border-blue-500 px-4 py-1 text-base  hover:bg-blue-500 duration-300 ease-in-out'>Accept</button>
            <button onClick={()=>handleGuideAction("REJECTED",request.id)} className='text-red-500 bg-white border-2 border-red-500 px-4 py-1 text-base  hover:bg-red-500 duration-300 ease-in-out'>Reject</button>
          </div>:
          <div><Link to={'/user/meetings'}>Go to Meeting</Link></div>
        }
      </div>:
      <div>
        <button className='text-red-500 bg-white border-2 border-red-500 px-4 py-1 text-base hover:text-white hover:bg-red-500 duration-300 ease-in-out'>Cancel</button>
      </div>
      }</td>
    </tr>
  );
};

export default MeetingRequestCard;
