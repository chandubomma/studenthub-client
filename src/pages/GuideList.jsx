import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import GuideCard from '../components/guide/GuideCard';
import GuideCardSkeleton from '../components/guide/GuideCardSkeleton';

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('/guide');
        setGuides(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching guides:', error);
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl text-gray-700 font-semibold mb-5">Guides for you</h2>
      <div >
        {isLoading
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 gap-y-16">
            {Array.from({ length: 6 }).map((_, index) => <GuideCardSkeleton key={index} />)}
          </div>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 gap-y-16">
            {
              guides.length==0?
              <div className=''>
                <h2 className='w-fit mx-auto text-xl text-gray-500'>No Guides found! come back later...</h2>
              </div>:
              guides.map(guide => <GuideCard key={guide.id} guide={guide} />)
            }
          </div>
        }
      </div>
    </div>
  );
};

export default GuideList;
