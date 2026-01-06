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


const newData = [ 
	{ title: "here", description: "hello this is me!", link: "https://google.com", timestamp: Date.now() },
	{ title: "here2", description: "hello this is me!2", link: "https://facebookc.com", timestamp: Date.now() }
];
setData("1", newData);

function setup () {
	
	const users = getUserIds();
	
	fillDropdown(users);
	
	showDataList(1);

	selectIdDropDown.addEventListener("change", () => {
		const selectedId = selectIdDropDown.value;
		console.log(selectedId);
		// render ();

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
}

function showDataList(dataOfUser) {
	
	dataOfUser = getData(dataOfUser);
	
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