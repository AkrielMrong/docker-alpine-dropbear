const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const app = express();

const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

// Parse Server configuration
const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || `http://localhost:${port}${mountPath}`,
  liveQuery: {
    classNames: [] // Classes to support for real-time queries
  }
};

// Initialize Parse Server
const api = new ParseServer(config);

// Initialize Parse Dashboard
const dashboard = new ParseDashboard({
  apps: [
    {
      appId: process.env.APP_ID || 'myAppId',
      masterKey: process.env.MASTER_KEY || 'myMasterKey',
      serverURL: process.env.SERVER_URL || `http://localhost:${port}${mountPath}`,
      appName: "Your App Name",
      supportEmail: "your@email.com",
      production: process.env.NODE_ENV === 'production'
    }
  ],
  // Optional: Add user authentication for the dashboard
  users: [
    {
      user: process.env.DASHBOARD_USER || 'admin',
      password: process.env.DASHBOARD_PASSWORD || 'password'
    }
  ],
  useEncryptedPasswords: true
});

// Mount Parse API and Dashboard
app.use(mountPath, api);
app.use('/dashboard', dashboard);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Dashboard available at: http://localhost:${port}/dashboard`);
});
