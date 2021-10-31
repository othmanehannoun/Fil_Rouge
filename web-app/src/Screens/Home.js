import React from 'react'
import Navbar from '../components/navbar'
import {Link} from 'react-router-dom';
import '../css/App.css'

function Home() {
  return (
    <div className="">

      <Navbar />

      
       <div className="row header">
       <div className="col-md-6 content1-left">
          <h3>Le carnet de crédit sur téléphone qui vous facilite la vie.</h3>
          <p style={{fontSize:'22px', color:'rgb(47 47 47)'}}>Enregistrez simplement vos transactions, directement sur votre téléphone et collectez votre argent plus facilement.</p>
          <p>Cliquez ici, pour télécharger l’application</p>
          <Link to="">
            <img src="../../assets/img/googleplay.svg" alt="" />
          </Link>
        </div>
        <div className="col-md-6 content1-right">
          <img src='../../assets/img/iphone.svg' alt="é" width="50%"/>
        </div>
       </div>
       
      </div>

   
  );
}

export default Home;
