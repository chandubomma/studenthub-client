import React from 'react'
import TopRatedGuideCard from './TopRatedGuideCard'

const TopRatedGuides = () => {
    const topRatedGuides = [
        {
            username : "Vivek Vardhan Chilluri",
            profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
            rating : 5,
            about : 'Web Developer | AI&ML | Codeforces'
        },
        {
            username : "Varun Tej",
            profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
            rating : 4.5,
            about : 'Web Developer | 4 star on CodeChef'
        },
        {
            username : "Vivek Chaitanya",
            profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
            rating : 4.2,
            about : 'MERN | Cloud | LeetCode'
        },
        {
            username : "Abboju Ravi Teja",
            profile : "https://tse1.mm.bing.net/th?id=OIP.SgHZIP_tF1NmAX3dTdWSEgHaH_&pid=Api&P=0&h=180",
            rating : 4,
            about : 'Java | SpringBoot'
        }
    ]
  return (
    <div className='mt-24 px-16 mb-32 '>
      <h2 className='text-xl font-medium text-gray-800'>Top Rated Guides</h2>
      <div className='grid grid-cols-4 gap-x-20 gap-y-5 mt-10'>
        {
            topRatedGuides.map((guide,index)=>(
            <TopRatedGuideCard key={index} guide={guide}/> 
            ))
        }
      </div>
      
    </div>
  )
}

export default TopRatedGuides
