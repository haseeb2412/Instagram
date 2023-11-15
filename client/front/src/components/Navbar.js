// import React, { useContext } from 'react'
// import {UserContext} from '../App'



// const Navbar = () => {
//   const [state, dispatch] = useContext(UserContext);
//   const renderList =()=>{
//     if(state){
//       return [
//         <>
//         <li><a href="/profile">profile</a></li>
//         <li><a href="/createpost">Create Post</a></li>
//         </>
//       ]
//     }else{
//       return [
//         <>
//         <li><a href="/signin">signin</a></li>
//         <li><a href="/signup">SignUp</a></li>
//         </>
//       ]
//     }
//   }
//   return (

//     <div>
//    <nav>
//     <div className="nav-wrapper white" style={{color:'black'}}>
//       <a href="/" className="brand-logo -left">Instagram</a>
//       <ul id="nav-mobile" className="right hide-on-med-and-down">
//        {renderList()}
//       </ul>
//     </div>
//   </nav>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext } from 'react';
import { UserContext } from '../App'; // Update with the correct path

const Navbar = () => {
  const {state, dispatch }= useContext(UserContext);

  const renderList = () => {
    if (state ) {
      return (
        <>
          <li key="profile"><a href="/profile">Profile</a></li>
          <li key="createpost"><a href="/createpost">Create Post</a></li>
        </>
      );
    } else {
      return (
        <>
          <li key="signin"><a href="/signin">Sign In</a></li>
          <li key="signup"><a href="/signup">Sign Up</a></li>
        </>
      );
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

