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
        rules.selectChecker(event);
        rules.moveChecker(event);
    });
};

Rules.prototype.selectChecker = function (event) {
    var rules = this;
    var target = event.target;
    var player = target.dataset.player - 1;
    if (player === rules.currentPlayer) {
        if (rules.prevChecker) {
            rules.downChecker(rules.prevChecker.target);
        }

        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = '-5px 5px 13px rgba(0, 0, 0, .5)';

        rules.prevChecker = event;
    }
};

Rules.prototype.moveChecker = function (event) {
    var rules = this;
    var target = event.target;
    if (rules.prevChecker && rules.checkerScope(rules.prevChecker, event)) {
        target.appendChild(rules.prevChecker.target);
        rules.downChecker(rules.prevChecker.target);
        rules.currentPlayer = +!rules.currentPlayer;
        rules.prevChecker = null;
    }
};

Rules.prototype.downChecker = function (target) {
    var rules = this;

    if (target) {
        target.style.transform = 'scale(1.05)';
        setTimeout(function () {
            target.style.boxShadow = 'initial';
        }, 100)
    }
};

Rules.prototype.checkerScope = function (checker, cell) {
    var rules = this;

    var isScope = false;

    var checkerPos = {
        x: checker.clientX - checker.layerX,
        y: checker.clientY - checker.layerY
    };

    var cellPos = {
        x: cell.clientX - cell.offsetX,
        y: cell.clientY - cell.offsetY
    };

    var isDarkCell = cell.target.classList.contains('dark-cell');
    var nextScopeCellY = checkerPos.y - cellPos.y;
    var isNextScopeCell = rules.playerDirection(nextScopeCellY);

    if (isDarkCell && isNextScopeCell) {
        isScope = true;
    }

    return isScope;
};

Rules.prototype.playerDirection = function (nextScopeCell) {
    var rules = this;

    return rules.players[rules.currentPlayer].playerNumber === 1
        ? nextScopeCell > 0
        : nextScopeCell < 0;
};