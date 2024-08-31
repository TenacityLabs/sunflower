<script lang="ts">
    import Glide from '@glidejs/glide';
	import { onMount } from 'svelte';
    export let quotes: Array<{ quote: string; author: string; company: string }>;
    export let loaded: boolean;

    let glide: typeof Glide;

    onMount(() => {
        glide = new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
        }).mount();
    });
</script>

<div class="glide flex flex-col items-center justify-center w-full h-screen bg-offwhite text-offblack gap-6 xl:gap-12">
    <div class="w-4/5 flex justify-between items-center gap-3 font-arya text-offblack text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-10 transition-opacity duration-1000 {loaded ? '' : 'opacity-0'}">
        <div>Our Founders</div>
        <div class="glide__arrows flex gap-3 lg:gap-6 items-center justify-center transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left font-bitter" data-glide-dir="<">&#9001;</button>
            <button class="glide__arrow glide__arrow--right font-bitter" data-glide-dir=">">&#9002;</button>
        </div>
    </div>

    <div class="glide__track w-2/3 transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="track">
        <ul class="glide__slides">
            {#each quotes as quote}
            <li class="glide__slide flex flex-col justify-center items-center gap-6">
                <div class="font-bitter text-base sm:text-xl xl:text-2xl w-full text-center">
                    {quote.quote}      
                </div>
                <div class="font-bitter text-base sm:text-xl md:text-2xl  text-dark-green text-center w-full">
                    — {quote.author}, <span class="font-bitter-italic">{quote.company}</span>
                </div>
            </li>
            {/each}
        </ul>
    </div>
</div>
