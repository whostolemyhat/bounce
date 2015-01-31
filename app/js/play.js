/* global game, Phaser */
var platform = platform || {};

platform.playState = {
    create: function() {
        this.GRAVITY = 200;

        game.stage.backgroundColor = '#21a5e0';

        this.coins = game.add.group();

        this.player = game.add.sprite(150, 200, 'player');
        this.player.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = this.GRAVITY;
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.loadMap();

    },

    update: function() {
        game.physics.arcade.collide(this.layer, this.player);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
    },

    loadMap: function() {
        this.map = game.add.tilemap('simple');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();

        this.lava = this.map.createLayer('lava');
        this.map.setCollision(1);

        // player
        // this.map.createFromObjects('player', 5, 'player', 0, true, false, this.player);
        // coins
        this.map.createFromObjects('coins', 4, 'coin', 0, true, false, this.coins);
    },

    takeCoin: function() {
        console.log('collected coin');
    }
};