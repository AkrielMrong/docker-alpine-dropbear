// Add to index.js if you want a dashboard
const ParseDashboard = require('parse-dashboard');
const dashboard = new ParseDashboard({
  apps: [
    {
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      serverURL: process.env.SERVER_URL,
      appName: "YourAppName"
    }
  ]
});
app.use('/dashboard', dashboard);
