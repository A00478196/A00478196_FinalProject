import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { isLoggedIn, logout } from '../../helpers/auth'
import { decoded } from '../../helpers/token'

const Navbar = () => {

  const [user, setUser] = useState(false)
  useEffect(()=>{
    isLoggedIn()?setUser(true):setUser(false)
    console.log("@user", user)

  },[])
  return (
    <>
    <nav class="navbar navbar-expand-lg sticky-top" >
      <div class="container-fluid">
          <a class="navbar-brand fw-normal" href="/">Art Gallery Auction</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav ">
              
             <NavLink to="/" activeClassName="selected" className={"nav-link"}>Home</NavLink>
             <NavLink to="/browse-arts" className={"nav-link"}>Browse Arts</NavLink>

             <NavLink to="/category" className={"nav-link"}>Category</NavLink>
             <NavLink to="/arts/create" className={"nav-link"}>Create Art</NavLink>
             <NavLink to="/bid-details" className={"nav-link"}>Bidding Details</NavLink>

             {
              user?
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {decoded?.firstName}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className=''>
                    <NavLink className={"dropdown-item"} to='/user/preferences'>Preferences</NavLink>
                  </li>
                  <li><p class="dropdown-item mb-0" onClick={()=>logout()}>Logout</p></li>
                  
                </ul>
              </li>
              :
              <NavLink to="/login" className={"nav-link"}>Login</NavLink>

             }
              {/* <NavLink to="/login" className={"nav-link"}>Login</NavLink> */}

          </div>
          </div>
      </div>
    </nav>  
    </>
  )
}

export default Navbar