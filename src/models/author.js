const mongoose = require("mongoose");
const validator = require("validator")
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 4
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : [true, "email already exist"],
        validate(value){
            if(!validator.isEmail(value)) {
               throw new Error('Invalid email try another one')
            } 
        }

    },

    phone: {
        type : Number,
        required : true,
        minlength : 11,
        unique : true,
        trim : true
    },
    age : {
       type : Number,
       required : true,
       unique : true,
       trim : true
    },
    dateOfBirth : {
        type : Date,
        required : true,
        unique: true
    },
    address : {
        type : String,
        trim : true,
        unique : true
    }
});

const Author = new mongoose.model("Author", authorSchema)

module.exports = Author;