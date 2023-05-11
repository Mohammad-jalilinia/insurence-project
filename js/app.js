
//Variables
const form = document.querySelector("#request-quote")
const HTML = new HTMLUI();
const insurance = new Insurance();


//EventListeners
eventLIsteners();
function eventLIsteners(){

    document.addEventListener("DOMContentLoaded",function (){
        HTML.DisplayYears();
    })

    form.addEventListener("submit",function (e){
        e.preventDefault();
        //Reading value of our form :
        const make = document.querySelector("#make").value;
        const year = document.querySelector("#year").value;
        const insurance = document.querySelector("input[name='level']:checked").value; //one of radio value is basic and the another one is complete

        if(make === '' || year === '' || insurance === '') {
            HTML.DisplayError("لطفا همه مقادیر به درستی وارد شود");
        }
        else {
            const insurance1 = new Insurance(make , year , insurance);
            const price = insurance1.calculatePrice(insurance1);
            console.log(price)
        }
    })

}


//Objects
function Insurance(make , year , insurance){
    this.make = make;
    this.year = year;
    this.insurance = insurance;
}

Insurance.prototype.calculatePrice = function (info){
    let price;
    let base = 2000000;
    /*
    pride = 1.15
    optima = 1.30
    porch = 1.80
     */
    switch (info.make) {
        case '1' :
            price = base*1.15;
            break;

            case '2' :
            price = base*1.30;
            break;

            case '3' :
            price = base*1.80;
            break;
    }

    const year = info.year;
    const diffrence = this.getdiffrentYear(year)
    // 3% cheaper for each year !
    price = price - (((diffrence*3)/100)*price);


    const level = info.insurance;
    price = this.calculateLevel(level,price);

    return price
}

Insurance.prototype.getdiffrentYear = function (year){
    const MaxYear = new Date().getFullYear();
    year = MaxYear - year
    return year
}
Insurance.prototype.calculateLevel = function (level,price){
    /* basic 30%
    * complete 50%
    *  */
    if(level === 'basic'){
        price = price * 1.3
    }
    else{
        price = price * 1.5
    }
    return price;
}




function HTMLUI(){}
HTMLUI.prototype.DisplayYears = function (){
    const MaxYear = new Date().getFullYear();
    //console.log(MaxYear)
    let MinYear = MaxYear - 20;

    const SelectYear = document.querySelector("#year")

    for(let i = MaxYear ; i >= MinYear ; i--){
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        SelectYear.appendChild(option);

    }
}
HTMLUI.prototype.DisplayError = function (ErrMessage){
    const div = document.createElement("div");
    div.classList = 'error'
    div.innerText = ErrMessage;
    form.insertBefore(div,document.querySelector(".form-group"))

    setTimeout(function (){
        div.remove();
    },5000)

}










