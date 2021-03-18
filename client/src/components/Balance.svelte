<script>
    import axios from "axios"
    import { onMount } from "svelte"

    let transactions = [];

    $: balance = transactions.reduce((acc, t) => acc + t.amount, 0);

    onMount(async () => {
        try {
            const { data } = await axios.get("/api/v1/transaction/getAll")            
            transactions = data;
        } catch (error) {
            console.log(error);
        } 
    });
</script>

<div class="card text-center">
    <div class="card-body">
            <h5 class="card-title">
                ₱ {transactions.length == 0 ? '0' : `${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} .00       
            </h5>
        <p class="card-text">Remaining {balance.toString().includes("-") ? 'Debt' : 'Balance'}</p>
    </div>
</div>

<style>
    .card {
        border-style: dashed;
    }
</style>