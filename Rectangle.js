class Rectangle {

    constructor(x, y, width = 150, height = 80, color = "#800080") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.collided = false;
        this.startCoordinates = {x: x, y: y};
        this.stickySide = null;
        this.stickedTo = null;
    }

    isEnoughDistance(first, second, firstCenter, secondCenter, deviation = 0, greater = false) {
        let distance = (first / 2 + second / 2 + deviation);
        let currentDistance = Math.abs(firstCenter - secondCenter);
        return greater ? currentDistance > distance : currentDistance < distance;
    }

    isEnoughDistanceGreater(first, second, firstCenter, secondCenter, deviation) {
        return this.isEnoughDistance(first, second, firstCenter, secondCenter, deviation, true);
    }

    isEnoughDistanceLower(first, second, firstCenter, secondCenter, deviation) {
        return this.isEnoughDistance(first, second, firstCenter, secondCenter, deviation);
    }

    getCenter(rect) {
        return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    }

    checkCollision(first, second) {
        let [firstCenterX, firstCenterY] = this.getCenter(first);
        let [secondCenterX, secondCenterY] = this.getCenter(second);
        let collideX = this.isEnoughDistanceLower(first.width, second.width, firstCenterX, secondCenterX);
        let collideY = this.isEnoughDistanceLower(first.height, second.height, firstCenterY, secondCenterY);
        return collideX && collideY;
    }

    checkSticky(first, second) {
        let [firstCenterX, firstCenterY] = this.getCenter(first);
        let [secondCenterX, secondCenterY] = this.getCenter(second);
        let stickyX = this.isEnoughDistanceLower(first.width, second.width, firstCenterX, secondCenterX, STICKY_MARGIN);
        let stickyY = this.isEnoughDistanceLower(first.height, second.height, firstCenterY, secondCenterY, STICKY_MARGIN);
        if (!stickyX || !stickyY) {
            return null;
        }
        let collideX = this.isEnoughDistanceGreater(first.width, second.width, firstCenterX, secondCenterX);
        let collideY = this.isEnoughDistanceGreater(first.height, second.height, firstCenterY, secondCenterY);
        if ((firstCenterY < secondCenterY) && collideY) {
            return 'top';
        }
        if ((firstCenterX > secondCenterX) && collideX) {
            return 'right';
        }
        if ((firstCenterY > secondCenterY) && collideY) {
            return 'bottom';
        }
        if ((firstCenterX < secondCenterX) && collideX) {
            return 'left';
        }
        return null;
    }

    doStickyWith(rect) {
        const stickySide = this.checkSticky(this, rect);
        if (!this.stickedTo && stickySide) {
            this.stickySide = stickySide;
            this.stickedTo = rect;
        } else if (this.stickedTo === rect && !stickySide) {
            this.stickedTo = null;
            this.stickySide = null;
        }

        this.isStuck();
    }

    isCollided() {
        return this.collided;
    }

    isCollidedWith(rect) {
        if (rect && rect !== this) {
            return this.checkCollision(this, rect);
        }
    }

    isStuck() {
        if (this.stickedTo) {
            switch (this.stickySide) {
                case 'top':
                    this.y = this.stickedTo.y - this.height;
                    break;
                case 'right':
                    this.x = this.stickedTo.x + this.stickedTo.width;
                    break;
                case 'bottom':
                    this.y = this.stickedTo.y + this.stickedTo.height;
                    break;
                case 'left':
                    this.x = this.stickedTo.x - this.width;
                    break;
                default:
                    break;
            }
        }
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.closePath();
        context.fillStyle = this.collided ? '#ff0000' : this.color;
        context.fill();
    }

    collide() {
        this.collided = true;
    }

    releaseCollide() {
        this.collided = false;
    }

    setStartCoordinates() {
        this.startCoordinates.x = this.x;
        this.startCoordinates.y = this.y;
    }

    moveToStart() {
        this.x = this.startCoordinates.x;
        this.y = this.startCoordinates.y;
    }

    move(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    isMouseOn(mouseX, mouseY) {
        return (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
    }

    resetSticky(rect) {
        if (this.stickedTo === rect) {
            this.stickedTo = null;
        }
    }

}