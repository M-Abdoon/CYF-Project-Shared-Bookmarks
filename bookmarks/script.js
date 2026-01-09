// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getData } from "./storage.js";
import { setData } from "./storage.js";
import { getUserIds } from "./storage.js";
import { clearData } from "./storage.js";

const selectIdDropDown = document.getElementById("selectId");
const dataList = document.getElementById("dataList");
const stringListOfbookamrs = document.getElementById("stringListOfbookamrs");
const clearAllData = document.getElementById("clearAllData");

const addBookmarkForm = document.getElementById("addBookmarkForm");
const bookmarkTitleInput = document.getElementById("bookmarkTitleInput");
const bookmarkDescriptionInput = document.getElementById("bookmarkDescriptionInput");
const bookmarkLinkInput = document.getElementById("bookmarkLinkInput");

const users = getUserIds();
let selectedId = 1; // default

function setup () {
	
	fillDropdown(users);
	
	showDataList(1);

	selectIdDropDown.addEventListener("change", () => {
		selectedId = selectIdDropDown.value;

		render ();

		if (getData(selectedId) == null || getData(selectedId).length < 1) {
			stringListOfbookamrs.textContent = "No bookmarks for this user";
			return false;
		}

		showDataList(selectedId);
	});
	
	addBookmarkForm.addEventListener("submit", event => {
		event.preventDefault();

		const enteredTitle = bookmarkTitleInput.value;
		const enteredLink = bookmarkLinkInput.value;
		const enteredDescription = bookmarkDescriptionInput.value;

		enterData(enteredTitle, enteredLink, enteredDescription);

		render ();

		showDataList(selectedId);

	});

	clearAllData.addEventListener("click", () => {
		clearAllDataFunc();
		render();
	});
};

function enterData (enteredTitle, enteredLink, enteredDescription) {

	if( enteredTitle == "" || enteredLink == "" || enteredDescription == "") {
		alert("all fields must be filled");
		return false;
	}

	let getUserBookmark = getData(selectedId) ?? [];
	
	const newEntryJson = { 
		title: enteredTitle, 
		link: enteredLink, 
		description: enteredDescription, 
		timestamp: Date.now()
	};

	getUserBookmark.push(newEntryJson);

	setData(selectedId, getUserBookmark);
}

function fillDropdown (userIds) {
	userIds.forEach(( id ) => {
		const createOption = document.createElement("option");
		createOption.value = id;
		createOption.text = "User Id Number " + id;
		selectIdDropDown.appendChild(createOption);
	});
};

function render() {
	dataList.innerHTML = "";
	stringListOfbookamrs.innerHTML = "";
};

function showDataList(userId) {

	const dataOfUser = getData(userId);

	if(dataOfUser == null || dataOfUser.length == 0)
		return false;
	
	dataOfUser.sort((a, b) => b.timestamp - a.timestamp);
	dataOfUser.forEach(( item ) => {
		
		const p = document.createElement("p");
		const a = document.createElement("a");
		const font = document.createElement("font");
		const desc = document.createElement("p");
		const timestamp = document.createElement("p");
		const hr = document.createElement("hr");
		
		a.href = item.link;
		
		font.textContent = item.title;
		font.color = "black";

		a.appendChild(font);
		p.appendChild(a);
		
		desc.textContent = item.description;
		timestamp.textContent = item.timestamp;
		hr.width = "10%";
		
		dataList.appendChild(p);
		dataList.appendChild(desc);
		dataList.appendChild(timestamp);
		dataList.appendChild(hr);
		
	});
};

function clearAllDataFunc() {
	getUserIds().forEach((userId) => {
		clearData(userId);
	});
}

window.onload = setup();