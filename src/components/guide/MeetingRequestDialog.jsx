import React, { useState } from 'react';
import axios from '../../api/axios';

const MeetingRequestDialog = ({ guide, onClose , setRequestSent}) => {
  const [preferredDateTime, setPreferredDateTime] = useState('');

  const handleSendRequest = async () => {
    try {
      await axios.post('/user/send-meeting-request', {
        guideId: guide.id,
        preferredTime : preferredDateTime
      });
      setRequestSent(true);
      onClose();
    } catch (error) {
      console.error('Error sending meeting request:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Send Meeting Request</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Preferred Date & Time</label>
          <input
            type="datetime-local"
            value={preferredDateTime}
            onChange={(e) => setPreferredDateTime(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSendRequest}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequestDialog;
