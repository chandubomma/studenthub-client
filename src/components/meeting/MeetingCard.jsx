import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import { TiTick } from "react-icons/ti";


const MeetingCard = ({ meeting }) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleJoinMeeting = () => {
        navigate(`/meeting/${meeting.id}`);
    };

    const handleCancelMeeting = async () => {
        try {
           
            console.log('Meeting cancelled:', response.data);
           
        } catch (error) {
            console.error('Error cancelling meeting:', error);
        }
    };

    const isMeetingUpcoming = new Date(meeting.scheduledAt) > new Date();
    const isMeetingCompleted = meeting.status === 'COMPLETED';
    const isMeetingCancelled = meeting.status === 'CANCELLED';
    const isToBeHappen = meeting.status === 'TO_BE_HAPPEN';
    const isAboveTime = new Date().getHours() > new Date(meeting.scheduledAt).getHours()+2 ;
    const isEnded = meeting.endedAt!=null;
    

    return (
        <div className="bg-white shadow-md hover:shadow-lg duration-300 ease-in-out hover:shadow-gray-400 rounded-lg px-4 py-6 mb-4 max-w-[25rem]">
            <h2 className="text-xl text-gray-600 font-semibold mb-2">Meeting with {meeting.participants.filter(p=>{return p.user.id!==user.id})[0].user.username}</h2>
            <p className="text-gray-500">Scheduled At : {new Date(meeting.scheduledAt).toLocaleString()}</p>
            <p className="text-gray-500">Status : {meeting.status}</p>
            <div className="flex flex-col">
                <h3 className="text-lg text-gray-600 font-semibold mt-4">Participants</h3>
                {meeting.participants.map(participant => (
                    <div key={participant.userId} className="flex items-center mt-2 border-2 p-4 border-dashed pb-2">
                        <div>
                            <img
                             src={participant.user.profile}
                             className='rounded-full w-20 h-16'
                            />
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold text-gray-600 text-lg">{participant.user.username}</p>
                            <p className="text-gray-500 text-sm">{participant.user.collegeName} ({participant.user.batchYear})</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                {
                    isToBeHappen && !isAboveTime?
                    <div>
                        {isMeetingUpcoming && !isMeetingCancelled && (
                            <button
                                onClick={handleCancelMeeting}
                                className="border-2 border-red-400 text-red-500 hover:bg-red-400 hover:text-white px-4 py-2  mr-2"
                            >
                                Cancel Meeting
                            </button>
                        )}
                        {!isMeetingCancelled && (
                            <button
                                onClick={handleJoinMeeting}
                                className={`border-2 border-blue-400 text-blue-500 hover:bg-blue-400 hover:text-white px-4 py-2`}
                            >
                            Join Meeting
                            </button>
                        )}
                    </div>:
                    <div className="mt-4 flex justify-between">
                        {
                            isEnded?
                            <div className='flex'>
                                <TiTick className='text-3xl text-blue-500'/>
                                <h3 className='text-lg font-medium text-blue-500'>Completed</h3>
                            </div>:
                            <div>
                                <h3 className='text-lg font-medium text-red-500'>Cancelled</h3>
                            </div>
                        }
                    </div>
                }
                
            </div>
        </div>
    );
};

export default MeetingCard;
