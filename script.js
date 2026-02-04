// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getData } from "./storage.js";
import { getUserIds } from "./storage.js";
import { clearData } from "./storage.js";
import { enterData } from "./logic.js";

const selectIdDropDown = document.getElementById("selectId");
const dataList = document.getElementById("dataList");
const stringListOfBookMarks = document.getElementById("stringListOfBookMarks");
const stringBookMarkAdded = document.getElementById("stringBookMarkAdded");

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
		showDataList(selectedId);
	});
	
	addBookmarkForm.addEventListener("submit", event => {
		event.preventDefault();

		const enteredTitle = bookmarkTitleInput.value;
		const enteredLink = bookmarkLinkInput.value;
		const enteredDescription = bookmarkDescriptionInput.value;

		const enterDataCheck = enterData(enteredTitle, enteredLink, enteredDescription, selectedId);

		if(enterDataCheck === false) {
			alert("all fields must be filled");
			return false;
		}

		render ();

		stringBookMarkAdded.innerHTML = "Bookmark successfully added";

		showDataList(selectedId);
	});
};

function fillDropdown (userIds) {
	userIds.forEach(( id ) => {
		const createOption = document.createElement("option");
		createOption.value = id;
		createOption.text = "User Id Number " + id;
		selectIdDropDown.appendChild(createOption);
	});
};

function render() {
	bookmarkTitleInput.value = "";
	bookmarkLinkInput.value = "";
	bookmarkDescriptionInput.value = "";
	stringBookMarkAdded.innerHTML = "";
	stringListOfBookMarks.innerHTML = "";
	dataList.innerHTML = "";
};

function showDataList(userId) {
	let dataOfUser = getData(userId);

	if(dataOfUser === null || dataOfUser.length < 1) {
		stringListOfBookMarks.textContent = "No bookmarks for this user";
		dataList.style.display = "none";
		return false;
	} else {
		stringListOfBookMarks.textContent = "The list of bookmarks for the relevant user";
		dataList.style.display = "block";
	}
	
	dataOfUser.sort((a, b) => b.timestamp - a.timestamp);

	dataOfUser.forEach((item, id) => {
		const displayedTime		= new Date(item.timestamp).toDateString();
		const displayedTitle	= item.title;
		const displayedLink		= item.link;
		const displayedDesc		= item.description;
		const displayedLikes	= item.likes;

		const bookMarkDiv = document.createElement("div");
		bookMarkDiv.className = "bookmark";

		const link = document.createElement("a");
		link.href = displayedLink;
		link.textContent = displayedTitle;

		const title = document.createElement("p");
		title.className = "bookmark-title";
		title.appendChild(link);

		const time = document.createElement("p");
		time.className = "bookmark-time";
		time.textContent = displayedTime;

		const desc = document.createElement("p");
		desc.className = "bookmark-desc";
		desc.textContent = displayedDesc;

		const copyBtn = document.createElement("button");
		copyBtn.className = "copyLink";
		copyBtn.style.padding = "4px";
		copyBtn.innerHTML = "Copy";
		copyBtn.addEventListener("click", () => {
			navigator.clipboard.writeText(displayedLink).then(() => {
				copyBtn.innerHTML = "Copied!";
				copyBtn.style.background = "green";
			});
		});

		const likeCounter = document.createElement("p");
		likeCounter.style.cursor = "pointer";
		likeCounter.style.margin = "0";
		likeCounter.textContent = `💙 ${displayedLikes}`;

		likeCounter.addEventListener("click", () => {

			let OriginalUnorderedData = JSON.parse(localStorage[`stored-data-user-${userId}`]);
		
			OriginalUnorderedData[OriginalUnorderedData.length - (id + 1)].likes = displayedLikes + 1;

			localStorage[`stored-data-user-${userId}`] = JSON.stringify(OriginalUnorderedData);
			
			likeCounter.textContent = `💗 ${displayedLikes+1}`;
		});

		const bookMarkActions = document.createElement("div");
		bookMarkActions.className = "bookMarkActions";
		bookMarkActions.appendChild(copyBtn);
		bookMarkActions.appendChild(likeCounter);

		bookMarkDiv.appendChild(title);
		bookMarkDiv.appendChild(time);
		bookMarkDiv.appendChild(desc);
		bookMarkDiv.appendChild(bookMarkActions);
		dataList.appendChild(bookMarkDiv);
		
	});
};

window.onload = setup();