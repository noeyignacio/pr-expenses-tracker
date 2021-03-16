<script>
    import axios from 'axios';
    import { onMount } from 'svelte'

    let transactions = [];

    // Random Generated AplhanNumerics
    let r = Math.random().toString(36).substring(7).toUpperCase();

    onMount(async () => {
        const { data } = await axios.get("/api/v1/transaction/getAll")
        transactions = data;
    });
    
    
</script>


<div class="row">
    {#each transactions as transaction}
    <div class="col-sm-6">
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">Amount: $ {transaction.amount}.00</h5>
            <p class="card-text tranid">Transaction ID: {r}{transaction._id.toUpperCase()}</p>
            <a href="/" class="btn btn-danger">Remove</a>
            </div>
        </div>
    </div>
    {/each}
</div>


<style>
    .card {
        border: none
    }
    a {
        color: #ffffff;
        text-decoration: none;
    }
    .tranid {
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>