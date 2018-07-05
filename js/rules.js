function Rules(game) {
    var rules = this;
    rules.game = game;
}

Rules.prototype.setRules = function () {
    var rules = this;
    rules.bindEvents();
};

Rules.prototype.bindEvents = function () {
    var rules = this;
    var baseElement = rules.game.baseElement;
    baseElement.addEventListener('click', function (event) {
        console.log(event);

    })
};