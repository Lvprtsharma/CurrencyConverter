const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = Number(amount.value);

    if (!amtVal || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

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

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
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

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// On page load
window.addEventListener("load", () => {
    populateCurrencyOptions();
    updateExchangeRate();
});

