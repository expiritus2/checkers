var INITIAL = 1;
var GAME_OVER = 2;

function Checkers(canvas) {
    var checkers = this;

    checkers.canvas = canvas;
    checkers.ctx = checkers.canvas.getContext("2d");

    checkers.currentState = INITIAL;
}

Checkers.prototype.start = function () {
    var checkers = this;

    window.requestAnimationFrame(function () {
        checkers.run();
    });


};

Checkers.prototype.run = function () {
    var checkers = this;

    switch (checkers.currentState) {
        case INITIAL:
            checkers.drawInitialScreen();
            break;
        case GAME_OVER:
            checkers.drawGameOverScreen();
            break;
    }
};

Checkers.prototype.drawInitialScreen = function () {
    var checkers = this;
    var board = new Board(checkers.canvas);
    board.draw();
};

Checkers.prototype.drawGameOverScreen = function () {
    var checkers = this;
};






















