

let billInput = document.getElementById('input-bill');
let percentage = document.querySelectorAll('#percentage');
let peopleInput = document.getElementById('input-people');
let tipPerPerson = document.getElementById('total-tip');
let totalPerPerson = document.getElementById('total-amount');
let tipsPercentage = document.querySelectorAll('.percentage')
let tipCustom = document.getElementById('tip-amount')
let resetBtn = document.getElementById('reset')
let dollarCur = document.getElementById('dollar');
let grivnaCur = document.getElementById('grivna')
let euroCur = document.getElementById('euro')
let currencyBtn = document.querySelectorAll('#curency')
let currencyDiv = document.querySelector('.currency');
let errorDiv = document.querySelector('#error-text');

billInput.value = '0.0'
peopleInput.value = '1'

tipPerPerson.innerHTML = (0.0).toFixed(2);
totalPerPerson.innerHTML = (0.0).toFixed(2);

let dollarC = dollarCur.innerHTML;
let euroC = euroCur.innerHTML;
let grivnaC = grivnaCur.innerHTML





let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun(){
    if(billInput.value >= 1){
        billValue = parseFloat(billInput.value);
    } else if(billInput.value < 0) {
        return billInput.value = billValue
    };
    calculateTip()
}

function peopleInputFun(){
  
    peopleValue = parseFloat(peopleInput.value);
    calculateTip()
}

billInput.addEventListener('input', billInputFun)
peopleInput.addEventListener('input', peopleInputFun)


tipCustom.addEventListener('input', () => {
    if(tipCustom.value >= 0){
        tipValue=parseFloat(tipCustom.value/100)
        tipsPercentage.forEach((val) => {
        val.classList.remove('toggled-percent')
    });
    } else {
        alert('Please enter a valid percentage');
        return tipCustom.value = '';
    }
    calculateTip();
})


let reset = () => {
    billInput.value = '0.0';
    billInputFun()
    peopleInput.value = '1';
    peopleInputFun()
    tipCustom.value = '';
    tipsPercentage.forEach(val => {
        val.classList.remove('toggled-percent')

    })
    tipPerPerson.innerHTML = '0.00'
    totalPerPerson.innerHTML = '0.00'
    currencyBtn.forEach(e => {
        e.classList.remove('toggled-currency')
    })

}
resetBtn.addEventListener('click', reset)


 for (let btn of currencyBtn) {
    btn.addEventListener('click', () => {
      for (let btn2 of currencyBtn) {
        btn2.classList.remove('toggled-currency')
        
        if(btn2.classList.contains('toggled-currency')){
            btn2.classList.remove('toggled-currency')
           
        } else {
            btn.classList.add('toggled-currency')
        }
      
    }
    calculateTip()
})
}


function calculateTip() {
    let checkCurrency = () => {
        for(let i=0;i<currencyBtn.length;i++ ){
            for(let j=1; j<currencyBtn.length; j++)
                for(let c = 2; c<currencyBtn.length; c++){
                    if(currencyBtn[j].classList.contains('toggled-currency')){
                        console.log(currencyBtn[j].value)
                        return true;
                        
                    } else if(currencyBtn[i].classList.contains('toggled-currency'))
                     return true;
                      else if (currencyBtn[c].classList.contains('toggled-currency')){
                        return true
                      } else {
                         return false
    
                      }

                }
            }
                
                
        
    }
    
    if (peopleValue >= 1 && checkCurrency() == true  ) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;
        currencyDiv.classList.remove('error')

        errorDiv.textContent = ''
        
        for(let i=0; i< currencyBtn.length;i++) {
            for(let j=1; j<currencyBtn.length;j++){
                for(let c = 2; c<currencyBtn.length; c++)
                if(currencyBtn[i].value == dollarC && currencyBtn[i].classList.contains('toggled-currency')){
                    tipPerPerson.innerHTML = `${dollarC}${tipAmount.toFixed(2)}`
                  
                    totalPerPerson.innerHTML = `${dollarC}${total.toFixed(2)}`
                    return
                    
               } else if (currencyBtn[j].value == euroC && currencyBtn[j].classList.contains('toggled-currency')) {
                    tipPerPerson.innerHTML = `${currencyBtn[j].value}${tipAmount.toFixed(2)}`
                    totalPerPerson.innerHTML = `${currencyBtn[j].value}${total.toFixed(2)}`
                    
                    return
               } else if (currencyBtn[c].value == grivnaC && currencyBtn[c].classList.contains('toggled-currency')) {
                    tipPerPerson.innerHTML = `${grivnaC}${tipAmount.toFixed(2)}`
                    totalPerPerson.innerHTML = `${grivnaC}${total.toFixed(2)}`
                    
                    return
               } 
            }
          
           
        }
        
    } else if (checkCurrency() == false ){
        
        currencyDiv.classList.add('error')
        errorDiv.textContent = 'Please pick out the currency'
        errorDiv.style.color = 'red'
        errorDiv.style.font.family = 'inherit'
        
        return
    }
}
tipsPercentage.forEach((val)=> {
    val.addEventListener('click', (event)=> {
        tipsPercentage.forEach((val)=> {
            val.classList.remove('toggled-percent')
            if(event.target.value == val.value){
                val.classList.add('toggled-percent')
                tipValue = parseFloat(val.value)/100
            }
        });
        calculateTip()
})

})

