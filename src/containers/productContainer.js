import knex from 'knex';
import createTable from '../utils/createTableProducts.js';
import insertNewElement from '../utils/insertElement.js';
import readAllElements from '../utils/readElements.js';
import { loggerError } from '../../config/log4.js';

class ProductContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#existTable();
  }

  #existTable = async () => {
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        createTable(this.config, this.tableName);
      }
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  insertProduct = async (productData) => {
    try {
      insertNewElement(this.config, this.tableName, productData);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  readProducts = async () => {
    try {
      const products = await readAllElements(this.config, this.tableName);
      if (!products.length) {
        throw 'No se encontraron productos en la base de datos.';
      }
      return products;
    } catch (error) {
      loggerError.error(error);
      throw error;    
    }
  };
}
export default ProductContainer;
