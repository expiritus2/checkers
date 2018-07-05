window.onload = function () {
    var baseElement = document.getElementById('checkers_game');

    var checkers = new Game(baseElement);
    checkers.start();
};