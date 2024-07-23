import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeetingCard from '../components/meeting/MeetingCard';


const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/user/meetings');
        console.log(response.data);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-xl font-medium mb-4 text-gray-700">Your Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonMeetingCard key={index} />
          ))
        ) : meetings.length === 0 ? (
          <p className="text-center text-xl text-gray-500 w-full col-span-3">No meetings available.</p>
        ) : (
          meetings.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        )}
      </div>
    </div>
  );
};

export default Meetings;



const SkeletonMeetingCard = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg duration-300 ease-in-out hover:shadow-gray-400 rounded-lg px-4 py-6 mb-4 max-w-[25rem] animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-24 bg-gray-200 rounded mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};


