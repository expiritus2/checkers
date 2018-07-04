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
            game.setRules(game);
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

    game.player1 = new Player("#ffffff", board, game.canvas);
    game.player2 = new Player("#000000", board, game.canvas);
    game.player1.initCheckers();
    game.player2.initCheckers();

    for (var i = 0; i < game.player1.checkers.length; i++) {
        game.player1.checkers[i].draw();
        game.player2.checkers[i].draw();
    }

    game.currentPlayer = game.player1;
};

Game.prototype.drawGameOverScreen = function () {
    var game = this;
};

Game.prototype.setRules = function (game) {
    var rules = new Rules(game);
    rules.setRules();
};






















