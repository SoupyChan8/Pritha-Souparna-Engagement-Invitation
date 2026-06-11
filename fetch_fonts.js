const https = require('https');
https.get('https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,500,600,400i', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
