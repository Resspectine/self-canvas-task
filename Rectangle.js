class Rectangle {

    constructor(x, y, width = 150, height = 80, color = "#800080", isDragging = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.collided = isDragging;
        this.startCoordinates = {x: x, y: y};
        this.stickySide = null;
        this.stickedTo = null;
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

    checkSticky(first, second) {
        let firstCenterX = first.x + first.width / 2;
        let firstCenterY = first.y + first.height / 2;
        let secondCenterX = second.x + second.width / 2;
        let secondCenterY = second.y + second.height / 2;
        let stickyX = this.findDistance(first.width, second.width, firstCenterX, secondCenterX, N, false);
        let stickyY = this.findDistance(first.height, second.height, firstCenterY, secondCenterY, N, false);
        let collideX = this.findDistance(first.width, second.width, firstCenterX, secondCenterX, 0, true);
        let collideY = this.findDistance(first.height, second.height, firstCenterY, secondCenterY, 0, true);
        if ((firstCenterY < secondCenterY) && stickyX && stickyY && collideY) {
            return 1;
        }
        if ((firstCenterX > secondCenterX) && stickyX && stickyY && collideX) {
            return 2;
        }
        if ((firstCenterY > secondCenterY) && stickyX && stickyY && collideY) {
            return 3;
        }
        if ((firstCenterX < secondCenterX) && stickyX && stickyY && collideX) {
            return 4;
        }
        return false;
    }

    isSticky(rect) {
        if (!this.stickedTo) {
            switch (this.checkSticky(this, rect)) {
                case 1:
                    this.stickySide = 1;
                    this.stickedTo = rect;
                    break;
                case 2:
                    this.stickySide = 2;
                    this.stickedTo = rect;
                    break;
                case 3:
                    this.stickySide = 3;
                    this.stickedTo = rect;
                    break;
                case 4:
                    this.stickySide = 4;
                    this.stickedTo = rect;
                    break;
                default:
                    break;
            }
        } else {
            if (this.stickedTo === rect) {
                if (!this.checkSticky(this, rect)) {
                    this.stickedTo = null;
                    this.stickySide = null;

                }
            }
        }
    }

    isCollided(rect) {
        if (rect !== this) {
            if (rect) {
                return this.checkCollision(this, rect);
            } else {
                return this.collided;
            }
        }
    }

    draw(context) {
        context.beginPath();
        if (this.stickedTo) {
            switch (this.stickySide) {
                case 1:
                    this.y = this.stickedTo.y - this.height;
                    break;
                case 2:
                    this.x = this.stickedTo.x + this.stickedTo.width;
                    break;
                case 3:
                    this.y = this.stickedTo.y + this.stickedTo.height;
                    break;
                case 4:
                    this.x = this.stickedTo.x - this.width;
                    break;
                default:
                    break;
            }
        }
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