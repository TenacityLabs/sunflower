<!-- <script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    let animate = false;
    
    const remToPixels = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const handleScroll = () => {
        if (remToPixels(37) < window.scrollY && window.scrollY < remToPixels(58)) {
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
</script> -->

<nav class="fixed top-0 w-screen bg-offwhite z-40">
    <div class="flex w-full justify-left">
        <div 
            class="relative flex items-center p-8"
        >
            <img 
                src="/images/sunflower.svg" 
                alt="Sunflower" 
                class="max-h-16 w-auto pr-3"
            />
            <span 
            class="w-fit font-arya text-6xl tracking-widest"
        >
            SUNFLOWER CAPITAL
        </span>
        </div>
    </div>
</nav>