import React from 'react';



const MeetingCard = ({ meeting }) => {

    const handleJoinMeeting = () => {
        window.location.href = `/guide/meeting/${meeting.id}`;
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

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">Meeting with {meeting.host.username}</h2>
            <p className="text-gray-600">Scheduled At: {new Date(meeting.scheduledAt).toLocaleString()}</p>
            <p className="text-gray-600">Status: {meeting.status}</p>
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold mt-4">Participants</h3>
                {meeting.participants.map(participant => (
                    <div key={participant.userId} className="flex items-center mt-2">
                        <div className="mr-4">
                            <p className="font-semibold">{participant.user.username}</p>
                            <p className="text-gray-500">{participant.user.collegeName} ({participant.user.batchYear})</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                {isMeetingUpcoming && !isMeetingCancelled && (
                    <button
                        onClick={handleCancelMeeting}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel Meeting
                    </button>
                )}
                {!isMeetingCancelled && (
                    <button
                        onClick={handleJoinMeeting}
                        className={`bg-blue-500 text-white px-4 py-2 rounded `}
                        disabled={!isMeetingUpcoming}
                    >
                       Join Meeting
                    </button>
                )}
            </div>
        </div>
    );
};

export default MeetingCard;
