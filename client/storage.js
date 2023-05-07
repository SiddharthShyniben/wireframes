import { randomNames } from "./util";

export function getLocalStorageSize() {
	let dataSize = 0;
	
	function testLocalStorage(len = 1024 * 1024) {
		let str = "0".repeat(len);
		
		localStorage.clear()
		while (true) {
			try {
				localStorage.setItem(Math.random().toString(36).substring(2), str);
				dataSize += oneMBString.length;
			} catch (e) {
				console.log("Local storage full at " + dataSize + " bytes. Trying more");
				if (len > 8) testLocalStorage(len / 8);
				else console.log('Done');
				break;
			}
		}
		
		return dataSize;
	}

	return testLocalStorage();
}

export function createFile() {
	const file = {
		name: randomNames[Math.floor(Math.random() * randomNames.length)],
		id: [...Array(8)].map(_ => (~~(Math.random() * 36)).toString(36)).join(''),
		content: [],
		creationDate: new Date().getTime(),
		lastPosition: {x: 0, y: 0},
		lastZoom: 17
	}
	file.modificationDate = file.creationDate;

	addFile(file);
}

export function addFile(file) {
	const files = getFiles();
	files.unshift(file);
	setFiles(files)
}

export function getFiles() {
	if (!initialized()) initialize();
	return JSON.parse(localStorage.getItem('files'));
}

export function getFile(id) {
	const files = getFiles();
	return files.find(f => f.id === id);
}

export function modifyFile(file) {
	console.log(getFiles());
	let files = getFiles();
	file.modificationDate = new Date().getTime();
	files = [...files.filter(f => f.id !== file.id), file];
	setFiles(files);
	console.log(getFiles());
}

// TODO: Message for corruption?
export function initialized() {
	try {
		return JSON.parse(localStorage.getItem('files'));
	} catch {
		return false;
	}
}

export function initialize() {
	setFiles([]);
}

export function setFiles(files) {
	localStorage.setItem('files', JSON.stringify(files))
}
