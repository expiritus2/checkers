function Player(color, board, canvas) {
    var player = this;
    player.color = color;
    player.canvas = canvas;
    player.board = board;

    player.countCheckers = 12;
    player.checkers = [];
}

Player.prototype.initCheckers = function () {
    var player = this;

    for (var i = 0; i < player.board.cells; i++) {
        for (var j = 0; j < player.board.rows; j++) {
            if((i + j) % 2 === 0 && (i + j) / 2 <= player.countCheckers){
                if (player.color === '#ffffff') {
                    var checker = new Checker(player.color, (j * player.board.cellWidth), (i * player.board.cellHeight), player.board.cellWidth, player.canvas);
                    player.checkers.push(checker);
                } else {

                }
            }
        }
    }
};