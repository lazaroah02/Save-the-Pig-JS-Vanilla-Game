function clearBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function gameOver(){
    alert("Game Over | Score: " + score.textContent)
    //reset all the variables
    player.x = canvas.width/2
    player.y = canvas.height/2
    playerSpeed = 2
    player.speed = playerSpeed
    maxLevelReached = false
    keys = {}
    enemies = []
    bullets = []
    powerUps = []
    score.innerText = 0
    maxEnemies = 5
    enemiesSpeed = 1
    increasePlayerSpeedPowerUpActive = false
    increaseShottingSpeed = false
    speedEnemiesPowerUpActive = false
    increaseDificultyIntervalInMaxLevel !== null? clearInterval(increaseDificultyIntervalInMaxLevel): null
}

function spawnEnemies() {
    /*
     * Spawns a new enemy on the canvas if the number of enemies is less than the maximum allowed.
     * The enemy is spawned at a random position around the player, ensuring it does not collide 
        with the player immediately upon spawning.
    */
    // Check if the current number of enemies is less than the maximum allowed
    if (enemies.length < maxEnemies) {
        // Define a safe distance from the player to avoid immediate collision
        const safeZonePlayerDistance = player.size * 5;

        // Generate a random angle in radians
        const angle = Math.random() * 2 * Math.PI;

        // Calculate a random distance from the player, ensuring it is within the canvas boundaries
        const distance = safeZonePlayerDistance + Math.random() * (Math.min(canvas.width, canvas.height) / 2);

        // Calculate the x and y coordinates for the new enemy based on the angle and distance
        const x = player.x + distance * Math.cos(angle);
        const y = player.y + distance * Math.sin(angle);

        // Create a new enemy at the calculated coordinates
        let newEnemy = new Enemy(x, y, 30, enemiesSpeed, "transparent");

        // Check that the new enemy does not collide with the player immediately
        if (player.checkCollision(newEnemy) === false) {
            // Add the new enemy to the enemies array
            enemies.push(newEnemy);
        }
    }
}

function spawnPowerUps(){
    const x = Math.random()*canvas.width
    const y = Math.random()*canvas.height
    let powerups = [
        null, null,
        new DecreaseEnemiesSpeed(x, y, 10, "blue"),
        null, null,
        new IncreaseShuttingSpeed(x, y, 10, "purple"),
        null, null,
        new IncreasePlayerSpeed(x, y, 10, "yellow"),
        null, null
    ]
    let selectedPowerUp = powerups[Math.floor(Math.random() * powerups.length)]
    selectedPowerUp !== null? powerUps.push(selectedPowerUp):null
}

function update(){
    clearBoard()
    movePlayer();

    //update entities
    player.update()
    enemies.forEach(enemy => enemy.update(player))
    bullets.forEach(bullet => bullet.update())
    powerUps.forEach(power => power.update())

    //check collisions
    //enemies - player
    enemies.forEach(enemy => {
        player.checkCollision(enemy)? gameOver(): null
    })
    //enemies - bullets
    enemies = enemies.filter(enemy => { //delete the enemies collided with the player
        let collidedBullets = bullets.filter(bullet => bullet.checkCollisionWithEnemy(enemy))
        //delete the collided bullet from the bullets array
        bullets = bullets.filter(bullet => !collidedBullets.includes(bullet))
        //update the scrore
        score.innerText = parseInt(score.innerText) + collidedBullets.length
        return collidedBullets.length === 0
    })
    //bullets - board
    bullets = bullets.filter(bullet => !bullet.checkOutOfTheBoard())
    //powerups - player
    powerUps = powerUps.filter(powerUp => { //delete the power ups collided with the player
        if(powerUp.checkCollisionWithPlayer(player)){
            powerUp.power()
            return false
        }
        return true
    })

    increaseDificulty()

    if(DEBUG_MODE){
        showDebugInfo()
    }

    window.requestAnimationFrame(() =>update())
}

function movePlayer() {
    //diagonal movement
    if(keys[" "]){
        pauseGame()
        keys[" "] = false
    }
    if (keys["w"] && keys["d"]) {
        player.y -= player.speed / Math.sqrt(2); //divide to mantain the same speed
        player.x += player.speed / Math.sqrt(2);
    } else if (keys["w"] && keys["a"]) {
        player.y -= player.speed / Math.sqrt(2);
        player.x -= player.speed / Math.sqrt(2);
    } else if (keys["s"] && keys["d"]) {
        player.y += player.speed / Math.sqrt(2);
        player.x += player.speed / Math.sqrt(2);
    } else if (keys["s"] && keys["a"]) {
        player.y += player.speed / Math.sqrt(2);
        player.x -= player.speed / Math.sqrt(2);
    }
    //one direction movement 
    else {
        if (keys["w"]) player.y -= player.speed;
        if (keys["s"]) player.y += player.speed;
        if (keys["d"]) player.x += player.speed;
        if (keys["a"]) player.x -= player.speed;
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createBullet(xTo, yTo){
    bullets.push(new Bullet(player.x + player.size/2, player.y + player.size/2, 30, 5, "transparent", xTo, yTo));
}

function showDebugInfo(){
    debugSpeedValue.innerText = playerSpeed
    debugEnemiesValue.innerText = maxEnemies
    debugEnemiesSpeedValue.innerText = enemiesSpeed
}

function increaseDificulty(){
    let actualScore = parseInt(score.textContent)
    if(actualScore < 10){
        null
    }
    else if(actualScore > 10 && actualScore < 20){
        !speedEnemiesPowerUpActive?enemiesSpeed = 1.2:null
        maxEnemies = 6
        increasePlayerSpeedPowerUpActive? playerSpeed = 5: null
    }
    else if(actualScore > 20 && actualScore < 30){
        !speedEnemiesPowerUpActive?enemiesSpeed = 1.3:null
        maxEnemies = 7
        increasePlayerSpeedPowerUpActive? playerSpeed = 8: null
    }
    else if(actualScore > 30 && actualScore < 40){
        !speedEnemiesPowerUpActive?enemiesSpeed = 1.5:null
        maxEnemies = 8
        increasePlayerSpeedPowerUpActive? playerSpeed = 12: null
    }else{
        if(maxLevelReached === false){
            increaseDificultyIntervalInMaxLevel = setInterval(() => {
                !speedEnemiesPowerUpActive?enemiesSpeed += 0.1:null
                maxEnemies += 1
                increasePlayerSpeedPowerUpActive? playerSpeed += 1: null
            }, 10000)
            maxLevelReached = true
        }
    }
}

function pauseGame(){
    alert("Juego Pausado")
}

function showGameControls(){
    alert(
        `***** CONTROLS *****
    • Pause Game: 'Space'
    • Move up: 'W'
    • Move Left: 'A'
    • Move Down: 'D'
    • Move Right: 'D'
    • Shot: 'Click'`
    )
}