const Carnet = require('../models/CarnetModel')
const User = require('../models/UserModel')
const validation = require('../middleware/validation')
const Product = require('../models/ProductModel')
const paypal = require("paypal-rest-sdk");
const { model } = require('mongoose')

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
      "AXwrQzbUSCEVNL70sfrvdflYS8jVlKz0b9_ffq4CjwJ9ddKZAb1M6NyCaSy7nl6Zf-BnF_CTjYfYFh_L",
  client_secret:
      "EFakDf0-ryvexaYSwub2PN6oViGABgEGCRaB7sQ2YIHBVudlWWGEIX_KWqvi1QQj_MToVhvr6vH8d5YE"
  });

const CarnetCtrl = {

    AddCarnet: async(req, res)=>{

        const {CarnetName, InfoEpicier, total, idEpicier, idClient} = req.body

          
          const user = await User.findOne({_id : idClient})
          if(!user) return res.json({msg: "had khona ramakaynsh almardi."})

         const newCarnet = new Carnet({
            CarnetName,
            InfoEpicier,
            total,
            idEpicier,
            idClient
        })


        newCarnet.save()
        .then(data=>{res.send({msg: 'successfully', newCarnet})})
        .catch(err=>{console.log(err)})

    },


    getCarnetById : async (req, res) => {
      try {
        const carnet = await Carnet.findById(req.params.idC);
        res.json(carnet);
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }

    },

    GetCarnetByIdEpicier : async (req, res)=>{

        const id = req.params.idEpicier;

        await Carnet.find({idEpicier:id})
        .then(carnet=>{ res.json({carnet}) })
        .catch(err=>{ console.log(err) })

    },

    GetCarnetByIdClient : async (req, res)=>{

      const id = req.params.idClient;

      await Carnet.find({idClient:id})
      
      .then(carnet=>{ res.json({carnet}) })
      .catch(err=>{ console.log(err) })

  },

    // Payment With Paypal 

    PaymentPaypal : async(req, res)=>{

      const IDCarnet = req.params.IDCarnet

      const carnet = await Carnet.findById({ _id: IDCarnet })
      //console.log(carnet);
  
      if(!carnet) return res.json({msg: 'Carnet Not Fund'})
      const totalPrice = carnet.total


      
      var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
          return_url: `http://10.0.2.2:7000/Carnet/success/${IDCarnet}/${totalPrice}`,
          cancel_url: "http://10.0.2.2:7000/Carnet/cancel"
        },
        transactions: [
          {
              amount: {
                  currency: "USD",
                  total: totalPrice
              },
              description: "This is the payment description."
          }
      ]
    };
    
    
    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
         //console.log(payment);
          res.redirect(payment.links[1].href);
      }
  });

    },

    Success : (req, res) => {
    
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment.transactions[0].amount.total));

            const newProduct = new Product({

             ProductName : "Payment",
             Price : req.params.totalPrice, 
             idCarnet : req.params.IDCarnet,
             Type : "Payment"
              
          })

          newProduct.save()
          console.log(req.params.IDCarnet);
          console.log(req.params.totalPrice);
          res.render("success");
        }
    });
      
      
  }

  

}


module.exports = CarnetCtrl