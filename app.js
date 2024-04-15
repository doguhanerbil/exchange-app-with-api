const api_key = "15ca6535f2ff14133317275e";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

//element bilgilerini alalım


// elements
const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const miktar = document.getElementById("miktar");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
       
        let options;
        for(let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`;    
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    });

calculate.addEventListener("click", function(){
    const doviz1 = document.getElementById("currency_one").value;
    const doviz2 = document.getElementById("currency_two").value;
    const miktar = document.getElementById("miktar").value;

    fetch(url + "/latest/" + doviz1)
        .then(res => res.json())
        .then(data => {
            const sonuc = (data.conversion_rates[doviz2] * miktar).toFixed(3);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;" >
                        ${miktar} ${doviz1} = ${sonuc} ${doviz2}
                    </div>
                </div>
            `;
        })

});
