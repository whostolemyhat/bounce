/* global Phaser */
var platform = platform || {};

var game = new Phaser.Game(800, 600, Phaser.Auto, 'game');

// all states
game.state.add('boot', platform.bootState);
game.state.add('load', platform.loadState);
game.state.add('menu', platform.menuState);
game.state.add('play', platform.playState);

// start!
game.state.start('boot');