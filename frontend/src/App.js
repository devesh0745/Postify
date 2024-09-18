import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignUp from './components/sign-up/Signup';
import SignIn from './components/sign-in/Signin';
//import LandingPage from './components/landingPage/LandingPage';
import CreatePost from './components/createPost/CreatePost';
import { Provider } from 'react-redux';
import {store}  from "./redux/store";

function App() {
  return (
    <div className="App">
    <Provider store={store} >
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' 
          element={
            <CreatePost />
          }>
        </Route>
        <Route path='/sign-up'
        element={<SignUp />} >
        </Route>
        <Route path='/sign-in'
        element={<SignIn />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
