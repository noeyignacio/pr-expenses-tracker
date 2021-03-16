<script>
    import axios from 'axios';
    import { onMount } from 'svelte'

    let transactions = [];

    onMount(async () => {
        try {
            const { data } = await axios.get("/api/v1/transaction/getAll")
            transactions = data;
        } catch (error) {
            console.log(error);
        }
        
    });
</script>

<br>
<div class="row">
    {#each transactions as transaction}
    <div class="col-sm-6">
        <div class="card border-dark mb-3">
            <div class="card-body">
            <h5 class="card-title">
                Amount: $ {transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
                {#if transaction.transactionMethod == "Expenses"}
                    <span class="badge rounded-pill bg-warning">Expenses</span>
                        {:else}
                        <span class="badge rounded-pill bg-info">Income</span>
                {/if}
            </h5>
            <p class="card-text tranid">Transaction ID: 
                {transaction._id.toUpperCase()}
            </p>
            <p class="card-text text-muted">
                Date: {transaction.createdAt}
            </p>
            <a href="/" class="btn-sm btn-danger">Remove</a>
            </div>
        </div>
        
    </div>
    {/each}
</div>


<style>
    /* .card {
        border: none
    } */
    .row {
        padding: 20px 0 20px 0;
    }
    span {
        font-size: 12px;
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