import knex from 'knex';
import { loggerInfo, loggerError } from '../../config/log4.js';

const setColumns = (table) => {
  table.increments('id');
  table.string('title');
  table.float('price');
  table.string('thumbnail');
  return table;
};

const createTable = async (option, tableName) => {
  const db = knex(option);
  try {
    await db.schema.createTable(tableName, (table) => setColumns(table));
    loggerInfo.info(`Tabla "${tableName}" creada correctamente.`);
  } catch (error) {
    loggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default createTable;
