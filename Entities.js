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
    
    update(){
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

    update(player){
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
    constructor(x, y, size, color, duration = 3000, value = 0.1){
        super(x, y, size, color)
        this.duration = duration
        this.enemiesSpeed = value
    }

    power(){
        let lastEnemiesSpeed = enemiesSpeed
        enemiesSpeed = this.enemiesSpeed
        enemies.forEach(enemy => enemy.speed = this.enemiesSpeed)
        speedEnemiesPowerUpActive = true
        setTimeout(() => {
            speedEnemiesPowerUpActive = false
            enemies.forEach(enemy => enemy.speed = lastEnemiesSpeed)
        }, this.duration)
    }
}

class IncreaseShuttingSpeed extends PowerUp{
    constructor(x, y, size, color, duration = 5000){
        super(x, y, size, color)
        this.duration = duration
    }

    power(){
        increaseShottingSpeed = true
        setTimeout(() => increaseShottingSpeed = false, this.duration)
    }
}

class IncreasePlayerSpeed extends PowerUp{
    constructor(x, y, size, color, duration = 5000, value = 10){
        super(x, y, size, color)
        this.duration = duration
        this.value = value
    }

    power(){
        let lastPlayerSpeed = playerSpeed
        player.speed = this.value
        playerSpeed = this.value
        setTimeout(() => {
            player.speed = lastPlayerSpeed
            playerSpeed = lastPlayerSpeed
        }, this.duration)
    }
}