window.onload = function () {
    // const canvas = document.getElementById("canvas");
    // const context = canvas.getContext("2d");
    // const {left: offsetX, top: offsetY} = canvas.getBoundingClientRect();
    //
    // canvas.width = window.innerWidth * 0.8;
    // canvas.height = window.innerHeight * 0.8;
    //
    // const canvasWidth = canvas.width;
    // const canvasHeight = canvas.height;
    //
    // let collidedList = [];
    // let nowDragging = null;
    // let rectangles = [];
    // let y = STICKY_MARGIN;
    //
    // rectanglesList.forEach(rectangle => {
    //     rectangles.push(new Rectangle(200, y, rectangle.width, rectangle.height, rectangle.color));
    //     y += rectangle.height + STICKY_MARGIN;
    // });
    //
    // canvas.onmousedown = mouseDown;
    // canvas.onmouseup = mouseUp;
    // canvas.onmousemove = mouseMove;
    //
    // function clear() {
    //     context.clearRect(0, 0, canvasWidth, canvasHeight);
    // }
    //
    // function draw() {
    //     clear();
    //
    //     rectangles.forEach(rectangle => rectangle.draw(context));
    //
    //     requestAnimationFrame(draw);
    // }
    //
    // function mouseDown(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     let mouseX = parseInt(e.clientX - offsetX);
    //     let mouseY = parseInt(e.clientY - offsetY);
    //
    //     nowDragging = null;
    //
    //     rectangles.forEach(rectangle => {
    //         if (rectangle.isMouseOn(mouseX, mouseY)) {
    //             nowDragging = rectangle;
    //
    //             rectangle.setStartCoordinates();
    //
    //             rectangles.forEach(rect => {
    //                 rect.resetSticky(rectangle);
    //             })
    //         }
    //     })
    //
    // }
    //
    // function mouseUp(e) {
    //     if (nowDragging) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //
    //         if (nowDragging.isCollided()) {
    //             nowDragging.moveToStart();
    //         }
    //
    //         nowDragging.releaseCollide();
    //
    //         collidedList.forEach(rect => {
    //             rect.releaseCollide();
    //         });
    //
    //         nowDragging = null;
    //     }
    // }
    //
    // function mouseMove(e) {
    //     if (nowDragging) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //
    //         let mouseX = parseInt(e.clientX - offsetX);
    //         let mouseY = parseInt(e.clientY - offsetY);
    //
    //         nowDragging.move(mouseX, mouseY);
    //
    //         collidedList = [];
    //
    //         rectangles.forEach(rectangle => {
    //             let collided;
    //
    //             rectangle.releaseCollide();
    //
    //             if (nowDragging !== rectangle) {
    //                 collided = nowDragging.isCollidedWith(rectangle);
    //
    //                 nowDragging.doStickyWith(rectangle);
    //             }
    //
    //             if (collided) {
    //                 collidedList.push(rectangle);
    //             }
    //         });
    //
    //         if (collidedList.length > 0) {
    //             nowDragging.collide();
    //
    //             collidedList.forEach(rect => {
    //                 rect.collide();
    //             });
    //         }
    //     }
    // }
    //
    // requestAnimationFrame(draw);
    const canvas = new Canvas();
    canvas.init();
};