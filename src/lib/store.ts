import { browser } from "$app/environment";
import { writable } from "svelte/store";

export interface CurrentUser {
	id: string;
	name: string;
	email: string;
	authToken: string;
}

function createPersistedStore<T>(key: string, initialValue: T) {
	const store = writable<T>(initialValue);

	if (browser) {
		const storedValue = window.localStorage.getItem(key);
		if (storedValue) {
			store.set(JSON.parse(storedValue));
		}

		store.subscribe((value) => {
			window.localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

// Create a store for the currentUser
export const currentUser = createPersistedStore<CurrentUser>("currentUser", {
	id: "",
	name: "",
	email: "",
	authToken: "",
});
