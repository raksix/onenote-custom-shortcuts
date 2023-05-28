const ks = require('node-key-sender');
const activeProcess = require("windows-active-process");

const keys = require('global-keys');
const keyStream = new keys.KeyStream();





// Kısayolu dinleyen fonksiyon
function listenForShortcut() {
   const programExeName = "onenote.exe";
   var isSpacePressed = false;

   // İstenilen programın penceresi aktif olduğunda kısayolu işleyen kodu çalıştırın

   keyStream.on('data', state => {
      console.log(state)
      const activeWindow = activeProcess.getActiveProcessName();
      var focusedOneNote = activeWindow && activeWindow.toLowerCase().includes(programExeName.toLowerCase())

      if (focusedOneNote && state[0] === 32) {
         if(isSpacePressed === true){
            isSpacePressed = false  
            ks.sendCombination(['alt', '4'])
         } else{
            isSpacePressed = true  
            ks.sendCombination(['alt', '3'])
         }            
      }

      if(focusedOneNote && state[0] === 86){
         ks.sendCombination(['alt', '4'])
      }
   });
                     
}

// Kısayolu dinlemek için fonksiyonu çağırın
listenForShortcut();
