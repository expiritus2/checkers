var INITIAL = 1;
var GAME_OVER = 2;

function Game(canvas) {
    var game = this;

    game.canvas = canvas;
    game.ctx = game.canvas.getContext("2d");

    game.currentState = INITIAL;
}

Game.prototype.start = function () {
    var game = this;

    window.requestAnimationFrame(function () {
        game.run();
    });


};

Game.prototype.run = function () {
    var game = this;

    switch (game.currentState) {
        case INITIAL:
            game.drawInitialScreen();
            break;
        case GAME_OVER:
            game.drawGameOverScreen();
            break;
    }
};

Game.prototype.drawInitialScreen = function () {
    var game = this;
    var board = new Board(game.canvas);
    board.draw();

    var player1 = new Player("#ffffff", board, game.canvas);
    player1.initCheckers();
    console.log(player1.checkers);

    for(var i = 0; i < player1.checkers.length; i++){
        player1.checkers[i].draw();
    }


    var player2 = new Player("#000000", board, game.canvas);
};

Game.prototype.drawGameOverScreen = function () {
    var game = this;
};






















