<script lang="ts">
    export const id: string | null = null;  
    export let src: string;
    export let width: string;
    export let height: string;
    export let top: string;
    export let left: string | null = null;  
    export let right: string | null = null; 
    export let extraClasses: string = "";
    export let transition: string = "transform 1000ms ease-in-out, opacity 2000ms ease-in-out";
    export let marginTop: string = "0px";
    export let loaded: boolean = false;
</script>

<div 
    class={`absolute bg-[url('${src}')] ${extraClasses} ${loaded ? 'opacity-100' : 'opacity-0'}`} 
    style="width: {width}; height: {height}; top: {top}; {left ? `left: ${left};` : ''} {right ? `right: ${right};` : ''} transition: {transition}; margin-top: {marginTop}; background-size: contain; background-repeat: no-repeat;"
></div>

<style lang="css">
    .flower {
        position: absolute;
        transition: transform 1000ms ease-in-out, opacity 2000ms ease-in-out;
        background-size: contain;            
        background-repeat: no-repeat;                              
    }

    .grow:hover {
        transform: scale(1.2);
    }
</style>
