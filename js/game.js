function Game(baseElement) {
    var game = this;

    game.baseElement = baseElement;
}

Game.prototype.start = function () {
    var game = this;

    game.drawBoard();
    game.applyRules(game);
};

Game.prototype.drawBoard = function () {
    var game = this;
    game.board = new Board(game.baseElement);
    game.board.draw();

    game.player1 = new Player("#ffffff", game.board, game.baseElement, 1);
    game.player2 = new Player("#000000", game.board, game.baseElement, 2);
    game.player1.initCheckers();
    game.player2.initCheckers();

    for (var i = 0; i < game.player1.checkers.length; i++) {
        game.player1.checkers[i].draw();
        game.player2.checkers[i].draw();
    }
};

Game.prototype.applyRules = function (game) {
    var rules = new Rules(game);
    rules.applyRules();
};






















