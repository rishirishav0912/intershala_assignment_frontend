import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

//  * A functional component that handles the update profile functionality.

//  * This component uses the useState hook to manage the state of the description, gender, profilePic, and birthDate.

//  * It also uses the useAuth custom hook to handle the authentication process.

//  * returns JSX element containing the update profile form.


const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_PROXY}/user/${currentUser.email}`, {
      method: "PATCH",
      body: JSON.stringify({description,gender,profilePic,birthDate}),
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${currentUser.accessToken
          }`
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      navigate("/");
    }

  };

  return (
    <div className="custom-form-background w-full h-screen flex justify-center items-center text-white">
      <form onSubmit={handleSubmit} className="flex flex-col bg-black w-[270px] sm:w-[400px] md:w-[470px] lg:w-[520px] h-[480px] xl:w-[550px] xl:h-[500px] items-start rounded-3xl">
        <label htmlFor="description" className="text-lg font-bold mb-2 ml-[10px] mt-[10px]">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="appearance-none bg-gray-500 border-none text-white mr-3 py-1 px-2 ml-[10px] w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] h-[100px]"
        />

        <label htmlFor="birthDate" className='text-lg font-bold mb-2 ml-[10px] mt-[4px]'>Birth Date</label>

        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          className="appearance-none bg-gray-700 border-none text-white mr-3 py-1 px-2 border-b border-white ml-[10px]"
        />

        <label htmlFor="gender" className="text-lg font-bold mb-2 ml-[10px] mt-[4px]">
          Gender:
        </label>
        <div className="flex items-center ml-[10px]">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
            className="mr-2"
          />
          <label htmlFor="male" className="text-lg">
            Male
          </label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
            className="ml-4 mr-2"
          />
          <label htmlFor="female" className="text-lg">
            Female
          </label>
        </div>

        <label htmlFor="profilePic" className="text-lg font-bold mb-2 ml-[10px] mt-[4px]">
          Profile Picture:
        </label>
        <input
          type="file"
          id="profilePic"
          onChange={(e) => {
            const file = e.target.files[0];
            const photoReader = new FileReader();
            photoReader.onloadend = () => {
              console.log(photoReader.result);
              setProfilePic(photoReader.result);
            }
            photoReader.readAsDataURL(file);
          }}
          className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ml-[10px]"
        />

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-[10px] mt-[20px]">
          Update Profile
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-[10px] mt-[4px]" onClick={() => { navigate("/") }}>
          Back
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;