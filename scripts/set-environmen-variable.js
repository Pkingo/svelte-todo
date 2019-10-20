const fs = require('fs');
fs.writeFileSync('./public/.env', `API_KEY=${process.env.API_KEY}\n`);
