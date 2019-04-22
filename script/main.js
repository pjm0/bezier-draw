class Edit_session {
	constructor(session) {
		//console.log("constructor");
		this.img = new api.Image();
		this.svg = session.querySelector("svg"); 
		//let color_select = document.getElementById('color_select');
		this.curr_color = "none";
		this.mode = 0;

		this.latest = null;
		this.points = [];
		this.path = "";
		this.moves_since_mode_chg = 0;
		this.grid_size = 10;
		const moves_threshold = 0;

		session.querySelector(".clear").addEventListener("mousedown", (e) => {
			this.img = new api.Image();
			while (this.svg.lastChild) {
		    	this.svg.removeChild(this.svg.lastChild);
			}	
		});

		this.svg.addEventListener("mousedown", (e) => {
			//console.log(`mousedown (before) ${mode} ${moves_since_mode_chg}`);
			switch(this.mode) {
				case 0: // Mouse down on start point
					this.points = [this.svg_mousecoords(e)];
					this.path = `M ${this.points[0].x} ${this.points[0].y}`;				
					this.latest = this.add_path();
					this.mode = 1;
					break;

				case 1: // 
					//console.log("Double-clicked on start?");
					this.points.push(this.svg_mousecoords(e));
					this.mode = 3;
					break;

				case 2:
					this.points.push(this.svg_mousecoords(e));
					this.mode = 0;
					break;
				case 3:
					//console.log("down mode 3");
					break;
				case 4:
					break;
				case 5:
					break;
				}
			this.moves_since_mode_chg = 0;
			//console.log(`mousedown (after) ${mode} ${moves_since_mode_chg}`);
			});
		this.svg.addEventListener("mouseup", (e) => {
			////console.log(`mouseup (before) ${mode} ${moves_since_mode_chg}`);
			switch(this.mode) {
				case 0: // No path yet
					break;
				case 1: // Drag to control point, next click will be curve endpoint
					//console.log("up mode 1");
					this.points.push(this.svg_mousecoords(e));
					if (this.moves_since_mode_chg > this.moves_threshold) { // Drag, next ""
						this.mode = 2;
						//console.log("drag from start?");
					} else {
						//mode = 3; // Double click, next click will be bezier control point
						//console.log("clicked on start?");
					}
					this.mode = 3
					break;
				case 2: // Mouse up after drag
				//console.log("up mode 2");
					this.points.push(this.svg_mousecoords(e));
					//mode = 1;

					break;
				case 3:
				//console.log("up mode 3");
					this.latest = null;
					this.mode = 0;
					break;
				case 4:
					break;
				case 5:
					break;
				}
			this.moves_since_mode_chg = 0;
					//console.log(`mouseup (after) ${mode} ${moves_since_mode_chg}`);
		});

		this.svg.addEventListener("mousemove", (e) => {
			////console.log(`mousemove (before) ${mode} ${moves_since_mode_chg}`);
			this.moves_since_mode_chg++;
			let start, mid, end;
			switch(this.mode) {
				case 0: // No path yet
					break;

				case 1: // Mouse down on start point
					start = this.points[0];
					mid = this.svg_mousecoords(e);
					this.latest.setAttribute("d", `M ${start.x} ${start.y} L ${mid.x} ${mid.y}`);
					break;			
				case 2:
				case 3:
					start = this.points[0];
					mid = this.points[1];
					end = this.svg_mousecoords(e);
					this.path = `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
					this.latest.setAttribute("d", `${this.path}`);
					this.latest.setAttribute("style", `fill:${this.curr_color}`);
					break;
				case 4:
					break;
				case 5:
					break;

				}
			// //console.log(`mousemove (after) ${mode}`);
		});


	}

	add_path() {
		let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		let id = this.img.add_path();
		path.setAttribute("id", id.toString());
		this.svg.appendChild(path);
		return path;
	}
	
	svg_mousecoords(e) {
		let p = this.svg.createSVGPoint();
		p.x = Math.round(e.clientX / this.grid_size) * this.grid_size;
		p.y = Math.round(e.clientY / this.grid_size) * this.grid_size;
		return p.matrixTransform(this.svg.getScreenCTM().inverse());
	}
}

window.onload = () => {


	function update_names() {
		// Update list of image names
		document.querySelectorAll(".names").forEach((field) => {
			api.get_img_names().forEach((name) => {
				var opt = document.createElement("option"); 
				opt.setAttribute("value", name);
				opt.innerHTML = name;
				field.appendChild(opt);
			});
		});
	}
	update_names();

	let sessions = Array.prototype.map.call(document.querySelectorAll(".edit_session"), (session)=> {
		return new Edit_session(session);
	});	
};
