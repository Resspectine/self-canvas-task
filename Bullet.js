class Bullet {
    constructor(x, y, width, height) {
        this.x = x + width / 2 - 3;
        this.y = y - 30;
        this.width = 6;
        this.height = 30;
        this.color = '#0000ff';
    }

    draw(context) {
        if (this.y + this.height < 0) {
            this.releaseInterval();
        }
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    fly() {
        this.interval = setInterval(() => {
            this.y -= 2;
        }, 10)
    }

    releaseInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    findDistance(first, second, firstCenter, secondCenter, deviation, greater) {
        let distance = (first / 2 + second / 2 + deviation);
        let currentDistance = Math.abs(firstCenter - secondCenter);
        return greater ? currentDistance > distance : currentDistance < distance;
    }

    checkCollision(first, second) {
        let firstCenterX = first.x + first.width / 2;
        let firstCenterY = first.y + first.height / 2;
        let secondCenterX = second.x + second.width / 2;
        let secondCenterY = second.y + second.height / 2;
        let collideX = this.findDistance(first.width, second.width, firstCenterX, secondCenterX, 0, false);
        let collideY = this.findDistance(first.height, second.height, firstCenterY, secondCenterY, 0, false);
        return collideX && collideY;
    }

    collide(intruder) {
        return this.checkCollision(this, intruder);
    }

}