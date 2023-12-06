import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/main.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtsCollection from "./pages/ArtsCollection";
import ArtDetail from "./pages/ArtDetail";
import Create from "./pages/arts/Create";
import CreateCat from "./pages/category/Create";
import List from "./pages/arts/List";
import ListCat from "./pages/category/List";

import Edit from "./pages/arts/Edit";
import EditCat from "./pages/category/Edit";

import PaymentDetails from "./pages/PaymentDetails";
import PrivateRoute from "./components/common/Routes/PrivateRoute";
import { getLoggedUser, isLoggedIn } from "./helpers/auth";

function App() {

  useEffect(()=>{
    isLoggedIn() && getLoggedUser()

  },[])
  return (
   
      <>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/browse-arts" element={<ArtsCollection />}/>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/art-detail/:id" element={<ArtDetail />}/>
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/arts/create" element={<Create/>}/>
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/art-detail/:id" element={<ArtDetail />}/>
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/arts/view" element={<List />}/>
          </Route>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/arts/edit" element={<Edit />}/>
          </Route>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/payment-details" element={<PaymentDetails />}/>
          </Route>
          <Route path="/category" element={<ListCat />}/>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/category/create" element={<CreateCat />} />
          </Route>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/category/edit" element={<EditCat />} />
          </Route>


       </Routes>      
       </>
   
  );
}

export default App;
