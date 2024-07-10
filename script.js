console.log("Main.js working");

const apiKey = "cur_live_jk6xQ87sATPUVcU3dmkoL2qyqdbErG9C2LQyqRXj";

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${fromCurrency}`;
    console.log(`Fetching conversion rate from ${fromCurrency} to ${toCurrency} with amount ${amount}`);
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let rJson = await response.json();
        console.log("API Response:", rJson);
        const rate = rJson.data[toCurrency].value;
        const convertedAmount = (rate * amount).toFixed(2);
        document.querySelector(".output").style.display = "block";
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        document.getElementById("result").textContent = "Error fetching conversion rate.";
        document.querySelector(".output").style.display = "block";
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.querySelector("input[name='amount']").value);
    const fromCurrency = document.querySelector("select[name='fromCurrency']").value;
    const toCurrency = document.querySelector("select[name='toCurrency']").value;
    convertCurrency(amount, fromCurrency, toCurrency);
});
