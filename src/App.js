import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'

//pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import UpdateProfile from './pages/UpdateProfile';
import { useAuth } from './hooks/useAuth';


//  * A functional component that renders the application routes.

//  * This component uses the useAuth custom hook to access the current user.

//  * It then uses the Routes and Route components from react-router-dom to render the appropriate page based on the current user.

//  * returns JSX element containing the application routes.


const App =()=> {

  const {currentUser} = useAuth();

  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={!currentUser? <Navigate to='/login' />: <Profile /> }/>
          <Route path="/login" element={!currentUser? <Login />: <Navigate to='/' />}/>
          <Route path="/signup" element={!currentUser? <SignUp />: <Navigate to='/'/>}/>
          <Route path="/update" element={<UpdateProfile />}/>
        </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
