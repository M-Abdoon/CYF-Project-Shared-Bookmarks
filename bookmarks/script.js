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

const submitBookmark = document.getElementById("submitBookmark");
const bookmarkTitleInput = document.getElementById("bookmarkTitleInput");
const bookmarkDescriptionInput = document.getElementById("bookmarkDescriptionInput");
const bookmarkLinkInput = document.getElementById("bookmarkLinkInput");

const users = getUserIds();
let selectedId = 1; // default

const newData = [ 
	{ title: "here", description: "hello this is me!", link: "https://google.com", timestamp: Date.now() },
	{ title: "here2", description: "hello this is me!2", link: "https://facebookc.com", timestamp: Date.now() }
];
setData("1", newData);

function setup () {
	
	
	fillDropdown(users);
	
	showDataList(1);

	selectIdDropDown.addEventListener("change", () => {
		selectedId = selectIdDropDown.value;

		render ();

		console.log(getData(selectedId));
		if (getData(selectedId) == null || getData(selectedId).length < 1) {
			stringListOfbookamrs.style.color = "red";
			stringListOfbookamrs.textContent = "No bookmarks for this user";

			return false;
		}
		showDataList(selectedId);
	});
	
	submitBookmark.addEventListener("click", () => {
		const enteredTitle = bookmarkTitleInput.value;
		const enteredDescription = bookmarkDescriptionInput.value;
		const enteredLink = bookmarkLinkInput.value;

		let getUserBookmark = getData(selectedId) ?? [];

		const newEntryJson = { 
			title: enteredTitle, 
			description: enteredDescription, 
			link: enteredLink, 
			timestamp: Date.now()
		};

		getUserBookmark.push(newEntryJson);

		setData(selectedId, getUserBookmark);

		render ();
		showDataList(selectedId);

		console.log(JSON.stringify(getData(selectedId)));

		// if (getData(selectedId) == null || getData(selectedId).length < 1) {
		// 	stringListOfbookamrs.style.color = "red";
		// 	stringListOfbookamrs.textContent = "No bookmarks for this user";

		// 	return false;
		// }
		// showDataList(selectedId);
	});
};

function fillDropdown (userIds) {
	userIds.forEach(( id ) => {
		const createOption = document.createElement("option");
		createOption.value = id;
		createOption.text = "User Id Number " + id;
		selectIdDropDown.appendChild(createOption);
	});
}

function render() {
	dataList.innerHTML = "";
	stringListOfbookamrs.innerHTML = "";
}
function showDataList(dataOfUser) {
	
	dataOfUser = getData(dataOfUser);
	dataOfUser.sort((a, b) => b.timestamp - a.timestamp);
	dataOfUser.forEach(( item ) => {
		
		const p = document.createElement("p");
		const a = document.createElement("a");
		const desc = document.createElement("p");
		const timestamp = document.createElement("p");
		const hr = document.createElement("hr");
		
		a.href = item.link;
		a.textContent = item.title;
		
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

window.onload = setup();