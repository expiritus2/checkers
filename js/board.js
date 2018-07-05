function Board(baseElement) {
    var board = this;
    board.baseElement = baseElement;

    board.cells = 8;
    board.rows = 8;
    board.cellWidth = 50;
    board.cellHeight = 50;
}

Board.prototype.draw = function () {
    var board = this;
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < board.cells; i++){
        for(var j = 0; j < board.rows; j++){
            var cell = document.createElement('div');
            cell.classList.add('board-cell');
            if((i + j) % 2 === 0){
                cell.classList.add('light-cell');
            } else {
                cell.classList.add('dark-cell');
            }
            fragment.appendChild(cell);
        }
    }
    board.baseElement.appendChild(fragment);
};