function Rules(game) {
    var rules = this;
    rules.game = game;
    rules.players = [rules.game.player1, rules.game.player2];
    rules.currentPlayer = 0;
    rules.selectEvent = null;
}

Rules.prototype.applyRules = function () {
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
        if (rules.selectEvent) {
            rules.downChecker(rules.selectEvent.target);
        }

        rules.targetChecker.style.transform = 'scale(1.05)';
        rules.targetChecker.style.boxShadow = '-5px 5px 13px rgba(0, 0, 0, .5)';

        rules.selectEvent = event;
    }
};

Rules.prototype.moveChecker = function (event) {
    var rules = this;

    rules.stepEvent = event;
    rules.checkerScope(rules.selectEvent, rules.stepEvent, function (isDarkCell, isPlayerDirection) {

        if (rules.selectEvent && isPlayerDirection && isDarkCell) {
            rules.stepEvent.target.appendChild(rules.selectEvent.target);

            rules.setNewCheckerPos();

            rules.downChecker(rules.selectEvent.target);

            rules.currentPlayer = +!rules.currentPlayer;
            rules.selectEvent = null;

            rules.caseSteps(function (data) {
                // console.log(data);
            })
        }
    });
};


Rules.prototype.setNewCheckerPos = function () {
    var rules = this;

    var checkerPlayer = rules.selectEvent.target.dataset.player;
    var checkerIndex = rules.selectEvent.target.dataset.index;

    var newPos = {
        x: rules.stepEvent.clientX - rules.stepEvent.offsetX,
        y: rules.stepEvent.clientY - rules.stepEvent.offsetY
    };

    rules.players[rules.currentPlayer].checkers[checkerIndex].x = newPos.x;
    rules.players[rules.currentPlayer].checkers[checkerIndex].y = newPos.y;
};

Rules.prototype.downChecker = function (target) {
    var rules = this;

    if (target) {
        target.style.transform = 'scale(1.05)';
        if (target.style.boxShadow !== 'initial') {
            setTimeout(function () {
                target.style.boxShadow = 'initial';
                rules.selectEvent = null;
            }, 100);
        }
    }
};

Rules.prototype.checkerScope = function (selectEvent, cellEvent, callback) {
    var rules = this;

    if (selectEvent && cellEvent) {
        rules.mustBeatCheckerPos = {
            x: selectEvent.clientX - selectEvent.layerX,
            y: selectEvent.clientY - selectEvent.layerY
        };

        rules.cellPos = {
            x: cellEvent.clientX - cellEvent.offsetX,
            y: cellEvent.clientY - cellEvent.offsetY
        };

        var isDarkCell = cellEvent.target.classList.contains('dark-cell');
        var isPlayerDirection = rules.playerDirection(rules.mustBeatCheckerPos, rules.cellPos, selectEvent);

        callback(isDarkCell, isPlayerDirection);
    }
};


Rules.prototype.caseSteps = function (callback) {
    var rules = this;

    var playerCheckers = rules.players[+!!rules.currentPlayer].checkers;

    // var exploredCheckerPos = {
    //     x: playerCheckers[0].x,
    //     y: playerCheckers[0].y
    // };
    //
    // rules.isNextBeat(exploredCheckerPos, function (data) {
    //     callback && callback(data);
    // })

    playerCheckers.forEach(function (checker) {
        var exploredCheckerPos = {
            x: checker.x,
            y: checker.y
        };

        rules.isNextBeat(exploredCheckerPos, function (data) {
            callback && callback(data);
        })
    });
};

Rules.prototype.playerDirection = function (checkerPos, cellPos, selectEvent) {
    var rules = this;

    var exploreResults = rules.exploreNextCells(checkerPos, cellPos, selectEvent);

    return exploreResults.rightDirection || exploreResults.directionForBeating;
};

Rules.prototype.exploreNextCells = function (checkerPos, cellPos, selectEvent) {
    var rules = this;

    var rightDirection = false;
    var directionForBeating = false;
    var transitCell;

    var cellWidth = rules.game.board.cellWidth;
    var cellHeight = rules.game.board.cellHeight;

    var directionX = checkerPos.x - cellPos.x;
    var directionY = checkerPos.y - cellPos.y;

    var isCheckerInCell = document.elementFromPoint(cellPos.x, cellPos.y).children.length;
    if (rules.players[rules.currentPlayer].playerNumber === 1) {
        if (directionY > -5 && directionY <= (cellHeight + 5) && !isCheckerInCell && Math.abs(directionX) <= (cellWidth + 5)) {
            rightDirection = true;
        } else if (directionY > cellHeight - 5 && directionY <= ((cellHeight * 2) + 5) && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell, checkerPos);
        } else if (directionY < -5 && directionY >= -((cellHeight * 2) + 5) && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell, checkerPos);
        }

    } else {
        if (directionY < 5 && directionY >= -(cellHeight + 5) && !isCheckerInCell && Math.abs(directionX) <= (cellWidth + 5)) {
            rightDirection = true;
        } else if (directionY < -55 && directionY >= -((cellHeight * 2) + 5) && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell, checkerPos);
        } else if (directionY > -5 && directionY <= ((cellHeight * 2) + 5) && !isCheckerInCell) {
            transitCell = rules.getTransitionCell(checkerPos, cellPos);
            directionForBeating = rules.beatChecker(transitCell, checkerPos);
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

Rules.prototype.beatChecker = function (transitCell, checkerPos) {
    var rules = this;

    var checkerInCell = transitCell.children;

    if (checkerInCell.length) {
        var checkerIndex = checkerInCell[0].dataset.index;
        var playerChecker = checkerInCell[0].dataset.player;

        if (+playerChecker === rules.players[+!rules.currentPlayer].playerNumber) {
            rules.players[+!rules.currentPlayer].checkers[checkerIndex].alive = false;
            checkerInCell[0].remove();
            rules.isNextBeat(rules.stepEvent, function (data) {
                if (data.isNext) {
                    rules.currentPlayer = +!rules.currentPlayer;
                }
            });
            return true;
        }
    }
    return false;
};

Rules.prototype.isNextBeat = function (stepEvent, callback) {
    var rules = this;

    var mustBeatCheckerPos = {};
    if (stepEvent.clientX && stepEvent.offsetX && stepEvent.clientY && stepEvent.offsetY) {
        mustBeatCheckerPos = {
            x: stepEvent.clientX - stepEvent.offsetX,
            y: stepEvent.clientY - stepEvent.offsetY
        };

    } else {
        mustBeatCheckerPos = {
            x: stepEvent.x,
            y: stepEvent.y
        };
    }


    var cellWidth = rules.game.board.cellWidth;
    var cellHeight = rules.game.board.cellHeight;

    var scopedCheckers = [
        document.elementFromPoint(mustBeatCheckerPos.x - cellWidth, mustBeatCheckerPos.y - cellHeight),
        document.elementFromPoint(mustBeatCheckerPos.x + cellWidth, mustBeatCheckerPos.y - cellHeight),
        document.elementFromPoint(mustBeatCheckerPos.x + cellWidth, mustBeatCheckerPos.y + cellHeight),
        document.elementFromPoint(mustBeatCheckerPos.x - cellWidth, mustBeatCheckerPos.y + cellHeight)
    ];

    var scopedCells = [
        document.elementFromPoint(mustBeatCheckerPos.x - (cellWidth * 2), mustBeatCheckerPos.y - (cellHeight * 2)),
        document.elementFromPoint(mustBeatCheckerPos.x + (cellWidth * 2), mustBeatCheckerPos.y - (cellHeight * 2)),
        document.elementFromPoint(mustBeatCheckerPos.x + (cellWidth * 2), mustBeatCheckerPos.y + (cellHeight * 2)),
        document.elementFromPoint(mustBeatCheckerPos.x - (cellWidth * 2), mustBeatCheckerPos.y + (cellHeight * 2))
    ];


    setTimeout(function () {
        var isNext = false;

        for (var i = 0; i < scopedCheckers.length; i++) {
            var isBody = scopedCheckers[i] && scopedCheckers[i].tagName.toLowerCase() === "body";
            var isBoardCell = scopedCheckers[i] && scopedCheckers[i].classList.contains('board-cell');
            var isGame = scopedCheckers[i] && scopedCheckers[i].id === "checkers_game";

            if (scopedCheckers[i] && !isBody && !isGame) {
                console.log(scopedCheckers[i]);
            }
        }
        callback && callback({
            isNext: isNext,
            mustBeatCheckerPos: mustBeatCheckerPos
        });
    }, 100);

    // setTimeout(function () {
    //     var isNext = false;
    //     for (var i = 0; i < scopedCheckers.length; i++) {
    //         var isBody = scopedCheckers[i] && scopedCheckers[i].tagName.toLowerCase() === "body";
    //         var isBoard = scopedCheckers[i] && scopedCheckers[i].id === "checkers_game";
    //         var isChecker = scopedCheckers[i] && scopedCheckers[i].classList.contains("checker");
    //         if (scopedCheckers[i] && !isBody && !isBoard && isChecker) {
    //             if (scopedCells[i] && !isBody && !scopedCells[i].children.length) {
    //                 isNext = true;
    //             } else {
    //                 isNext = false;
    //             }
    //         }
    //     }
    //     callback && callback({
    //         isNext: isNext,
    //         mustBeatCheckerPos: mustBeatCheckerPos
    //     });
    // }, 100);
};