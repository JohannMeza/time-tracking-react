const { connect } = require('mongoose');

const startConnection = async () => {
  try {
    const db = await connect('mongodb://localhost/time-tracking-react')
    console.log(`successful connection database`);
  } catch (error) {
    console.log(`connection error ${error}`)
  }
}


module.exports = startConnection;