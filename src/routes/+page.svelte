<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Arrow from '$lib/arrow.svelte';
    import Glide from '@glidejs/glide';

    let index = 0;
    let isAutoplay = true;
    let mobile = false;
    let scrolled = false;
    let loaded = false;
    let visible = false;
    let handle = true;
    let lastScrollTop = 0;
    let scrollingDown = true;
    let background: HTMLDivElement | null = null;
    let section1: HTMLDivElement | null = null;
    let section2: HTMLDivElement | null = null;
    let section3: HTMLDivElement | null = null;
    let section4: HTMLDivElement | null = null;
    let section5: HTMLDivElement | null = null;
    let centerflower: HTMLDivElement | null = null;
    const scrollFactor = 0.3

    const quotes = [
        {
            text: "Liu is the most energetic investor I've ever met. We raised our seed round during Covid, and Liu was one of the first to commit to investing. She made more intros and was more engaged than anyone else - without her enthusiasm I don't know how we'd have closed the round!",
            author: "James Hawkins",
            company: "Posthog"
        },
        {
            text: "Liu has been an incredible partner for Unkey. Whenever we need a sounding board on GTM strategy, Liu is ready to jump in. We see Liu as an extension of our team — she really helps drive our success and growth.",
            author: "James Perkins",
            company: "Unkey"
        },
        {
            text: "Liu built a relationship with us while we were still at Uber building Michelangelo. She has the conviction to help colead our seed and Series A, and she was pivotal in helping us hire our early team and close our first few customers.",
            author: "Kevin Stumpf",
            company: "Tecton"
        },
        {
            text: "Quality is really what really sets Liu apart from other investors. Working with Liu was unique because she was extremely proactive. She was always trying to find ways to help, not just relying on me to think about what I needed. We had regular discussions on topics ranging from customer negotiations to internal operations to creating a standard around Iceberg.",
            author: "Ryan Blue",
            company: "Tabular"
        },
        {
            text: "Liu has been an invaluable investor for Warp, going way beyond just investing money, to investing a bunch of her time helping us with GTM, Growth and Product. She brings deep expertise in the developer space, and we've learned a lot working with her. She is more willing and able than most investors to roll up her sleeves and help the leadership team operate.",
            author: "Zach Lloyd",
            company: "Warp"
        },
        {
            text: "Liu led our pre-seed. She is the investor you want on your team early on if you really care about GTM, getting customers, and smartly positioning your product. She will make you think from first principles and ask you the right set of guiding questions, while also opening a lot of doors to folks in the industry and other founders.",
            author: "Vasek Mlejnsky",
            company: "E2B"
        },
        {
            text: "Liu strikes the perfect balance of an early stage partner. She was one of the first to back us at the pre-seed, and she’s supported us consistently. She'll trail all your investor updates, ready to provide critical guidance immediately when called upon. Whether it's GTM, product, or just hard founder shit, she's got you.",
            author: "Jake Cooper",
            company: "Railway"
        },
        {
            text: "Liu is fantastic to work with. She’s easy to talk to and strategically astute. She happily makes intros to her excellent network, and she’s been a tremendous value add at helping us with customer intros.",
            author: "Zach Long",
            company: "ConductorAI"
        },
        {
            text: "Liu is always accessible and genuinely understands the challenges of early-stage companies. She has been crucial in helping us connect with the right customers and clearly define our target audience. Her insights and practical advice have been essential in refining our go-to-market strategy and product direction. Our sessions with her are focused and productive, tackling critical topics with depth.",
            author: "Aamir Shakir",
            company: "Mixedbread"
        }
    ];

    const companies = [
        { company: 'Accrue Savings', industry: 'Fintech', description: 'Save now, buy later', link: 'https://www.accruesavings.com/' },
        { company: 'AgentSync', industry: 'Fintech', description: 'Automating insurance compliance', link: 'https://agentsync.io/' },
        { company: 'Athelas', industry: 'Healthcare', description: 'Integrated healthcare operations platform', link: 'https://www.athelas.com/' },
        { company: 'Cal', industry: 'Infra', description: 'Open source scheduling infrastructure', link: 'http://cal.com' },
        { company: 'Clay', industry: 'SaaS', description: 'Scaling GTM with data enrichment and personalized outreach', link: 'http://clay.com' },
        { company: 'Cohere', industry: 'AI/ML', description: 'LLMs and RAG capabilities for enterprises', link: 'https://cohere.com/' },
        { company: 'Comfy', industry: 'AI/ML', description: 'The ComfyUI company', link: 'https://www.comfy.org/' },
        { company: 'ConductorAI', industry: 'Defense and Hardware', description: 'Cohere', link: 'https://conductorai.co/' },
        { company: 'DBT', industry: 'Data', description: 'Transforming data in your warehouse', link: 'https://www.getdbt.com/' },
        { company: 'Deel', industry: 'SaaS', description: 'Powering the future of global HR', link: 'https://www.deel.com/' },
        { company: 'E2B', industry: 'AI/ML', description: 'Code interpreting for AI apps', link: 'https://e2b.dev/' },
        { company: 'Footprint', industry: 'Security', description: 'KYC and identity verification', link: 'http://onefootprint.com' },
        { company: 'Freshpaint', industry: 'Healthcare', description: 'Enabling patient privacy and HIPAA compliance', link: 'https://www.freshpaint.io/' },
        { company: 'Gantry', industry: 'AI/ML', description: 'Machine learning observability', link: 'https://gantry.io/' },
        { company: 'Gem', industry: 'SaaS', description: 'Recruiting with speed and efficiency', link: 'https://www.gem.com/' },
        { company: 'Great Expectations', industry: 'Data', description: 'Open source data quality and collaboration', link: 'https://greatexpectations.io/' },
        { company: 'Hadrian', industry: 'Defense and Hardware', description: 'Manufacturing the future', link: 'https://www.hadrian.co/' },
        { company: 'Houm', industry: 'Fintech', description: 'Real estate marketplace for Latin America', link: 'https://www.houm.com/' },
        { company: 'Knock', industry: 'Infra', description: 'Flexible, reliable notifications infrastructure', link: 'https://knock.app/' },
        { company: 'MemGPT', industry: 'AI/ML', description: 'Long-term memory for AI agents', link: 'https://memgpt.ai/' },
        { company: 'Modelbit', industry: 'AI/ML', description: 'ML engineering platform for deploying models', link: 'https://www.modelbit.com/' },
        { company: 'Monad', industry: 'Crypto', description: 'Extreme Parallelized Performance for EVM', link: 'https://www.monad.xyz/' },
        { company: 'Nebra', industry: 'Crypto', description: 'Universal Proof Aggregation that Scales ZKP Verification', link: 'https://www.nebra.one/' },
        { company: 'Ollama', industry: 'AI/ML', description: 'Easiest way to get up and running with LLMs', link: 'https://ollama.com/' },
        { company: 'OpenMeter', industry: 'Developer', description: 'Open source AI and cloud metering for developers', link: 'https://openmeter.io/' },
        { company: 'Posthog', industry: 'Data', description: 'Open source product analytics', link: 'https://posthog.com/' },
        { company: 'Project Discovery', industry: 'Security', description: 'Open source vulnerability scanning', link: 'https://projectdiscovery.io/' },
        { company: 'Railway', industry: 'Infra', description: 'Deploy software instantly at scale', link: 'https://railway.app/' },
        { company: 'Readyset', industry: 'Infra', description: 'SQL caching engine', link: 'https://readyset.io/' },
        { company: 'Responsive', industry: 'Infra', description: 'Managed Kafka Streams', link: 'https://responsive.dev/' },
        { company: 'Retool', industry: 'Developer', description: 'Fastest way to build internal software', link: 'https://retool.com/' },
        { company: 'Roboflow', industry: 'AI/ML', description: 'Build and deploy computer vision models faster and more accurately', link: 'https://roboflow.com/' },
        { company: 'Scroll', industry: 'Crypto', description: 'zkEVM scaling solution for Ethereum', link: 'https://scroll.io/' },
        { company: 'Semgrep', industry: 'Security', description: 'Guiding developers towards secure by default practices', link: 'https://semgrep.dev/' },
        { company: 'Statsig', industry: 'Data', description: 'Feature management and experimentation platform', link: 'https://www.statsig.com/' },
        { company: 'Tabular (acquired by Databricks)', industry: 'Data', description: 'Storage platform from the creators of Apache Iceberg', link: 'https://tabular.io/' },
        { company: 'Taktile', industry: 'Fintech', description: 'Automating risk decisions for fintechs and banks', link: 'https://taktile.com/' },
        { company: 'Tecton', industry: 'AI/ML', description: 'Abstracting away data engineering for AI', link: 'https://tecton.ai/' },
        { company: 'Temporal', industry: 'Infra', description: 'Open source durable execution', link: 'https://temporal.io/' },
        { company: 'Tldraw', industry: 'Developer', description: 'Collaborative whiteboarding with an infinite canvas', link: 'https://www.tldraw.com/' },
        { company: 'TollBit', industry: 'AI/ML', description: 'AI content monetization at scale', link: 'https://tollbit.com/' },
        { company: 'Trucksmarter', industry: 'SaaS', description: 'Build, manage, and grow your trucking business', link: 'https://trucksmarter.com/' },
        { company: 'Truffle', industry: 'Security', description: 'Open source secret scanning', link: 'https://trufflesecurity.com/' },
        { company: 'Unkey', industry: 'Developer', description: 'Redefining API management', link: 'https://www.unkey.com/' },
        { company: 'Vercel', industry: 'Developer', description: 'The frontend cloud for a faster, personalized web', link: 'https://vercel.com/' },
        { company: 'Verkada', industry: 'Defense and Hardware', description: 'Integrated physical security platform', link: 'https://www.verkada.com/' },
        { company: 'Warp', industry: 'Developer', description: 'The modern terminal, reimagined with AI', link: 'https://www.warp.dev/' },
        { company: 'Xata', industry: 'Infra', description: 'Serverless data platform for PostgreSQL', link: 'https://xata.io/' },
        { company: 'Mixedbread', industry: 'AI/ML', description: 'End-to-end search pipeline ', link: 'https://www.mixedbread.ai/' }
    ];

    const industries = [...new Set(companies.map(item => item.industry))];

    let filter = { filter: "All" };

    const handler: ProxyHandler<{ [key: string]: any }> = {
        set: function(obj, prop: string | symbol, value: any): boolean {
            document.querySelectorAll('.table-row').forEach(row => {
                row.classList.add('hidden');
                row.classList.remove('opacity-0', 'opacity-100');
                setTimeout(() => {
                    if (value == row.id || value == "All") {
                        row.classList.remove('hidden');
                        row.classList.add('opacity-0');
                        (row as HTMLElement).offsetHeight; // Force reflow
                        row.classList.add('opacity-100');
                    }
                }, 50);
            });

            // Assign the new value to the object property
            obj[prop as keyof typeof obj] = value;
            return true;
        }
    };


    const proxyData = new Proxy(filter, handler);

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function scrollToTop() {

        const start = window.scrollY;
        const end = 0;
        const duration = 2000;
        let startTime: number | null = null;

        handle = false;
        if (background) {background.style.backgroundColor = 'transparent'};
        if(section1) {section1.style.backgroundColor = '#03351A'};
        if(section2) {section2.style.backgroundColor = '#FFF9DE'};
        document.querySelectorAll('.flower').forEach((element) => {
            (element as HTMLElement).style.marginTop = "0px";
        });
        setTimeout(() => {
            if (background) {background.style.backgroundColor = '#03351A'};
            if(section1) {section1.style.backgroundColor = 'transparent'};
            if(section2) {section2.style.backgroundColor = 'transparent'};
            handle = true;
            visible = true;
        }, 2100);

        function animateScroll(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);

            window.scrollTo(0, start + (end - start) * ease);

            if (timeElapsed < duration) requestAnimationFrame(animateScroll);
        }

        if (background) {background.style.backgroundColor = '#03351A'};

        requestAnimationFrame(animateScroll);
    }

    function scrollToElement(element: HTMLDivElement | null, scrollingDown: boolean) {
        if (!element) return;

        const start = window.scrollY;
        const end = element.getBoundingClientRect().top + start;
        const duration = 2000;
        let startTime: number | null = null;

        function animateScroll(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);

            window.scrollTo(0, start + (end - start) * ease);

            parallax();

            if (((element && element.id === 'section2' && scrollingDown) || (element && element.id === 'section1' && !scrollingDown)) && background) {
                changeBackgroundColorOnScroll(background, progress, scrollingDown);
            }

            if (timeElapsed < duration) requestAnimationFrame(animateScroll);
        }

        requestAnimationFrame(animateScroll);
    }

    function handleScroll() {
        if (!section1 || !section2 || !section3 || !section4 || !section5) return;

        const background1Bottom = section1.getBoundingClientRect().bottom;
        const background2Top = section2.getBoundingClientRect().top;
        const background2Bottom = section2.getBoundingClientRect().bottom;
        const background3Top = section3.getBoundingClientRect().top;
        const background3Bottom = section3.getBoundingClientRect().bottom;
        const background4Top = section4.getBoundingClientRect().top;
        const background4Bottom = section4.getBoundingClientRect().bottom;
        const background5Top = section5.getBoundingClientRect().top;

        if (background1Bottom < window.innerHeight && scrollingDown && window.scrollY < window.innerHeight) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section2, true);
        } else if (background2Top > 0 && background1Bottom > 0 && !scrollingDown) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = true;
            scrollToElement(section1, false);
        } else if (background2Bottom < window.innerHeight && scrollingDown && window.scrollY < 2 * window.innerHeight) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section3, true);
        } else if (background3Top > 0 && background2Bottom > 0 && !scrollingDown) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section2, false);
        } else if (background3Bottom < window.innerHeight && scrollingDown && window.scrollY < 3 * window.innerHeight) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section4, true);
        } else if (background4Top > 0 && background3Bottom > 0 && !scrollingDown) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section3, false);
        } else if (background4Bottom < window.innerHeight && scrollingDown && window.scrollY < 4 * window.innerHeight) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section5, true);
        } else if (background5Top > 0 && background4Bottom > 0 && !scrollingDown) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = false;
            scrollToElement(section4, false);
        }
    }

    function parallax() {
        document.querySelectorAll('.flower').forEach((element) => {
            (element as HTMLElement).style.marginTop = (-window.scrollY * scrollFactor).toString() + "px";
        });

        if (centerflower) {
            centerflower.style.marginTop = (window.scrollY * 0.5).toString() + "px";
        }
    }

    function changeBackgroundColorOnScroll(element: HTMLElement, progress: number, scrollingDown: boolean) {
        const colorStart = '#03351A'; // Color 1
        const colorEnd = '#FFF9DE'; // Color 2

        // Determine the color based on scroll direction
        const startColor = scrollingDown ? colorStart : colorEnd;
        const endColor = scrollingDown ? colorEnd : colorStart;

        // Calculate the interpolated color based on progress
        const newColor = interpolateColor(startColor, endColor, progress);

        // Apply the new background color to the element
        element.style.backgroundColor = newColor;
    }

    function interpolateColor(color1: string, color2: string, factor: number): string {
        const hex = (x: number) => {
            const hexString = x.toString(16);
            return hexString.length === 1 ? '0' + hexString : hexString;
        };

        const r1 = parseInt(color1.substring(1, 3), 16);
        const g1 = parseInt(color1.substring(3, 5), 16);
        const b1 = parseInt(color1.substring(5, 7), 16);

        const r2 = parseInt(color2.substring(1, 3), 16);
        const g2 = parseInt(color2.substring(3, 5), 16);
        const b2 = parseInt(color2.substring(5, 7), 16);

        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));

        return `#${hex(r)}${hex(g)}${hex(b)}`;
    }

    function onScroll(handle: boolean) {

        if (window.scrollY > 0) {
            scrolled = true;
        } else {
            scrolled = false;
        }

        let currentScrollTop = document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
            scrollingDown = true;
        } else if (currentScrollTop < lastScrollTop) {
            scrollingDown = false;
        }

        localStorage.setItem('lastScrollTop', `${currentScrollTop}`);
        localStorage.setItem('scrollingDown', `${scrollingDown}`);

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

        if (handle) {handleScroll();};
    }

    function expandFlower() {
        if (!visible) return;
        const message = document.getElementById('full-screen-message');
        if (!centerflower || !message) return;

        centerflower.style.transition = 'transform 2s ease-in-out';
        if (window.innerHeight > window.innerWidth) {
            centerflower.style.transform = 'scale(60)';
        } else {
            centerflower.style.transform = 'scale(32)';
        }
        setTimeout(() => {
            message.classList.add('opacity-100');
        }, 1000); 

        setTimeout(() => {
            if (centerflower) {centerflower.style.transform = 'scale(1)'};
            message.classList.remove('opacity-100');
        }, 2000);
    }

    function isMobileDevice(userAgent: string): boolean {
        const mobileRegex = new RegExp(
            "(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|" +
            "iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|" +
            "palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|symbian|treo|up\\.(browser|link)|" +
            "vodafone|wap|windows ce|xda|xiino|blackberry|mobile|kindle|silk|ipad|playbook|silk|phone|opera mini",
            "i"
        );

        const desktopRegex = new RegExp(
            "(tablet|ipad|playbook|silk)|(android(?!.*mobile))",
            "i"
        );

        // Test user agent against mobile regex, and ensure it's not falsely flagged as mobile.
        return mobileRegex.test(userAgent) && !desktopRegex.test(userAgent);
    }

    onMount(() => {

        loaded = true;
        mobile = isMobileDevice(navigator.userAgent || navigator.vendor || (window as any).opera);

        if (!mobile) {
            lastScrollTop = parseInt(localStorage.getItem('lastScrollTop') || '0', 10);
            window.scrollTo(0, lastScrollTop);

            const initialProgress = Math.min(lastScrollTop / window.innerHeight, 1);
            if (background) {
                changeBackgroundColorOnScroll(background, initialProgress, true);
            }

            if (window.scrollY > 0) {
                    visible = false;
                } else {
                    visible = true;
            }

            (document.body).addEventListener('touchmove', function () {
                onScroll(handle);
            }); 
            window.addEventListener('scroll', function() {
                onScroll(handle);
            });
        } else {
            visible = true;
            handle = false;
        }

        // Table filter handler
        document.querySelectorAll('.filter').forEach(button => {
            button.addEventListener('click', function() {
                proxyData.filter = button.id;
            });
        });

        // Quotes handler
        let autoplayInterval: number | null;
        const glide = new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: 3000,
        }).mount();

        const pause = document.getElementById('pauseButton');
        const slideCounter = document.getElementById('slideCounter');
        const totalSlides = quotes.length;

        function updateSlideCounter() {
            const currentIndex = glide.index + 1; // Glide index is 0-based, so add 1 for display
            if (!slideCounter) return;
            slideCounter.textContent = `${currentIndex} / ${totalSlides}`;
        }

        updateSlideCounter();

        glide.on('run', function() {
            updateSlideCounter();
        });

        function togglePause() {
            if (isAutoplay) {
                glide.pause();
            } else {
                glide.play();
            }
            isAutoplay = !isAutoplay;
        }

        if (pause) {
            pause.addEventListener('click', function() {
                togglePause();
            });
        }

        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');

        if (leftArrow) {
            leftArrow.addEventListener('click', function() {
                if (isAutoplay) {
                    isAutoplay = false;
                    glide.pause();
                }
                glide.go('<'); 
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', function() {
                if (isAutoplay) {
                    isAutoplay = false;
                    glide.pause();
                }
            });
        }
    });
</script>

<div id="background" bind:this={background} 
class="w-full h-[200vh] relative overflow-x-hidden
{mobile ? 'bg-transparent' : ''} 
{loaded ? '' : 'bg-transparent'}"
>
    <div 
    id="center-flower" 
    bind:this={centerflower} 
    on:click={expandFlower} 
    on:keypress={expandFlower}
    role="button"
    tabindex="0"
    class="z-10 flower flower-4 bg-[url('/images/flower-4.svg')]  
    transition-opacity delay-100 duration-2000 object-center
    {visible ? 'opacity-100' : 'opacity-0'}"
    ></div>
   
    <div id="full-screen-message" 
    class="fixed inset-0 flex items-center justify-center bg-[#FFDF22]
    font-arya text-black font-bold 
    text-[6vw]
    opacity-0 transition-opacity duration-1000"
    >
        GROW WITH SUNFLOWER CAPITAL
    </div>  
    

    <div id="section1" bind:this={section1} 
    class="w-full h-screen relative overflow-hidden
    {mobile ? 'bg-[#03351A]' : ''} 
    {loaded ? '' : 'bg-[#03351A]'}"
    >
        <div class="title font-arya font-bold transition-all duration-1000 {scrolled ? 'text-offwhite/0' : 'text-offwhite'} {loaded ? 'top-0' : '-top-full'}">SUNFLOWER CAPITAL</div>
        <div class="flower flower-1 bg-[url('/images/flower-1.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-2 bg-[url('/images/flower-2.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-3 bg-[url('/images/flower-3.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-5 bg-[url('/images/flower-5.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-6 bg-[url('/images/flower-6.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-7 bg-[url('/images/flower-7.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-8 bg-[url('/images/flower-8.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-9 bg-[url('/images/flower-9.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-10 bg-[url('/images/flower-10.svg')] {loaded ? '' : 'opacity-0'}"></div>
        <div class="flower flower-11 bg-[url('/images/flower-11.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-12 bg-[url('/images/flower-12.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-13 bg-[url('/images/flower-13.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-14 bg-[url('/images/flower-14.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-15 bg-[url('/images/flower-15.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-16 bg-[url('/images/flower-16.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-17 bg-[url('/images/flower-17.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
    </div>
    
    <div id="section2" bind:this={section2} 
    class="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-24 gap-6 lg:gap-12 xl:gap-20
    {mobile ? 'bg-offwhite' : 'bg-transparent'}
    {loaded ? '' : 'bg-offwhite'}"
    >
        <img
            src="/images/sunflower-logo.svg"
            alt="Sunflower"
            class="h-24 sm:h-28 w-auto"
        />
        <div class="w-11/12 sm:w-4/5 font-bitter text-[#010101] text-center">
            <div class="font-bitter text-[#010101] w-full text-center flex flex-col justify-center items-center gap-5 lg:gap-8">
                <div class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight sm:leading-relaxed xl:leading-loose ">We invest at the earliest stage in companies building foundational picks and shovels infrastructure.<br></div>
                <div class="text-lg lg:text-xl leading-loose">
                    We partner with missionary founders who are indefatigable, decisive, and self-aware. <br> <br class="hidden sm:inline">
                    We believe in forging highly personal, deep-rooted relationships that stand the test of time. <br> <br class="hidden sm:inline">
                    We develop distinct theses on markets and how they will unfold.
                </div>
            </div>
        </div>
        <Arrow scrollToId="portfolio" />
    </div>    
</div>

<div id="portfolio" bind:this={section3} class="bg-offwhite w-full min-h-screen flex justify-center items-center px-4 sm:px-8 lg:px-32">
    <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between items-center w-full">
            <h1 class="font-arya text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">PORTFOLIO COMPANIES</h1>
        </div>
        <div class="flex flex-wrap items-center gap-4 py-4">
            <button id="All" class="flex flex-row items-center justify-center font-bitter text-sm sm:text-lg filter">
                <div class="w-3 h-3 mr-2 sm:mr-3 {proxyData.filter == 'All' ? 'bg-[#010101]' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
                All
            </button>
            
            {#each industries.sort() as industry}
                <button id={industry} class="flex flex-row items-center justify-center font-bitter text-sm sm:text-lg filter">
                    <div class="w-3 h-3 mr-2 sm:mr-3 {proxyData.filter == industry ? 'bg-[#010101]' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
                    {industry}
                </button>
            {/each}
        </div>
        <div class="flex flex-col w-full h-[24rem] xl:h-[28rem] overflow-y-auto custom-scrollbar">
            <table class="min-w-full border-collapse">
                <tbody class="font-bitter-italic text-base sm:text-xl md:text-2xl" id="table-body">
                    {#each companies.sort() as company}
                    <tr id={company.industry} class="relative h-12 sm:h-16 py-2 sm:py-4 custom-border-row table-row transition-all duration-500">
                        <td class="px-2 sm:px-4 font-bitter font-normal text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                            <a href="{company.link}" target="_blank" class="text-inherit hover:cursor-pointer">{company.company}</a>
                        </td>
                        <td class="px-2 sm:px-4 font-bitter font-light text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{company.description}</td>
                        {#if proxyData.filter == "All"}
                            <td class="px-2 sm:px-4 font-bitter-italic font-light text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{company.industry}</td>
                        {/if}
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>



<div id="quotes" bind:this={section4} class="glide flex flex-col items-center justify-center w-full h-screen bg-offwhite gap-6 xl:gap-12">
    <div class="w-4/5 flex justify-center items-center gap-3 font-arya text-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-10 transition-opacity duration-1000 {loaded ? '' : 'opacity-0'}">
        Words from Our Founders
    </div>

    <div class="glide__arrows flex gap-3 lg:gap-6 items-center justify-center transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="controls">
        <button id="pauseButton" class="bg-no-repeat bg-contain h-4 w-4 lg:h-8 lg:w-8 {isAutoplay ? "bg-[url('/images/pause.svg')]" : "bg-[url('/images/play.svg')]"}">&nbsp;</button>
        <button id="leftArrow" class="glide__arrow glide__arrow--left font-semibold text-xl lg:text-3xl font-bitter leading-none" data-glide-dir="<">&#9001;</button>
        <button id="rightArrow" class="glide__arrow glide__arrow--right font-semibold text-xl lg:text-3xl font-bitter" data-glide-dir=">">&#9002;</button>
        <div id="slideCounter" class="text-xl lg:text-3xl font-bitter-italic text-[#010101] leading-none"> 1 / 9</div>
    </div>

    <div class="glide__track w-2/3 lg:w-1/2 transition-opacity duration-1000  {loaded ? '' : 'opacity-0'}" data-glide-el="track">
        <ul class="glide__slides">
            {#each quotes as quote}
            <li class="glide__slide flex flex-col justify-center items-center gap-6 w-1/2">
                <div class="font-bitter text-base sm:text-xl xl:text-2xl text-[#010101] w-full text-center">
                    {quote.text}      
                </div>
                <div class="font-bitter text-base sm:text-xl md:text-2xl  text-[#03351A] text-center w-full">
                    — {quote.author}, <span class="font-bitter-italic">{quote.company}</span>
                </div>
            </li>
            {/each}
        </ul>
    </div>
</div>



<div id="contact" bind:this={section5} class="bg-offwhite h-screen w-full flex flex-col justify-between px-8 lg:px-24 xl:px-48">
    <div class="flex-grow flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 xl:gap-24">
        <div class="h-48 w-48 lg:h-[17vw] lg:w-[17vw] bg-[url('/images/sample.svg')] bg-contain bg-no-repeat">
        </div>
        <div class="flex flex-col items-center justify-center w-full lg:w-1/2 h-auto gap-6 lg:gap-12">
            <div class="font-bitter text-2xl sm:text-3xl xl:text-4xl text-[#010101] w-full text-center lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.
            </div>
            <div class="font-bitter text-xl sm:text-2xl text-[#03351A] text-center lg:text-left w-full">
                — Liu Jiang, <span class="font-bitter-italic">Sunflower Capital</span>
            </div>
        </div>
    </div>

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
</div>



<style lang="css">
    .title {
        position: relative;
        font-size: 19vw;
        line-height: 67%;
    }

    .flower {
        position: absolute;
        transition: transform 1000ms ease-in-out, opacity 2000ms ease-in-out;
        background-size: contain;            
        background-repeat: no-repeat;                              
    }

    .grow:hover {
        transform: scale(1.2);
    }

    @media (orientation: landscape) {    
        .flower-1 { width: 14vw; height: 14vw; top: 53vh; left: -3vw; }
        .flower-2 { width: 7vw; height: 7vw; top: 53vh; left: 16vw; }
        .flower-3 { width: 8vw; height: 8vw; top: 56vh; left: 29vw; }
        .flower-4 { width: 15vw; height: 15vw; top: 53.5vh; left: 42.5vw; }
        .flower-5 { width: 7vw; height: 7vw; top: 59.5vh; left: 62vw; }
        .flower-6 { width: 14vw; height: 14vw; top: 30vh; left: 64vw; }
        .flower-7 { width: 11vw; height: 11vw; top: 32vh; left: 82vw; }
        .flower-8 { width: 15vw; height: 15vw; top: 14vh; right: -9.5vw; }
        .flower-9 { width: 8vw; height: 8vw; top: 83vh; left: 1vw; }
        .flower-10 { width: 16vw; height: 16vw; top: 67vh; left: 13vw; }
        .flower-11 { width: 11vw; height: 11vw; top: 78vh; left: 33vw; }
        .flower-12 { width: 5.5vw; height: 5.5vw; top: 87.5vh; left: 49.5vw; }
        .flower-13 { width: 12vw; height: 12vw; top: 75.5vh; left: 58.5vw; }
        .flower-14 { width: 14vw; height: 14vw; top: 56vh; left: 74vw; }
        .flower-15 { width: 12vw; height: 12vw; top: 46vh; right: -5vw; }
        .flower-16 { width: 6vw; height: 6vw; top: 87vh; left: 75vw; }
        .flower-17 { width: 13vw; height: 13vw; top: 73vh; left: 87.5vw; }
    }

    @media (orientation: portrait) {
        .flower-1 { width: 14vw; height: 14vw; top: 65vh; left: 3vw; }
        .flower-2 { width: 7vw; height: 7vw; top: 63vh; left: 25vw; }
        .flower-3 { width: 8vw; height: 8vw; top: 70vh; left: 35vw; }
        .flower-4 { width: 15vw; height: 15vw; top: 72vh; left: 50vw; }
        .flower-5 { width: 7vw; height: 7vw; top: 80vh; left: 70vw; }
        .flower-6 { width: 14vw; height: 14vw; top: 40vh; left: 60vw; }
        .flower-7 { width: 11vw; height: 11vw; top: 35vh; left: 85vw; }
        .flower-8 { width: 15vw; height: 15vw; top: 25vh; left: 10vw; }
        .flower-9 { width: 8vw; height: 8vw; top: 90vh; left: 5vw; }
        .flower-10 { width: 16vw; height: 16vw; top: 80vh; left: 20vw; }
        .flower-11 { width: 11vw; height: 11vw; top: 90vh; left: 40vw; }
        .flower-12 { width: 5.5vw; height: 5.5vw; top: 95vh; left: 50vw; }
        .flower-13 { width: 12vw; height: 12vw; top: 85vh; left: 65vw; }
        .flower-14 { width: 14vw; height: 14vw; top: 70vh; left: 80vw; }
        .flower-15 { width: 12vw; height: 12vw; top: 60vh; right: 10vw; }
        .flower-16 { width: 6vw; height: 6vw; top: 95vh; left: 75vw; }
        .flower-17 { width: 13vw; height: 13vw; top: 85vh; left: 90vw; }
    }

    #full-screen-message {
        z-index: 30;
        pointer-events: none;
    }
</style>
