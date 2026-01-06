// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getData } from "./storage.js";
import { setData } from "./storage.js";
import { getUserIds } from "./storage.js";
import { clearData } from "./storage.js";


window.onload = function () {
	setData("1", { title: "here", description: "hello this is me!" });

	const users = getUserIds();
	const dataOfUser = getData(1);

	//document.querySelector("body").textContent = `There are ${users.length} users || `;

	//document.querySelector("body").textContent += JSON.stringify(dataOfUser);

	//clearData(1);
	localStorage.clear();

	//document.querySelector("body").textContent += `${JSON.stringify(dataOfUser)} d`;

};
