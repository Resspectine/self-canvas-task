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

    const bullets = [];
    const intruders = [];
    const intrudersLength = intrudersProperties.columns * intrudersProperties.lines;
    const defender = new Defender(canvasWidth, canvasHeight, defenderProperties.width, defenderProperties.height);

    let nowDragging = false;
    let distanceBetween = (canvasWidth - 200) / intrudersProperties.columns - intrudersProperties.width;
    let x = 100;
    let y = 50;

    for (let i = 0, j = 0; i < intrudersLength; i++, j++) {
        if (j >= intrudersProperties.columns) {
            y += intrudersProperties.height + intrudersProperties.verticalDistance;
            x = 100;
            j = 0;
        }
        intruders.push(new Intruder(x, y, intrudersProperties.width, intrudersProperties.height));
        x += intrudersProperties.width + distanceBetween;
    }

    canvas.focus();

    // canvas.onkeypress = keyDown;


    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;

    draw();

    // function keyDown(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (e.code === 'KeyD') {
    //         defender.moveRight();
    //     }
    //     if (e.code === 'KeyA') {
    //         defender.moveLeft();
    //     }
    // }

    setInterval(()=> {
        bullets.push(defender.fire(context));
    }, 2-00);

    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        nowDragging = true;
    }

    function mouseUp(e) {
        if (nowDragging) {
            e.preventDefault();
            e.stopPropagation();

            nowDragging = false;

            draw();
        }
    }

    function mouseMove(e) {
        if (nowDragging) {
            e.preventDefault();
            e.stopPropagation();

            let mouseX = parseInt(e.clientX - offsetX);
            let mouseY = parseInt(e.clientY - offsetY);

            defender.move(mouseX, mouseY);
        }
    }

    setInterval(() => {
        draw()
    }, 1);

    function clear() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function draw() {
        clear();

        if (bullets.length > 0) {
            for (let i = 0; i < intruders.length; i++) {
                for (let j = 0; j < bullets.length; j++) {
                    if (bullets[j].collide(intruders[i])) {
                        bullets[j].releaseInterval();
                        bullets.splice(j, 1);
                        intruders.splice(i, 1);
                    }
                }
            }
        }

        bullets.forEach(bullet => {
            bullet.draw(context);
        });

        intruders.forEach(intruder => {
            intruder.draw(context);
        });

        defender.draw(context);
    }

};