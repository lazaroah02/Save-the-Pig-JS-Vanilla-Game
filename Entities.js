class Entity{
    x; y; size; speed; color

    constructor(x, y, size, speed, color) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = speed
        this.color = color
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    update(){
        this.draw()
    }
}

class Player extends Entity{
    constructor(x, y, size, speed, color){
        super(x, y, size, speed, color)
    }

    checkBoardCollision(){
        if(this.x + this.size > canvas.width){
            this.x = canvas.width - this.size
            this.draw()
        }
        if(this.x < 0){
            this.x = 0
            this.draw()
        }
        if(this.y < 0){
            this.y = 0
            this.draw()
        }
        if(this.y + this.size > canvas.height){
            this.y = canvas.height - this.size
            this.draw()
        }
    }

    draw(){
        super.draw()
        ctx.drawImage(pigImage, this.x-15, this.y-20, this.size+35, this.size+35)
    }
    
    update(){
        this.speed = playerSpeed
        this.draw()
        this.checkBoardCollision()
    }

    checkCollision(Entity){
        if(
            this.x < Entity.x + Entity.size &&
            this.x + this.size > Entity.x &&
            this.y < Entity.y + Entity.size &&
            this.y + this.size > Entity.y
        ){
            return true
        }
        return false   
    }
}

class Enemy extends Entity{
    constructor(x, y, size, speed, color){
        super(x, y, size, speed, color)
    }

    move(player){
        if(this.x !== player.x){
            (this.x < player.x)? this.x += this.speed: this.x -= this.speed
        }
        if(this.y !== player.y){
            (this.y < player.y)? this.y += this.speed: this.y -= this.speed
        }
    }

    draw(){
        super.draw()
        ctx.drawImage(knifeImage, this.x-5, this.y-15, this.size+20, this.size+20)
    }

    update(player){
        this.speed = enemiesSpeed
        this.move(player)
        this.draw()
    }
}

class Bullet extends Entity{
    xTo; yTo
    constructor(x, y, size, speed, color, xTo, yTo){
        super(x, y, size, speed, color)
        this.xTo = xTo
        this.yTo = yTo

        // Calculate the direction of movement (Vector Physics (Algorithm explained in 'Algorithm move bullet from A to B.txt'))
        // difference between the coordinates
        const dx = xTo - x;
        const dy = yTo - y; 
        // Euclidean Distance (distance between two points in the plane)
        const distance = Math.sqrt(dx * dx + dy * dy);
        // displacement * speed
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;

    }

    draw(){
        super.draw()
        ctx.drawImage(cacaImage, this.x, this.y, this.size, this.size)
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }

    checkOutOfTheBoard(){
        if(this.x + this.size > canvas.width) return true
        
        if(this.x < 0) return true
        
        if(this.y < 0) return true
        
        if(this.y + this.size > canvas.height) return true
    }

    checkCollisionWithEnemy(Entity){
        if(
            this.x < Entity.x + Entity.size &&
            this.x + this.size > Entity.x &&
            this.y < Entity.y + Entity.size &&
            this.y + this.size > Entity.y
        ){
            return true
        }   
    }

    update(){
        this.move()
        this.draw()
    }
}

class PowerUp extends Entity{
    constructor(x, y, size, color){
        super(x, y, size, 0, color)
    }

    power(){}

    checkCollisionWithPlayer(player){
        if(
            this.x < player.x + player.size &&
            this.x + this.size > player.x &&
            this.y < player.y + player.size &&
            this.y + this.size > player.y
        ){
            return true
        }
        return false   
    }
}

class DecreaseEnemiesSpeed extends PowerUp{
    constructor(x, y, size, color, duration = 3000, enemiesSpeedValue = 0.1){
        super(x, y, size, color)
        this.duration = duration
        this.enemiesSpeedValue = value
    }

    draw(){
        super.draw()
        ctx.drawImage(spiralImage, this.x, this.y, this.size, this.size)
    }

    power(){
        let lastEnemiesSpeed = enemiesSpeed
        enemiesSpeed = this.enemiesSpeedValue
        speedEnemiesPowerUpActive = true
        setTimeout(() => {
            speedEnemiesPowerUpActive = false
            enemiesSpeed = lastEnemiesSpeed
        }, this.duration)
    }
}

class IncreaseShuttingSpeed extends PowerUp{
    constructor(x, y, size, color, duration = 5000){
        super(x, y, size, color)
        this.duration = duration
    }

    draw(){
        super.draw()
        ctx.drawImage(fireImage, this.x-5, this.y-5, this.size+10, this.size+10)
    }

    power(){
        increaseShottingSpeed = true
        setTimeout(() => increaseShottingSpeed = false, this.duration)
    }
}

class IncreasePlayerSpeed extends PowerUp{
    constructor(x, y, size, color, duration = 5000, playerSpeedValue = 10){
        super(x, y, size, color)
        this.duration = duration
        this.playerSpeedValue = playerSpeedValue
    }

    draw(){
        super.draw()
        ctx.drawImage(lightningImage, this.x-15, this.y-15, this.size+30, this.size+30)
    }

    power(){
        let lastPlayerSpeed = playerSpeed
        playerSpeed = this.playerSpeedValue
        increasePlayerSpeedPowerUpActive = true
        setTimeout(() => {
            increasePlayerSpeedPowerUpActive = false
            playerSpeed = lastPlayerSpeed
        }, this.duration)
    }
}