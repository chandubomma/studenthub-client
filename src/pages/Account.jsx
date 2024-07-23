import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LuUploadCloud } from 'react-icons/lu';
import { toast } from 'sonner';
import axios from '../api/axios';
import { MdEditNote } from 'react-icons/md';
import { FaGithub,FaLinkedin } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Account = () => {
  const { user,setUser } = useContext(AuthContext);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showVisibilityDialog, setShowVisibilityDialog] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showGithubDialog, setShowGithubDialog] = useState(false);
  const [showLinkedInDialog, setShowLinkedInDialog] = useState(false);
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  console.log(user);

  return (
    <div >
      <Profile user={user} />
      <div className='flex justify-center mt-4 w-full'>
        <div className='flex flex-col w-ful'>
          <div className='flex w-fit mx-auto'>
            <h3 className='text-2xl font-medium text-blue-500'>{user.username}</h3>
            <MdEditNote onClick={()=>setShowUsernameDialog(true)} className='text-2xl text-blue-500 ml-2 mt-2 cursor-pointer' />
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
            <MdEditNote onClick={()=>setShowAboutDialog(true)} className='text-2xl text-blue-500 ml-2 mt-2 cursor-pointer' />
          </div>
        </div>
        <hr />
        <GithubProfile user={user} setShowGithubDialog = {setShowGithubDialog}/>
        <hr />
        <LinkedinProfile user={user} setShowLinkedInDialog = {setShowLinkedInDialog}/>
       
      </div>
      <div className='w-2/3 mx-auto mt-20'>
        <h3 className='text-gray-600 text-lg font-bold'>Settings</h3>
      </div>
      <div className='w-2/3 mx-auto h-fit border-2 border-blue-200 mt-4 rounded-xl shadow-lg shadow-gray-200'>
        <div className='flex justify-between border-gray-500 m-10'>
          <h1 className='text-lg font-medium text-gray-700'>Reset Your Password</h1>
          <button
            className='px-4 py-2 h-12 border-2 border-blue-200 rounded-lg bg-opacity-50 bg-gray-200 text-lg text-blue-600 font-medium'
            onClick={() => setShowPasswordDialog(true)}
          >
            Change Password
          </button>
        </div>
        <hr />
        <div className='flex justify-between border-gray-500 m-10'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-medium text-gray-700'>Change Your Profile Visibility</h1>
            <h3 className='text-gray-500 text-sm'>Everyone - visible to everyone on the platform.</h3>
            <h3 className='text-gray-500 text-sm'>Campus - visible to only your college mates.</h3>
            <h3 className='text-gray-500 text-sm'>None - visible to only you.</h3>
          </div>
          <button
            className='px-4 py-2 h-12 border-2 border-blue-200 rounded-lg bg-opacity-50 bg-gray-200 text-lg text-blue-600 font-medium'
            onClick={() => setShowVisibilityDialog(true)}
          >
            Change Visibility
          </button>
        </div>
        <hr />
        <div className='flex justify-between border-gray-500 m-10'>
          <div className='flex flex-col w-2/3'>
            <h1 className='text-lg font-medium text-gray-700'>Join us as a guide</h1>
            <h3 className='text-gray-500 text-sm'>
              To be a guide on this platform you need to be in final or prefinal year of your college and update your social profile.
            </h3>
          </div>
          {
            user.isGuide?
            <div className='flex'>
              <MdVerified className='text-2xl text-blue-500 mr-2 mt-1'/>
              <h2 className='text-lg font-medium text-blue-600'>You are Guide</h2>
            </div>:
            <button
              className='px-4 py-2 h-12 border-2 border-blue-200 rounded-lg bg-opacity-50 bg-gray-200 text-lg text-blue-600 font-medium'
              onClick={() => setShowGuideDialog(true)}
            >
              Become Guide
            </button>
          }
          
        </div>
        <hr />
        <div className='flex justify-between border-gray-500 m-10'>
          <div className='flex flex-col'>
            <h1 className='text-lg font-medium text-gray-700'>Delete Your Account</h1>
            <h3 className='text-gray-500 text-sm'>
              Once you delete your account, there is no going back. Please be certain.
            </h3>
          </div>
          <button
            className='px-4 py-2 h-12 border-2 border-blue-200 rounded-lg bg-opacity-50 bg-gray-200 text-lg text-blue-600 font-medium'
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {showPasswordDialog && <PasswordDialog onClose={() => setShowPasswordDialog(false)} />}
      {showVisibilityDialog && <VisibilityDialog setUser={setUser} onClose={() => setShowVisibilityDialog(false)} />}
      {showGuideDialog && <GuideDialog setUser={setUser} onClose={() => setShowGuideDialog(false)} />}
      {showDeleteDialog && <DeleteDialog onClose={() => setShowDeleteDialog(false)} />}
      {showGithubDialog && <GithubDialog setUser={setUser} onClose={() => setShowGithubDialog(false)} />}
      {showLinkedInDialog && <LinkedInDialog setUser={setUser} onClose={() => setShowLinkedInDialog(false)} />}
      {showUsernameDialog && <UsernameDialog setUser={setUser} onClose={() => setShowUsernameDialog(false)} />}
      {showAboutDialog && <AboutDialog setUser={setUser} onClose={() => setShowAboutDialog(false)} />}
    </div>
  );
};

export default Account;

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const image = useRef(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const response = await axios.post('/user/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status !== 200) {
        toast.error('Error updating profile!');
        setSelectedFile(null);
        return;
      }
      toast.success('Profile updated successfully!');
    } catch (e) {
      console.error(e);
      setSelectedFile(null);
      toast.error('Please try again later!');
    }
  };

  return (
    <div className='w-full h-96 bg-gradient-to-b from-blue-200 to-white flex flex-col justify-end relative'>
      <h1 className='max-w-96 absolute right-4 top-4 text-2xl font-bold text-gray-600'>
        {user.collegeName + ' - ' + user.batchYear}
      </h1>
      <div
        onClick={() => image.current.click()}
        className='flex justify-center relative w-fit mx-auto cursor-pointer'
      >
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : user.profile}
          className='rounded-full w-48 h-48 border-4 border-white'
        />
        <input
          type='file'
          name='image'
          accept='image/*'
          className='hidden'
          ref={image}
          onChange={handleImageUpload}
        />
        <LuUploadCloud className='w-8 h-8 absolute bottom-0 -right-2 z-100 text-gray-700 cursor-pointer' />
      </div>
    </div>
  );
};


const PasswordDialog = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/user/change-password', { newPassword });
      if (response.status === 200) {
        toast.success('Password changed successfully');
        onClose();
      } else {
        toast.error('Error changing password');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Change Password</h2>
        <div className="form-floating mt-2">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="password"
            placeholder="Enter New Password"
            name="password"
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            autoFocus
          />
          <label htmlFor="password" className="text-gray-500">
            New Password
          </label>
        </div>
        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="confirmpassword"
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            autoFocus
          />
          <label htmlFor="confirmpassword" className="text-gray-500">
            Confirm New Password
          </label>
        </div>
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const GithubDialog = ({ onClose,setUser }) => {
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/update-github', { github:link });
      if (response.status === 200) {
        toast.success('Github profile updated successfully');
        setUser(user=>({...user,github:link}));
        onClose();
      } else {
        toast.error('Error updating github profile');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Add Your Github Profile</h2>
        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="github"
            placeholder="Github Profile"
            type="text"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            autoFocus
          />
          <label htmlFor="github" className="text-gray-500">
            Github Profile
          </label>
        </div>
        <div className='flex justify-end mt-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkedInDialog = ({ onClose,setUser }) => {
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/update-linkedin', { linkedin:link });
      if (response.status === 200) {
        toast.success('LinkedIn profile updated successfully');
        setUser(user=>({...user,linkedin:link}));
        onClose();
      } else {
        toast.error('Error updating LinkedIn profile');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Add Your LinkedIn Profile</h2>
        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="linkedin"
            placeholder="Linkedin Profile"
            type="text"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            autoFocus
          />
          <label htmlFor="github" className="text-gray-500">
            LinkedIn Profile
          </label>
        </div>
        <div className='flex justify-end mt-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const UsernameDialog = ({ onClose ,setUser}) => {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/change-username', { username });
      if (response.status === 200) {
        toast.success('username changed successfully');
        setUser(user=>({...user,username}))
        onClose();
      } else {
        toast.error('Error changing username');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Change Username</h2>
        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            autoFocus
          />
          <label htmlFor="username" className="text-gray-500">
            username
          </label>
        </div>
       
        <div className='flex justify-end mt-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const AboutDialog = ({ onClose ,setUser}) => {
  const [about, setAbout] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/change-about', { about });
      if (response.status === 200) {
        toast.success('about changed successfully');
        setUser(user=>({...user,about}))
        onClose();
      } else {
        toast.error('Error changing about');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Change About </h2>
        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
            id="about"
            placeholder="About"
            type="text"
            value={about}
            onChange={(e)=>setAbout(e.target.value)}
            autoFocus
          />
          <label htmlFor="github" className="text-gray-500">
            About
          </label>
        </div>
        <div className='flex justify-end mt-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};



const VisibilityDialog = ({ onClose,setUser }) => {
  const [visibility, setVisibility] = useState('EVERYONE');

  const handleChangeVisibility = async () => {
    try {
      const response = await axios.post('/user/change-visibility', { visibility });
      if (response.status === 200) {
        toast.success('Visibility changed successfully');
        setUser(user=>({...user,visibility}))
        onClose();
      } else {
        toast.error('Error changing visibility');
      }
    } catch (e) {
      toast.error('Server error. Please try again later');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-10 w-96'>
        <h2 className='text-2xl font-bold mb-4'>Change Visibility</h2>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className='border px-5 py-3 w-full mb-4'
        >
          <option value='EVERYONE'>Everyone</option>
          <option value='CAMPUS'>Campus</option>
          <option value='NONE'>None</option>
        </select>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleChangeVisibility}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const GuideDialog = ({ onClose,setUser }) => {
 

  const handleBecomeGuide = async () => {
    try {
      const response = await axios.post('/guide/become-guide');
      console.log(response);
      if (response.status === 200) {
        toast.success('You are now a guide');
        setUser(user=>({...user,isGuide:true}))
        onClose();
      } else {
        toast.error('Error becoming guide');
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-xl text-gray-600 font-bold mb-2'>Update Your Profile To Guide?</h2>
        <h4 className='text-gray-600'>This means you may get meeting requests from your juniors.</h4>
        
        <div className='flex justify-end mt-6'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleBecomeGuide}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const DeleteDialog = ({ onClose }) => {
  const handleDeleteAccount = async () => {
    // try {
    //   const response = await axios.post('/user/delete-account');
    //   if (response.status === 200) {
    //     toast.success('Account deleted successfully');
    //     onClose();
    //   } else {
    //     toast.error('Error deleting account');
    //   }
    // } catch (e) {
    //   toast.error('Server error. Please try again later');
    // }
    toast.info('we are bringing this feature soon!');
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Delete Account</h2>
        <p className='text-red-600 mb-4'>
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className='px-4 py-2 bg-red-500 text-white rounded-lg'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const GithubProfile = ({ user,setShowGithubDialog }) => {
 
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
          {githubUsername ? (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className='text-gray-500 mx-2 mt-1'>
              {githubUsername}
            </a>
          ) : (
            <h3 className='text-lg font-medium text-gray-500 mx-2'>Please add your Github profile</h3>
          )}

        <MdEditNote onClick={()=>setShowGithubDialog(true)} className='text-2xl text-blue-500 ml-2 mt-2 cursor-pointer' />
      </div>
    </div>
  );
};

const LinkedinProfile = ({ user,setShowLinkedInDialog }) => {
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
        {linkedinUsername ? (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500 mx-2 mt-1'>
            {linkedinUsername}
          </a>
        ) : (
          <h3 className='text-lg font-medium text-gray-500 mx-2'>Please add your LinkedIn profile</h3>
        )}
        <MdEditNote onClick={()=>setShowLinkedInDialog(true)} className='text-2xl text-blue-500 ml-2 mt-2 cursor-pointer' />
      </div>
    </div>
  );
};