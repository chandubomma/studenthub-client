import { useContext, useState} from "react"
import OTPField from "./OTPField"
import EmailField from "./EmailField"
import { toast } from 'sonner'
import { useLocation ,useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from '../../api/axios';

const EmailAndOTP = ({email,handleEmail,setSignInWithOTP,validateEmail}) => {
    const [showOTP,setShowOTP] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

    const handleVerifyOTP = async(verificationCode)=>{
      try{
        const response = await axios.post(`/auth/signin-otp/verify-code`,{ email,otp:verificationCode });
        console.log(response)
        if(response.status!=200){
          toast.error("Something went wrong.Please try again!");
          return;
        }
        const {user,token} = response.data
        login(token,user);
        navigate(-1);
      }catch(error){
        console.log(error);
        toast.error("Something went wrong.Please try again!");
      }
    }

    const handleSendOTP = async()=>{
      if(!validateEmail(email))return;
      try{
        const response = await axios.post(`/auth/signin-otp/send-verification-code`, {email});
        console.log(response)
        if(response.status!=200){
          
          toast.error("Something went wrong.Please try again!");
          return;
        }
        setShowOTP(true)
      }catch(error){
        console.log(error);
        toast.error("Something went wrong.Please try again!");
      }
      
    }


  return (
    <div className="w-80">
      
      {
        showOTP?
        <OTPField handleVerifyOTP={handleVerifyOTP}/>:
        <div>
          <Heading/>
          <EmailField
           handleEmail={handleEmail}
           signin={true}
           handleSendOTP={handleSendOTP} 
           setSignInWithOTP={setSignInWithOTP}
           validateEmail={validateEmail}
           />
        </div>
      }
        
    </div>
  )
}

export default EmailAndOTP

const Heading = ()=>{

    return(
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3"><span className="text-blue-600">SH</span><span className="text-black">ub</span></h1>
        <h4 className="text-lg font-medium text-gray-500">Welcome back!</h4>
      </div>
    )
  }
