const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || `http://localhost:${port}${mountPath}`,
  liveQuery: {
    classNames: [] // List of classes to support for real-time queries
  }
};

// Initialize Parse Server
const api = new ParseServer(config);
app.use(mountPath, api);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
