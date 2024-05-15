import { useState } from "react";
import Bio from "../components/Bio";
import Navbar from "../components/Navbar";


//  * A functional component that renders a user's profile.
 
//  * This component uses the useState hook to manage the state of the searchUser.

//  * It renders the Navbar and Bio components, passing the searchUser and setSearchUser as props.

//  * returns a JSX element containing the user's profile.
 

const Profile = () => {
  const [searchUser,setSearchUser] = useState(null);

  return (<div className="bg-black w-full h-screen">
    <Navbar searchUser={searchUser} setSearchUser={setSearchUser}/>
    <Bio searchUser={searchUser} setSearchUser={setSearchUser}/>
  </div>

  )
}

export default Profile