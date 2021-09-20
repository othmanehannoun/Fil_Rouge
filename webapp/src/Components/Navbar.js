import {React} from 'react'


function Navbar (){
    return(
        <header className="text-gray-600 ">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src="assets/work.png" className="w-14" />
                <span className="ml-3 text-2xl font-bold text-bookmark-primary">Karny</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 text-bookmark-primary font-bold text-xl hover:text-indigo-400" href="/">Home</a>
                <a className="mr-5 text-bookmark-primary font-bold text-xl hover:text-indigo-400 " href="">About us</a>
                <a className="mr-5 text-bookmark-primary font-bold text-xl hover:text-indigo-400 " href="/contact">Contact us </a>
            </nav>
            <button className="inline-flex items-center bg-bookmark-primary text-white rounded-full py-4 px-6 focus:outline-none hover:bg-indigo-400">Télécharger L'app
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
          </div>
        </header>
    )
}


export default Navbar