import { apiClient } from "$lib/apiClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const response = await apiClient.get(`/posts/${params.id}`);
		return {
			post: response.data,
		};
	} catch (error) {
		console.error("Error fetching post:", error);
		return {
			post: null,
		};
	}
};
