import Bootloader from './bootloader.js';
import Scene_play from './scenes/scene_play.js';

const config = {
    width: 640,
    height: 400,
    parent: 'container',
    physics: {
        default: 'arcade'
    },
    scene: [Bootloader, Scene_play]
}

window.addEventListener('load', () => {
    let game = new Phaser.Game(config);
});