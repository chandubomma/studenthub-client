import React from 'react';
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

const TopGuidesOfMonth = () => {
    
  const topGuides = [
    {
        username : "Uday Kiran Karra",
        profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
        meetings : 15,
        about : 'AI&ML | Codeforces'
    },
    {
        username : "Star Mahesh",
        profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
        meetings : 12,
        about : 'Web Developer | 5 star on CodeChef'
    },
    {
        username : "Somu Somu",
        profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
        meetings : 7,
        about : 'MERN | Cloud | LeetCode'
    },
    {
        username : "Laxman Ji",
        profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
        meetings : 7,
        about : 'Java | SpringBoot'
    },
    {
      username : "Krishna Murthy",
      profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
      meetings : 6,
      about : 'crypto | Trading'
    },
    {
      username : "Krishna Chaitanya",
      profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
      meetings : 5,
      about : 'BlockChain | Two problem'
    }
]

    

  return (
    <div className="w-96 border-r-2 border-dotted p-4 pt-0 overflow-y-auto">
      <h2 className="text-xl font-medium mb-8 text-gray-800">Top Guides of the Month</h2>
      {topGuides.map((guide,index) => (
        <div key={index} className="pb-3 mb-3 border-b-2 border-gray-400 border-dotted">
          <div className="flex">
            <h2 className='text-xl text-blue-600 mt-6 mr-6'>{index+1}</h2>
            <img src={guide.profile}  className="w-16 h-16 rounded-full mr-4 mt-2 object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mt-2 cursor-pointer">{guide.username}</h3>
              <div className="text-sm text-white flex mt-2">
                <p className='bg-blue-400 px-2 py-1 rounded-lg shadow-md'>{guide.meetings} meetings</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TopGuidesOfMonth;


  