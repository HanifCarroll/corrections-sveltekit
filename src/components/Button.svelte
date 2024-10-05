<script lang="ts">
export let variant: "primary" | "secondary" = "primary";
export let type: "button" | "submit" | "reset" | null = "button";
export let className = "";
export let disabled = false;
</script>

<button
    {type}
    {disabled}
    class={`inline-flex items-center px-4 py-2 
        ${
            variant === "primary"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        border-transparent rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
        transition ease-in-out duration-150 ${className}`}
    {...$$restProps}
>
    <slot />
</button>