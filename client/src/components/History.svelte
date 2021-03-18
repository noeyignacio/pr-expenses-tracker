<script>
    import axios from 'axios'
    import moment from 'moment'
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

<div class="row">
    <div class="col-4">
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bHistory">
                Balance History
            </button>
        </div>
    </div>
</div>


<div class="modal fade" id="bHistory" tabindex="-1" aria-labelledby="bHistoryLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="bHistoryLabel">Balance History</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {#if transactions.length > 0}
                    {#each transactions as transaction}
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">₱ { transaction.transactionMethod == "Expenses" 
                            ? (transaction.amount*-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                            : (transaction.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00 
                        <span 
                            class="badge bg-{transaction.transactionMethod == "Expenses" 
                            ? 'warning' 
                            : 'info'} text-dark">
                            { transaction.transactionMethod == "Expenses" 
                            ? 'Expenses' 
                            : 'Income'}
                        </span>
                        </h5>
                        <p class="card-text text-muted">Date: {moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                    </div>
                    {/each}
                    {:else}
                    <div class="card text-center nt">
                        <div class="card-body">
                            <h5 class="card-title">No Transaction Available.</h5>
                        </div>
                    </div>
                {/if}
            </div>            
        </div>
    </div>
</div>



<style>
    .row {
        padding-bottom: 10px;
    }
    .card {
        border-style: none;
    }
</style>