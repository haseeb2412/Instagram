import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
// import Login from './components/screens/Login';
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import CreatePost from './components/screens/CreatePost';
import { createContext,useContext,useEffect, useReducer } from 'react';
import {reducer,initailState} from './reducers/userReducer'


export const UserContext = createContext();

const Routing =()=>{
  const history = useHistory();
  const {state,dispatch}= useContext(UserContext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
      history.push("/");
    }
    else{
      history.push('/signin')
    }
    // console.log(user);
  },[])



    return(
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signin">
          <Signin/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/createpost">
          <CreatePost/>
        </Route>
      </Switch>
    )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initailState); 
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>

      <BrowserRouter>
      <Navbar/>
      <Routing/>
      </BrowserRouter>

      </UserContext.Provider>
      
    </>
  );
}

export default App;
