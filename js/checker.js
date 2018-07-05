function Checker(color, boardCell) {
    var checker = this;

    checker.boardCell = boardCell;

    checker.color = color;
}

Checker.prototype.draw = function () {
    var checker = this;
    var checkerItem = document.createElement('div');
    checkerItem.classList.add('checker');
    checkerItem.style.backgroundColor = checker.color;
    checker.boardCell.appendChild(checkerItem);

};

Checker.prototype.move = function () {
    var checker = this;
};