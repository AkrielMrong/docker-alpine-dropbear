// Basic hello world function
Parse.Cloud.define('hello', req => {
  return 'Hello from Back4Apps Cloud Code!';
});

// Function with parameters
Parse.Cloud.define('greet', req => {
  const { name } = req.params;
  return `Hello ${name || 'Guest'}!`;
});

// Async function example
Parse.Cloud.define('asyncHello', async req => {
  // Simulate some async work
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Hello after 1 second!';
});

// Function with database interaction
Parse.Cloud.define('getUserCount', async req => {
  const query = new Parse.Query('_User');
  const count = await query.count({ useMasterKey: true });
  return `Total users: ${count}`;
});

// Function with error handling
Parse.Cloud.define('divide', req => {
  const { numerator, denominator } = req.params;
  
  if (!denominator || denominator === 0) {
    throw new Parse.Error(
      Parse.Error.INVALID_PARAMETER_ERROR,
      'Cannot divide by zero!'
    );
  }
  
  return numerator / denominator;
});

// Before save trigger example
Parse.Cloud.beforeSave('YourClassName', async req => {
  const object = req.object;
  
  // Example: Ensure a field is always uppercase
  if (object.get('title')) {
    object.set('title', object.get('title').toUpperCase());
  }
});

// After save trigger example
Parse.Cloud.afterSave('YourClassName', async req => {
  const object = req.object;
  
  // Example: Log all saves to a separate class
  const SaveLog = Parse.Object.extend('SaveLog');
  const log = new SaveLog();
  
  log.set('objectId', object.id);
  log.set('className', 'YourClassName');
  log.set('savedAt', new Date());
  
  await log.save(null, { useMasterKey: true });
});
