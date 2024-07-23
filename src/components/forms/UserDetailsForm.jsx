import { useContext, useState } from "react";
import axios from '../../api/axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { AuthContext } from "../../context/AuthContext";

const UserDetailsForm = ({ user, setUser }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error message for the current field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation checks here
    const validationErrors = {};
    console.log(user)
    if (!user.username) {
      validationErrors.username = 'UserName is required';
    } else delete validationErrors.username

    if (!user.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = 'Invalid email address';
    } else delete validationErrors.email

    if (!user.password) {
      validationErrors.password = 'Password is required';
    } else if (user.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    } else delete validationErrors.password

    if (user.password !== user.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    } else delete validationErrors.confirmPassword

    if (!user.collegeName) {
      validationErrors.collegeName = 'College Name is required';
    } else delete validationErrors.collegeName

    if (!user.batchYear) {
      validationErrors.batchYear = 'Batch Year is required';
    } else delete validationErrors.batchYear

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { username, email, collegeName, password, batchYear } = user;
        const accessToken = user.tempToken;
        const response = await axios.post(`/auth/signup`, { username, email, password, collegeName, batchYear, tempToken: accessToken });
        console.log(response)
        if (response.status != 201) {
          toast.error("Something went wrong. Please try again!")
          return;
        }
        const { user: newUser, token } = response.data;
        login(token, newUser);
        toast.success('Account created successfully!');
        navigate(-1);
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong. Please try again!")
      }
    } else {
      // If there are validation errors, update the errors state
      console.log(validationErrors);
      setErrors(validationErrors);
      if (validationErrors.username) toast.info(validationErrors.username);
      else if (validationErrors.email) toast.info(validationErrors.email);
      else if (validationErrors.password) toast.info(validationErrors.password);
      else if (validationErrors.confirmPassword) toast.info(validationErrors.confirmPassword);
      else if (validationErrors.collegeName) toast.info(validationErrors.collegeName);
      else if (validationErrors.batchYear) toast.info(validationErrors.batchYear);
    }
  };

  return (
    <div className="w-80 md:w-96">
      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
          id="username"
          placeholder="Enter User Name"
          name="username"
          type="text"
          value={user.username}
          onChange={handleChange}
          autoFocus
        />
        <label htmlFor="username" className="text-gray-500">
          Username
        </label>
      </div>

      <div className="form-floating mt-2">
        <select
          className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
          id="collegeName"
          name="collegeName"
          value={user.collegeName}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Indian Institute Of Information Technology Sricity">Indian Institute Of Information Technology Sricity</option>
        </select>
        <label htmlFor="collegeName" className="text-gray-500">
          College Name
        </label>
      </div>

      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
          id="batchYear"
          placeholder="Enter Batch Year"
          name="batchYear"
          type="number"
          value={user.batchYear}
          onChange={handleChange}
        />
        <label htmlFor="batchYear" className="text-gray-500">
          Batch Year
        </label>
      </div>

      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
          id="password"
          placeholder="Enter Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
      </div>

      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-blue-600 rounded-md"
          id="confirmPassword"
          placeholder="Enter Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword" className="text-gray-500">
          Confirm Password
        </label>
      </div>

      <div className="mt-6">
        <button onClick={handleSubmit} className="h-10 w-full bg-blue-500 text-white text-md font-semibold hover:bg-blue-600 ease-in-out duration-300 transition-colors rounded-md">
          Sign Up
        </button>
      </div>
      <div className="mt-10 flex flex-row ">
        <h6 className="text-gray-500 font-medium text-sm w-fit hover:cursor-pointer hover:text-gray-400">
          By creating an account, you are accepting all T&C
        </h6>
      </div>
    </div>
  );
};

export default UserDetailsForm;
