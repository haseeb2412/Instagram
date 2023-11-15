import React from 'react'
const Navbar = () => {
  return (
    <div>
   <nav>
    <div className="nav-wrapper white" style={{color:'black'}}>
      <a href="/" className="brand-logo -left">Instagram</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/signin">Login</a></li>
        <li><a href="/signup">SignUp</a></li>
        <li><a href="/profile">signin</a></li>
        <li><a href="/createpost">Create Post</a></li>
      </ul>
    </div>
  </nav>
    </div>
  )
}

export default Navbar
