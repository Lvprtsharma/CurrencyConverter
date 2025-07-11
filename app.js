const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");
const amountInput = document.getElementById('amount-input');
const errorMsg = document.getElementById('amount-error');

amountInput.addEventListener("input", function() {
    const originalValue = this.value;
    let cleanedValue = originalValue.replace(/[^0-9.]/g, '');
    
    const parts = cleanedValue.split(".");
    if(parts.length > 2){
        cleanedValue = parts[0] + '.' + parts.slice(1).join('');
    }

    if (cleanedValue.includes('.')) {
        const [intPart, decimalPart] = cleanedValue.split('.');
        cleanedValue = intPart + '.' + decimalPart.slice(0, 2);
    }

    if(originalValue !== cleanedValue){
        errorMsg.style.display = 'block';
    }else{
        errorMsg.style.display = "none";
    }

    this.value = cleanedValue;
})

amountInput.addEventListener('blur', function () {
    errorMsg.style.display = 'none';
});

const getEnteredAmount = () => {
    let amtVal = Number(amountInput.value);

    if (!amtVal || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }
    console.log(amtVal);
    return amtVal;
}

const updateExchangeRate = async () => {
    const amtVal = getEnteredAmount();
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const url = `${BASE_URL}/${fromCurrency}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (!data[fromCurrency] || !data[fromCurrency][toCurrency]) {
            msg.innerText = `Exchange rate not found for ${fromCurr.value} to ${toCurr.value}`;
            return;
        }

        const exchangeRate = data[fromCurrency][toCurrency];
        const finalAmount = (amtVal * exchangeRate).toFixed(2);

        msg.innerHTML = `${amtVal} <b>${fromCurr.value}</b> = ${finalAmount} <b>${toCurr.value}</b>`;

    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Failed to fetch exchange rate. Please try again later.";
    }
};


const populateCurrencyOptions = () => {
    for (let select of dropdowns) {
        for (let currCode in countryList) {
            const option = document.createElement("option");
            option.innerText = currCode;
            option.value = currCode;

            if (select.name === "from" && currCode === "USD") {
                option.selected = true;
            } else if (select.name === "to" && currCode === "INR") {
                option.selected = true;
            }

            select.append(option);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
            updateExchangeRate();
        });
    }
};

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const img = element.parentElement.querySelector("img");

    if (countryCode && img) {
        const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        img.src = newSrc;
    }
};

amountInput.addEventListener("change", (evt) => {
    updateExchangeRate();
})

window.addEventListener("load", () => {
    populateCurrencyOptions();
    updateExchangeRate();
});