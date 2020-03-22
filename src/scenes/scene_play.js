import Palas from '../gameObjects/palas.js';

export default class Scene_play extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_play" });
    }

    preload() {
        console.log("Scene_play");
    }

    create() {
        let centerWidth = this.game.config.width/2;
        let centerHeight = this.game.config.height/2;

        this.add.image(centerWidth, centerHeight, "separator");

        // this.izquierda = this.add.image(15, centerHeight, "left");
        this.izquierda = new Palas(this, 15, centerHeight, "left");
        // this.derecha = this.add.image(this.game.config.width - 15, centerHeight, "right");
        this.derecha = new Palas(this, this.game.config.width - 15, centerHeight, "right");

        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(centerWidth, centerHeight, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);

        this.physics.add.collider(this.ball, this.izquierda, this.hit, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.hit, null, this);

        this.cursor = this.input.keyboard.createCursorKeys();
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(time, delta) {
        if (this.ball.x > this.game.config.width || this.ball.x < 0) {
            this.ball.setPosition(this.game.config.width/2, this.game.config.height/2);
            this.hit();
        }

        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(300);
        }
        else if (this.cursor.up.isDown) {
            this.derecha.body.setVelocityY(-300);
        }
        else {
            this.derecha.body.setVelocityY(0);
        }

        if (this.cursor_S.isDown && this.izquierda.y < this.game.config.height) {
            this.izquierda.body.setVelocityY(300);
        }
        else if (this.cursor_W.isDown && this.izquierda.y > 0) {
            this.izquierda.body.setVelocityY(-300);
        }
        else {
            this.izquierda.body.setVelocityY(0);
        }
    }

    hit() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}