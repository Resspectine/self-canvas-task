class Defender {
    constructor(windowWidth, windowHeight, width = 80, height = 35) {
        this.x = (windowWidth - width) / 2;
        this.y = windowHeight - 2 * height;
        this.width = width;
        this.height = height;
        this.color = '#0000ff'
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    fire() {
        let bullet = new Bullet(this.x, this.y, this.width, this.height);
        bullet.fly();
        return bullet;
    }

}