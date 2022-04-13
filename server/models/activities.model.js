const { Schema, model } = require('mongoose');

const activitieSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
}) 

module.exports = model('Activities', activitieSchema);