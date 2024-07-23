import { useContext, useState } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import axios from '../../api/axios';

const EmailAndPassword = ({
  setSignInWithOTP,
  email,
  handleEmail,
  validateEmail,
}) => {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading,setLoading] = useState(false)
  
  const validatePassword = (enteredPassword) => {
    if (!enteredPassword.trim()) {
      // If password is empty or contains only spaces
      toast.warning("Please enter your password");
      return false;
    }
    const isValidLength = enteredPassword.length >= 6; // Customize the criteria as needed
    if (!isValidLength) {
      // If password length is less than the required minimum
      toast.error("Password must be at least 6 characters");
      return false;
    }
    // If password is valid
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true)
    if (!validateEmail(email) || !validatePassword(password)) {
      setLoading(false);
      return;
    }
   
    try {
      const response = await axios.post(`/auth/signin`,{ email, password })
      if (response.status!=200) {
        toast.error("Something went wrong.Please try again!");
        return;
      }
      const { user, token } = response.data;
      login(token, user);
      setLoading(false)
      navigate(-1);
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Something went wrong.Please try again!");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-80 ">
      <Heading />
      <div className="form-floating mb-3 mt-3">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-sm"
          id="email"
          placeholder="Enter Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => handleEmail(e)}
          autoFocus
        />
        <label htmlFor="email" className="text-gray-500">
          Email
        </label>
      </div>

      <div className="form-floating mt-3">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-sm"
          id="password"
          placeholder="Enter Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
      </div>
      <div className="flex justify-end mt-1">
        <h6
          className="text-gray-500 text-sm w-fit hover:cursor-pointer hover:text-gray-400"
          onClick={() => setSignInWithOTP(true)}
        >
          sign in with OTP?
        </h6>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSignIn}
          className={`${loading ? 'hover:cursor-wait bg-blue-400':'bg-blue-500'} h-10 w-full text-white text-md font-semibold hover:bg-blue-600 rounded-none`}
        >
          { loading?
            <div className="w-5 h-5 inline-block mt-2 mx-auto rounded-full border-4  border-b-transparent animate-spin duration-500 ease-in-out"></div>:
            <h2>Sign in</h2>
          }
        </button>
      </div>
      <div className="mt-16 flex flex-row ">
        <Link
          to={location.pathname.replace("signin", "signup")}
          className="text-gray-500 font-medium text-sm w-fit hover:cursor-pointer hover:text-gray-400"
        >
          New to SHub? Register Here
        </Link>
      </div>
      <div className="mt-10 flex flex-row ">
        <Link
          to="/"
          className="text-gray-500 font-medium text-sm w-fit hover:cursor-pointer hover:text-gray-400"
        >
          <FaArrowAltCircleLeft className="inline mr-2" />
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default EmailAndPassword;

const Heading = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-3">
        <span className="text-blue-600">SH</span>
        <span className="text-black">ub</span>
      </h1>
      <h4 className="text-lg font-medium text-gray-500">Welcome back!</h4>
    </div>
  );
};
