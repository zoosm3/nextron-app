import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const express = require('express')
const expressApp = express()
const PORT = 9001

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  expressApp.listen(PORT, () => {
    console.log(`Expresss Server running ar http://localhost:${PORT}`)
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

})();

expressApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

expressApp.get('/api/hello-world', (req, res) => {
  res.json({ message: 'Hello World!' })
})

expressApp.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'A' }, { id: 2, name:'B' }, { id: 3, name: 'C' }]
  res.json(users)
});

app.on('window-all-closed', () => {
  app.quit();
});
