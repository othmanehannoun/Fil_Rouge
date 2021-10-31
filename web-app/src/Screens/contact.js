import React, {useState} from 'react'
import Navbar from '../components/navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

        const url = 'http://192.168.0.133:7000/Admin/contact';
        await axios.post(url, data)
            .then((response) => {
                toast.success('send mail Success');
            })

            .catch((error) => {
                toast.error(error);
                console.log(error);
            });

    }

  return (
    <>
    <Navbar />
    
    <div className="row session">
    <div className="col-md-8">
    <iframe width="100%" height="580px" className="absolute inset-0" frameBorder={0} title="map" marginHeight={0} marginWidth={0} scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.7047433966877!2d-9.237232184983602!3d32.29291528112086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac211719897669%3A0x6f59fa5bb517f58a!2sYouCode%20Safi!5e0!3m2!1sfr!2sma!4v1632133546335!5m2!1sfr!2sma" style={{filter: 'grayscale(0.5) opacity(0.9)'}} />
    </div>
    <div className=" col-md-4 contact-form">
      <h1 className="title">Contact us</h1>
      <h2 className="subtitle">We are here assist you.</h2>
      <form onSubmit={HandelSendMail}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" name="nom" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
         value={nom} 
         onChange={e => setNom(e.target.value)}
         />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Message</label>
        <textarea name="message" className="form-control" id rows={6} defaultValue={""}
        value={message} 
        onChange={e => setMessage(e.target.value)}
         />
      </div>
      <button type="submit" class="btn btn-primary">SEND</button>
      </form>
    </div>
  </div>
 </>   
  );
}


export default Contact;


