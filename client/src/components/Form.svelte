<script>
    var input = 232;
</script>

<div class="container">
    <div class="row">
        <div class="col-sm">
            <select class="form-select" aria-label="Select Method">
                <option selected>Select Type</option>
                <option value="1">Expenses</option>
                <option value="2">Income</option>                
            </select>
        </div>
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
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
                <button class="btn btn-success" type="button">Add</button>
              </div>
        </div>
    </div>
    <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">$ {input}.00</h5>
            <p class="card-text">Make sure you're putting the right amount.</p>
        </div>
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