function Checker(color, boardCell, index, player) {
    var checker = this;

    checker.alive = true;
    checker.boardCell = boardCell;
    checker.index = index;
    checker.player = player;
    checker.color = color;
    checker.alive = true;
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
        checker.setPosition();
    }
};

Checker.prototype.setPosition = function () {
    var checker = this;

    var rect = checker.checkerItem.getBoundingClientRect();

    checker.x = rect.left + (rect.width / 2);
    checker.y = rect.top + (rect.height / 2);
};