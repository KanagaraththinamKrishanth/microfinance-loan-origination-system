const app = require('./app');
const env = require('./config/env');
const { query } = require('./config/db');

const startServer = async () => {
  try {
    await query('SELECT 1');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
