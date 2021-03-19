<script>
    import axios from 'axios';
    import { onMount } from 'svelte'
    
    // Components
    import Navbar from './Navbar.svelte'
    import Transactions from './Transactions.svelte'
    import NoTransaction from './NoTransaction.svelte'
    import Balance from './Balance.svelte'
    import BalanceHistory from './BalanceHistory.svelte'
    import LoadingSpinner from './LoadingSpinner.svelte'

    let input;
    let method;
    let loading = false;
    let transactions =[]

    $: disabled = input === null;
    
    onMount(async () => {
        try {
            loading = true;
            const { data } = await axios.get("/api/v1/transaction/getAll")            
            transactions = data;
            loading = false;
        } catch (error) {
            console.log(error);
        } 
    });

    const addTransactions = async () => {
        try {
            const transaction = {
                createdAt: new Date().getDate(),
                amount: input,
                transactionMethod: method
            };
            if (!transaction.amount) {
                console.log("Input Something.")
            } else {
                if(transaction.transactionMethod == "Expenses") {
                    const expenses = {
                        createdAt: new Date().getDate(),
                        amount: input * -1,
                        transactionMethod: method
                    };
                    const response = await axios.post("/api/v1/transaction/create", expenses);
                    transactions = [response.data, ...transactions]
                    input; 
                } else {
                    const response = await axios.post("/api/v1/transaction/create", transaction);
                    transactions = [response.data, ...transactions]
                    input;
                }
                
            }
            
        } catch (error) {
            console.log(error)
        }
    }    
</script>

<Navbar />
<div class="container">

    <div class="row">
        <div class="col-4">
            <BalanceHistory {transactions}/>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <select class="form-select" aria-label="Select Method" bind:value={method}>                
                <option value="Expenses">Expenses</option>
                <option value="Income">Income</option>                
            </select>
        </div>
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text">₱</span>
                    <input 
                        type="number" 
                        class="input form-control" 
                        aria-label="Amount (to the nearest dollar)"
                        bind:value={input}
                    >
                <span class="input-group-text">.00</span>
            </div>
        </div>
        <div class="col-sm">
            <div class="d-grid gap-2">
                <button 
                    class="btn btn-success" 
                    type="button"
                    on:click={addTransactions}
                    {disabled}
                >
                    Add
                </button>
              </div>
        </div>
    </div>
    <div class="row">
        <div class="col-8">
            <div class="card text-center">
                <div class="card-body">
                    {#if input == null}
                    <h5 class="card-title">₱ 0.00</h5>
                        {:else}
                        <h5 class="card-title">
                            ₱ {input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00
                            {#if method == "Expenses"}
                            <span class="badge bg-warning">Expenses</span>
                                {:else}
                                <span class="badge bg-info">Income</span>
                            {/if}
                        </h5>
                    {/if}
                    <p class="card-text">Make sure you're putting the right amount.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <Balance {transactions}/>
        </div>
    </div>
    <div>
        {#if loading }
        <LoadingSpinner />
        {/if}
        {#if transactions.length > 0}
        <Transactions {transactions}/>
        {:else}
        <NoTransaction />
        {/if}
    </div>
</div>

<style>
    .container {
        margin: 40px auto;
        max-width: 1000px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>