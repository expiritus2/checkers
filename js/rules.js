function Rules(game) {
    var rules = this;
    rules.game = game;
    rules.players = [rules.game.player1, rules.game.player2];
    rules.currentPlayer = 0;
    rules.prevChecker = null;
}

Rules.prototype.setRules = function () {
    var rules = this;
    rules.bindEvents();
};

Rules.prototype.bindEvents = function () {
    var rules = this;
    var baseElement = rules.game.baseElement;

    baseElement.addEventListener('click', function (event) {
        rules.selectChecker(event.target);
        rules.moveChecker(event.target);
    });
};

Rules.prototype.selectChecker = function (target) {
    var rules = this;

    var player = target.dataset.player - 1;
    if (player === rules.currentPlayer) {
        rules.downChacker(rules.prevChecker);

        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = '-5px 5px 13px rgba(0, 0, 0, .5)';

        rules.prevChecker = target;
    }
};

Rules.prototype.moveChecker = function (target) {
    var rules = this;

    if (target.classList.contains('dark-cell')) {
        if(rules.prevChecker){
            target.appendChild(rules.prevChecker);
            rules.downChacker(rules.prevChecker);
            rules.currentPlayer = +!rules.currentPlayer;
            rules.prevChecker = null;
        }
    }
};

Rules.prototype.downChacker = function (target) {
    var rules = this;

    if (target) {
        target.style.boxShadow = 'initial';
        target.style.transform = 'initial';
    }
};