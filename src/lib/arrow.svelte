<script lang="ts">
    export let scrollToId = '';

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function scrollDown() {
        const element = document.getElementById(scrollToId);
        if (!element) return;

        const start = window.pageYOffset;
        const end = element.getBoundingClientRect().top + start;
        const duration = 2000; // Duration in milliseconds (1 second)
        /**
		 * @type {number | null}
		 */
        let startTime: number | null = null;

        /**
		 * @param {number | null} currentTime
		 */
        function animateScroll(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            // @ts-ignore
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Progress from 0 to 1
            const ease = easeInOutQuad(progress);
            window.scrollTo(0, start + (end - start) * ease);
            if (timeElapsed < duration) requestAnimationFrame(animateScroll);
        }

        requestAnimationFrame(animateScroll);
    }
</script>

<div
    on:click={scrollDown} 
    on:keypress={scrollDown}
    role='button'
    tabindex="0"
>
    <img src='/images/downarrow.svg' alt="arrow" />
</div>
