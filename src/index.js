import Phaser from "phaser";
import { MainScene } from "./main-scene";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 900,
	height: 600,
	scene: MainScene,
};

const game = new Phaser.Game(config);
