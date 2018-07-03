function Board(canvas) {
    var board = this;
    board.canvas = canvas;
    board.ctx = this.canvas.getContext('2d');

    board.darkColor = "#671A19";
    board.ligthColor = "#E9C394";

    board.cells = 8;
    board.rows = 8;
    board.cellWidth = 50;
    board.cellHeight = 50;
}

Board.prototype.draw = function () {
    var board = this;

    for(var i = 0; i < board.cells; i++){
        for(var j = 0; j < board.rows; j++){
            if((i + j) % 2 === 0){
                board.ctx.fillStyle = board.ligthColor;
            } else {
                board.ctx.fillStyle = board.darkColor;
            }
            board.ctx.fillRect((j * board.cellWidth), (i * board.cellHeight), 50, 50);
        }
    }

};