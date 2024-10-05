import { apiClient } from "$lib/apiClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const response = await apiClient.get(`/posts/${params.postId}`);
		console.log('data', response.data);
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
