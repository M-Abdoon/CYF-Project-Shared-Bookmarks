import assert from "node:assert";
import test from "node:test";
import { getUserIds } from "./storage.js";
import { enterData } from "./logic.js";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("check enterData() isn't accepting empty entries", () => {
	assert.equal(enterData(), false);
	assert.equal(enterData("","","",), false);
	assert.equal(enterData("title","","description",1), false);

});

test("Check enterData() is accepts only valid entries", () => {
	assert.equal(enterData("title","link",{thisKey: "thisValue"},1), false)
	assert.equal(enterData([],null,"desc",1), false)
});