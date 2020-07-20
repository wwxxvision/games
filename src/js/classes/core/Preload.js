class Preload {
	async preloadSound(...files) {
		let data = files.map(file => Promise(resolve => resolve(new Audio(file))));
		return await Promise.all(data);
	}
}

export default new Preload();
