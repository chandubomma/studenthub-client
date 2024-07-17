import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import GuideCard from '../components/guide/GuideCard';

const GuideList = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('/guide');
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl text-gray-700 font-semibold mb-5">Guides for you</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map(guide => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default GuideList;
