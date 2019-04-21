let api = (()=>{
	let fns = {};
	let next_ID = 0;

	fns.get_img_db = () => {
		return JSON.parse(window.localStorage.getItem("img"));
	};

	fns.set_img_db = (db) => {
		window.localStorage.setItem("img", JSON.stringify(db));
	};

	fns.get_img_names = () => {
		return Object.keys(fns.get_img_db()).sort();
	};

	class Image {
		constructor() {
			this.db = {};
			this.next_id = 0;
		}

		get_path(id) {
			return this.db[id];
		}

		get_ids() {
			return Object.keys(this.db).sort();
		}

		get_all() {
			return this.get_ids().map((id)=>[id, this.db[id]]);
		}

		add_path() {
			let id = this.next_id++;
			this.db[id] = [];
			return id;
		}

		append_cmd(id, command) {
			this.db[id].push(command);
		}

		rm_last_cmd(id, command) {
			this.db[id].pop();
		}

		rm_path(id) {
			console.log(this.db);
			delete this.db[id];
		}

		store_contents(img_name) {
			let db = fns.get_img_db();
			db[img_name] = this.db;
			fns.set_img_db(db);
		};

		load_contents(img_name) {
			let db = fns.get_img_db();
			this.db = db[img_name];
		};
	}
	fns.Image = Image;


	fns.run_tests = () => {
		// let img = new Image();
		// console.log(img.get_all());
		// console.log(img.add_path());
		// console.log(img.add_path());
		// console.log(img.get_path(0));
		// console.log(img.get_all());
		// console.log(img.rm_path(1));
		// console.log(img.get_all());
		// console.log(JSON.stringify(img));

		// if (typeof window != "undefined") {
		// 	fns.store_image(img, "img");
		// 	console.log(fns.load_image("img"));
		// }
	}
	return fns;
})();