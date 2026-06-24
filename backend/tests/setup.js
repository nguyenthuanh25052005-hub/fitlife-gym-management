const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function initializeTestDatabase() {
  const databasePath = path.join(__dirname, '../src/database/test.sqlite');
  process.env.DB_PATH = databasePath;

  if (fs.existsSync(databasePath)) {
    fs.unlinkSync(databasePath);
  }

  const backendDir = path.join(__dirname, '..');

  execFileSync(process.execPath, ['src/database/init.js'], {
    cwd: backendDir,
    stdio: 'ignore'
  });

  execFileSync(process.execPath, ['src/database/seed.js'], {
    cwd: backendDir,
    stdio: 'ignore'
  });
}

module.exports = {
  initializeTestDatabase
};
