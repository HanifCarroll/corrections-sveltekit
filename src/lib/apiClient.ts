import axios from "axios";
import { get } from "svelte/store";
import { currentUser } from "./store";
import { browser } from "$app/environment";

export const apiClient = axios.create({
	baseURL: "http://localhost:8000/api",
});

// Use Axios interceptors to inject the token into every request
apiClient.interceptors.request.use(
	(config) => {
		if (browser) {
			// Client-side: Use the token from the store
			const token = get(currentUser).authToken;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} else {
			// Server-side: Use the token from the cookie
			const cookies = config.headers.cookie;
			if (cookies) {
				const authToken = cookies.split(';').find(c => c.trim().startsWith('authToken='));
				if (authToken) {
					const token = authToken.split('=')[1];
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
