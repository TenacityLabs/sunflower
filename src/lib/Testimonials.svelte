<script lang="ts">
    import Glide from '@glidejs/glide';
	import { onMount } from 'svelte';
    export let quotes: Array<{ text: string; author: string; company: string }>;
    export let loaded: boolean;
    export let isAutoplay: boolean;

    let glide: typeof Glide;

    function togglePause() {
        if (isAutoplay) glide.pause();
        else glide.play();
        isAutoplay = !isAutoplay;
    }

    onMount(() => {
        glide = new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: 3000,
        }).mount();
    });
</script>

<div class="glide flex flex-col items-center justify-center w-full h-screen bg-offwhite text-offblack gap-6 xl:gap-12">
    <div class="w-4/5 flex justify-center items-center gap-3 font-arya text-offblack text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-10 transition-opacity duration-1000 {loaded ? '' : 'opacity-0'}">
        Our Founders
    </div>

    <div class="glide__arrows flex gap-3 lg:gap-6 items-center justify-center transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="controls">
        <button on:click={togglePause} class="bg-no-repeat bg-contain h-8 w-8 {isAutoplay ? 'bg-[url(/images/pause.svg)]' : 'bg-[url(/images/play.svg)]'}">&nbsp;</button>
        <button class="glide__arrow glide__arrow--left font-semibold text-3xl font-bitter leading-none" data-glide-dir="<">&#9001;</button>
        <button class="glide__arrow glide__arrow--right font-semibold text-3xl font-bitter" data-glide-dir=">">&#9002;</button>
        <div id="slideCounter" class="text-3xl font-bitter-italic leading-none"> 1 / {quotes.length}</div>
    </div>

    <div class="glide__track w-2/3 lg:w-1/2 transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="track">
        <ul class="glide__slides">
            {#each quotes as quote}
            <li class="glide__slide flex flex-col justify-center items-center gap-6 w-1/2">
                <div class="font-bitter text-base sm:text-xl xl:text-2xl w-full text-center">
                    {quote.text}      
                </div>
                <div class="font-bitter text-base sm:text-xl md:text-2xl  text-dark-green text-center w-full">
                    — {quote.author}, <span class="font-bitter-italic">{quote.company}</span>
                </div>
            </li>
            {/each}
        </ul>
    </div>
</div>
