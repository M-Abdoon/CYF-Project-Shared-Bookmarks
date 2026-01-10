/**
 * @jest-environment jsdom
 */
import { getData, setData, getUserIds, clearData } from "./storage.js";
import "jest-localstorage-mock";

// -----------------
// اختبارات storage.js
// -----------------
describe("Storage Functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("getUserIds returns 5 users", () => {
    expect(getUserIds().length).toBe(5);
    expect(getUserIds()).toContain("1");
  });

  test("setData and getData store and retrieve data", () => {
    const userId = "1";
    const data = [{ title: "Test" }];
    setData(userId, data);
    expect(getData(userId)).toEqual(data);
  });

  test("clearData removes data from localStorage", () => {
    const userId = "1";
    setData(userId, [{ title: "Test" }]);
    clearData(userId);
    expect(getData(userId)).toBeNull();
  });
});

// -----------------
// اختبارات enterData
// -----------------
let selectedId = "1";

function enterData(enteredTitle, enteredLink, enteredDescription) {
  if (enteredTitle === "" || enteredLink === "" || enteredDescription === "") {
    alert("all fields must be filled");
    return false;
  }

  let getUserBookmark = getData(selectedId) ?? [];

  const newEntryJson = {
    title: enteredTitle,
    link: enteredLink,
    description: enteredDescription,
    timestamp: Date.now(),
  };

  getUserBookmark.push(newEntryJson);
  setData(selectedId, getUserBookmark);
  return getUserBookmark;
}

describe("enterData Function", () => {
  beforeEach(() => {
    localStorage.clear();
    global.alert = jest.fn();
  });

  test("returns false and calls alert if any field is empty", () => {
    const result = enterData("", "link", "desc");
    expect(result).toBe(false);
    expect(global.alert).toHaveBeenCalledWith("all fields must be filled");
  });

  test("adds new entry to bookmarks", () => {
    const result = enterData("Title", "link", "Description");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Title");
    expect(result[0].link).toBe("link");
    expect(result[0].description).toBe("Description");

    // تأكد من تخزينه في localStorage
    expect(getData(selectedId)).toEqual(result);
  });
});
