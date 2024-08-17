<!-- <script>
	import Hero from "$lib/hero.svelte";
    import Arrow from '$lib/arrow.svelte';
</script> -->

<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Arrow from '$lib/arrow.svelte';

    let filter = "All"
    let scrolled = false
    let loaded = false
    const scrollFactor = 0.3

    const data = [
        { company: 'Accrue Savings', industry: 'Fintech', description: 'Save now, buy later', link: 'https://www.accruesavings.com/' },
        { company: 'AgentSync', industry: 'Fintech', description: 'Automating insurance compliance', link: 'https://agentsync.io/' },
        { company: 'Athelas', industry: 'Healthcare', description: 'Integrated healthcare operations platform', link: 'https://www.athelas.com/' },
        { company: 'Cal', industry: 'Infra', description: 'Open source scheduling infrastructure', link: 'http://cal.com' },
        { company: 'Clay', industry: 'SaaS', description: 'Scaling GTM with data enrichment and personalized outreach', link: 'http://clay.com' },
        { company: 'Cohere', industry: 'AI/ML', description: 'Providing LLMs and RAG capabilities for enterprises', link: 'https://cohere.com/' },
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
        { company: 'MemGPT', industry: 'AI/ML', description: 'Create LLM agents with long-term memory', link: 'https://memgpt.ai/' },
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
        { company: 'Xata', industry: 'Infra', description: 'Serverless data platform for PostgreSQL', link: 'https://xata.io/' }
    ];

    const industries = [...new Set(data.map(item => item.industry))];

    const getFilteredData = () => {
        if (filter === "All") {
            return data;
        }
        return data.filter(item => item.industry === filter);
    };

    const updateTable = () => {
        const tableBody = document.getElementById('table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            const filteredData = getFilteredData();
            filteredData.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('relative', 'py-4', 'h-16', 'custom-border-row');
                row.innerHTML = `
                    <td class="px-2 sm:px-4 font-bitter font-normal text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                        <a href="${item.link}" target="_blank" class="text-inherit hover:cursor-pointer">${item.company}</a>
                    </td>
                    <td class="px-2 sm:px-4 font-bitter font-light text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">${item.description}</td>
                    ${filter == "All" ? `<td class="px-2 sm:px-4 font-bitter-italic font-light text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">${item.industry}</td>` : ''}`;
                
                tableBody.appendChild(row);
            });
            const row = document.createElement('tr');
            row.classList.add('relative', 'py-4', 'h-16');
            row.innerHTML = `&nbsp;`;
            // tableBody.appendChild(row);
            // tableBody.appendChild(row);
        }
    };

    function parallax() {
        document.querySelectorAll('.flower').forEach((element) => {
            (element as HTMLElement).style.marginTop = (-window.scrollY * scrollFactor).toString() + "px";
        });
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
    function changeBackgroundColorOnScroll(element: HTMLElement) {
        const colorStart = '#03351A';
        const colorEnd = '#FFF9DE';

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            console.log(windowHeight)

            // Define the start and end scroll positions as a fraction of the window height
            const startScroll = 0.2; // 20% of window height
            const endScroll = 0.8; // 80% of window height

            // Calculate the interpolation factor within the desired range
            let factor = (scrollPosition / windowHeight - startScroll) / (endScroll - startScroll);
            factor = Math.min(Math.max(factor, 0), 1);

            // Calculate the interpolated color
            const newColor = interpolateColor(colorStart, colorEnd, factor);

            // Apply the new background color to the element
            element.style.backgroundColor = newColor;
        });
    }

    onMount(() => {

        const background1 = document.getElementById('background1');
        if (background1) {
            changeBackgroundColorOnScroll(background1);
        }
        
        const background2 = document.getElementById('background2');
        if (background2) {
            changeBackgroundColorOnScroll(background2);
        }

        loaded = true

        updateTable();

        document.querySelectorAll('.filter').forEach(button => {
            button.addEventListener('click', function() {
                filter = button.id;
                updateTable();
            });
        });

        window.addEventListener("scroll", function() {
            parallax(); 
            if (window.scrollY > 0) {
                scrolled = true
            } else {
                scrolled = false
            }
        });


    });
</script>

<div id="background1" class="snap w-full h-screen relative bg-[#03351A] overflow-x-hidden">
    <div class="title font-arya font-bold transition-all duration-500 {scrolled ? 'text-offwhite/0' : 'text-offwhite'} {loaded ? 'top-0' : '-top-full'}">SUNFLOWER CAPITAL</div>
    <div class="flower flower-1 bg-[url('/images/flower-1.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-2 bg-[url('/images/flower-2.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-3 bg-[url('/images/flower-3.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-4 bg-[url('/images/flower-4.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-5 bg-[url('/images/flower-5.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-6 bg-[url('/images/flower-6.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-7 bg-[url('/images/flower-7.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-8 bg-[url('/images/flower-8.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-9 bg-[url('/images/flower-9.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-10 bg-[url('/images/flower-10.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-11 bg-[url('/images/flower-11.svg')] bg-contain bg-no-repeat"></div>
    <div class="z-10 flower flower-12 bg-[url('/images/flower-12.svg')] bg-contain bg-no-repeat hover:animate-spin"></div>
    <div class="flower flower-13 bg-[url('/images/flower-13.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-14 bg-[url('/images/flower-14.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-15 bg-[url('/images/flower-15.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-16 bg-[url('/images/flower-16.svg')] bg-contain bg-no-repeat"></div>
    <div class="flower flower-17 bg-[url('/images/flower-17.svg')] bg-contain bg-no-repeat"></div>
</div>

<div id="background2" class="snap h-screen w-full flex flex-col items-center justify-center bg-offwhite ">
    <img 
    src="/images/sunflower-logo.svg" 
    alt="Sunflower" 
    class="h-28 w-auto"
/>
    <div class="pt-20 w-4/5 font-bitter text-6xl text-[#010101] leading-[7.5rem] pb-24 text-center">
            Sunflower Capital funds early-stage companies building for the modern enterprise.
    </div>
    <!-- <Arrow scrollToId="footer" /> -->
</div>

<div class="bg-offwhite w-full h-screen flex justify-center items-center px-32">
    <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between items-center w-full">
            <h1 class="font-arya text-black text-7xl">PORTFOLIO COMPANIES</h1>
        </div>
        <div class="flex flex-wrap items-center space-x-4 py-4">
            <button id="All" class="flex flex-row items-center justify-center font-bitter text-lg filter">
                <div class="w-3 h-3 mr-3 {filter == 'All' ? 'bg-[#010101]' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
                All
            </button>
            
            {#each industries as industry}
                <button id={industry} class="flex flex-row items-center justify-center font-bitter text-lg filter">
                    <div class="w-3 h-3 mr-3 {filter == industry ? 'bg-[#010101]' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
                    {industry}
                </button>
            {/each}
        </div>
        <div class="flex flex-col w-full h-[32rem] overflow-y-auto custom-scrollbar">
            <table class="min-w-full border-collapse">
                <tbody class="font-bitter-italic text-2xl" id="table-body"></tbody>
            </table>
        </div>
    </div>
</div>

<div id="contact" class="bg-offwhite h-screen w-full flex flex-row items-center justify-center px-96">
    <div class="h-1/3 w-1/3 mt-24 bg-[url('/images/sample.svg')] bg-contain bg-no-repeat">
    </div>
    <div class="flex flex-col items-center justify-center w-1/2 h-1.3 mt-24 gap-12">
        <div class="font-bitter text-4xl text-[#010101] w-full text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.
        </div>
        <div class="font-bitter text-2xl text-[#03351A] text-left w-full">
            — Liu Jiang, <span class="font-bitter-italic">Sunflower Capital</span>
        </div>
    </div>
</div> 

<!-- <div class="bg-offwhite w-screen flex flex-row items-center px-32 py-48" id='midsection'>
    <div class="pl-36 w-2/3 pt-20">
        <div class="font-bitter text-5xl text-darkish-brown leading-[6rem] pb-24 pr-10">
            Value statement or description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </div>
    </div>
    <img 
                src="/images/seeds.png" 
                alt="Sunflower" 
                class="max-h-96 w-auto pr-3"
    />
</div> -->


<style lang="css">
    .snap {
        scroll-snap-align: end; /* Align each section to the start */
    }

    .title {
        position: relative;
        font-size: 19vw;
        line-height: 67%;
    }

    .table-container {
        -webkit-mask-image: linear-gradient(180deg,#000 50%,transparent);
    }

    .flower {
        position: absolute;
        height: 100%;
        transition: transform 1s ease-in-out;
    }

    .flower-1 {
        width: 14vw;
        top: 53vh;
        left: -3vw;
    }

    .flower-2 {        
        width: 7vw;
        top: 53vh;
        left: 16vw;
    }

    .flower-3 {
        width: 8vw;
        top: 56vh;
        left: 29vw;
    }

    .flower-4 {        
        width: 15vw;        
        top: 53.5vh;
        left: 42vw;
    }

    .flower-5 {       
        width: 7vw;
        top: 59.5vh;
        left: 62vw;
    }

    .flower-6 {
        width: 14vw;
        top: 30vh;
        left: 64vw;
    }

    .flower-7 {
        width: 11vw;
        top: 32vh;
        left: 82vw;
    }

    .flower-8 {
        width: 15vw;
        top: 14vh;
        right: -9.5vw;
    }

    .flower-9 {
        width: 15vw;
        top: 83vh;
        left: -5.5vw;
    }

    .flower-10 {
        width: 19vw;
        top: 68vh;
        left: 12vw;
    }

    .flower-11 {
        width: 12vw;
        top: 83.5vh;
        left: 34vw;
    }

    .flower-12 {
        width: 5.5vw;
        height: 5.5vw;
        top: 87.5vh;
        left: 49.5vw;
    }

    .flower-13 {
        width: 12vw;
        top: 76vh;
        left: 58.5vw;
    }

    .flower-14 {
        width: 15vw;
        top: 57vh;
        left: 73vw;
    }

    .flower-15 {
        width: 12vw;
        top: 46vh;
        right: -5vw;
    }

    .flower-16 {
        width: 8vw;
        top: 90vh;
        left: 75vw;
    }

    .flower-17 {
        width: 15vw;
        top: 80vh;
        left: 87.5vw;
    }
</style>