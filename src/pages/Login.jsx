import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';


//  * A functional component that renders a login form.

//  * This component uses the useState hook to manage the state of the email, password, toggle state, and error message.

//  * It also uses the useLogin custom hook to handle the authentication process.
 
//  * returns a JSX element containing the login form.


const Login=()=> {

    const [toggle, setToggle] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithEmailAndPassword,loginWithGoogle, isLoading, error } = useLogin();

    const handleClickWithEmailPassword = async(e)=>{
        e.preventDefault();
        await loginWithEmailAndPassword(email,password);
    }

    const handleClickWithGoogle = async(e)=>{
        e.preventDefault();
        loginWithGoogle();
    }

    return (
        <div className="w-full h-screen custom-background flex justify-center items-center">
            <div className='sm:h-[450px] sm:w-[350px] md:h-[500px] md:w-[400px] w-[300px] h-[400px] bg-black rounded-3xl text-white tracking-wider'>
                <h1 className='text-[20px] md:text-[25px] text-center'>Login</h1>
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
                    <button type='submit' onClick={handleClickWithEmailPassword} disabled={isLoading}
                    className='text-center w-full hover:underline decoration-white'>LOGIN</button>
                    <div className='w-full text-white my-[2px] text-center'>Or</div>
                    <button onClick={handleClickWithGoogle} className='w-full my-[5px]'><div className='sm:w-[230px] md:w-[280px] w-[180px] bg-white mx-auto text-black rounded hover:bg-slate-400 hover:text-white'>Login with Google</div></button>
                </form>
                <div className='signup-link text-center w-full mt-[20px]'>
                    <p>Or Sign Up Using</p>
                    <Link to="/signup" className='hover:underline decoration-white'>SIGN UP</Link>
                </div>
                {error && <div className='text-center text-red-600'>{error}</div>}
            </div>
           
        </div>
    )
}

export default Login