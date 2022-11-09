import ProductContainer from './src/containers/productContainer.js';
import MsgContainer from './src/containers/msgContainer.js';

// import option from './src/databases/configMariaDB.js';
import config from './src/databases/configSQLiteDB.js';

import normalizeMessages from './src/normalizer/normalizeMessages.js';
import { loggerInfo } from './config/log4.js';

const productsApi = new ProductContainer(config, 'products');
const messagesApi = new MsgContainer(config, 'messages');

const Sockets = (io) => {
  io.on('connection', async (socket) => {
    loggerInfo.info(`\nUn cliente con el id: [${socket.id}] se ha conectado.\n`);
    try {
      // carga inicial de productos
      socket.emit('view-products', await productsApi.readProducts());

      // actualizacion de productos
      socket.on('update-product', async (product) => {
        await productsApi.insertProduct(product);
        io.sockets.emit('view-products', await productsApi.readProducts());
      });
    } catch (error) {
      productsApi.error = error;
      socket.emit('view-products', productsApi);
    }

    try {
      // carga inicial de mensajes
      socket.emit('view-messages', normalizeMessages(await messagesApi.readMsgs()));
      
      // actualizacion de mensajes
      socket.on('new-message', async (msg) => {
        msg.fyh = new Date().toLocaleString();
        await messagesApi.insertMsg(msg);
        io.sockets.emit('view-messages', normalizeMessages(await messagesApi.readMsgs()));
      });
    } catch (error) {
      messagesApi.error = error;
      socket.emit('view-messages', messagesApi);
    }

    socket.on('disconnect', (_) => {
      loggerInfo.info(`El cliente con el id: [${socket.id}] se ha desconectado.\n`);
    });
  });
};

export default Sockets;
