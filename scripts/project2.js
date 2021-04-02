// YOUR NAME HERE

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;



// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();

	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);

// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function () {
	var shop = document.getElementById("boutique");
	for (var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));

	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className = cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	// add input to control as its child
	control.appendChild(input);

	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	// add control to control as its child
	control.appendChild(button);

	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (product) {
	// this is absolutely not the correct answer !
	// TODO 
	return createBlock("figure", '<img src=' + product.image + '>');
}

window.onload = function () {
	var btns = document.getElementsByClassName('commander');
	for (var i = 0; i < btns.length; i++) {
		btns[i].setAttribute('onclick', 'commander(this.id)');
		
		var query = document.getElementById("filter")
		query.addEventListener("keyup", queryBar)

	}
};

var cart = [];

function commander(id) {
	var index = id.replace("-order", "");
	var quantite = document.getElementById(index + '-qte');
	var dejaAuxPanier = false
	//
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].name === catalog[index].name) {
			dejaAuxPanier = true;
			cart[i].qte = parseInt(cart[i].qte) + parseInt(quantite.value);
			if (cart[i].qte >= 9) {
				cart[i].qte = 9;
			}
			UpdateCart();
		}
	}
	if (dejaAuxPanier === false) {
		var selectedProduct = {
			"name": catalog[index].name,
			"qte": quantite.value,
			"prix": catalog[index].price,
			"image": catalog[index].image
		}
		if (quantite.value != 0) {
			cart.push(selectedProduct);
			UpdateCart();
		}
	}
}

var UpdateCart = function () {
	var panier = document.getElementsByClassName('achats')[0];
	panier.innerHTML = '';
	total = 0;
	document.getElementById("montant").innerHTML = 0;
	for (var i = 0; i < cart.length; i++) {
		var item = createBlock('div', "", 'achat');
		item.append(createBlock("figure", '<img src=' + cart[i].image + '>'));
		item.append(createBlock("h4", cart[i].name));
		item.append(createBlock("div", cart[i].qte, 'quantite'));
		item.append(createBlock("div", cart[i].prix, 'prix'));

		var retirerbutton = createBlock("button", '', 'retirer');
		retirerbutton.setAttribute('onclick', 'retirer(' + i + ')');
		item.append(retirerbutton);

		panier.append(item);

		total = total + (cart[i].qte * cart[i].prix);
		document.getElementById("montant").innerHTML = total;
	}
}
var retirer = function (cartItem) {
	cart.splice(cartItem, 1);
	UpdateCart();
};

function queryBar(){
    var input, filter, boutique, productItem, productName, i, textValue;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    boutique = document.getElementById("boutique");
    productItem = boutique.getElementsByClassName("produit")
    for(i=0; i < productItem.length; i++){
        productName = productItem[i].getElementsByTagName('h4')[0];

        textValue = productName.textContent || productName.innerHTML;

        if (textValue.toUpperCase().indexOf(filter) > -1) {
            productItem[i].style.display = "";
        } else {
            productItem[i].style.display = "none";
        }

    }
}