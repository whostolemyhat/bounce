/* global game, Phaser */
var platform = platform || {};

platform.playState = {
    create: function() {
        this.GRAVITY = 1800;
        this.PLAYER_SPEED = 200;
        this.JUMP_SPEED = -500;
        this.maxJumpTime = 150;
        this.onGround = false;
        this.jumping = false;
        this.jumpTime = 0;
        this.jumpStart = 0;

        this.cursor = this.game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ]);

        game.stage.backgroundColor = '#21a5e0';

        this.coins = game.add.group();

        this.player = game.add.sprite(150, 200, 'player');
        this.player.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = this.GRAVITY;
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.loadMap();
        console.log(this.layer);
        console.log(this.lava);
    },

    update: function() {
        game.physics.arcade.collide(this.layer, this.player);
        this.onGround = this.player.body.onFloor();
        this.movePlayer();
        game.physics.arcade.collide(this.layer, this.player);
        game.physics.arcade.overlap(this.lava, this.player, this.playerDie, null, this);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        if(!this.player.inWorld) {
            this.playerDie();
        }
    },

    movePlayer: function() {
        if(this.cursor.left.isDown) {
            this.player.body.velocity.x = - this.PLAYER_SPEED;
        } else if(this.cursor.right.isDown) {
            this.player.body.velocity.x = this.PLAYER_SPEED;
        } else {
            this.player.body.velocity.x = 0;
        }

        // console.log(this.cursor.up.isDown, this.onGround, !this.jumping);
        // jump
        if(this.cursor.up.isDown && this.onGround && !this.jumping) {
            console.log('jump');

            // jumping from ground
            this.jumpTime = 0;
            this.onGround = false;
            this.jumping = true;
            this.jumpStart = game.time.now;

            this.player.body.velocity.y = this.JUMP_SPEED;
        } else if(this.cursor.up.isDown &&
                  !this.onGround &&
                  this.jumpTime < this.maxJumpTime &&
                  this.jumping) {
            console.log('still jumping');
            // carry on jumping
            this.jumpTime = game.time.elapsedSince(this.jumpStart);

            // this.player.body.velocity.y = this.JUMP_SPEED;
        } else if(!this.onGround &&
                  (!this.cursor.up.isDown || this.jumpTime >= this.maxJumpTime)) {
            // falling
            console.log('falling');
            this.jumping = false;
        }

        // jump released, reset 
        if(!this.cursor.up.isDown && this.onGround) {
            this.jumping = false;
            this.jumpTime = 0;
        }
    },

    playerDie: function() {
        console.log('hit lava');
    },

    loadMap: function() {
        this.map = game.add.tilemap('simple');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();
        this.map.setCollision(1);

        this.lava = this.map.createLayer('lava');
        this.map.setCollision(3, true, 'lava');
        
        // player
        // this.map.createFromObjects('player', 5, 'player', 0, true, false, this.player);
       
        // coins
        this.map.createFromObjects('coins', 4, 'coin', 0, true, false, this.coins);
    },

    takeCoin: function() {
        console.log('collected coin');
    }
};