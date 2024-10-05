import { apiClient } from "$lib/apiClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { postId, correctionId } = params;
		const [post, correction] = await Promise.all([
			apiClient.get(`/posts/${postId}`),
			apiClient.get(`/corrections/${correctionId}`)
		]);
		return {
			post: post.data,
			correction: correction.data,
		};
	} catch (error) {
		console.error("Error fetching correction:", error);
		return {
			post: null,
			correction: null,
		};
	}
};
