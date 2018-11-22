window.onload = function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const BB = canvas.getBoundingClientRect();

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const offsetX = BB.left;
    const offsetY = BB.top;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let collidedList = [];
    let nowDragging = null;
    let rectangles = [];
    let y = N;

    for (let i = 0; i < rectanglesList.length; i++) {
        rectangles.push(new Rectangle(200, y, rectanglesList[i].width, rectanglesList[i].height, rectanglesList[i].color));
        y += rectanglesList[i].height + N;
    }

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;

    draw();

    function clear() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function draw() {
        clear();

        for (let i = 0; i < rectangles.length; i++) {
            rectangles[i].draw(context);
        }
    }

    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        let mouseX = parseInt(e.clientX - offsetX);
        let mouseY = parseInt(e.clientY - offsetY);

        nowDragging = null;

        for (let i = 0; i < rectangles.length; i++) {
            let rectangle = rectangles[i];
            if (rectangle.isMouseOn(mouseX, mouseY)) {
                nowDragging = rectangle;
                rectangle.setStartCoordinates();
                rectangles.forEach(rect => {
                    rect.resetSticky(rectangle);
                })
            }
        }
    }

    function mouseUp(e) {
        if (nowDragging) {
            e.preventDefault();
            e.stopPropagation();

            if (nowDragging.isCollided()) {
                nowDragging.moveToStart();
            }

            nowDragging.releaseCollide();

            collidedList.forEach(rect => {
                rect.releaseCollide();
            });

            nowDragging = null;

            draw();
        }
    }

    function mouseMove(e) {
        if (nowDragging) {
            e.preventDefault();
            e.stopPropagation();

            let mouseX = parseInt(e.clientX - offsetX);
            let mouseY = parseInt(e.clientY - offsetY);

            let collided;

            nowDragging.move(mouseX, mouseY);

            collidedList = [];

            for (let i = 0; i < rectangles.length; i++) {
                let rectangle = rectangles[i];
                rectangle.releaseCollide();
                if (nowDragging !== rectangle) {
                    collided = nowDragging.isCollided(rectangle);
                    nowDragging.isSticky(rectangle);
                }
                if (collided) {
                    collidedList.push(rectangle);
                }
            }

            if (collidedList.length > 0) {
                nowDragging.collide();
                collidedList.forEach(rect => {
                    rect.collide();
                });
            }

            draw();
        }
    }

};