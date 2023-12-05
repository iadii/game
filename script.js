document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("game-board");
    let snake = [{ x: 100, y: 100 }];
    let direction = "right";
    let food = { x: 200, y: 200 };

    function updateGame() {
        moveSnake();
        checkCollision();
        checkFood();
        renderGame();
    }

    function moveSnake() {
        const head = { ...snake[0] };
        switch (direction) {
            case "up":
                head.y -= 20;
                break;
            case "down":
                head.y += 20;
                break;
            case "left":
                head.x -= 20;
                break;
            case "right":
                head.x += 20;
                break;
        }
        snake.unshift(head);
        snake.pop();
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= gameBoard.clientWidth || head.y < 0 || head.y >= gameBoard.clientHeight) {
            resetGame();
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }

    function checkFood() {
        const head = snake[0];
        if (head.x === food.x && head.y === food.y) {
            growSnake();
            generateFood();
        }
    }

    function growSnake() {
        const tail = { ...snake[snake.length - 1] };
        snake.push(tail);
    }

    function generateFood() {
        const maxX = (gameBoard.clientWidth / 20) - 1;
        const maxY = (gameBoard.clientHeight / 20) - 1;
        food = {
            x: Math.floor(Math.random() * maxX) * 20,
            y: Math.floor(Math.random() * maxY) * 20
        };
    }

    function renderGame() {
        gameBoard.innerHTML = "";
        snake.forEach(segment => {
            const snakeSegment = document.createElement("div");
            snakeSegment.classList.add("snake");
            snakeSegment.style.left = `${segment.x}px`;
            snakeSegment.style.top = `${segment.y}px`;
            gameBoard.appendChild(snakeSegment);
        });

        const foodElement = document.createElement("div");
        foodElement.classList.add("food");
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
        gameBoard.appendChild(foodElement);
    }

    function resetGame() {
        snake = [{ x: 100, y: 100 }];
        direction = "right";
        generateFood();
    }

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    });

    setInterval(updateGame, 200);
});