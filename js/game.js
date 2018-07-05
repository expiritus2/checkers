var INITIAL = 1;
var GAME_OVER = 2;

function Game(baseElement) {
    var game = this;

    game.baseElement = baseElement;

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
    game.board = new Board(game.baseElement);
    game.board.draw();

    game.player1 = new Player("#ffffff", game.board, game.baseElement);
    game.player2 = new Player("#000000", game.board, game.baseElement);
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






















