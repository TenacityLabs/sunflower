<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    let animate = false;
    
    const remToPixels = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const handleScroll = () => {
        if (window.scrollY > remToPixels(37)) {
            animate = true;
        } else {
            animate = false;
        }
    };

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<nav class="fixed top-0">
    <div class="flex w-full justify-left">
        <div 
            class="relative flex items-center p-8"
            on:mouseover={() => animate = true}
            on:focus={() => animate = true}
            on:mouseleave={() => animate = false}
            on:blur={() => animate = false}
            role="img"
        >
            <span 
                class="w-0 font-arya text-6xl inline-block overflow-hidden 
                text-right transition-all duration-500 ease-in
                {animate && 'w-[18.625rem]'}"
            >
                SUNFLOWER
            </span>
            <img 
                src="/images/sunflower.svg" 
                alt="Sunflower" 
                class="max-h-16 w-auto {animate ? 'animate-spin-reveal' : 'animate-spin-hide'}"
            />
        </div>
    </div>
</nav>