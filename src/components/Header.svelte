<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount, createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { axiosClient } from '$lib/axios';

  let open = false;
  let user: { name: string; email: string } | null = null;
  let dropdownOpen = false;

  onMount(async () => {
    try {
      const response = await axiosClient.get('/user');
      user = response.data;
    } catch (error) {
      user = null;
    }
  });

  async function logout() {
    try {
      await axiosClient.post('/logout');
      goto('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (dropdownOpen && !target?.closest('.dropdown')) {
      dropdownOpen = false;
    }
  }

  const dispatch = createEventDispatcher();

  function closeDropdown() {
    dropdownOpen = false;
    dispatch('close');
  }

  function navLinkClass(active: boolean) {
    return active
      ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
      : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out';
  }

  function responsiveNavLinkClass(active: boolean) {
    return active
      ? 'block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-start text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out'
      : 'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out';
  }
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
  <!-- Primary Navigation Menu -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <!-- Logo -->
        <div class="shrink-0 flex items-center">
          <a href="/" class="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Corrections
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
          <a href="/" class={navLinkClass($page.url.pathname === '/')}>
            Dashboard
          </a>
          <a href="/posts" class={navLinkClass($page.url.pathname === '/posts')}>
            Posts
          </a>
        </div>
      </div>

      <!-- Settings Dropdown or Login/Register Links -->
      <div class="hidden sm:flex sm:items-center sm:ms-6">
        {#if user}
          <div class="relative dropdown">
            <div on:click={() => dropdownOpen = !dropdownOpen}>
              <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                <div>{user.name}</div>

                <div class="ms-1">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>

            {#if dropdownOpen}
              <div
                transition:scale={{ duration: 200, start: 0.95 }}
                class="absolute z-50 mt-2 w-48 rounded-md shadow-lg ltr:origin-top-right rtl:origin-top-left end-0"
                on:click={closeDropdown}
              >
                <div class="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white dark:bg-gray-700">
                  <a href="/profile" class="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
                    Profile
                  </a>
                  <form on:submit|preventDefault={logout}>
                    <button type="submit" class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
                      Log Out
                    </button>
                  </form>
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <div class="flex space-x-4">
            <a href="/login" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Login</a>
            <a href="/register" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Register</a>
          </div>
        {/if}
      </div>

      <!-- Hamburger -->
      <div class="-me-2 flex items-center sm:hidden">
        <button on:click={() => open = !open} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path class:hidden={!open} class:inline-flex={open} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path class:hidden={open} class:inline-flex={!open} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Responsive Navigation Menu -->
  <div class:hidden={!open} class="sm:hidden">
    <div class="pt-2 pb-3 space-y-1">
      <a href="/dashboard" class={responsiveNavLinkClass($page.url.pathname === '/dashboard')}>
        Dashboard
      </a>
      <a href="/posts" class={responsiveNavLinkClass($page.url.pathname === '/posts')}>
        Posts
      </a>
    </div>

    <!-- Responsive Settings Options or Login/Register Links -->
    <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
      {#if user}
        <div class="px-4">
          <div class="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
          <div class="font-medium text-sm text-gray-500">{user.email}</div>
        </div>

        <div class="mt-3 space-y-1">
          <a href="/profile" class={responsiveNavLinkClass(false)}>
            Profile
          </a>

          <!-- Authentication -->
          <form on:submit|preventDefault={logout}>
            <button type="submit" class={responsiveNavLinkClass(false)}>
              Log Out
            </button>
          </form>
        </div>
      {:else}
        <div class="mt-3 space-y-1">
          <a href="/login" class={responsiveNavLinkClass(false)}>
            Login
          </a>
          <a href="/register" class={responsiveNavLinkClass(false)}>
            Register
          </a>
        </div>
      {/if}
    </div>
  </div>
</nav>