<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let truncate = true;
    let display = [];

    const toggleTruncate = () => {
        truncate = !truncate;
        updateTable();
    };

    const data = [
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
      { company: 'AgentSync', description: 'Automatic compliance software.' },
    ];
    
    const updateTable = () => {
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('relative', 'text-2xl', 'py-8', 'h-16', 'custom-border-row');
            row.innerHTML = `
                <td class="px-4 font-bitter-italic font-light text-4xl">${item.company}</td>
                <td class="px-4 font-bitter font-light text-3xl">${item.description}</td>
            `;
            tableBody.appendChild(row);
        });
    }
};

onMount(() => {
    updateTable();
});


    onMount(() => {
        updateTable();
    });

</script>

<!-- FIXME: Really glitchy on load, need to make smoother somehow -->
<div class="bg-offwhite min-h-screen w-screen flex flex-row items-center">
    <div class="pl-36 w-3/5 pt-20">
        <div class="font-bitter text-7xl text-darkish-brown leading-[7.5rem] pb-24 pr-10">
            Sunflower Capital funds early-stage companies building for the <br>
            <span class="text-white bg-dark-green p-3">modern enterprise.</span>
        </div>
    </div>
    <img 
                src="/images/big-sunflower.svg" 
                alt="Sunflower" 
                class="max-h-[50rem] w-auto pr-3"
    />
</div>

<div class="bg-offwhite min-h-screen w-screen flex flex-row items-center px-32">
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
</div>

<div class="bg-offwhite w-full pl-24 pr-60">
    <div class="flex flex-col pb-64 pt-16">
        <div class="flex flex-row justify-between items-center w-full pb-12">
            <h1 class="font-arya text-black text-7xl">INVESTMENTS</h1>
            <h2 class="font-bitter-italic text-darkish-brown text-4xl underline">Portfolio</h2>
        </div>
    <div class="flex items-center space-x-4 py-4">
        <span class="text-black">•</span>
        <span class="font-bitter text-xl text-black">All</span>
        <span class="text-black">•</span>
        <span class="font-bitter text-xl text-black">Filter</span>
        <span class="text-black">•</span>
        <span class="font-bitter text-xl text-black">Filter</span>
        <span class="text-black">•</span>
        <span class="font-bitter text-xl text-black">Filter</span>
        <span class="text-black">•</span>
        <span class="font-bitter text-xl text-black">Filter</span>
    </div>
        <div class="flex flex-col w-full h-96 overflow-y-auto custom-scrollbar">
            <table class="min-w-full border-collapse">
                <tbody class="font-bitter-italic text-2xl" id="table-body"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="bg-offwhite min-h-screen w-screen flex flex-row items-center justify-start px-32">
    <div class="pl-36 w-2/3">
        <div class="font-bitter text-7xl text-darkish-brown leading-[6rem] pb-12 pr-10">
            CTA. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div class="text-black font-bitter text-2xl font-light">
            liu@sunflowercapital.co
        </div>
    </div>
</div>
