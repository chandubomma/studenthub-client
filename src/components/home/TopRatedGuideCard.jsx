import React from 'react';

const TopRatedGuideCard = ({ guide }) => {
  const getStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(filledStars).fill().map((_, index) => (
          <svg key={`filled-${index}`} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.432 8.2 1.194-5.916 5.747 1.396 8.14L12 18.896l-7.348 3.864 1.396-8.14-5.916-5.747 8.2-1.194z"/>
          </svg>
        ))}
        {halfStar && (
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path fill="url(#half-gradient)" d="M12 .587l3.668 7.432 8.2 1.194-5.916 5.747 1.396 8.14L12 18.896l-7.348 3.864 1.396-8.14-5.916-5.747 8.2-1.194z"/>
            <path fill="none" d="M12 .587l3.668 7.432 8.2 1.194-5.916 5.747 1.396 8.14L12 18.896l-7.348 3.864 1.396-8.14-5.916-5.747 8.2-1.194z"/>
          </svg>
        )}
        {Array(emptyStars).fill().map((_, index) => (
          <svg key={`empty-${index}`} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.432 8.2 1.194-5.916 5.747 1.396 8.14L12 18.896l-7.348 3.864 1.396-8.14-5.916-5.747 8.2-1.194z"/>
          </svg>
        ))}
      </>
    );
  };

  return (
    <div className='flex flex-col items-center rounded-lg shadow-lg shadow-gray-300 p-4 bg-white'>
      <img
        src={guide.profile}
        alt={`${guide.username}'s profile`}
        className='w-24 h-24 rounded-full mb-4'
      />
      <h3 className='text-xl font-bold mb-2 text-blue-500 hover:underline cursor-pointer'>{guide.username}</h3>
      <h4 className='text-gray-600 mb-4'>{guide.about}</h4>
      <div className='flex'>
        {getStars(guide.rating)}
      </div>
    </div>
  );
};

export default TopRatedGuideCard;
