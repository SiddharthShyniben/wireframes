import m from 'mithril';
import {getFile} from './storage';

export function File({attrs: {id}}) {
	const file = getFile(id)
	function view() {
		return (
			<main>
				<canvas id="canvas"></canvas>
				<div>
					<p>{file.name}</p>
				</div>
			</main>
		)
	}

	function oncreate() {
		const canvas = document.querySelector('#canvas');
		const ctx = canvas.getContext("2d");
		let dragging = false;
		let lastX, lastY;
		let zeroX = 0, zeroY = 0;
		let squareSize = 17;
	
		const startDrag = (e) => (dragging = true, lastX = e.clientX, lastY = e.clientY);
		const stopDrag = () => dragging = false;
		const drag = (e) => {
			if (dragging) {
				const dx = e.clientX - lastX;
				const dy = e.clientY - lastY;
				lastX = e.clientX;
				lastY = e.clientY;
				zeroX += dx;
				zeroY += dy;
				console.log({dx, dy, zeroX, zeroY});
				draw()
			}
		}

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			draw();
		}
		
		// Largest multiple of g which is less than n starting from the point s
		// Largest multiple of squareSize which is less than 0 starting from the true zero
		function largestMultiple(g, n, s) {
			while (s > n) {
				s -= g;
			}
			return s;
		}
		
		function smallestMultiple(g, n, s) {
			while (s < n) {
				s += g;
			}
			return s > n ? s - g : s;
		}
		
		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			let startX = (zeroX < 0 ? smallestMultiple : largestMultiple)(squareSize, 0, zeroX);
			let startY = (zeroY < 0 ? smallestMultiple : largestMultiple)(squareSize, 0, zeroY);
			let endX = (zeroX < canvas.width ? smallestMultiple : largestMultiple)(squareSize, canvas.width, zeroX)
			let endY = (zeroY < canvas.height ? smallestMultiple : largestMultiple)(squareSize, canvas.height, zeroY)
			console.log({zeroX, zeroY, startX, startY, endX, endY})

			for (let x = startX; x <= endX; x += squareSize) {
				for (let y = startY; y <= endY; y += squareSize) {
					ctx.strokeStyle = '#a9b1d690'
					ctx.strokeRect(x, y, squareSize, squareSize);
				}
			}
		}

		const zoom = e => {
			e.preventDefault();
			squareSize += ~~(e.deltaX / 3);
			if (squareSize <= 5) squareSize = 5;
			draw();
		}

		resize();

		canvas.addEventListener("mousedown", startDrag);
		canvas.addEventListener("touchstart", startDrag);

		canvas.addEventListener("mousemove", drag);
		canvas.addEventListener("touchmove", drag);

		canvas.addEventListener("mouseup", stopDrag);
		canvas.addEventListener("touchend", stopDrag);

		canvas.addEventListener("wheel", zoom)
	}
		
	return {view, oncreate}
}
