<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib";
import { currentUser } from "$lib/store";
import { AxiosError } from "axios";

let name = "";
let email = "";
let password = "";
let passwordConfirmation = "";
let errors = {
	name: [],
	email: [],
	password: [],
	passwordConfirmation: [],
};

const handleSubmit = async (e: SubmitEvent) => {
	e.preventDefault();
	try {
		const response = await apiClient.post("/register", {
			name,
			email,
			password,
			password_confirmation: passwordConfirmation,
		});
		currentUser.set(response.data);
		goto("/posts");
	} catch (error) {
		if (error instanceof AxiosError && error.response?.data?.errors) {
			errors = {
                name: error.response.data.errors.name || [],
                email: error.response.data.errors.email || [],
				password: error.response.data.errors.password || [],
				passwordConfirmation:
					error.response.data.errors.password_confirmation || [],
			};
		}
	}
};
</script>

<div class="w-11/12 md:w-1/2 p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mx-auto">
    <form on:submit={handleSubmit}>

        <!-- Name -->
        <div>
            <label for="name" class="block font-medium text-sm text-gray-700 dark:text-gray-300">
                Name
            </label>
            <input
                id="name"
                type="text"
                bind:value={name}
                required
                autofocus
                autocomplete="name"
                class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
            />
            {#if errors.name.length > 0}
                <ul class="text-sm text-red-600 dark:text-red-400 space-y-1 mt-2">
                    {#each errors.name as error}
                        <li>{error}</li>
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <label for="email" class="block font-medium text-sm text-gray-700 dark:text-gray-300">
                Email
            </label>
            <input
                id="email"
                type="email"
                bind:value={email}
                required
                autocomplete="username"
                class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
            />
            {#if errors.email.length > 0}
                <ul class="text-sm text-red-600 dark:text-red-400 space-y-1 mt-2">
                    {#each errors.email as error}
                        <li>{error}</li>
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- Password -->
        <div class="mt-4">
            <label for="password" class="block font-medium text-sm text-gray-700 dark:text-gray-300">
                Password
            </label>
            <input
                id="password"
                type="password"
                bind:value={password}
                required
                autocomplete="new-password"
                class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
            />
            {#if errors.password.length > 0}
                <ul class="text-sm text-red-600 dark:text-red-400 space-y-1 mt-2">
                    {#each errors.password as error}
                        <li>{error}</li>
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <label for="password_confirmation" class="block font-medium text-sm text-gray-700 dark:text-gray-300">
                Confirm Password
            </label>
            <input
                id="password_confirmation"
                type="password"
                bind:value={passwordConfirmation}
                required
                autocomplete="new-password"
                class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
            />
            {#if errors.passwordConfirmation.length > 0}
                <ul class="text-sm text-red-600 dark:text-red-400 space-y-1 mt-2">
                    {#each errors.passwordConfirmation as error}
                        <li>{error}</li>
                    {/each}
                </ul>
            {/if}
        </div>

        <div class="flex items-center justify-end mt-4">
            <a
                href="/login"
                class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
                Already registered?
            </a>

            <Button variant="primary" type="submit" className="ms-3">
                Register
            </Button>
        </div>
    </form>
</div>