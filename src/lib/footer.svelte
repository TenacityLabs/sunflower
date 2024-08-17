<script>
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<div class="flex justify-center items-center w-screen h-24 bg-offwhite" id="footer">
    <div
    on:click={scrollToTop} 
    on:keypress={scrollToTop}
    role='button'
    tabindex="0"
    >
        <h1 class="font-bitter text-darkish-brown pl-8">↑ Back to Top © Sunflower Capital 2024</h1>
    </div>
</div>
