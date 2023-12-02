import React from "react";
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
import List from "./pages/arts/List";
import Edit from "./pages/arts/Edit";
import PaymentDetails from "./pages/PaymentDetails";

function App() {
  return (
   
      <>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/browse-arts" element={<ArtsCollection />}/>
          <Route path="/art-detail" element={<ArtDetail />}/>
          <Route path="/arts/create" element={<Create/>}/>
          <Route path="/arts/view" element={<List />}/>
          <Route path="/arts/edit" element={<Edit />}/>
          <Route path="/payment-details" element={<PaymentDetails />}/>

       </Routes>      
       </>
   
  );
}

export default App;
