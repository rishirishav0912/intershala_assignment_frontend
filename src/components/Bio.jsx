import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';



//  * A functional component that displays the user's bio.

//  * This component uses the useState hook to manage the state of the user details.

//  * It also uses the useEffect hook to fetch the user details from the server when the component mounts.

//  * The useAuth hook is used to access the current user's email and access token.

//  * setSearchUser - A function to set the searched user.

//  * returns JSX element containing the user's bio.



const Bio = ({ searchUser, setSearchUser }) => {
  const { currentUser } = useAuth();

  const [details, setDetails] = useState({
    email: "",
    profilePic: "",
    birth: "",
    gender: "",
    description: "",
    qrImage: ""
  })

  useEffect(() => {
    
    const fetchDetails = async () => {
      const response = await fetch(`${process.env.REACT_APP_PROXY}/user/${searchUser || currentUser.email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken
            }`
        }
      });
      const json = await response.json();
      if (response.ok) {
        setDetails(json);
      }
      if(!response.ok){
        setSearchUser(null);
        alert("user not found");
      }
    }

    if (searchUser || currentUser.email) {
      fetchDetails();
    }

  }, [searchUser])

  return (
    <div className="flex flex-col text-white mt-[30px] ml-[20px]">
      <div className="flex">
        <img
          src={details.profilePic}
          alt="Profile"
          className="w-28 rotating h-28 sm:w-40 sm:h-40 rounded-full object-cover mr-4 mb-[20px]"
        />
        <img
          src={details.qrImage}
          alt="Profile"
          className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover mr-4"
        />
      </div>
      <div className='flex-col'>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">{details.email}</h1>
        {details.gender === "male" ? <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4">He/Him</p> :
          details.gender === "female" ? <p className="text-lg mb-4">She/Her</p> : <p></p>}
        {details.birth && <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4">{details.birth}</p>}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {details.description}
        </p>
      </div>
      {searchUser === null ? <></> : <button className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit" onClick={() => {
        setSearchUser(null)
      }}>Back</button>}
    </div>
  );
};

export default Bio;