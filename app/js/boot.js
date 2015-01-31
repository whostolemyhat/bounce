/* global game, Phaser */
var platform = platform || {};

platform.bootState = {
    preload: function() {
        game.load.image('progressBar', 'img/menu/progress.png');
    },

    create: function() {
        game.stage.backgroundColor = '#5eb442';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // trigger loading screen
        game.state.start('load');
    }
};