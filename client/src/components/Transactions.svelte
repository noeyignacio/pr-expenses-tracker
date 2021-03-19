<script>
    import axios from 'axios';
    import moment from 'moment'

    export let transactions = [];

    export const removeTransaction = async (id) => {
        const response = await axios.delete("/api/v1/transaction/delete/" + id)
        if (response.data.id === id) {
            transactions = transactions.filter(t => t._id !== id)
        }
    }
</script>

<div class="row">
    {#each transactions as transaction (transaction._id)}
    <div class="col-sm-6">
        <div class="card border-{transaction.transactionMethod == "Expenses" ? 'warning' : 'info'} mb-3">
            <div class="card-body">
            <h5 class="card-title">
                Amount: ₱  { transaction.transactionMethod == "Expenses" 
                    ? (transaction.amount*-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                    : transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
                {#if transaction.transactionMethod == "Expenses"}
                    <span class="badge rounded-pill bg-warning">Expenses</span>
                        {:else}
                        <span class="badge rounded-pill bg-info">Income</span>
                {/if}
            </h5>
            <p class="card-text tranid">Transaction ID: 
                {transaction._id.replace(/([^.]{16}$)/g, "***").toUpperCase()}
            </p>
            <p class="card-text text-muted">
                Date: {moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <button 
                class="btn-sm btn-danger" 
                on:click={() => removeTransaction(transaction._id)}
            >
                Remove
            </button>
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
    .tranid {
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>