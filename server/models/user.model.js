const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  
  img: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
  }
},{
  versionKey: false,
  timestamps: true
})

module.exports = model('User', userSchema)