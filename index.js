const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//UI Elements
const score = document.getElementById('score');
const debugSpeedValue = document.getElementById('debug-speed-value');
const debugEnemiesValue = document.getElementById('debug-enemies-values');
const debugEnemiesSpeedValue = document.getElementById('debug-enemies-speed-values');
const showControlsButton = document.getElementById('show-controls-button');
const pigImage = document.getElementById('pig-image')
const knifeImage = document.getElementById('knife-image')
const cacaImage = document.getElementById('caca-image')
const lightningImage = document.getElementById('lightning-image')
const spiralImage = document.getElementById('spiral-image')
const fireImage = document.getElementById('fire-image')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = new Player(canvas.width/2, canvas.height/2, 30, playerSpeed, "transparent")

if(DEBUG_MODE === false){
    document.getElementById("debug-values-container").style.display = 'none'
}

showGameControls()

update()
setInterval(spawnEnemies, 1000)
setInterval(spawnPowerUps, 4000)
