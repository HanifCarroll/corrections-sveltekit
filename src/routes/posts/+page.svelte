<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib/apiClient";
import { onMount } from "svelte";

interface Post {
	id: string;
	title: string;
	text: string;
	user: {
		name: string;
	};
	created_at: string;
}

interface PaginationData {
	current_page: number;
	last_page: number;
	total: number;
	per_page: number;
}

let posts: Post[] = [];
let paginationData: PaginationData;
let currentPage = 1;

async function fetchPosts(page: number) {
	try {
		const response = await apiClient.get(`/posts?page=${page}`);
		posts = response.data.data;
		paginationData = {
			current_page: response.data.current_page,
			last_page: response.data.last_page,
			total: response.data.total,
			per_page: response.data.per_page
		};
		currentPage = page;
	} catch (error) {
		console.error("Error fetching posts:", error);
	}
}

onMount(() => {
	fetchPosts(1);
});

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function truncateText(text: string, limit: number): string {
	return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function goToPage(page: number) {
	if (page >= 1 && page <= paginationData.last_page) {
		fetchPosts(page);
	}
}
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<div class="py-6">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
				Posts
			</h1>
			<Button variant="primary" on:click={() => goto('/posts/new')}>
				New Post
			</Button>
		</div>

		<div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
			<div class="p-6 text-gray-900 dark:text-gray-100">
				{#each posts as post}
					<div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
						<h3 class="text-lg font-semibold">
							<a href="/posts/{post.id}" class="hover:underline">
								{post.title}
							</a>
						</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							By {post.user.name} | {formatDate(post.created_at)}
						</p>
						<p class="mt-2">
							{truncateText(post.text, 150)}
						</p>
					</div>
				{/each}

				{#if posts.length === 0}
					<p class="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
				{/if}

				{#if paginationData}
					<div class="mt-6 flex justify-between items-center">
						<div class="text-sm text-gray-700 dark:text-gray-300">
							Showing {paginationData.per_page * (paginationData.current_page - 1) + 1} to {Math.min(paginationData.per_page * paginationData.current_page, paginationData.total)} of {paginationData.total} results
						</div>
						<div class="flex space-x-2">
							<Button 
								variant="secondary" 
								on:click={() => goToPage(currentPage - 1)} 
								disabled={currentPage === 1}
							>
								Previous
							</Button>
							<Button 
								variant="secondary" 
								on:click={() => goToPage(currentPage + 1)} 
								disabled={currentPage === paginationData.last_page}
							>
								Next
							</Button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>