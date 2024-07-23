import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { AiOutlineOneToOne } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { FaList, FaMotorcycle, FaSearch } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Working = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      className="lg:px-48 min-[100px]:px-16 lg:mt-64 mt-24 flex flex-col justify-between items-center bg-blue-50 py-20 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <h2 className="mx-auto font-semibold text-2xl text-blue-700">
        HOW DOES IT WORK
      </h2>
      
      <h2 className="mt-4 font-medium text-lg ">For Juniors </h2>

      <motion.div
        className="flex flex-col md:flex-row gap-x-5 justify-between items-center w-full mt-10"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer mx-3"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="rounded-full flex justify-center items-center">
            <MdOutlineScreenSearchDesktop className="w-24 h-24 text-blue-700" />
          </div>
          <p className="text-xl font-semibold mt-3">Find a Guide</p>
          <p className="text-gray-600 text-center font-light mt-2">
            Browse profiles of senior students who are ready to help you with career advice, exam preparation, assignments, and more.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center mt-10 md:mt-0 cursor-pointer mx-3"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="rounded-full flex justify-center items-center p-2">
            <AiOutlineOneToOne className="w-20 h-20 text-blue-700"/>
          </div>
          <p className="text-xl font-semibold mt-3">One-to-One Meetings</p>
          <p className="text-gray-600 text-center font-light mt-2">
           Request and schedule personalized meetings with guides for detailed and tailored advice.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center mt-10 md:mt-0 cursor-pointer mx-3"
          variants={itemVariants}
          whileHover="hover"
        >
          <div className=" rounded-full flex justify-center items-center">
           <MdGroups className="w-24 h-24 text-blue-700"/>
          </div>
          <p className="text-xl font-semibold mt-3">Connect with Peers</p>
          <p className="text-gray-600 text-center font-light mt-2">
           Invite and meet fellow students to build your social circle and find study partners.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Working;
