/* eslint-disable no-throw-literal */
const Schedule = require("../models/schedule.model");
const Activities = require("../models/activities.model");
const User = require("../models/user.model");

const index = async (req, res) => {
  try {
    const activity = req.params;
    if (!activity)
      throw {
        status: 400,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    // await Schedule.find()
    res.send("index");
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

const store = async (req, res) => {
  try {
    const { name, activity, hour, user } = req.body;
    if (!name || !activity || !hour || !user)
      throw {
        status: 404,
        error: true,
        statusText: "Campos obligatorios no encontrados",
      };

    const validateActivityById = await Activities.findById(activity);
    if (!validateActivityById)
      throw {
        status: 404,
        error: true,
        statusText: `La actividad con el id ${activity} no existe`,
      };
    
    const validateUserById = await User.findById(user);
    if (!validateUserById)
      throw {
        status: 404,
        error: true,
        statusText: `El usuario con el id ${user} no existe`,
      };

    const schedule = new Schedule(req.body);
    await schedule.save();

    res.status(201).json({
      status: 201,
      error: false,
      statusText: "Se registro un nuevo usuario",
    });
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw {
        status: 404,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    const schedule = await Schedule.findById({ _id: id });
    if (!schedule)
      throw {
        status: 404,
        error: true,
        statusText: "Registro no encontrado",
      };

    res.status(201).json({
      status: 201,
      error: true,
      statusText: "successful request",
      data: schedule,
    });
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw {
        status: 404,
        error: true,
        statusText: 'Parametro requerido no encontrado'
      }

    const { name, hour, user, activity } = req.body;
    if (!name || !hour || !user || !activity)
      throw {
        status: 404,
        error: true,
        statusText: 'Campos obligatorios estan vacio'
      }

    const validateActivityById = await Activities.findById(activity);
    if (!validateActivityById)
      throw {
        status: 404,
        error: true,
        statusText: `La actividad con el id ${activity} no existe`,
      };
      
    const validateUserById = await User.findById(user);
    if (!validateUserById)
      throw {
        status: 404,
        error: true,
        statusText: `El usuario con el id ${user} no existe`,
      };

    const schedule = await Schedule.findByIdAndUpdate({ _id: id }, req.body , { new: true });
    if (!schedule)
    throw{
      status: 404,
      error: true,
      statusText: 'Actividad no encontrada para actualizar'
    }

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Se actualizó el registro',
      data: schedule
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      throw {
        status: 404,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    const schedule = await Schedule.findByIdAndDelete(id, { new: true });
    if (!schedule)
      throw {
        status: 404,
        error: true,
        statusText: "Registro no encontrado",
      };

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Registro eliminado'
    })
    
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  deleted,
};
