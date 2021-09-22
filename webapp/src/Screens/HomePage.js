import React from 'react'
import Navbar from '../Components/Navbar';


function HomePage() {
  return (
    <div className="container bg-bookmark-body">
    <Navbar />

  <section className="text-gray-600">
  <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">

    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font text-6xl mb-4 font-medium text-bookmark-primary ">Le carnet de crédit sur téléphone qui vous facilite la vie.
        {/* <br className="hidden lg:inline-block">readymade gluten */}
      </h1>
      <p className="title-font text-2xl mb-8 text-black-400">Enregistrez simplement vos transactions, directement sur votre téléphone et collectez votre argent plus facilement.</p>
      <p className="title-font text-1xl mb-2 text-gray-400"> Cliquez ici, pour télécharger l’application</p>
      
        <a href="">
            <img src="assets/googleplay.svg" />
        </a>
      
    </div>
    <div className="lg:max-w-lg lg:w-full ">
      <img className="object-cover object-center rounded" alt="hero" src = "assets/logo1.png" />
    </div>
  </div>
</section>







</div>
  );
}


export default HomePage;


