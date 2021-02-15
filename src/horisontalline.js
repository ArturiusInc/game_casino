export class HorisontalLine {
	constructor(scene, lineConfig, order) {
		this.order = order;
		this.lineConfig = lineConfig;
		this.scene = scene;
		this.figures = [];
		this.frameCount = 2;
		this.speedMax = 300;
		this.trigger = true;
		this.randomStart = this._randomeRangeNumber(50, 100, 1)[0];
		this.randomEnd = this._randomeRangeNumber(10, 50, 1)[0];
		this.isStoped = false;
	}

	preload() {
		for (let i = 0; i < 5; i++) {
			this.scene.load.image(`slot${i + 1}`, `./src/assets/${i + 1}.png`);
		}
	}

	create() {
		const randomNumbers = this._randomeRangeNumber(1, 5);
		for (let i = 0; i < 5; i++) {
			const fugure = this.scene.add.image(
				this.lineConfig.startLeftMargin + this.order * this.lineConfig.imgWidth,
				(i + 1) * this.lineConfig.imgHeight,
				`slot${randomNumbers[i]}`
			);
			this.figures.push(fugure);
		}
	}

	update() {
		// полная остановка
		if (this.frameCount <= 1 && this.figures[0].y === 99 && !this.trigger) {
			this.isStoped = true;
			return;
		}

		if (!this.trigger && this.frameCount === 1) {
			this.frameCount = 2;
		}
		// снижаем скорость
		if (this.frameCount > this.speedMax) {
			this.trigger = !this.trigger;
			this.frameCount = this.speedMax;
		}

		if (this.trigger) {
			this.frameCount += 1;
		} else {
			this.frameCount -= 1;
		}

		if (this.figures[4].y >= this.lineConfig.topRectHeight + this.lineConfig.imgHeight * 4) {
			this._goUp();
		}
		this.figures.forEach((figure, i) => {
			if (this.trigger) {
				figure.y += Math.ceil(this.frameCount / this.randomStart);
			} else {
				figure.y += Math.ceil(this.frameCount / this.randomEnd);
			}
		});
	}

	_randomeRangeNumber(min, max, count = 5) {
		const randomFiveNumbers = [];
		while (randomFiveNumbers.length !== count) {
			const randNumber = Math.floor(min + Math.random() * (max + 1 - min));
			if (!randomFiveNumbers.includes(randNumber)) {
				randomFiveNumbers.push(randNumber);
			}
		}
		return randomFiveNumbers;
	}

	_goUp() {
		const drager = this.figures.pop();
		this.figures.unshift(drager);
		this.figures[0].y = this.figures[1].y - this.lineConfig.imgHeight;
	}
}
