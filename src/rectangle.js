export class Rectangle extends Phaser.GameObjects.Rectangle {
	constructor(scent, x, y, width, height, fillColor, fillAlpha) {
		super(scent, x, y, width, height, fillColor, fillAlpha);
		this.setOrigin(0, 0);
		this.setDepth(1000);
	}
}
