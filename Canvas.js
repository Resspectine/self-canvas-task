class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.offsetX = null;
        this.offsetY = null;
        this.collidedList = [];
        this.nowDragging = null;
        this.rectangles = [];
        this.draw = this.draw.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
    }

    spawnRectangles(rectangles, offset) {
        let y = offset;
        rectangles.forEach(rectangle => {
            this.rectangles.push(new Rectangle(200, y, rectangle.width, rectangle.height, rectangle.color));
            y += rectangle.height + offset;
        });
    }

    init() {
        const {left: offsetX, top: offsetY} = this.canvas.getBoundingClientRect();
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = window.innerHeight * 0.8;
        this.spawnRectangles(rectanglesList, STICKY_MARGIN);
        this.canvas.onmousedown = this.mouseDown;
        this.canvas.onmouseup = this.mouseUp;
        this.canvas.onmousemove = this.mouseMove;
        requestAnimationFrame(this.draw);
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rectangles.forEach(rectangle => rectangle.draw(this.context));
        requestAnimationFrame(this.draw);
    }

    mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        let mouseX = parseInt(e.clientX - this.offsetX);
        let mouseY = parseInt(e.clientY - this.offsetY);
        this.nowDragging = null;
        this.rectangles.forEach(rectangle => {
            if (rectangle.isMouseOn(mouseX, mouseY)) {
                this.nowDragging = rectangle;
                rectangle.setStartCoordinates();
                this.rectangles.forEach(rect => {
                    rect.resetSticky(rectangle);
                })
            }
        })
    }

    mouseUp(e) {
        if (this.nowDragging) {
            e.preventDefault();
            e.stopPropagation();
            if (this.nowDragging.isCollided()) {
                this.nowDragging.moveToStart();
            }
            this.nowDragging.releaseCollide();
            this.collidedList.forEach(rect => {
                rect.releaseCollide();
            });
            this.nowDragging = null;
        }
    }

    mouseMove(e) {
        if (this.nowDragging) {
            e.preventDefault();
            e.stopPropagation();
            let mouseX = parseInt(e.clientX - this.offsetX);
            let mouseY = parseInt(e.clientY - this.offsetY);
            this.nowDragging.move(mouseX, mouseY);
            this.collidedList = [];
            this.rectangles.forEach(rectangle => {
                let collided;
                rectangle.releaseCollide();
                if (this.nowDragging !== rectangle) {
                    collided = this.nowDragging.isCollidedWith(rectangle);
                    this.nowDragging.doStickyWith(rectangle);
                }
                if (collided) {
                    this.collidedList.push(rectangle);
                }
            });
            if (this.collidedList.length > 0) {
                this.nowDragging.collide();
                this.collidedList.forEach(rect => {
                    rect.collide();
                });
            }
        }
    }
}