const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    require: true
  },

  activity: {
    ref: 'Activities',
    type: Schema.Types.ObjectId,
    required: true
  },

  hour: {
    type: Number,
    required: true,
    trim: true
  }
},{
  versionKey: false,
  timestamps: true
})

module.exports = model('Schedule', scheduleSchema);