import React, { useContext } from 'react';
import { UserContext } from '../App';
import {Link,useHistory} from "react-router-dom"




const Navbar = () => {
  const {state, dispatch }= useContext(UserContext);
  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
          <li key="profile"><Link to="/profile">Profile</Link></li>,
          <li key="createpost"><Link to="/createpost">Create Post</Link></li>,
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
          <li key="signin"><Link to="/signin">SignIn</Link></li>,
          <li key="signup"><Link to="/signup">SignUp</Link></li>
      ];
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper white" style={{ color: 'black' }}>
          <Link to={state ? "/" : "/signin"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">

            {renderList()}
         
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

