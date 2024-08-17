<script>
    import { onMount, onDestroy } from "svelte";
    let scrolled = false;

    onMount(() => {
        window.addEventListener('scroll', () => {
        const navbar = document.getElementsByTagName('nav')[0];
        if (window.scrollY > 0) {
            scrolled = true
        } else {
            scrolled = false
        }
     });
    });
</script>

<nav class="fixed top-0 w-screen bg-transparent z-40 transition-opacity duration-1000 {scrolled ? 'opacity-100' : 'opacity-0'}">
    <div class="flex w-full justify-center">
        <div 
            class="relative flex items-center p-4"
        >
            <img 
                src="/images/sunflower.svg" 
                alt="Sunflower" 
                class="max-h-16 w-auto pr-3"
            />
        </div>
    </div>
</nav>