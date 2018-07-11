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
        if (target.style.boxShadow !== 'initial') {
            setTimeout(function () {
                target.style.boxShadow = 'initial';
                rules.prevChecker = null;
            }, 100);
        }
    }
};

Rules.prototype.checkerScope = function (checkerEvent, cellEvent) {
    var rules = this;

    var isScope = false;

    var checkerPos = {
        x: checkerEvent.clientX - checkerEvent.layerX,
        y: checkerEvent.clientY - checkerEvent.layerY
    };

    var cellPos = {
        x: cellEvent.clientX - cellEvent.offsetX,
        y: cellEvent.clientY - cellEvent.offsetY
    };

    var isDarkCell = cellEvent.target.classList.contains('dark-cell');
    var isPlayerDirection = rules.playerDirection(checkerPos, cellPos, checkerEvent);

    if (isDarkCell && isPlayerDirection) {
        isScope = true;
    }

    return isScope;
};

Rules.prototype.playerDirection = function (checkerPos, cellPos, checkerEvent) {
    var rules = this;

    var rightDirection = false;
    var directionForBeating = false;

    var directionY = checkerPos.y - cellPos.y;
    var isCheckrInCell = document.elementFromPoint(cellPos.x, cellPos.y).children.length;

    var transitCell;
    if (rules.players[rules.currentPlayer].playerNumber === 1) {
        if (directionY > 0 && directionY <= 50 && !isCheckrInCell) {
            rightDirection = true;
        } else if (directionY > 50 && directionY <= 100 && !isCheckrInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        } else if (directionY < 0 && directionY >= -100 && !isCheckrInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        }

    } else {
        if (directionY < 0 && directionY >= -50 && !isCheckrInCell) {
            rightDirection = true;
        } else if (directionY < -50 && directionY >= -100 && !isCheckrInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        } else if (directionY > 0 && directionY <= 100 && !isCheckrInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        }
    }

    return rightDirection || directionForBeating;
};

Rules.prototype.getTransitionCell = function (checkerPos, cellPos) {
    var rules = this;

    var transitCellX = checkerPos.x - ((checkerPos.x - cellPos.x) / 2);
    var transitCellY = checkerPos.y - ((checkerPos.y - cellPos.y) / 2);
    return document.elementFromPoint(transitCellX, transitCellY);
};

Rules.prototype.beatChecker = function (transitCell) {
    var rules = this;

    var checkerInCell = transitCell.children;
    if (checkerInCell.length) {
        var checkerIndex = checkerInCell[0].dataset.index;
        rules.players[+!rules.currentPlayer].checkers[checkerIndex].alive = false;

        checkerInCell[0].remove();
        return true;
    }
    return false;
};