
import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimatedText from "./AnimatedText";


const Welcome = () => {
  const controls = useAnimation();
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const text = [
    "Struggling to make friends or find your way around?",
    "Need guidance on exams, career paths, or assignments?",
    "Want to connect with seniors who have been through it all?",
    "StudentHub is here to help you!"
  ]
  
  
  return (
    <motion.div
      className="lg:px-48 min-[100px]:px-16 px-16 pt-44 flex flex-col md:flex-row justify-between items-center"
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <motion.div className="w-full md:w-[44%] mb-8 md:mb-0">
        <motion.h2
          className="text-blue-500/90 font-semibold text-3xl min-[1100px]:text-4xl py-4"
          variants={variants}
        >
          Welcome To StudentHub
        </motion.h2>
        <motion.p
          className="text-3xl min-[1100px]:text-4xl font-medium mt-3 text-gray-800"
          style={{ lineHeight: "1.2" }}
          variants={variants}
        >
          Introducing a New Way to Connect with College Peers
        </motion.p>
        <motion.p
          className="mt-6 text-gray-600 font-normal text-base md:text-lg"
          variants={variants}
        >
            StudentHub is a platform designed to bridge the gap between junior and senior students.
            Whether you're looking for guidance from experienced seniors or trying to make new friends,
            StudentHub is your go-to solution.
           
        </motion.p>
        <motion.div
          className="mt-5 text-gray-500 font-normal text-base md:text-lg"
          variants={variants}
        >
           <AnimatedText textArray={text}/>
        </motion.div>
        <motion.div
          className="flex items-center mt-8 justify-between w-[90%] gap-5"
          variants={variants}
        >
          <motion.button
            type="button"
            className="md:py-3 md:px-4 py-3 px-2.5 w-40 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            variants={variants}
            onClick={() => navigate("/guide/list")}
          >
            <span className="align-baseline">Start Now</span>
            <FaArrowRight className="ml-2 align-baseline mt-1" />
          </motion.button>
         
        </motion.div>
      </motion.div>
      <motion.div className="relative flex-shrink-0" variants={variants}>
      <Player
        src="https://lottie.host/e229bbb4-011e-4061-9598-a95c0acd6a56/IssjfKVD1Q.json"
        className="player  w-[25rem] mt-5"
        autoplay={true}
        loop
      />
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
