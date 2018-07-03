function Checker(color, x, y, boardCellWidth, canvas) {
    var checker = this;

    checker.canvas = canvas;
    checker.ctx = checker.canvas.getContext('2d');

    checker.color = color;

    checker.smaller = 3;
    checker.radius = (boardCellWidth / 2) - checker.smaller;
    checker.x = x;
    checker.y = y;
}

Checker.prototype.draw = function () {
    var checker = this;
    var radian = Math.PI / 180;

    checker.ctx.beginPath();
    checker.ctx.strokeStyle = '#000000';
    checker.ctx.fillStyle = checker.color;
    checker.ctx.arc((checker.x + checker.radius + checker.smaller), (checker.y + checker.radius + checker.smaller), checker.radius, radian, 360 * radian, false);
    checker.ctx.lineWidth = 1;
    checker.ctx.stroke();
    checker.ctx.fill();
};