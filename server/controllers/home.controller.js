const Activities = require('../models/activities.model');

const index = async (req, res) => {
  try {
    const activities = await Activities.find();
    res.status(201).json({
      status: 201,
      error: true,
      statusText: 'successful request',
      data: activities
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const store = (req, res) => {
  res.send('store')
};

const show = (req, res) => {
  res.send('show');
};

const update = (req, res) => {
  res.send('update')
};

const deleted = (req, res) => {
  res.send('delete')
};

module.exports = {
  index,
  store, 
  show,
  update,
  deleted
}