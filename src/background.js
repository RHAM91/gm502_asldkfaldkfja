'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import { autoUpdater } from 'electron-updater'
import fs from 'fs'
import axios from 'axios'
import os from 'os'
import macaddress from 'macaddress'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let actualizacion

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


function buscarActualizacion(){
    //console.log('buscando....')
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-downloaded', () => {

      setTimeout(()=>{ // ESPERA 10 SEGUNDOS PARA ENVIAR EL MENSAJE DE QUE DEBE SER ACTUALIZADA LA APP
        win.webContents.send('actualizacion', true)
      }, 10000)

      clearInterval(actualizacion) // al momento de descargar la actualizacion detiene el ciclo de busqueda

     
      // const dialogOpts = {
      //   type: 'info',
      //   buttons: ['Actualizar', 'Después'],
      //   title: 'Actualización disponible',
      //   message: `NUEVA VERSION DISPONIBLE`,
      //   detail: 'Una nueva versión ha sido descargada. Presiona "Actualizar" para aplicar los cambios.'
      // }

      // dialog.showMessageBox(dialogOpts).then(({ response }) => {
      //   if (response === 0) autoUpdater.quitAndInstall()
      // })
    })
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1240,
    height: 850,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    //autoUpdater.checkForUpdatesAndNotify()
    //autoUpdater.checkForUpdates()
    //buscarActualizacion()
  }

  actualizacion = setInterval(buscarActualizacion, 10 * 60 * 1000) // para cambiar el tiempo del intervalo em minutos, modificar solo el primer 60

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()
})


// --> EVENTO PARA BUSCAR Y MOSTRAR ACTUALIZACION

ipcMain.on('app_version', (event)=>{
  event.sender.send('app_version', {version: app.getVersion()}) // ENVIA LA VERSION DEL SOFWARE
  buscarActualizacion() // BUSCAR ACTUALIZACION
})

// --> EVENTO PARA BUSCAR Y MOSTRAR DATOS DE EQUIPO

let mmac = ''

macaddress.one(function (err, mac) {
  mmac = mac
});


ipcMain.on('app_info', (event)=>{

  let info = {
    nombre: os.hostname(),
    empresa: 'Guatemusica',
    programa: 'Academia alumnos',
    version: app.getVersion(),
    ip: mmac
  }

  event.sender.send('app_info', info) // ENVIA LA VERSION DEL SOFWARE
})


// --> EVENTO QUE APLICA ACTUALIZACION

ipcMain.on('ok_update', (event) =>{ 
  autoUpdater.quitAndInstall()
})

// --> EVENTO PARA EJECUTAR ORDEN Y VER PDF

ipcMain.on('vale_salida', (event, args)=>{
  shell.openExternal(args)
})


ipcMain.on('foto', (event,args)=>{

    let photoData = args


    function savePhoto(filePath){
      if(filePath){
        fs.writeFile(filePath, photoData, 'base64', (err)=>{
            if (err) {
                console.log(`Hubo un problema al guardar la foto ${err.message}`)
            }
            photoData = null
        })
    }
    }


  dialog.showSaveDialog({
    title: "Guardar foto",
    defaultPath: 'myfacebomb.png',
    buttonLabel: 'Guardar foto'
  }).then((result)=>{

    if (!result.canceled) {
      let ruta = result.filePath
      savePhoto(ruta)

      const dialogOpts = {
        type: 'info',
        buttons: ['Aceptar'],
        title: 'Información',
        message: `Foto guardada con éxito`
      }

      dialog.showMessageBox(dialogOpts).then(({ response }) => {
        if (response === 0) console.log('nada')
      })
    }


  }).catch((err)=>{
    console.log(err)
  })


})


let offline_detect = async () =>{
  try {
    let info = await axios.get('https://google.com/favicon.ico')

    if (info.status == 200) {
      //console.log(info.status)
      win.webContents.send('onLine', true)
    }
  } catch (e) {
    if (e.code == 'ENOTFOUND') {
      //console.log(e.code)
      win.webContents.send('onLine', false)
    }
  }

}

setInterval(() => {
  offline_detect()
}, 5000);





// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}