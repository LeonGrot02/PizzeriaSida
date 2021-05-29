//kod skrivet av Leon Groth Norlin och Anton Hillung Stolt

//product class
class Product {
    constructor(name, ingredients, price) {
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
    }
}

//lists of products and ingredients
var pizzaClass1 = [new Product("Margherita", "Tomatsås, Ost", 65), 
                    new Product("Vesuvio", "Tomatsås, Ost, Skinka", 65), 
                    new Product("Altono", "Tomatsås, Ost, Tonfisk", 65)
                ];
var pizzaClass2 = [new Product("Calzone", "Tomatsås, Ost, Skinka", 80), 
                    new Product("Capricciosa", "Tomatsås, Ost, Skinka, Champinjoner", 70), 
                    new Product("Tomaso", "Tomatsås, Ost, Skinka, Räkor", 70), 
                    new Product("Hawaii", "Tomatsås, Ost, Skinka, Ananas", 70), 
                    new Product("Oriental", "Tomatsås, Ost, Skinka, Köttfärs", 70), 
                    new Product("Venezia", "Tomatsås, Ost, Skinka, Tonfisk", 70), 
                    new Product("Bolognese", "Tomatsås, Ost, Köttfärs, Lök", 70), 
                    new Product("Napoli", "Tomatsås, Ost, Räkor, Champinjoner", 70)
                ];
var pizzaClass3 = [new Product("Bravo", "Tomatsås, Ost, Skinka, Bacon, Lök, Ägg", 75), 
                    new Product("Princessa", "Tomatsås, Ost, Skinka, Räkor, Champinjoner", 75), 
                    new Product("Kroppkärr", "Tomatsås, Ost, Skinka, Köttfärs, Champinjoner", 75), 
                    new Product("Afrikano", "Tomatsås, Ost, Skinka, Ananas, Curry, Banan", 75), 
                    new Product("Önska", "Tomatsås, Ost, Skinka, Räkor, Champinjoner", 85), 
                    new Product("Lambada", "Tomatsås, Ost, Skinka, Köttfärs, Räkor", 75), 
                    new Product("Alsterdalen", "Tomatsås, Ost, Skinka, Crabfish, Räkor", 75), 
                    new Product("Paradis", "Tomatsås, Ost, Skinka, Räkor, Ananas", 75), 
                    new Product("Roma", "Tomatsås, Ost, Skinka, Kantareller, Tomater (färska)", 75), 
                    new Product("Banjogatan", "Tomatsås, Ost, Skinka, Salami, Paprika", 75), 
                    new Product("Rimini", "Tomatsås, Ost, Köttfärs, Gorgonzolaost, Lök", 75), 
                    new Product("Opera", "Tomatsås, Ost, Köttfärs, Ananas, Curry, Banan", 75),
                    new Product("Mesopotamia", "Tomatsås, Ost, Salami, Köttfärs, Nötter", 75)
                ];
var sauces = [ new Product("Bearnaisesas 10 cl", "", 10),  
                new Product("Kebabsås mild 10 cl", "", 10),  
                new Product("Kebabsås stark 10 cl", "", 10),  
                new Product("Kebabsås blandad 10 cl", "", 10),  
                new Product("Tzatzikisås 10 cl", "", 10),  
                new Product("Vitlokssås 10 cl", "", 10)
                ];
var drinks = [ new Product("Drycker Coca-Cola 33 cl", "", 15),  
                new Product("Coca-Cola light 33 cl", "", 15),  
                new Product("Fanta 33 cl", "", 15),  
                new Product("Sprite 33 cl", "", 15),  
                new Product("Mineralvatten 33 cl", "", 15),  
                new Product("Lattöl 33 cl", "", 15),  
                new Product("Coca-Cola 50 cl", "", 20),  
                new Product("Fanta 50 cl", "", 20)
                ];
                
//wouldn't work unless we did this, don't know why 
var shoppingCart = [" ", "1"];
shoppingCart.length = 0;

var BreakException = {};
var title = document.querySelector("h1");
var tableDiv = document.querySelector("#formDiv");
var categoryDiv = document.querySelector("#categoryDiv");
var productListDiv = document.querySelector("#productListDiv");
var productContentDiv = document.querySelector("#productContent");
var checkoutDiv = document.querySelector("#checkoutDiv");
var receiptDiv = document.querySelector("#receiptDiv");
var notationDiv = document.querySelector("#notationDiv");
var tableSubmit = document.querySelector("#tableSubmit");
var tableSelect = document.querySelector("#tableSelect");
var successAlertDiv;
var wordsToBold = ["Räkor", "Crabfish", "Nötter", ", Ägg"];
var sumText = document.createElement("p");
var tableNum;

tableSubmit.addEventListener("click", function (){
    if (tableSelect.value !== "null") {
        tableNum = tableSelect.value;
        console.log(tableNum);

        tableDiv.classList.add("d-none");
        categoryDiv.classList.remove("d-none");
        title.innerHTML = "Beställning för bord " + tableNum;

        if (successAlertDiv !== undefined) {
            successAlertDiv.remove();
        }
    }
    else {
        alert("Du måste välja ett bord.");
    }
});


//checkout eventlisteners
document.querySelector("#checkoutButton").addEventListener("click", function() {
    categoryDiv.classList.add("d-none");
    checkoutDiv.classList.remove("d-none");
    title.innerHTML = "Kvitto för bord " + tableNum;
    let sum = 0;
    let i = 0;

    shoppingCart.forEach(element => {
        let div = document.createElement("div")
        sum += element.price;
        console.log(sum)
        div.innerHTML = "<p style='width:90%; float:left;'>" + element.name + "</p> <p style='width:10%; float:right;'>" + element.price + "kr</p>";
        div.appendChild(document.createElement("hr"))
        receiptDiv.appendChild(div);
        i++;
    });

    console.log("sum: " + sum);
    sumText.innerHTML = "<b>Summa: " + sum + "kr</b>";
    sumText.setAttribute("style", "float:right;");
    sumText.classList.add("me-3");

    checkoutDiv.appendChild(sumText);
});

document.querySelector("#clearButton").addEventListener("click", function() {
    shoppingCart.length = 0;
    receiptDiv.innerHTML = "";
    sumText.innerHTML = "<b>Summa: 0kr</b>";
});

document.querySelector("#sendOrderButton").addEventListener("click", function() {
    //clear receipt and move to notes
    checkoutDiv.classList.add("d-none");
    notationDiv.classList.remove("d-none");
    receiptDiv.innerHTML = "";
    title.innerHTML = "Kommentarer till beställningen";
    checkoutDiv.removeChild(sumText);
});

document.querySelector("#continueButton").addEventListener("click", function() {
    //return to table select and return success alert
    notationDiv.classList.add("d-none");
    tableDiv.classList.remove("d-none");

    let successAlert = document.createElement("div");
    let tableForm = document.querySelector("#tableForm");
    successAlert.classList.add("alert");
    successAlert.classList.add("alert-success");
    successAlert.setAttribute("role", "alert")
    successAlert.setAttribute("name", "success-alert");
    successAlert.textContent = "Beställning för bord " + tableNum + " skickat till köket.";

    tableDiv.insertBefore(successAlert, tableForm);
    tableNum = 0;
    
    //empty receipt list and reset
    receiptDiv.innerHTML = "";
    categoryDiv.classList.add("d-none");
    tableDiv.classList.remove("d-none");
    shoppingCart.length = 0;
    title.innerHTML = "Din Mammas Pizzeria";
    document.querySelector("#notationBox").value = "";
    successAlertDiv = successAlert;
    //här skulle beställningen skickas till köket
})

document.querySelector("#cancelCheckout").addEventListener("click", function() {
    checkoutDiv.classList.add("d-none");
    categoryDiv.classList.remove("d-none");
    receiptDiv.innerHTML = "";
    title.innerHTML = "Beställning för bord " + tableNum;
    checkoutDiv.removeChild(sumText);
});

//cancel order from category screen
document.querySelector("#cancelCategory").addEventListener("click", function() {
    tableNum = 0;
    categoryDiv.classList.add("d-none");
    tableDiv.classList.remove("d-none");
    shoppingCart.length = 0;
    title.innerHTML = "Din Mammas Pizzeria";
});

document.querySelector("#pizzaClass1Button").addEventListener("click", function() {
    console.log("class 1");
    categoryDiv.classList.add("d-none");
    productListDiv.classList.remove("d-none");
    let iteration = 0;

    pizzaClass1.forEach(element => {
        let div = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createTextNode(element.name + " ");
        let price = document.createTextNode(element.price + "kr ");
        let infoButton = document.createElement("button");
        let cartButton = document.createElement("button");

        infoDiv.setAttribute("id", "infoDiv" + iteration);
        infoDiv.classList.add("collapse");
        infoDiv.innerHTML = "<p>Ingredienser: " + makeBold(element.ingredients, wordsToBold) + "</p>";

        infoButton.setAttribute("type", "button");
        infoButton.setAttribute("data-bs-toggle", "collapse");
        infoButton.setAttribute("data-bs-target", "#infoDiv" + iteration);
        infoButton.setAttribute("aria-expanded", "false");
        infoButton.setAttribute("aria-controls", "infoDiv" + iteration);
        infoButton.classList.add("btn");
        infoButton.classList.add("btn-primary");
        infoButton.innerHTML = '<i class="bi bi-info-lg"></i>';

        cartButton.setAttribute("type", "button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-primary");
        cartButton.classList.add("ms-2");
        cartButton.innerHTML = '<i class="bi bi-basket2"></i>';
        cartButton.addEventListener("click", function() {
            //add product to cart
            shoppingCart.push(element);
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(infoButton);
        div.appendChild(cartButton);
        div.appendChild(infoDiv);
        productContentDiv.appendChild(div);
        productContentDiv.appendChild(document.createElement("br"));
        iteration++;
    });
});

document.querySelector("#pizzaClass2Button").addEventListener("click", function() {
    console.log("class 2");
    categoryDiv.classList.add("d-none");
    productListDiv.classList.remove("d-none");
    let iteration = 0;

    pizzaClass2.forEach(element => {
        let div = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createTextNode(element.name + " ");
        let price = document.createTextNode(element.price + "kr ");
        let infoButton = document.createElement("button");
        let cartButton = document.createElement("button");

        infoDiv.setAttribute("id", "infoDiv" + iteration);
        infoDiv.classList.add("collapse");
        infoDiv.innerHTML = "<p>Ingredienser: " + makeBold(element.ingredients, wordsToBold) + "</p>";

        infoButton.setAttribute("type", "button");
        infoButton.setAttribute("data-bs-toggle", "collapse");
        infoButton.setAttribute("data-bs-target", "#infoDiv" + iteration);
        infoButton.setAttribute("aria-expanded", "false");
        infoButton.classList.add("btn");
        infoButton.classList.add("btn-primary");
        infoButton.innerHTML = '<i class="bi bi-info-lg"></i>';

        cartButton.setAttribute("type", "button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-primary");
        cartButton.classList.add("ms-2");
        cartButton.innerHTML = '<i class="bi bi-basket2"></i>';
        cartButton.addEventListener("click", function() {
            //add product to cart
            shoppingCart.push(element);
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(infoButton);
        div.appendChild(cartButton);
        div.appendChild(infoDiv);
        productContentDiv.appendChild(div);
        productContentDiv.appendChild(document.createElement("br"));
        iteration++;
    });
});

document.querySelector("#pizzaClass3Button").addEventListener("click", function() {
    categoryDiv.classList.add("d-none");
    productListDiv.classList.remove("d-none");
    let iteration = 0;

    pizzaClass3.forEach(element => {
        let div = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createTextNode(element.name + " ");
        let price = document.createTextNode(element.price + "kr ");
        let infoButton = document.createElement("button");
        let cartButton = document.createElement("button");

        infoDiv.setAttribute("id", "infoDiv" + iteration)
        infoDiv.classList.add("collapse");
        infoDiv.innerHTML = "<p>Ingredienser: " + makeBold(element.ingredients, wordsToBold) + "</p>";

        infoButton.setAttribute("type", "button");
        infoButton.setAttribute("data-bs-toggle", "collapse");
        infoButton.setAttribute("data-bs-target", "#infoDiv" + iteration);
        infoButton.setAttribute("aria-expanded", "false");
        infoButton.classList.add("btn");
        infoButton.classList.add("btn-primary");
        infoButton.innerHTML = '<i class="bi bi-info-lg"></i>';

        cartButton.setAttribute("type", "button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-primary");
        cartButton.classList.add("ms-2");
        cartButton.innerHTML = '<i class="bi bi-basket2"></i>';
        cartButton.addEventListener("click", function() {
            //add product to cart
            shoppingCart.push(element);
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(infoButton);
        div.appendChild(cartButton);
        div.appendChild(infoDiv);
        productContentDiv.appendChild(div);
        productContentDiv.appendChild(document.createElement("br"));
        iteration++;
    });
});

document.querySelector("#sauceButton").addEventListener("click", function() {
    categoryDiv.classList.add("d-none");
    productListDiv.classList.remove("d-none");

    sauces.forEach(element => {
        let div = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createTextNode(element.name + " ");
        let price = document.createTextNode(element.price + "kr ");
        let infoButton = document.createElement("button");
        let cartButton = document.createElement("button");

        cartButton.setAttribute("type", "button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-primary");
        cartButton.classList.add("ms-2");
        cartButton.innerHTML = '<i class="bi bi-basket2"></i>';
        cartButton.addEventListener("click", function() {
            //add product to cart
            shoppingCart.push(element);
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(cartButton);
        productContentDiv.appendChild(div);
        productContentDiv.appendChild(document.createElement("br"));
    });
});

document.querySelector("#drinksButton").addEventListener("click", function() {
    categoryDiv.classList.add("d-none");
    productListDiv.classList.remove("d-none");

    drinks.forEach(element => {
        let div = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createTextNode(element.name + " ");
        let price = document.createTextNode(element.price + "kr ");
        let infoButton = document.createElement("button");
        let cartButton = document.createElement("button");

        cartButton.setAttribute("type", "button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-primary");
        cartButton.classList.add("ms-2");
        cartButton.innerHTML = '<i class="bi bi-basket2"></i>';
        cartButton.addEventListener("click", function() {
            //add product to cart
            shoppingCart.push(element);
        });

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(cartButton);
        productContentDiv.appendChild(div);
        productContentDiv.appendChild(document.createElement("br"));
    });
});

document.querySelector("#backButton").addEventListener("click", function() {
    productListDiv.classList.add("d-none");
    productContentDiv.innerHTML = "";
    categoryDiv.classList.remove("d-none");
});

//funktion lånat av https://stackoverflow.com/questions/30599425/javascript-how-to-add-bold-strong-effect-to-certain-words-in-a-given-string
function makeBold(input, wordsToBold) {
    return input.replace(new RegExp('(\\b)(' + wordsToBold.join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3');
}