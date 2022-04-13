const app = require('./app');
const startConnection = require('./database');

startConnection();

app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})
