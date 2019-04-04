	
(()=>{
	//import { Edit_session } from  "./edit_session.js";
	let svg = document.getElementsByTagName('svg')[0]; //Get svg element
	//let color_select = document.getElementById('color_select');
	let curr_color = "none";
	let mode = 0;

	let latest = null;
	let points = [];
	let path = "";
	let moves_since_mode_chg = 0;
	const moves_threshold = 0;

	/*color_select.addEventListener("onchange", (e) => {
		curr_color = color_select.value;
		if (latest) {
			latest.setAttribute("style", `fill:${curr_color}`);
		}
	});*/

	svg.addEventListener("mousedown", (e) => {
		//console.log(`mousedown (before) ${mode} ${moves_since_mode_chg}`);
		switch(mode) {
			case 0: // Mouse down on start point
				points = [api.svg_mousecoords(svg, e)];
				path = `M ${points[0].x} ${points[0].y}`;				
				latest = api.add_path(svg);
				mode = 1;
				break;

			case 1: // 
				//console.log("Double-clicked on start?");
				points.push(api.svg_mousecoords(svg, e));
				mode = 3;
				break;

			case 2:
				points.push(api.svg_mousecoords(svg, e));
				mode = 0;
				break;
			case 3:
				//console.log("down mode 3");
				break;
			case 4:
				break;
			case 5:
				break;
			}
		moves_since_mode_chg = 0;
		//console.log(`mousedown (after) ${mode} ${moves_since_mode_chg}`);
		});
	svg.addEventListener("mouseup", (e) => {
		////console.log(`mouseup (before) ${mode} ${moves_since_mode_chg}`);
		switch(mode) {
			case 0: // No path yet
				break;
			case 1: // Drag to control point, next click will be curve endpoint
				//console.log("up mode 1");
				points.push(api.svg_mousecoords(svg, e));
				if (moves_since_mode_chg > moves_threshold) { // Drag, next ""
					mode = 2;
					//console.log("drag from start?");
				} else {
					//mode = 3; // Double click, next click will be bezier control point
					//console.log("clicked on start?");
				}
				mode = 3
				break;
			case 2: // Mouse up after drag
			//console.log("up mode 2");
				points.push(api.svg_mousecoords(svg, e));
				//mode = 1;

				break;
			case 3:
			//console.log("up mode 3");
				latest = null;
				mode = 0;
				break;
			case 4:
				break;
			case 5:
				break;
			}
				moves_since_mode_chg = 0;
				//console.log(`mouseup (after) ${mode} ${moves_since_mode_chg}`);
		});

	svg.addEventListener("mousemove", (e) => {
		////console.log(`mousemove (before) ${mode} ${moves_since_mode_chg}`);
		moves_since_mode_chg++;
		let start, mid, end;
		switch(mode) {
			case 0: // No path yet
				break;

			case 1: // Mouse down on start point
				start = points[0];
				mid = api.svg_mousecoords(svg, e);
				latest.setAttribute("d", `M ${start.x} ${start.y} L ${mid.x} ${mid.y}`);
				break;			
			case 2:
			case 3:
				start = points[0];
				mid = points[1];
				end = api.svg_mousecoords(svg, e);
				path = `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
				latest.setAttribute("d", `${path}`);
				latest.setAttribute("style", `fill:${curr_color}`);
				break;
			case 4:
				break;
			case 5:
				break;

			}
		// //console.log(`mousemove (after) ${mode}`);
		});

	
})();
