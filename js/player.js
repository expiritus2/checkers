function Player(color, board, canvas) {
    var player = this;

    player.color = color;
    player.canvas = canvas;
    player.board = board;
    player.checkers = [];
}

Player.prototype.initCheckers = function () {
    var player = this;

    for (var i = 0; i < player.board.cells; i++) {
        for (var j = 0; j < player.board.rows; j++) {
            var color = player.color;
            var x = (j * player.board.cellWidth);
            var y = (i * player.board.cellHeight);
            var cellWidth = player.board.cellWidth;
            var canvas = player.canvas;

            if ((i + j) % 2 !== 0) {
                if (color === '#ffffff' && i < 3) {
                    player.checkers.push(new Checker(color, x, y, cellWidth, canvas));
                } else if (color === '#000000' && i > 4) {
                    player.checkers.push(new Checker(color, x, y, cellWidth, canvas));
                }
            }
        }
    }
};