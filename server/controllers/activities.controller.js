/* eslint-disable no-throw-literal */
const Activities = require("../models/activities.model");

const index = async (req, res) => {
  try {
    const activities = await Activities.find();
    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'successful request',
      data: activities
    });
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};

const store = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      throw {
        status: 400,
        error: true,
        statusText: "Datos incompletos",
      };
    else if (name.length > 15)
      throw {
        status: 400,
        error: true,
        statusText: "El nombre excede al limite de caracteres 15",
      };

    const validateDuplicityOfActivities = await Activities.findOne({ name });

    if (validateDuplicityOfActivities)
      throw {
        status: 400,
        error: true,
        statusText: "Hay una actividad con el mismo nombre",
      };

    const activities = new Activities({ name });
    await activities.save();

    res.status(201).json({
      status: 201,
      error: false,
      statusText: "Registro guardado con éxito",
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
        status: 400,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    const activity = await Activities.findById({ _id: id });

    if (!activity)
      throw {
        status: 400,
        error: true,
        statusText: "No se encontró la actividad",
      };

    res.status(201).json({
      status: 201,
      error: false,
      statusText: "successful request",
      data: activity,
    });
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id)
      throw {
        status: 400,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    if (!name)
      throw {
        status: 400,
        error: true,
        statusText: "Campo 'name' esta vacio",
      };
      
    const activity = await Activities.findByIdAndUpdate(id, { name }, { new: true });

    if (!activity)
      throw {
        status: 401,
        error: true,
        statusText: `El registro con el id '${id}' no fue encontrado para actualizar`,
      };
    
      res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Se actualizo con éxito',
      data: activity
    })
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw {
        status: 400,
        error: true,
        statusText: "Parametro requerido no encontrado",
      };

    const activity = await Activities.findByIdAndDelete(id, { new: true });

    if (!activity)
      throw {
        status: 401,
        error: true,
        statusText: `El registro con el id '${id}' no fue encontrado para eliminar`,
      };

    res.status(201).json({
      status: 201,
      error: false,
      statusText: 'Se eliminó con éxito',
      data: activity
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
};
