import { Ball } from "./ball.js";
import { Block } from "./block.js";

class App {
	constructor() {
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.pointerX = null;
		this.pointerY = null;
		document.body.appendChild(this.canvas);

		window.addEventListener("resize", this.resize.bind(this), false);
		window.addEventListener("click", this.clickHandler.bind(this), false);
		this.resize();

		this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
		this.block = new Block(700, 30, 300, 450);

		window.requestAnimationFrame(this.animate.bind(this));
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;
		this.ctx.scale(2, 2);
	}

	clickHandler(e) {
		this.pointerX = e.clientX;
		this.pointerY = e.clientY;
		if (this.pointerX < this.ball.radius) {
			this.pointerX = this.ball.radius;
		} else if (this.pointerY < this.ball.radius) {
			this.pointerY = this.ball.radius;
		} else if (this.pointerX > this.stageWidth - this.ball.radius) {
			this.pointerX = this.stageWidth - this.ball.radius;
		} else if (this.pointerY > this.stageHeight - this.ball.radius) {
			this.pointerY = this.stageHeight - this.ball.radius;
		}
		console.log(this.pointerX, this.pointerY);
	}

	animate() {
		window.requestAnimationFrame(this.animate.bind(this));
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
		this.block.draw(this.ctx);
		if (this.pointerX != null && this.pointerY != null) {
			this.ball.draw(
				this.ctx,
				this.stageWidth,
				this.stageHeight,
				this.block,
				this.pointerX,
				this.pointerY
			);
			this.pointerX = null;
			this.pointerY = null;
		} else {
			this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
		}
	}
}

window.onload = () => {
	new App();
};
