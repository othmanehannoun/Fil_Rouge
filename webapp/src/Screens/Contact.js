import React, {useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar'
import axios from 'axios'

toast.configure()

function Contact () {
    const [nom, setNom] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
   
    
    const HandelSendMail = async(e) => {
        e.preventDefault();
        const data = {nom, email, message}
        console.log(data);

        const url = 'http://localhost:7000/Admin/contact';
        await axios.post(url, data)
            .then((response) => {
                toast.success('send mail Success');
            })

            .catch((error) => {
                toast.error(error);
                console.log(error);
            });

    }


    return(
        <div className="container">
         <Navbar />
         
                <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe width="100%" height="100%" className="absolute inset-0" frameBorder={0} title="map" marginHeight={0} marginWidth={0} scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.7047433966877!2d-9.237232184983602!3d32.29291528112086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac211719897669%3A0x6f59fa5bb517f58a!2sYouCode%20Safi!5e0!3m2!1sfr!2sma!4v1632133546335!5m2!1sfr!2sma" style={{filter: 'grayscale(0.5) opacity(0.9)'}} />
                    
                    <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                    <div className="lg:w-1/2 px-6">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                        <p className="mt-1">105 RUE LA BELLE VUE QU ACHEBAR SAFI</p>
                    </div>
                    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                        <a className="text-indigo-500 leading-relaxed">othmanehannoune1@email.com</a>
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                        <p className="leading-relaxed">+212 6 85 52 16 02</p>
                    </div>
                    </div>
                </div>
                
                <form className="p-5 shadow-2xl rounded-lg lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0" onSubmit={HandelSendMail} >
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                    <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="text" id="name" name="nom" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                    value={nom} 
                    onChange={e => setNom(e.target.value)}
                    />
                    </div>
                    <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="relative mb-4">
                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                    <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} 
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                    />
                    </div>
                    <input type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" value="SEND"/>
                    <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                
                </form>
                </div>
            </section>
        </div>
    )
}



export default Contact