import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg sticky-top" >
      <div class="container-fluid">
          <a class="navbar-brand fw-normal" href="#">Art Gallery Auction</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav ">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
              <a class="nav-link" href="/browse-arts">Browse Arts</a>
              <a class="nav-link" href="/arts/create">Create Art</a>
              <a class="nav-link" href="/login">Login</a>
          </div>
          </div>
      </div>
    </nav>  
    </>
  )
}

export default Navbar