export class TextButton extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, callback) {
		super(scene, x, y, text);
		this.setInteractive({ useHandCursor: true });
		this.buttonStyles = {
			fill: "#fff",
			backgroundColor: "#3d6ace",
		};
		this.setDepth(1001);
		this.setPadding({ x: 10, y: 10 });
		this.setStyle(this.buttonStyles);
		this.on("pointerover", () => this.setBackgroundColor("#6991e8"));
		this.on("pointerout", () => this.setBackgroundColor("#3d6ace"));
		this.on("pointerdown", () => {
			callback();
		});
	}
}
