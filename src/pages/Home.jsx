import React from 'react'
import Welcome from '../components/home/Welcome'
import Working from '../components/home/Working'
import TopRatedGuides from '../components/home/TopRatedGuides'
import TopGuidesOfMonth from '../components/home/TopGuidesOfMonth'
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Welcome/>
      <Working/>
      <TopRatedGuides/>
      <div className='flex flex-col md:flex-row px-10'>
        <TopGuidesOfMonth/>
        <div className='md:w-1/3 mx-auto '>
            <Player
            src="https://lottie.host/bea254e7-1b59-4e36-a49c-4a9e556d7bb4/BvYDngouXL.json"
            className="player  md:w-[35rem] mt-5"
            autoplay={true}
            loop
          />
          <h2 className='text-2xl text-blue-500 font-medium mt-5'>Join StudentHub Today!</h2>
          <h3 className='mt-5 text-lg font-normal text-gray-800'>Don't let the challenges of college life hold you back. 
            Join StudentHub and start connecting with guides and peers who can help you succeed. 
            Make the most of your college experience with the right support and connections.
          </h3>
          <Link to="/signup" className='bg-blue-500 text-white px-3 py-2 rounded-lg inline-block mt-5'>Sign Up Now!</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
