<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$components/Button.svelte";
import { apiClient } from "$lib/apiClient";
import { currentUser } from "$lib/store";
import { AxiosError } from "axios";

let email = "";
let password = "";
let loginError = "";

const handleSubmit = async (e: SubmitEvent) => {
	e.preventDefault();
	try {
		const response = await apiClient.post("/login", {
			email,
			password,
		});
		currentUser.set({
			name: response.data.name,
			email: response.data.email,
			authToken: response.data.token,
		});
		goto("/posts");
	} catch (error) {
		if (error instanceof AxiosError) {
			loginError =
				error.response?.data?.message ?? "An error occurred while logging in";
		} else {
			loginError = "An error occurred while logging in";
		}
	}
};
</script>
    
    <div class="w-11/12 md:w-1/2 p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mx-auto">
    
        <form on:submit={handleSubmit}>

            <!-- Email Address -->
            <div>
                <label for="email" class="block font-medium text-sm text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    required
                    autofocus
                    autocomplete="username"
                    class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                />
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
                    autocomplete="current-password"
                    class="border p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                />
            </div>

        {#if loginError}
            <div class="my-4 text-red-600 dark:text-red-400">
                {loginError}
            </div>
        {/if}
    
            <div class="flex items-center justify-end mt-4">
                <Button variant="primary" type="submit" className="ms-3">
                    Log in
                </Button>
            </div>
    </form>
</div>
