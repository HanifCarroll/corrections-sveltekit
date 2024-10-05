<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib/apiClient";

interface Sentence {
	id: string;
	text: string;
}

interface Post {
	id: string;
	text: string;
	sentences: Sentence[];
}

let post: Post = $page.data.post;
let corrections: { text: string; correction: string; explanation: string }[] =
	post.sentences.map((sentence) => ({
		text: sentence.text,
		correction: "",
		explanation: "",
	}));

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	try {
		const response = await apiClient.post(`/posts/${post.id}/corrections`, { corrections });
		goto(`/posts/${post.id}/corrections/${response.data.id}`);
	} catch (error) {
		console.error("Error submitting correction:", error);
	}
}
</script>
    
    <svelte:head>
        <title>New Correction</title>
    </svelte:head>
    
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form on:submit={handleSubmit}>
                        <div class="mb-4">
                            <h3 class="text-lg font-semibold mb-2">Original Post</h3>
                            <p class="mb-4">{post.text}</p>
                        </div>
    
                        <div id="corrections-container">
                            {#each post.sentences as sentence, index}
                                <div class="mb-6 p-4 border border-gray-300 dark:border-gray-600 rounded">
                                    <input type="hidden" bind:value={corrections[index].text} class="border">
                                    
                                    <div class="mb-2">
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Original Sentence</label>
                                        <p>{sentence.text}</p>
                                    </div>
    
                                    <div class="mb-2">
                                        <label for="correction_{index}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Correction</label>
                                        <input
                                            id="correction_{index}"
                                            bind:value={corrections[index].correction}
                                            type="text"
                                            class="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white border"
                                        />
                                    </div>
    
                                    <div>
                                        <label for="explanation_{index}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Explanation</label>
                                        <input
                                            id="explanation_{index}"
                                            bind:value={corrections[index].explanation}
                                            type="text"
                                            class="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white border"
                                        />
                                    </div>
                                </div>
                            {/each}
                        </div>
    
                        <div class="mt-6">
                            <Button variant="primary" type="submit">
                                Submit Correction
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>