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
    var ctx = checker.ctx;

    checker.canvas.style.cursor = 'pointer';
    ctx.beginPath();
    ctx.strokeStyle = '#C6885F';
    ctx.fillStyle = checker.color;
    ctx.shadowColor = 'rgba(0, 0, 0, .5)';
    ctx.shadowOffsetX = -3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.arc((checker.x + checker.radius + checker.smaller), (checker.y + checker.radius + checker.smaller), checker.radius, radian, 360 * radian, false);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.arc((checker.x + checker.radius + checker.smaller), (checker.y + checker.radius + checker.smaller), checker.radius / 1.3, radian, 360 * radian, false);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((checker.x + checker.radius + checker.smaller), (checker.y + checker.radius + checker.smaller), checker.radius / 2, radian, 360 * radian, false);
    ctx.lineWidth = 2;
    ctx.stroke();
};

Checker.prototype.move = function (x, y) {
    var checker = this;
    checker.x = x;
    checker.y = y;
};