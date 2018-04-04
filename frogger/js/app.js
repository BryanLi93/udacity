var score = 0;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x || getEnemyInitialX();
    this.y = y || getEnemyInitialY();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = getEnemyInitialX();
        this.y = getEnemyInitialY();
    } else {
        this.x += 101 * (score + 1) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x || 202;
    this.y = y || 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    if (direction === 'up' && player.y > 0) {
        player.y -= 85;
    } else if (direction === 'right' && player.x < 404) {
        player.x += 101;
    } else if (direction === 'down' && player.y < 400) {
        player.y += 85;
    } else if (direction === 'left' && player.x > 0) {
        player.x -= 101;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0;i < 10;i++) {
    allEnemies.push(new Enemy());
}
// allEnemies.push(new Enemy(0, 60));
// allEnemies.push(new Enemy(101, 145));
// allEnemies.push(new Enemy(202, 225));

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// utils functions

// nonnegative integers -5 -1
function getRandom (from, end) {
    return Math.floor(Math.random() * (end - from + 1)) + from;
}
function getEnemyInitialX () {
    return -getRandom(1, 10) * 50.5;
}
function getEnemyInitialY () {
    return getRandom(0, 2) * 85 + 60;
}