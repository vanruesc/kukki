import test from "ava";
import browserEnv from "browser-env";
import { Kukki } from "../build/kukki.js";

browserEnv(["document"]);

test("can set a cookie", t => {

	const value = "value";

	Kukki.set("key", value);

	t.pass();

});

test("can get the value of a cookie", t => {

	const value = "value";

	Kukki.set("key", value);

	t.is(Kukki.get("key"), value, "should return the value of the cookie");

});

test("can check if a cookie exists", t => {

	const value = "value";

	Kukki.set("key", value);

	t.is(Kukki.has("key"), true, "should be able to determine whether a cookie exists");

});

test("can delete a cookie", t => {

	const value = "value";

	Kukki.set("key", value);

	t.is(Kukki.has("key"), true, "the cookie should be set");

	Kukki.delete("key");

	t.is(Kukki.has("key"), false, "the cookie should be deleted");

});

test("can list all cookies", t => {

	const keys = ["key1", "key2", "key3"];
	const value = "value";

	Kukki.set(keys[0], value);
	Kukki.set(keys[1], value);
	Kukki.set(keys[2], value);

	t.deepEqual(Kukki.keys(), keys, "should list all cookies");

});
