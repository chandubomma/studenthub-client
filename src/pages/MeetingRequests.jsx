import React, { useEffect, useState ,useContext} from 'react';
import axios from '../api/axios';
import MeetingRequestCard from '../components/meeting/MeetingRequestCard';
import { AuthContext } from '../context/AuthContext';

const MeetingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(requests)

  useEffect(() => {
    const fetchMeetingRequests = async () => {
      try {
        const response = await axios.get(`/${user.isGuide?'guide':'user'}/meeting-requests`);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meeting requests:', error);
        setLoading(false);
      }
    };

    fetchMeetingRequests();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl text-gray-700 font-semibold mb-5">Meeting Requests {user.isGuide?'Received':'Sent'}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-blue-300 text-gray-600 uppercase text-sm leading-normal">
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">{user.isGuide?'User':'Guide'} Profile</th>
            <th className="px-4 py-2">{user.isGuide?'User':'Guide'} Name</th>
            <th className="px-4 py-2">Preferred Time</th>
            <th className="px-4 py-2">Requested At</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            requests.map((request, index) => (
              <MeetingRequestCard key={request.id} request={request} isGuide={user.isGuide} index={index}  />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingRequests;









const SkeletonCard = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-200 rounded w-36"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-200 rounded w-36"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
    </tr>
  );
};
