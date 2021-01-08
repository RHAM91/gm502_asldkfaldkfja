const io = require('socket.io-client');
const { IP, PUERTO } = require('./parametros');


const t = JSON.parse(localStorage.getItem('kat'));
const token = t != null ? t.t2 : 'nada';

const socket = io.connect(`http://${IP}:${PUERTO}/?token=${token}`, {'forceNew':true });

const enviar = (modulo) =>{ // PASO 3: recibe los datos de la ruta que vienen de vuex, y las emite por news a el sevidor 
   socket.emit('news', {modulo})
}


module.exports = {socket, enviar}
