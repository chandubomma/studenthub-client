import { motion } from "framer-motion";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ isDrawerOpen, handleDrawerToggle }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  return (
    <motion.div
      className={` border-l-2 border-l-blue-500 bg-zinc-950  h-full w-96 p-4 overflow-y-auto fixed top-0 ${
        isDrawerOpen ? "right-0" : "-right-full"
      } z-50`}
      initial={{ x: isDrawerOpen ? "-100%" : "100%" }}
      animate={{ x: 0 }}
      exit={{ x: isDrawerOpen ? "-100%" : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <FaTimes
          className="text-2xl text-blue-500 cursor-pointer"
          onClick={handleDrawerToggle}
        />
        <h2 className="text-2xl text-blue-500 font-bold">Chat</h2>
      </div>

      <div>
        {messages.length === 0 ? (
          <p className="text-red-500 flex items-center justify-center text-xl font-bold">
            No messages.
          </p>
        ) : (
          <ul>
            {messages.map((message, index) => (
              <li key={index} className="mb-4 border-b pb-2">
                <div className="flex items-center mb-2">
                  <p className="font-bold text-black">{message.sender}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 font-semibold py-1">
                    {message.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </motion.div>
  );
};

export default SideDrawer;
