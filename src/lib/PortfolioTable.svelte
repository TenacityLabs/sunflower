<script lang="ts">
    export let companies: Array<{ company: string; industry: string; description: string; link: string }>;
    export let proxyData: { filter: string };

    const sortedCompanies = companies.sort((a, b) => a.company.localeCompare(b.company));
</script>

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
