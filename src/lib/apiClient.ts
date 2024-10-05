import axios from "axios";
import { get } from "svelte/store";
import { currentUser } from "./store";

export const apiClient = axios.create({
	baseURL: "http://localhost:8000/api",
});

// Use Axios interceptors to inject the token into every request
apiClient.interceptors.request.use(
	(config) => {
		const token = get(currentUser).authToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
