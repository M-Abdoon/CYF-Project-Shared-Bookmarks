import { setData } from "./storage.js";
import { getData } from "./storage.js";

export function enterData (enteredTitle, enteredLink, enteredDescription, userId) {

	if( enteredTitle === "" || enteredLink === "" || enteredDescription === "") {
		return false;
	}

	let getUserBookmark = getData(userId) ?? [];
	
	const newEntryJson = { 
		title: enteredTitle, 
		link: enteredLink, 
		description: enteredDescription,
		timestamp: Date.now(),
		likes: 0
	};

	getUserBookmark.push(newEntryJson);

	setData(userId, getUserBookmark);
}