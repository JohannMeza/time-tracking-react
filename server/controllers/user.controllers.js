/* eslint-disable no-throw-literal */
const User = require('../models/user.model');

const index = async (req, res)  => {
  try {
    const user = await User.find();
    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Successful request',
      data: user
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const store = async (req, res)  => {
  try {
    const { name } = req.body;
    if (!name) 
    throw{
      status: 404,
      error: true,
      statusText: "Campo 'nombre' esta vacio"
    }

    const validateUserByName = await User.findOne({name});
    if (validateUserByName)
    throw{
      status: 400,
      errot: true,
      statusText: `Ya existe un usuario con el nombre ${name}`
    }

    const user = new User({name});
    await user.save();

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Se guardo el registro con éxito',
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const show = async (req, res)  => {
  try {
    const { id } = req.params;
    if (!id)
      throw{
        status: 404,
        error: true,
        statusText: 'Parametro requerido no encontrado'
      }

    const user = await User.findById({ _id: id });
    if (!user)
      throw{
        status: 404,
        error: true,
        statusText: 'Usuario no encontrado'
      }

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Successful request',
      data: user
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const update = async (req, res)  => {
  try {
    const { id } = req.params;
    
    if (!id)
      throw{
        status: 404,
        error: true,
        statusText: 'Parametro requerido no encontrado'
      }
      
    const { name } = req.body;
    if (!name) 
      throw{
        status: 404,
        error: true,
        statusText: "Campo 'nombre' esta vacio"
      }
      
    const user = await User.findByIdAndUpdate({ _id: id }, { name }, { new: true });
    if (!user)
      throw{
        status: 404,
        error: true,
        statusText: "Usuario no encontrado para actualizar"
      }

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Registro actualizado',
      data: user
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const deleted = async (req, res)  => {
  try {
    const { id } = req.params
    if (!id)
      throw{
        status: 404,
        error: true,
        statusText: 'Parametro requerido no encontrado'
      }

    const user = await User.findByIdAndDelete({ _id: id }, { new: true });
    if (!user)
      throw{
        status: 404,
        error: true,
        statusText: 'Usuario no encontrado'
      }
    
    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Registro eliminado',
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  deleted,
}