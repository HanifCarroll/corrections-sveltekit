<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib/apiClient";
import { type CurrentUser, currentUser } from "$lib/store";
import { get } from "svelte/store";

interface Post {
	id: string;
	title: string;
	text: string;
	user: {
		id: string;
		name: string;
	};
	created_at: string;
	corrections: Correction[];
}

interface Correction {
	id: string;
	user: {
		name: string;
	};
	created_at: string;
	correction_sentences_count: number;
}

let post: Post = $page.data.post;
let loggedInUser: CurrentUser | null = get(currentUser);
let postId = $page.params.id;

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

async function deletePost() {
	if (confirm("Are you sure you want to delete this post?")) {
		try {
			await apiClient.delete(`/posts/${postId}`);
			goto("/posts");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	}
}
</script>
    
    <svelte:head>
        <title>Post Details</title>
    </svelte:head>
    
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h1 class="text-3xl font-bold mb-4">{post.title}</h1>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        By {post.user.name} | {formatDate(post.created_at)}
                    </p>
                    <div class="prose dark:prose-invert max-w-none">
                        {post.text}
                    </div>
                    <div class="mt-6 flex">
                        {#if post.user.id !== loggedInUser?.id}
                            <Button variant="primary" on:click={() => goto(`/posts/${post.id}/corrections/new`)}>
                                New Correction
                            </Button>
                        {/if}
                        {#if post.user.id === loggedInUser?.id}
                            <Button variant="secondary" on:click={deletePost} class="text-red-600 border-red-600 hover:bg-red-50">
                                Delete Post
                            </Button>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="mt-8">
                <h2 class="text-2xl font-bold mb-4">Corrections</h2>
                {#if post.corrections}
                    {#each post.corrections as correction}
                        <div class="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg mb-4">
                            <div class="p-6 text-gray-900 dark:text-gray-100">
                                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Corrected by {correction.user.name} | {formatDate(correction.created_at)}
                                </p>
                                <p class="mb-2">
                                    {correction.correction_sentences_count} 
                                    {correction.correction_sentences_count === 1 ? 'sentence' : 'sentences'} corrected
                                </p>
                                <a href="/posts/{post.id}/corrections/{correction.id}" class="text-blue-500 hover:underline">
                                    View correction details
                                </a>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p class="text-gray-600 dark:text-gray-400">No corrections have been made for this post yet.</p>
                {/if}
            </div>
            <div class="mt-4">
                <a href="/posts" class="text-blue-500 hover:underline">
                    &larr; Back to all posts
                </a>
            </div>
        </div>
    </div>