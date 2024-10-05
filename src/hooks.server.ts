import { apiClient } from "$lib/apiClient";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.request.headers.get("cookie");
	if (cookies) {
		apiClient.defaults.headers.common.cookie = cookies;
	}

	const response = await resolve(event);
	return response;
};
