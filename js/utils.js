window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.getRandom = function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

window.getRandomColor = function () {
    var red = getRandom(0, 257);
    var green = getRandom(0, 257);
    var blue = getRandom(0, 257);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
};