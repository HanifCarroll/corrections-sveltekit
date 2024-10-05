<script lang="ts">
    import Button from "$components/Button.svelte";
    import { onMount } from "svelte";
    let email = "";
    let password = "";
    let remember = false;
    let errors = {
        email: [],
        password: [],
    };
    let status = "";
    
    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    // Example of fetching session status and errors
    onMount(() => {
        // Fetch session status and errors if needed
    });
    </script>
    
    <div class="w-11/12 md:w-1/2 p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mx-auto">
        <form on:submit={handleSubmit}>
            <!-- Session Status -->
            {#if status}
                <div class="mb-4 text-green-600">
                    {status}
                </div>
            {/if}
    
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
                    autocomplete="current-password"
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
    
            <!-- Remember Me -->
            <div class="block mt-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input
                        id="remember_me"
                        type="checkbox"
                        bind:checked={remember}
                        class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                        name="remember"
                    />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
            </div>
    
            <div class="flex items-center justify-end mt-4">
                {#if /* condition to check if password reset route exists */ true}
                    <a
                        href="/password/request"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Forgot your password?
                    </a>
                {/if}
    
                <Button variant="primary" type="submit" className="ms-3">
                    Log in
                </Button>
            </div>
    </form>
</div>
