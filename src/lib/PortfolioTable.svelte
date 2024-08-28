<script lang="ts">
    export let companies: Array<{ company: string; industry: string; description: string; link: string }>;
    const industries = [...new Set(companies.map(item => item.industry))];
    export let proxyData: { filter: string };

    const sortedCompanies = companies.sort((a, b) => a.company.localeCompare(b.company));
</script>

<div class="w-full h-sceen flex flex-col justify-center items-center gap-3 sm:gap-6 lg:gap-12">
    <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-arya text-offblack text-6xl sm:text-5xl md:text-6xl lg:text-7xl">Our Portfolio</h1>
    </div>
    <div class="w-full flex flex-wrap items-center justify-start gap-2 sm:gap-4 py-4">
        <button id="All" class="flex flex-row items-center justify-center font-bitter text-xs sm:text-lg filter">
            <div class="w-2 h-2 sm:w-3 sm:h-3 mr-2 sm:mr-3  {proxyData.filter == 'All' ? 'bg-offblack' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
            All
        </button>
        {#each industries.sort() as industry}
            <button id={industry} class="flex flex-row items-center justify-center font-bitter text-xs sm:text-lg filter">
                <div class="w-2 h-2 sm:w-3 sm:h-3 mr-2 sm:mr-3 {proxyData.filter == industry ? 'bg-offblack' : 'bg-[#6D8A54] opacity-20'}">&nbsp;</div>
                {industry}
            </button>
        {/each}
    </div>
    <div class="flex flex-col w-full h-[24rem] xl:h-[28rem] overflow-y-auto custom-scrollbar">
        <table class="min-w-full border-collapse">
            <tbody class="font-bitter-italic text-sm sm:text-xl md:text-2xl" id="table-body">
                {#each sortedCompanies as company}
                    <tr id={company.industry} class="relative h-12 sm:h-16 py-2 sm:py-4 custom-border-row table-row transition-all duration-500">
                        <td class="px-2 sm:px-4 font-bitter font-normal text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                            <a href="{company.link}" target="_blank" class="text-inherit hover:cursor-pointer text-dark-green">{company.company}</a>
                        </td>
                        <td class="text-dark-green px-2 sm:px-4 font-bitter font-light text-xxs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{company.description}</td>
                        {#if proxyData.filter == "All"}
                            <td id="my-td" class="text-dark-green px-2 sm:px-4 font-bitter-italic font-light hidden sm:table-cell sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{company.industry}</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
