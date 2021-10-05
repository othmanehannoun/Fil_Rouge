const { string } = require('joi');
const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
 
    total : {
        type : Number,
        require: true
    },

    idCarnet : {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    Type :{
        type: String,
        require : true
    },

},{
    timestamps: true
});


module.exports = mongoose.model('Product', ProduitSchema);