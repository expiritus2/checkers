function Checker(color, x, y, boardCellWidth, canvas) {
    var checker = this;

    checker.canvas = canvas;
    checker.ctx = checker.canvas.getContext('2d');

    checker.color = color;

    checker.radius = boardCellWidth / 2;
    checker.x = x;
    checker.y = y;
}

Checker.prototype.draw = function () {
    var checker = this;
    var radian = Math.PI / 180;

    checker.ctx.beginPath();
    checker.ctx.strokeLine = checker.color;
    checker.ctx.lineWidth = 5;
    checker.ctx.arc(checker.x, checker.y, checker.radius, radian, 360 * radian, false);
    checker.ctx.stroke();
};