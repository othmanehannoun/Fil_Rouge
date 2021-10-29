 ///LOGIN CONDUCTEUR ///



 function login() {

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value

  let  admin = {
    email: email,
    password: password, 
  }

  
   console.log(admin);
   axios.post('http://localhost:7000/Admin/AdminLogin', admin)
    .then(res => {
       let getData= res.data;
       const {msg} = getData

       if(msg !== 'successfully'){
         document.getElementById('error').innerHTML = 
         `
          <div class="alert alert-danger" role="alert">
              ${msg}
          </div>

         `
       }
       else{
          localStorage.setItem('admin',JSON.stringify(getData.admin));
          localStorage.setItem('token', getData.accesstoken);
          window.location.replace('Dashboard.html')
        }
       
     })

    .catch(err => {
        console.log(err);
    });
 }

 // --------------get Epicier Invalid from db---------------- 

 let data = [];
    let limit = 3;
    let page = 1;
    let first = 0

function fetchData() {
  document.getElementById('row').innerHTML = "";
  axios.get(`http://localhost:7000/Epicier/EpicierInvalid?limit=${limit}&page=${page}`)

  
.then(function (response) {

  let getAllData = response.data.Allepicier
  data = getAllData;

  let getData = response.data.epicier
  
    // console.log(response.data.conducteur)
 
    getData.forEach(element => {

      document.getElementById('row').innerHTML += `
      <div class="col-md-4">
            <div class="card user-card">
                <div class="card-header">
                    <h5>Profile</h5>
                </div>
                <div class="card-block">
                    <div class="user-image">
                    <img src="../images/user1.png" class="img-radius" alt="User-Profile-Image">
                    </div>
                    <h6 class="f-w-600 m-t-25 m-b-10">${element.Username}</h6>
                    <p class="text-muted"><span class="textA">No Active</span> | Date de creation ${element.createdAt}</p>
                    <hr>
                     <div class="user-info">
                     <p class="m-t-15 text-muted"><span class="span_info">magazin name: </span>${element.Magazine_Name}</p>
                     <p class="m-t-15 text-muted"><span class="span_info">email: </span>${element.email}</p>
                     <p class="m-t-15 text-muted"><span class="span_info">phone number: </span>${element.phone}</p>
                     <p class="m-t-15 text-muted"><span class="span_info">address: </span>${element.address}</p>
                     </div>
                    <hr>
                    <div class="buttons">
                    <button class="btn btn-outline-primary px-4" onclick="IsValid('${element._id}')"><i class="fa fa-check"></i></button> 
                    <button class="btn btn-primary px-4 ms-3" onclick="DeleteEp('${element._id}')"><i class="fa fa-user-times"></i></button>
                    </div>
                </div>
            </div>
        </div>
     `     
    });
  
   
}).catch(function (err) {
    console.log(err);
});

}

fetchData()

  function nextPage (){

    if( first+limit <= data.length ){
      first += limit
      page += 1
      console.log(page);
      fetchData()
    }
  
  }

function previousPage () {
  if(page > 1) {
    first -= limit
  page -= 1
  console.log(page);
  fetchData()
 
  }
}


 // --------------Validate Account ---------------- 

function IsValid(id) {

  axios.patch('http://localhost:7000/Epicier/validate/'+id)
   .then(res => {
    Swal.fire(
      'Account Valide!',
      'You clicked the button!',
      'success'
    )
    // window.location.replace('Dashboard.html')
    })

   .catch(err => {
       console.log(err);
   });
}


 // --------------Count total Epicier Invalid / Valid --------------- 

function CountEpicier() {

  axios.get('http://localhost:7000/Epicier/CountEpicier/')
   .then(res => {
     let EpicierValid = res.data.valid
     let EpicierInValid = res.data.Invalid

     document.getElementById('valid').innerHTML = EpicierValid;
     document.getElementById('invalid').innerHTML = EpicierInValid

    })

   .catch(err => {
       console.log(err);
   });
}

CountEpicier()


 // -------------- Delete Epicier ---------------- 
 function DeleteEp(id) {

  axios.delete('http://localhost:7000/Epicier/deleteEpicier/'+id)
   .then(res => {
    Swal.fire(
      'Account Deleted!',
      'You clicked the button!',
      'success'
    )
    // window.location.replace('Dashboard.html')
    })

   .catch(err => {
       console.log(err);
   });
}
