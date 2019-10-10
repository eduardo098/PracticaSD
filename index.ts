import Server from './classes/server';
import router from './routes/route';
import bodyParser = require ('body-parser');
import cors from 'cors';

const server = Server.instance;

server.app.use( bodyParser.urlencoded({
    extended: true
}));

server.app.use(bodyParser.json());
server.app.use (cors({origin: true, credentials: true}));
//Rutas de servicio
server.app.use('/', router);

server.start(() => {
    console.log('Servidor corriendo en el puerto ' + server.port);
});