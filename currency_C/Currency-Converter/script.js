
// let currencyApi = ('https://api.currencyapi.com/v3/latest?apikey=cur_live_60BWWUdoKsRWHPn5J2LN0ClnytyBh7OHq5UkcFzl');

// const container = document.getElementById('container');
// const fromCurrency = document.getElementById('fromCurrency');
// const currenciesInput = document.getElementById('toCurrency');
// const result = document.getElementById('result');
// container.addEventListener('submit', (e) => {
//   e.preventDefault();

//   currencyApi.latest({
//       base_currency: fromCurrency.value.trim(),
//       currencies: currenciesInput.value.replaceAll(' ', '')
//   }).then(response => {
//       let toCurrency = Object.keys(response.data);
//       let resultHTML = '';

//       for (let currency of toCurrency) {
//           resultHTML += `<div class="flex items-center justify-between py-2">
//               <strong>${currency}:</strong>
//               <span>${response.data[currency].value}</span>
//           </div>`;
//       }
//       reuslt.innerHTML = resultHTML;
//   });
// });



// let api = `https://api.currencyapi.com/v3/latest?apikey=cur_live_60BWWUdoKsRWHPn5J2LN0ClnytyBh7OHq5UkcFzl`;
let api = `https://v6.exchangerate-api.com/v6/522046a1e98fb86af5433e8b/latest/USD`;
const fromDropDown = document.getElementById("fromCurrency");
const toDropDown = document.getElementById("toCurrency");

//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) =>    
      {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convertButton")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);