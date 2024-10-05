<script lang="ts">
import Header from "../components/Header.svelte";
import "../app.css";
import { page } from "$app/stores";
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900">
  <Header />

  <!-- Page Heading -->
  {#if $page.data.header}
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <svelte:component this={$page.data.header} />
      </div>
    </header>
  {/if}

  <!-- Page Content -->
  <main>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <slot />
      </div>
    </div>
  </main>
</div>

<style>
  :global(body) {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
