// src/server.js
require('dotenv').config(); // Load environment variables first

const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    console.log(`[ENV] Starting server in ${ENV} mode...`);

    // 1. Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // 2. Optional: Sync models (ONLY for development - remove/comment in production!)
    if (ENV === 'development') {
      // Use { force: true } only when you want to drop & recreate tables (dangerous!)
      // Use { alter: true } to update schema without dropping data
      await sequelize.sync({ alter: true });
      console.log('📊 Models synchronized (development mode)');
    }

    // 3. Start Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`   Environment: ${ENV}`);
      console.log(`   Date: ${new Date().toLocaleString()}`);
      console.log('---------------------------------------------------');
    });

    // 4. Graceful shutdown handling
    process.on('SIGTERM', () => shutdown(server, 'SIGTERM'));
    process.on('SIGINT', () => shutdown(server, 'SIGINT'));

  } catch (error) {
    console.error('❌ Server startup failed:');
    console.error(error);
    process.exit(1);
  }
}

function shutdown(server, signal) {
  console.log(`\n[${signal}] Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    sequelize.close()
      .then(() => {
        console.log('Database connection closed.');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing database connection:', err);
        process.exit(1);
      });
  });
}

// Start the server
startServer();