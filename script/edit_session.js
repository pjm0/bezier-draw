let Edit_session = (() => {
	let Edit_session = function (svg) {
		this.svg = svg;
		this.next_path_id = 0;
		this.selected_path = -1;
		this.paths = {};


		this.add_path = () => {
			let id = (next_path_id++).toString();
			paths[id] = [];
		};

		let get_path = (path_id) => {
			return this.svg.getElementById(path_id);
		};

		this.draw_path = (path_id) => {
			let path = get_path(path_id);
			let d = "";
			paths.forEach(()=>{
				
			});

		};

		this.add_cmd = (path_id, cmd, points) => {
			/* Preconditions:
				* cmd is valid svg command
				* points contains the correct number of
				points for that command
			*/
			paths.push([cmd, points]);
		};

		this.rm_last_subpath = (path_id) => {

		};


	};
	return Edit_session;
	// export {Edit_session};
})();