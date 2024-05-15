import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';


//  * A functional component that renders the navigation bar.

//  * This component uses the useState hook to manage the state of the user.

//  * It also uses the useNavigate hook to navigate to different pages.

//  * The useLogout hook is used to handle the logout functionality.

//  * searchUser - The searched user.

//  * setSearchUser - A function to set the search user.

//  * returns JSX element containing the navigation bar.


const Navbar = ({ searchUser, setSearchUser }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const { logout } = useLogout();
  return (
    <nav className="flex-row sm:flex justify-between bg-black border-b border-white p-6">
      <div className="flex items-center">
        <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-[150px] sm:w-[196px] bg-slate-400 border-none text-white placeholder-white mr-3 py-1 px-2"
            type="text"
            value={user}
            placeholder="Search for user ID..."
            onChange={(e) => setUser(e.target.value)}
          />
          <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => {
              setSearchUser(user)
              setUser('')
            }}>
            <i className='material-symbols-outlined'>Search</i>
          </button>
        </form>
      </div>
      <div className="flex items-center  justify-start sm:justify-end sm:mt-[0px] mt-[5px]">
        <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2" onClick={() => { navigate("/update") }}>
          Edit Profile
        </button>
        <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar