import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeetingRequestCard from '../components/meeting/MeetingRequestCard';

const MeetingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchMeetingRequests = async () => {
      try {
        const response = await axios.get('/user/meeting-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching meeting requests:', error);
      }
    };

    fetchMeetingRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meeting Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map(request => (
          <MeetingRequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default MeetingRequests;
