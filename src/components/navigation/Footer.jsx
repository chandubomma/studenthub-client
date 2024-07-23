import { Link} from "react-router-dom";
const Footer = () => {
    return (
      <footer className="bg-blue-400 text-white mt-40  overflow-x-hidden">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="pl-4">
              <h1 className="text-gray-400 text-5xl md:my-6 md:text-5xl font-extrabold "><span className="text-blue-700">SH</span><span className='text-gray-100'>ub</span></h1>
              <p className="text-gray-100 font-medium mt-2">
                Introducing a New Way to Connect with College Peers
              </p>
            </div>
            <div className="pl-4">
              <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link to="/" className="text-gray-100 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/guide/list" className="text-gray-100 hover:text-white">Guide</Link>
                </li>
                <li>
                  <Link to="/user/meetings" className="text-gray-100 hover:text-white">Meetings</Link>
                </li>
                <li>
                  <Link to="/user/account" className="text-gray-100 hover:text-white">Account</Link>
                </li>
              </ul>
            </div>
            <div className="pl-4">
              <h3 className="font-semibold text-xl mb-4">Connect with Us</h3>
              <div className="flex ">
                  <div>
                      <textarea className="p-2 rounded-lg focus:outline-blue-700 text-gray-400 resize-none" placeholder="Please write us a feedback!" rows="4" cols={30}/><br/>
                      <button className="bg-white py-2 px-3 rounded-xl text-gray-500 mt-2 font-medium">Submit</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 py-4">
          <div className="container mx-auto text-center">
            <p className="text-gray-200">&copy; {new Date().getFullYear()} SHub. All rights reserved.</p>
            <p className="text-gray-200">created by Chandu Bomma</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
  