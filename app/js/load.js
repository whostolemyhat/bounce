/* global game, Phaser */

var platform = platform || {};

platform.loadState = {
    preload: function() {
        var loadingLabel = game.add.text(
            game.world.centerX,
            game.world.centerY - 40,
            'loading...',
            {
                font: '30px Arial',
                fill: '#fff'
            }
        );
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        // load all the things
        game.load.spritesheet('mute', 'img/menu/muteButton.png', 28, 22);
        game.load.image('player', 'img/player.png');

        // collectables 
        game.load.image('coin', 'img/coin.png');

        // maps
        game.load.tilemap('simple', 'levels/simple.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'img/tileset.png');
    },

    create: function() {
        game.state.start('menu');
    }
};