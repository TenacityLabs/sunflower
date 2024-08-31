<script lang="ts">
    import { onMount, type ComponentType } from 'svelte';
    import PortfolioTable from '$lib/PortfolioTable.svelte';
    import Testimonials from '$lib/Testimonials.svelte';
    import Glide from '@glidejs/glide';

    let index = 0;
    let mobile = false;
    let scrolled = false;
    let loaded = false;
    let visible = false;
    let handle = true;
    let lastScrollTop = 0;
    let scrollingDown = true;
    let centerflower: HTMLElement | null = null;
    const scrollFactor = 0.3;

    const quotes = [
    {
        quote: "Quality is really what really sets Liu apart from other investors. Working with Liu was unique because she was extremely proactive. She was always trying to find ways to help, not just relying on me to think about what I needed. We had regular discussions on topics ranging from customer negotiations to internal operations to creating a standard around Iceberg.",
        author: "Ryan Blue",
        company: "Tabular"
    },
    {
        quote: "Liu invested in our seed and then doubled down in subsequent rounds. She helped us with positioning and messaging on our website and customer materials, refining our key product use cases, and thinking through developer ubiquity.",
        author: "Maxim Fateev",
        company: "Temporal"
    },
    {
        quote: "Liu had early conviction in Verkada. Her ability to quickly immerse herself in new markets is a real differentiator amongst early stage investors. I was very impressed by her deep knowledge of our industry, which led to insightful and strategic questions coupled with tailored advice and direction.",
        author: "Raj Misra",
        company: "Verkada"
    },
    {
        quote: "Liu is the best kind of investor: she is technical, understands product, and can quickly understand the big picture. She's really well connected with top talent and investors. She'll help when she's needed and give you space to operate otherwise. Highly recommend working with her.",
        author: "Kareem Amin",
        company: "Clay"
    },
    {
        quote: "Liu was one of the first investors and believers in Hadrian. She helped us settle into Los Angeles, and guided us through Hadrian’s rapid growth, expansion, and fundraising journey.",
        author: "Chris Power",
        company: "Hadrian"
    },
    {
        quote: "Liu has been an invaluable investor for Warp, going way beyond just investing money, to investing a bunch of her time helping us with GTM, Growth and Product. She brings deep expertise in the developer space, and we've learned a lot working with her. She is more willing and able than most investors to roll up her sleeves and help the leadership team operate.",
        author: "Zach Lloyd",
        company: "Warp"
    },
    {
        quote: "Liu is the most energetic investor I've ever met. We raised our seed round during Covid, and Liu was one of the first to commit to investing. She made more intros and was more engaged than anyone else - without her enthusiasm I don't know how we'd have closed the round!",
        author: "James Hawkins",
        company: "Posthog"
    },
    {
        quote: "Liu built a relationship with us while we were still at Uber building Michelangelo. She had the conviction to colead our seed and Series A, and she was pivotal in helping us hire our early team and close our first few marquee customers.",
        author: "Kevin Stumpf",
        company: "Tecton"
    },
    {
        quote: "Liu strikes the perfect balance of an early stage partner. She was one of the first to back us at the pre-seed, and she’s supported us consistently. She'll trail all your investor updates, ready to provide critical guidance immediately when called upon. Whether it's GTM, product, or just hard founder shit, she's got you.",
        author: "Jake Cooper",
        company: "Railway"
    },
    {
        quote: "Even before leading our pre-seed, Liu impressed us with her spot-on perspectives on strategy. From the onset, it was clear she took the time to thoroughly understand our business on a deeper level. We’ve gotten a lot of value from her advice on scalable GTM plans and ensuring we are focusing our efforts on the right ICP and partners.",
        author: "Olivia Joslin",
        company: "Tollbit"
    },
    {
        quote: "Liu was one of the first investors we started working with at Knock. Not only was she an instrumental part of our early fundraising, she also helped introduce us to many potential customers. Even now, several years after her initial investment in Knock, Liu continues to respond to our investor updates, offering ways to help. I'm grateful she's been a part of our journey.",
        author: "Sam Seely",
        company: "Knock"
    },
    {
        quote: "Liu was the investor I spoke to most frequently. As a solo founder, I appreciated her being a sounding board. She joined customer calls, helped us figure out pricing and business model, and introduced us to and interviewed potential hires.",
        author: "Alana Marzoev",
        company: "ReadySet"
    },
    {
        quote: "Liu led our pre-seed. She is the investor you want on your team early on if you really care about GTM, getting customers, and smartly positioning your product. She will make you think from first principles and ask you the right set of guiding questions, while also opening a lot of doors to folks in the industry and other founders.",
        author: "Vasek Mlejnsky",
        company: "E2B"
    },
    {
        quote: "Liu has been an incredible partner for Unkey. Whenever we need a sounding board on GTM strategy, Liu is ready to jump in. We see Liu as an extension of our team — she really helps drive our success and growth.",
        author: "James Perkins",
        company: "Unkey"
    },
    {
        quote: "Liu is always accessible and genuinely understands the challenges of early-stage companies. She has been crucial in helping us connect with the right customers and clearly define our target audience. Her insights and practical advice have been essential in refining our go-to-market strategy and product direction. Our sessions with her are focused and productive, tackling critical topics with depth.",
        author: "Aamir Shakir",
        company: "Mixedbread"
    },
    {
        quote: "Liu is fantastic to work with. She’s easy to talk to and strategically astute. She happily makes intros to her excellent network, and she’s been a tremendous value add at helping us with customer intros.",
        author: "Zach Long",
        company: "ConductorAI"
    },
    {
        quote: "Liu has made many an intro to her amazing network of executives, many of whom have made great advisors as we bootstrapped our GTM functions. Liu is also available but not overbearing — if you need help, she is just a text away.",
        author: "Apurva Mehta",
        company: "Responsive"
    },
    {
        quote: "Liu has been an invaluable partner to us. She is always readily available when we need her expertise, whether it's about hiring, product, or open source. She is sensitive to our time and proactively offers advice without pushing anything on us.",
        author: "Peter Marton",
        company: "OpenMeter"
    },
    {
        quote: "Working with Liu has been one of the best decisions we have made! She helped us on strategically planning out our roadmap, securing key hires, navigating partnerships, and building community and ecosystem.",
        author: "Yoland Yan",
        company: "Comfy"
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
        { company: 'ConductorAI', industry: 'Defense and Hardware', description: 'Providing LLMs and RAG capabilities for enterprises', link: 'https://conductorai.co/' },
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
        { company: 'Tabular (Databricks)', industry: 'Data', description: 'Storage platform from the creators of Apache Iceberg', link: 'https://tabular.io/' },
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
        { company: 'Mixedbread', industry: 'AI/ML', description: 'End-to-end search pipeline ', link: 'https://www.mixedbread.ai/' },
        { company: 'Slingshot AI', industry: 'Healthcare', description: 'Increasing global access to mental healthcare', link: 'https://www.slingshot.xyz/' }
    ];

    let filter = { filter: "All" };
    const proxyData = new Proxy(filter, {
        set: function(obj, prop: string | symbol, value: any): boolean {
            document.querySelectorAll('.table-row').forEach(row => {
                row.classList.add('hidden');
                row.classList.remove('opacity-0', 'opacity-100');
                setTimeout(() => {
                    if (value == row.id || value == "All") {
                        row.classList.remove('hidden');
                        row.classList.add('opacity-0');
                        (row as HTMLElement).offsetHeight;
                        row.classList.add('opacity-100');
                    }
                }, 50);
            });

            obj[prop as keyof typeof obj] = value;
            return true;
        }
    });


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
        if(hero) {hero.style.backgroundColor = '#03351A'};
        if(statement1) {statement1.style.backgroundColor = '#FFF9DE'};
        document.querySelectorAll('.flower').forEach((element) => {
            (element as HTMLElement).style.marginTop = "0px";
        });
        setTimeout(() => {
            if (!mobile) {
                if (background) {background.style.backgroundColor = '#03351A'};
                if(hero) {hero.style.backgroundColor = 'transparent'};
                if(statement1) {statement1.style.backgroundColor = 'transparent'};
            }
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

        if (background && !mobile) {background.style.backgroundColor = '#03351A'};

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

            if (((element && element.id === 'statement1' && scrollingDown) || (element && element.id === 'hero' && !scrollingDown)) && background) {
                changeBackgroundColorOnScroll(background, progress, scrollingDown);
            }

            if (timeElapsed < duration) requestAnimationFrame(animateScroll);
        }

        requestAnimationFrame(animateScroll);
    }

    let background: HTMLDivElement | null = null;
    let hero: HTMLDivElement | null = null;
    let statement1: HTMLDivElement | null = null;
    let statement2: HTMLDivElement | null = null;
    let portfolio: HTMLDivElement | null = null;
    let testimonials: HTMLDivElement | null = null;

    const sections: HTMLDivElement[] = [];

    function setupSections() {
        if (hero) sections.push(hero);
        if (statement1) sections.push(statement1);
        if (statement2) sections.push(statement2);
        if (portfolio) sections.push(portfolio);
        if (testimonials) sections.push(testimonials);
    }

    function handleScroll() {
        if (sections.length === 0) return;

        let targetIndex: number | null = null;

        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            if (sectionBottom < window.innerHeight && scrollingDown && window.scrollY < (index + 1) * window.innerHeight) {
                targetIndex = index + 1;
            } else if (sectionTop > 0 && sectionTop < window.innerHeight && !scrollingDown) {
                targetIndex = index - 1;
            }
        });

        if (targetIndex !== null && targetIndex >= 0 && targetIndex < sections.length) {
            handle = false;
            setTimeout(() => {
                handle = true;
            }, 2100);
            visible = targetIndex === 0;
            scrollToElement(sections[targetIndex], scrollingDown);
        }
    }


    function parallax() {
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

        console.log('called!')
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

    let currentScreen = 0; // Track the current screen index
    const totalScreens = 5;

    function updateScreenIndex() {
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        currentScreen = Math.floor(scrollPosition / screenHeight);
    }


    onMount(() => {

        loaded = true;
        mobile = isMobileDevice(navigator.userAgent || navigator.vendor || (window as any).opera);
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
        window.addEventListener('scroll', updateScreenIndex);

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

            setupSections();

            window.addEventListener('scroll', function() {
                onScroll(handle);
            });
        } else {
            window.addEventListener('touchmove', function(e){
                var distanceY = window.scrollY
                console.log(distanceY)
            });
            visible = true;
            handle = false;
        }

        // Table filter handler
        document.querySelectorAll('.filter').forEach(button => {
            button.addEventListener('click', function() {
                proxyData.filter = button.id;
            });
        });

        updateScreenIndex();
    });
</script>

<div id="background" bind:this={background} class="w-full h-[200vh] relative overflow-x-hidden {mobile ? 'bg-transparent' : ''} {loaded ? '' : 'bg-transparent'}">
    <div 
    id="center-flower" 
    bind:this={centerflower} 
    on:click={expandFlower} 
    on:keypress={expandFlower}
    role="button"
    tabindex="0"
    class="z-10 flower flower-4 bg-[url('/images/flower-4.svg')]  
    transition-opacity delay-100 duration-2000
    {visible ? 'opacity-100 grow' : 'opacity-0'}"
    ></div>
    <div id="full-screen-message" class="fixed inset-0 flex items-center justify-center bg-[#FFDF22] font-arya text-dark-green font-bold text-[6vw] opacity-0 transition-opacity duration-1000">GROW WITH SUNFLOWER CAPITAL</div>

    <div id="hero" bind:this={hero} class="w-full h-screen relative overflow-hidden {mobile ? 'bg-dark-green' : ''} {loaded ? '' : 'bg-dark-green'}">
        <div class="title font-arya font-bold transition-all duration-1000 {scrolled ? 'text-offwhite/0' : 'text-offwhite'} {loaded ? 'top-0' : '-top-full'}">SUNFLOWER CAPITAL</div>
        <div class="flower flower-1 bg-[url('/images/flower-1.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-2 bg-[url('/images/flower-2.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-3 bg-[url('/images/flower-3.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-5 bg-[url('/images/flower-5.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-6 bg-[url('/images/flower-6.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-7 bg-[url('/images/flower-7.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-8 bg-[url('/images/flower-8.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-9 bg-[url('/images/flower-9.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-10 bg-[url('/images/flower-10.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-11 bg-[url('/images/flower-11.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-12 bg-[url('/images/flower-12.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-13 bg-[url('/images/flower-13.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-14 bg-[url('/images/flower-14.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-15 bg-[url('/images/flower-15.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
        <div class="flower flower-16 bg-[url('/images/flower-16.svg')] {loaded ? '' : 'opacity-0'} grow"></div>
        <div class="flower flower-17 bg-[url('/images/flower-17.svg')] {loaded ? '' : 'opacity-0'} hover:animate-spin"></div>
    </div>

    <div id="statement1" bind:this={statement1} class="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-24 gap-6 xl:gap-8 {mobile ? 'bg-offwhite' : 'bg-transparent'} {loaded ? '' : 'bg-offwhite'}">
        <img src="/images/sunflower-logo.svg" alt="Sunflower" class="h-24 sm:h-28 w-auto" />
        <div class="w-11/12 sm:w-4/5 font-bitter text-dark-green text-center">
            <div class="font-bitter text-dark-green w-full text-center flex flex-col justify-center items-center gap-5 lg:gap-8">
                <div class="text-3xl sm:text-4xl lg:text-5xl leading-loose sm:leading-loose lg:leading-loose xl:leading-loose">
                    We invest at the earliest stage in companies building foundational picks and shovels infrastructure.
                </div>
            </div>
        </div>
    </div>        
</div>

<div id="statement2" bind:this={statement2} class="h-screen w-full bg-offwhite flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-24 gap-20 xl:gap-28">
    <div class="w-11/12 font-bitter text-dark-green text-center">
        <div class="font-bitter text-dark-green w-full text-center flex flex-col justify-center items-center gap-10 lg:gap-16">
            <div class="text-xl sm:text-[1.8rem] leading-loose text-dark-green">
                We partner with missionary founders who are indefatigable, decisive, and self-aware. <br> <br>
                We believe in forging highly personal, deep-rooted relationships that stand the test of time. <br> <br>
                We develop distinct theses on markets and how they will unfold.
            </div>
        </div>
    </div>
</div> 

<div id="portfolio" bind:this={portfolio} class="bg-offwhite text-dark-green w-full min-h-screen flex justify-center items-center px-4 sm:px-8 lg:px-32">
    <PortfolioTable {companies} {proxyData} />
</div>

<div id="testimonials" bind:this={testimonials} class="bg-offwhite text-dark-green w-full min-h-screen flex justify-center items-center">
    <Testimonials {quotes} {loaded} />
</div>

<div class="dot-container">
    {#each Array(totalScreens) as _, index}
        <div
            class="dot"
            class:bg-offblack={index === currentScreen}
            class:bg-[#6D8A54]={index !== currentScreen}
            class:opacity-20={index !== currentScreen}
        ></div>
    {/each}
</div>

<!-- <div class="flex justify-center items-center w-full h-20 sm:h-24 bg-offwhite px-4 sm:px-8" id="footer">
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
</div> -->

<style lang="css">
    .title {
        position: relative;
        font-size: 19vw;
        line-height: 67%;
    }

    #full-screen-message {
        z-index: 30;
        pointer-events: none;
    }

    .flower {
        position: absolute;
        transition: transform 500ms ease-in-out, opacity 2000ms ease-in-out;
        background-size: contain;            
        background-repeat: no-repeat;                          
    }

    .grow:hover {
        transform: scale(1.2);
    }

    .dot-container {
        position: fixed; 
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px; 
        z-index: 1000;
    }

    .dot {
        width: 10px;
        height: 10px;
        background-color: black;
        border-radius: 50%;
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
</style>
