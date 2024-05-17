<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let truncate = true;
    let display = [];

    const toggleTruncate = () => {
        truncate = !truncate;
        updateTable();
    };

    const data = [
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
      { company: 'AgentSync', industry: 'Insurance', description: 'Automatic compliance software.' },
    ];
    
    // FIXME: Make table expand more naturally
    const updateTable = () => {
        const tableBody = document.getElementById('table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            display = truncate ? data.slice(0, 4) : data;
            display.forEach(item => {

            const row = document.createElement('tr');
            row.classList.add('border-b', 'border-dark-green', 'text-2xl', 'py-8', 'h-16');
            row.innerHTML = `
                <td class="px-4 font-bitter-italic font-light text-4xl">${item.company}</td>
                <td class="px-4 font-bitter">${item.industry}</td>
                <td class="px-4 font-bitter">${item.description}</td>
            `;
            tableBody.appendChild(row);
        });
        }
    };

    onMount(() => {
        updateTable();
    });

</script>

<!-- FIXME: Really glitchy on load, need to make smoother somehow -->
<div class="bg-offwhite min-h-screen w-screen flex items-center">
    <div class="pl-24 w-10/12">
        <div class="font-bitter text-6xl text-dark-brown leading-[7.5rem] pb-24">
            Sunflower Capital funds early-stage companies building for the
            <span class="text-white bg-dark-green p-3">modern enterprise.</span>
        </div>
        <img src='/images/downarrow.svg' alt="arrow" />
    </div>
</div>

<div class="bg-offwhite w-full pl-24 pr-60">
    <div class="flex flex-col pb-64 pt-16">
        <div class="flex flex-row justify-between items-center w-full pb-12">
            <h1 class="font-arya text-black text-7xl">INVESTMENTS</h1>
            <h2 class="font-bitter-italic text-darkish-brown text-4xl underline">Portfolio</h2>
        </div>
        <div class="flex flex-col w-full">
            <table class="min-w-full border-collapse">
                <thead>
                    <tr class="border-b border-dark-green font-bitter font-bold text-2xl">
                        <th class="text-left px-4 py-2 text-darkish-brown font-semibold">Company</th>
                        <th class="text-left px-4 py-2 text-darkish-brown font-semibold">Industry</th>
                        <th class="text-left px-4 py-2 text-darkish-brown font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody class="font-bitter-italic text-2xl" id="table-body"></tbody>
            </table>
            <div 
            class="flex items-center justify-start space-x-1 font-bitter text-3xl pt-2 pl-2"
            on:click={toggleTruncate}
            on:keydown={toggleTruncate}
            role="button"
            tabindex="0"
            >
                    <span class="inline-block animate-wave delay-1">.</span>
                    <span class="inline-block animate-wave delay-2">.</span>
                    <span class="inline-block animate-wave delay-3">.</span>
            </div>
        </div>
    </div>
</div>

<style global>
    .delay-1 {
      animation-delay: 0s;
    }
    .delay-2 {
      animation-delay: 0.25s;
    }
    .delay-3 {
      animation-delay: 0.5s; 
    }
  </style>