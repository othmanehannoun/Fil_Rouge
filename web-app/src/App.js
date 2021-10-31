import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//import './css/App.css';

// user Routes
import Home from './Screens/Home'
import Contact from './Screens/contact'


function App() {
  return (
    
        <BrowserRouter>
        <Switch>
            <Route path = "/" exact component={Home}/>
            <Route path = "/contact" exact component={Contact} /> 
            {/* <Route path = "/products/:idcat" exact component={fetchByCategory} />  */}
      
        </Switch>
    
      </BrowserRouter>
    
  );
}


export default App;


