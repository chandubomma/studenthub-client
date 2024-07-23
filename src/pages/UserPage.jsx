import React, { useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

import { toast } from 'sonner';
import axios from '../api/axios';
import { FaGithub,FaLinkedin } from "react-icons/fa";
import { useParams } from 'react-router-dom';


const UserPage = () => {
  const [user,setUser] = useState();
  const {id} = useParams();
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/Id/${id}`);
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  if(loading)return <div>Loading...</div>

  if(!user)return <div>Not Found!</div>
  console.log(user)
  return (
    <div >
      <Profile user={user} />
      <div className='flex justify-center mt-4 w-full'>
        <div className='flex flex-col w-ful'>
          <div className='flex w-fit mx-auto'>
            <h3 className='text-2xl font-medium text-blue-500'>{user.username}</h3>
          </div>
          <h3 className='w-fit mx-auto text-xl font-medium text-gray-500'>{user.email}</h3>
        </div>
      </div>
      <div className='w-2/3 mx-auto mt-20'>
        <h3 className='text-gray-600 text-lg font-bold'>Social Profile</h3>
      </div>
      <div className='w-2/3 mx-auto h-fit border-2 border-blue-200 mt-4 rounded-xl shadow-lg shadow-gray-200'>
        <div className='flex justify-between border-gray-500 m-10'>
          <h1 className='text-lg font-medium text-gray-700'>About</h1>
          <div className='flex w-fit'>
            <h3 className='text-lg font-medium text-gray-500'>{user.about?user.about:'Student at '+user.collegeName}</h3>
          </div>
        </div>
        <hr />
        <GithubProfile user={user} />
        <hr />
        <LinkedinProfile user={user} />
       
      </div>
      
     
    </div>


  );
};

export default UserPage;

const Profile = ({ user }) => {

 
  return (
    <div className='w-full h-96 bg-gradient-to-b from-blue-200 to-white flex flex-col justify-end relative'>
      <h1 className='max-w-96 absolute right-4 top-4 text-2xl font-bold text-gray-600'>
        {user.collegeName + ' - ' + user.batchYear}
      </h1>
      <div
        className='flex justify-center relative w-fit mx-auto cursor-pointer'
      >
        <img
          src={user.profile}
          className='rounded-full w-48 h-48 border-4 border-white'
        />
        
      </div>
    </div>
  );
};




const GithubProfile = ({ user }) => {
 
  const extractGithubUsername = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const githubUsername = user.github ? extractGithubUsername(user.github) : null;
  const githubUrl = user.github ? user.github : 'https://github.com/';

  return (
    <div className='flex justify-between border-gray-500 m-10'>
      <h1 className='text-lg font-medium text-gray-700'>Github</h1>
      <div className='flex w-fit'>
        
          <FaGithub className='text-2xl mt-1 text-gray-800'/>
          {githubUsername && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className='text-gray-500 mx-2 mt-1'>
              {githubUsername}
            </a>
          )}

      </div>
    </div>
  );
};

const LinkedinProfile = ({ user }) => {
  const extractUsername = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    if(parts[parts.length - 1]=="")return parts[parts.length - 2]
    return parts[parts.length - 1];
  };
  const linkedinUsername = user.linkedin ? extractUsername(user.linkedin) : null;
  const linkedinUrl = user.linkedin ? user.linkedin : 'https://www.linkedin.com/';

  return (
    <div className='flex justify-between border-gray-500 m-10'>
      <h1 className='text-lg font-medium text-gray-700'>LinkedIn</h1>
      <div className='flex w-fit'>
        <FaLinkedin className='text-2xl mt-1 text-blue-500'/>
        {linkedinUsername && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500 mx-2 mt-1'>
            {linkedinUsername}
          </a>
        )}
      </div>
    </div>
  );
};