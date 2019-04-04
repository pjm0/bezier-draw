let api = (()=>{
	//import Math;
	let fns = {};
	let next_ID = 0;
	const grid_size = 50;

	fns.add_path = (svg) => {
		let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		path.setAttribute("id", (next_ID++).toString());
		svg.appendChild(path);
		return path;
	};
	fns.svg_mousecoords = (svg, e) => {
		let p = svg.createSVGPoint();
		p.x = Math.round(e.clientX / grid_size) * grid_size;
		p.y = Math.round(e.clientY / grid_size) * grid_size;
		return p.matrixTransform(svg.getScreenCTM().inverse());
	};
	return fns;
})();