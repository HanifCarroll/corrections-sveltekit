<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib/apiClient";
import { currentUser } from "$lib/store";
import { get } from "svelte/store";
interface Post {
	id: string;
	user_id: string;
	title: string;
	text: string;
	created_at: string;
	updated_at: string;
	user: {
		id: string;
		name: string;
	};
	sentences: {
		id: string;
		post_id: string;
		sentence_number: number;
		text: string;
	}[];
	corrections: {
		id: string;
		post_id: string;
		user_id: string;
		user: object;
		correction_sentences: any[];
	}[];
}

interface PostSentence {
	id: string;
	text: string;
}

interface CorrectionSentence {
	id: string;
	post_sentence_id: string;
	corrected_text: string;
	explanation: string;
}

interface Correction {
	id: string;
	user_id: string;
	post: {
		id: string;
		text: string;
		sentences: PostSentence[];
	};
	correction_sentences: CorrectionSentence[];
}

let correction: Correction = $page.data.correction;
let post: Post = $page.data.post;
let loggedInUser = get(currentUser);

async function deleteCorrection() {
	if (confirm("Are you sure you want to delete this correction?")) {
		try {
			await apiClient.delete(
				`/posts/${correction.post.id}/corrections/${correction.id}`,
			);
			goto(`/posts/${correction.post.id}`);
		} catch (error) {
			console.error("Error deleting correction:", error);
		}
	}
}
</script>
    
    <svelte:head>
        <title>Correction Details</title>
    </svelte:head>
    
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-semibold mb-4">Original Post</h3>
                    <p class="mb-6">{post.text}</p>
    
                    <h3 class="text-lg font-semibold mb-4">Corrections</h3>
                    {#each post.sentences as postSentence}
                        {@const correctionSentence = correction.correction_sentences.find(cs => cs.post_sentence_id === postSentence.id)}
                        {@const isCorrected = correctionSentence && correctionSentence.corrected_text !== postSentence.text}
                        <div class="mb-6 p-4 border rounded {isCorrected ? 'bg-yellow-50 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-600' : 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-600'}">
                            <div class="mb-2">
                                <label class="block text-sm font-medium {isCorrected ? 'text-yellow-700 dark:text-yellow-300' : 'text-green-700 dark:text-green-300'}">
                                    {isCorrected ? 'Sentence (Corrected)' : 'Sentence (No Correction Needed)'}
                                </label>
                                <p>{postSentence.text}</p>
                            </div>
    
                            {#if isCorrected && correctionSentence}
                                <div class="mb-2">
                                    <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300">Correction</label>
                                    <p>{correctionSentence.corrected_text}</p>
                                </div>
    
                                {#if correctionSentence.explanation}
                                    <div>
                                        <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300">Explanation</label>
                                        <p>{correctionSentence.explanation}</p>
                                    </div>
                                {/if}
                            {/if}
                        </div>
                    {/each}
    
                    <div class="mt-6 flex space-x-8">
                        <Button variant="primary" on:click={() => goto(`/posts/${correction.post.id}`)}>
                            Back to Post
                        </Button>
                        {#if correction.user_id === loggedInUser.id}
                            <Button variant="secondary" on:click={deleteCorrection} class="text-red-600 border-red-600 hover:bg-red-50">
                                Delete Correction
                            </Button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>