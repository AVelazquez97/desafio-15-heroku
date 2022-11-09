import knex from 'knex';
import createTable from '../utils/createTableMsgs.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';
import { loggerError } from '../../config/log4.js';

class MsgContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#existTable();
  }

  #existTable = async () => {
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        await createTable(this.config, this.tableName);
      }
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  insertMsg = async (msgData) => {
    try {
      const { email, firstName, lastName, age, nickName, avatar } =
        msgData.author;
      const msg = msgData.msg;
      const fyh = msgData.fyh;

      const data = {
        email,
        firstName,
        lastName,
        age,
        nickName,
        avatar,
        msg,
        fyh,
      };
      await insertNewElement(this.config, this.tableName, data);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await readAllElements(this.config, this.tableName);
      if (!messages.length) {
        throw 'No se encontraron mensajes en la base de datos.';
      }
      return messages;
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };
}

export default MsgContainer;
