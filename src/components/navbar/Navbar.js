import React, { useState, useEffect } from 'react';
import {NavLink, Link} from 'react-router-dom';
import { FaUserAlt, FaBars, FaLightbulb} from 'react-icons/fa'
import './Navbar.css';
function Navbar() {
  const [logoutBtn, setLogoutBtn] = useState(true);
  const [user, setUser] = useState('');

  const logout = ()=>{
    localStorage.removeItem('current-user');
    setLogoutBtn(()=>{
      return false;
    })
  }
  useEffect(()=>{
   return setUser(()=>{
      return JSON.parse(localStorage.getItem('current-user'));
    })
  }, []);
  return (
    <>
    <nav className='navbar'>
      <Link to = '/'>
          <p>Sahar Thoughts<FaLightbulb/></p>
      </Link>
      <div className='navbar__links--right'>
        <ul>
            <li><NavLink to = '/Registration'>Register</NavLink></li>
            <li><NavLink to = '/Login'>Login</NavLink></li>
        </ul>
        {logoutBtn && user &&<div className='navbar__userInfo'>
          <div className='navbar__userName'><FaUserAlt /> {(user) ? user.name : ''}</div>
          <div onClick={logout} className='login__logoutBtn'>Logout</div>
        </div>}
      </div>
        <FaBars className='navbar__barsIcon'/>
    </nav>
    </>
  )
}

export default Navbar