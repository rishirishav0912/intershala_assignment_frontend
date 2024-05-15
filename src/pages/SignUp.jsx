import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup'


//  * A functional component that renders the sign up form.

//  * This component uses the useState hook to manage the state of the email, password, toggle state, and error message.

//  * It also uses the useSignup custom hook to handle the sign up process.

//  * returns JSX element containing the sign up form.
 

const SignUp = ()=> {
    const [toggle, setToggle] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error, success } = useSignup();

    const handleClick = async(e)=>{
        e.preventDefault();
        await signup(email,password);
        if(success){
            alert(success);
        } 
    }

    return (
        <div className="w-full h-screen custom-background flex justify-center items-center">
            <div className='sm:h-[450px] sm:w-[350px] md:h-[500px] md:w-[400px] w-[300px] h-[400px] bg-black rounded-3xl text-white tracking-wider'>
                <h1 className='text-[20px] md:text-[25px] text-center'>Sign Up</h1>
                <form className='flex-col mt-[50px]'>
                    <div className='mb-[9px] m-auto flex justify-center'>
                        <i className='material-symbols-outlined mr-[3px]'>Person</i>
                        <input type='text' placeholder='email' 
                        onChange={(e)=>{setEmail(e.target.value)}} value={email}
                            className='bg-slate-400 text-white w-[250px] border-0 border-b-2 border-solid border-white'
                        />
                    </div>

                    <div className='mb-[9px] m-auto flex justify-center'>
                        <i className='material-symbols-outlined mr-[3px]'>Lock</i>
                        <input type={toggle ? 'password' : 'text'} placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} value={password}
                            className='bg-slate-400 text-white w-[250px] border-0 border-b-2 border-solid border-white'
                        />
                        <i className='material-symbols-outlined ml-[-25px] cursor-pointer rounded-[50px] mr-[3px]' onClick={() => setToggle((prev) => !prev)}>{toggle ? 'Visibility_off' : 'Visibility'}</i>
                    </div>
                    <button type='submit' onClick={handleClick} disabled={isLoading}
                    className='text-center w-full hover:underline decoration-white'>SIGN UP</button>
                </form>
                <div className='signup-link text-center w-full mt-[20px]'>
                    <p>Or Login Using</p>
                    <Link to="/login" className='hover:underline decoration-white'>LOGIN</Link>
                </div>
                {error && <div className='text-center text-red-600'>{error}</div>}
            </div>
        </div>
    )
}

export default SignUp