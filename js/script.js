window.onload = function () {
    var canvas = document.getElementById('checkers_game');

    var checkers = new Game(canvas);
    checkers.start();
};