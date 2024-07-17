import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeetingCard from '../components/meeting/MeetingCard';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/user/meetings');
        console.log(response.data);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-xl font-medium mb-4 text-gray-700">Your Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetings.map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default Meetings;
