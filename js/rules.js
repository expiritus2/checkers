function Rules(game) {
    var rules = this;
    rules.game = game;
    rules.players = [rules.game.player1, rules.game.player2];
    rules.currentPlayer = 0;
    rules.checkerEvent = null;
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
    rules.targetChecker = event.target;
    var player = rules.targetChecker.dataset.player - 1;
    if (player === rules.currentPlayer) {
        if (rules.checkerEvent) {
            rules.downChecker(rules.checkerEvent.target);
        }

        rules.targetChecker.style.transform = 'scale(1.05)';
        rules.targetChecker.style.boxShadow = '-5px 5px 13px rgba(0, 0, 0, .5)';

        rules.checkerEvent = event;
    }
};

Rules.prototype.moveChecker = function (event) {
    var rules = this;
    var target = event.target;
    if (rules.checkerEvent && rules.checkerScope(rules.checkerEvent, event)) {
        target.appendChild(rules.checkerEvent.target);
        rules.downChecker(rules.checkerEvent.target);

        rules.currentPlayer = +!rules.currentPlayer;
        rules.checkerEvent = null;
    }
};

Rules.prototype.downChecker = function (target) {
    var rules = this;

    if (target) {
        target.style.transform = 'scale(1.05)';
        if (target.style.boxShadow !== 'initial') {
            setTimeout(function () {
                target.style.boxShadow = 'initial';
                rules.checkerEvent = null;
            }, 100);
        }
    }
};

Rules.prototype.checkerScope = function (checkerEvent, cellEvent) {
    var rules = this;

    rules.checkerPos = {
        x: checkerEvent.clientX - checkerEvent.layerX,
        y: checkerEvent.clientY - checkerEvent.layerY
    };

    rules.cellPos = {
        x: cellEvent.clientX - cellEvent.offsetX,
        y: cellEvent.clientY - cellEvent.offsetY
    };

    var isDarkCell = cellEvent.target.classList.contains('dark-cell');
    var isPlayerDirection = rules.playerDirection(rules.checkerPos, rules.cellPos, checkerEvent);

    return isDarkCell && isPlayerDirection;
};

Rules.prototype.playerDirection = function (checkerPos, cellPos, checkerEvent) {
    var rules = this;

    var exploreResults = rules.exploreNextCells(checkerPos, cellPos, checkerEvent);

    return exploreResults.rightDirection || exploreResults.directionForBeating;
};

Rules.prototype.exploreNextCells = function(checkerPos, cellPos, checkerEvent){
    var rules = this;

    var rightDirection = false;
    var directionForBeating = false;
    var transitCell;

    var directionY = checkerPos.y - cellPos.y;
    var isCheckerInCell = document.elementFromPoint(cellPos.x, cellPos.y).children.length;
    if (rules.players[rules.currentPlayer].playerNumber === 1) {
        if (directionY > 0 && directionY <= 50 && !isCheckerInCell) {
            rightDirection = true;
        } else if (directionY > 50 && directionY <= 100 && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        } else if (directionY < 0 && directionY >= -100 && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        }

    } else {
        if (directionY < 0 && directionY >= -50 && !isCheckerInCell) {
            rightDirection = true;
        } else if (directionY < -50 && directionY >= -100 && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        } else if (directionY > 0 && directionY <= 100 && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell);
        }
    }

    return {
        rightDirection: rightDirection,
        directionForBeating: directionForBeating
    }
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