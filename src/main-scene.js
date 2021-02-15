import { HorisontalLine } from "./horisontalline.js";
import { TextButton } from "./text-button.js";
import { Rectangle } from "./rectangle.js";

export class MainScene extends Phaser.Scene {
	constructor() {
		super();
		this.lineConfig = {
			imgHeight: 100,
			imgWidth: 100,
			topRectHeight: 150,
			startLeftMargin: 150,
			lineCount: 6,
		};
		this.lines = [];
		this.canStart = false;

		for (let i = 0; i < this.lineConfig.lineCount; i++) {
			this.lines.push(new HorisontalLine(this, this.lineConfig, i));
		}
	}

	preload() {
		this.lines.forEach((line) => {
			line.preload();
		});
	}

	create() {
		const topRect = new Rectangle(this, 0, 0, 900, this.lineConfig.topRectHeight, 0x000000, 1);
		this.add.existing(topRect);
		const bottomRect = new Rectangle(this, 0, 450, 900, this.lineConfig.topRectHeight, 0x000000, 1);
		this.add.existing(bottomRect);
		this.lines.forEach((line) => {
			line.create();
		});

		const clickStart = () => {
			if (this.canStart === false) {
				this.canStart = true;
				this.lines.forEach((line) => {
					line.frameCount = 2;
					line.trigger = true;
					line.isStoped = false;
				});
			}
		};
		const startButton = new TextButton(this, 750, 250, "Start", clickStart);
		this.add.existing(startButton);

		const clickStop = () => {
			if (this.canStart) {
				this.lines.forEach((line) => {
					line.trigger = false;
				});
			}
		};

		const stopButton = new TextButton(this, 750, 350, "Stop", clickStop);
		this.add.existing(stopButton);
	}

	update() {
		const allStop = this.lines.every((line, i) => line.isStoped === true);
		if (allStop) {
			this.canStart = false;
		}
		if (this.canStart) {
			this.lines.forEach((line) => {
				line.update();
			});
		}
	}
}
