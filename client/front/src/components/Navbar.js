import React, { useContext } from 'react';
import { UserContext } from '../App';
import {useHistory} from 'react-router-dom'
import { Link } from '@mui/material';
const Navbar = () => {
  const {state, dispatch }= useContext(UserContext);
  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
          <li key="profile"><a href="/profile">Profile</a></li>,
          <li key="createpost"><a href="/createpost">Create Post</a></li>,
          <li key="logout">
            <button className="btn #c62828 red darken-3"  name="action" 
            onClick={()=>{
              localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
            }}
            >
                Logout
            </button>
          </li>
      ]
    } else {
      return [
          <li key="signin"><a href="/signin">Sign In</a></li>,
          <li key="signup"><a href="/signup">Sign Up</a></li>
      ];
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper white" style={{ color: 'black' }}>
          <a href={state?"/":"/signin"} className="brand-logo left">
            Instagram
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
         
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

