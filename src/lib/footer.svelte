<script>
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<div class="flex justify-center items-center w-full h-20 sm:h-24 bg-offwhite px-4 sm:px-8" id="footer">
    <div
        on:click={scrollToTop} 
        on:keypress={scrollToTop}
        role="button"
        tabindex="0"
        class="text-center cursor-pointer"
    >
        <h1 class="font-bitter text-darkish-brown text-sm sm:text-base lg:text-lg xl:text-xl pl-4 sm:pl-8">
            ↑ Back to Top © Sunflower Capital 2024
        </h1>
    </div>
</div>