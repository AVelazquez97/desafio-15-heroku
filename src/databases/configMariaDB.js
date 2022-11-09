const option = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'productsDB',
  },
  pool: { min: 0, max: 7 },
};

export default option;
