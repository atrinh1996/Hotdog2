/* 
 * main.js
 *
 * Gives Hot Dog stand order summary. Includes meal tax in receipt. 
 * Diplays to html page. 
 * 
 * Amy B
 * Comp20
 * 3.15.2021
 */

// PRICES & RATES
const HOTDOG_PRICE      = 3.25;
const FF_PRICE          = 2.00;
const DRINKS_PRICE      = 1.50;
const DISCOUNT          = 0.10;
const MEAL_TAX          = 0.0625;

/*
 * validate
 * Confirms user input at leat one ordered item.
 * Used by index.html --> order form
 */
function validate() {

    // expected to have select elements correspond to ONLY menu items
    validOrder = false;
    $("select option:checked").each( function(idx) {
        foodName = menu[idx].name.toLowerCase();
        foodQty = $(this).val();

        localStorage.setItem(foodName + "-qty", foodQty);

        if (foodQty != 0)
            validOrder = true;
    });

    if (!validOrder)
        alert("Please order at least one (1) menu item.");

    return validOrder;
}

function MenuItem(name, cost) {
    this.name = name;
    this.cost=cost;
}

menu = new Array(
    new MenuItem("Hotdog", 3.25),
    new MenuItem("Fries", 2.00),
    new MenuItem("Soda", 1.50)
);

function makeMenuOption(identity, label, price) {
    s = "<div class='block'>";
    s += "<label for='" + identity + "'>" + label + "</label> <br>";
    s += "<label for='" + identity + "-price'>$" + price.toFixed(2) + " ea.</label>";
    s += "<select name='" + identity +"-qty' id='" + identity + "-qty'>";
    s += "<option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='10'>10</option><option value='15'>15</option><option value='20'>20</option>";
    s += "</select>";
    s += "</div>";

    return s;
}

function displayReceipt(quantities, foods, costs, final_pricing, receipt_bottom) {
    // Loop through the foods and quantities arrays to display how much was ordered.
    const food_qty = document.querySelector("#food-qty");
    console.log(food_qty);
    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] != 0) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${quantities[i]} x ${foods[i]}`));
            food_qty.appendChild(li);
        }
    }

    // Display Cost of each food order
    const food_cost = document.querySelector('#food-cost');
    for (let i = 0; i < costs.length; i++) {
        if (costs[i] != 0) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`$${costs[i].toFixed(2)}`));
            food_cost.appendChild(li);
        }
    }

    // Display text of receipt
    const total_display = document.querySelector('#total-display');
    for (let i = 0; i < receipt_bottom.length; i++) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${receipt_bottom[i]}:`));
        total_display.appendChild(li);
    }

    // Display Total Costs
    const actual_total = document.querySelector('#actual-total');
    for (let i = 0; i < final_pricing.length; i++) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`$${final_pricing[i].toFixed(2)}`));
        actual_total.appendChild(li);
    }
}

/*
 * main
 * Performs cost of order calculations and calls for 
 * another function to display full receipt in new window.
 */
function main() {
    h = localStorage.getItem("hotdog-qty");
    f = localStorage.getItem("fries-qty");
    d = localStorage.getItem("soda-qty");

    // Calculate subtotal based on pricing and qty
    hotdog_cost     = h * HOTDOG_PRICE;
    fries_cost      = f * FF_PRICE;
    drinks_cost     = d * DRINKS_PRICE;

    // CALCULATE DISCOUNT: If cost before tax is at >= $20, 10% discount
    subtotal_amt    = hotdog_cost + fries_cost + drinks_cost;
    final_discount  = 0;
    if (subtotal_amt >= 20)
        final_discount = subtotal_amt * DISCOUNT;

    // CALCULATE MEAL TAX: 6.25%
    tax = subtotal_amt * MEAL_TAX;

    // CALCULATE TOTAL = SUBTOTAL + MEAL TAX - DISCOUNT
    total = subtotal_amt + tax - final_discount;

    // Store these food quantities in an array to print.
    const     quantities    = [h, f, d];
    const          foods    = ['Hotdogs', 'Fries', 'Drinks'];
    const          costs    = [hotdog_cost, fries_cost, drinks_cost];
    const  final_pricing    = [subtotal_amt, final_discount, tax, total];
    const receipt_bottom    = ['Subtotal', 'Discount', 'Tax', 'Total'];

    displayReceipt(quantities, foods, costs, final_pricing, receipt_bottom);
}