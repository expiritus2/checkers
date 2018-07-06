function Checker(color, boardCell, index, player) {
    var checker = this;

    checker.alive = true;
    checker.boardCell = boardCell;
    checker.index = index;
    checker.player = player;
    checker.color = color;
}

Checker.prototype.draw = function () {
    var checker = this;
    if(checker.alive){
        checker.checkerItem = document.createElement('div');
        checker.checkerItem.classList.add('checker');
        checker.checkerItem.style.backgroundColor = checker.color;
        checker.checkerItem.dataset.index = checker.index;
        checker.checkerItem.dataset.player = checker.player;
        checker.boardCell.appendChild(checker.checkerItem);
    }
};