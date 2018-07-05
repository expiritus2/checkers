function Player(color, board, baseElement) {
    var player = this;

    player.color = color;
    player.baseElement = baseElement;
    player.board = board;
    player.checkers = [];
}

Player.prototype.initCheckers = function () {
    var player = this;
    var baseElement = player.baseElement;
    var color = player.color;
    var cells = [].slice.apply(baseElement.children);
    var darkSells = cells.filter(function (cell) {
        return cell.classList.contains('dark-cell');
    });


    for (var i = 0; i < darkSells.length; i++) {
        if (color === '#ffffff' && i < 12) {
            player.checkers.push(new Checker(color, darkSells[i]));
        } else if (color === '#000000' && i > 19) {
            player.checkers.push(new Checker(color, darkSells[i]));
        }
    }
};