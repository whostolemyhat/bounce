/* global game, Phaser */

var platform = platform || {};

platform.menuState = {
    create: function() {
        this.cursor = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#5eb442';

        var nameLabel = game.add.text(
            game.world.centerX,
            -100,
            'Bouncy bouncy',
            {
                font: '50px Arial',
                fill: '#fff'
            }
        );
        nameLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(nameLabel).to({ y: 100 }).easing(Phaser.Easing.Bounce.Out).start();

        var startLabel = game.add.text(
            game.world.centerX,
            game.world.height - 50,
            'Press UP to start',
            {
                font: '30px Arial',
                fill: '#fff'
            }
        );
        startLabel.anchor.setTo(0.5, 0.5);
        startLabel.alpha = 0;
        game.add.tween(startLabel).delay(500).to({ alpha: 1 }).start();
        game.add.tween(startLabel).to({ angle: 1 }, 500).to({ angle: -1}, 500).loop().start();
    },

    update: function() {
        if(this.cursor.up.isDown) {
            platform.menuState.start();
        }
    },

    start: function() {
        game.state.start('play');
    },

    toggleSound: function() {
        game.sound.mute = !game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1: 0;
    }
};