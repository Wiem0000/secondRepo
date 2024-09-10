// Générateur d'ID unique
function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}

// Fonction de boucle pour les tableaux
function each(array, func) {
  for (let i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

// Fonction de filtrage
function filter(array, predicate) {
  var acc = [];
  each(array, function (element, i) {
    if (predicate(element, i)) {
      acc.push(element);
    }
  });
  return acc;
}

var id = generateID();

// Fonction de création d'un produit
function Product(name, price, size, category, images) {
  return {
    id: id(),
    name: name,
    price: price,
    size: size,
    category: category,
    images: images,
    date: Date()
  };
}

// Fonction pour créer un produit
function MakeProduct(name) {
  var Prod = {};
  Prod.name = name;
  Prod.list = [];
  Prod.addProduct = addProduct;
  Prod.removeProduct = removeProduct;
  Prod.sortByPrice = sortByPrice;
  Prod.sortByDate = sortByDate;
  Prod.displayByCat = displayByCat;
  return Prod;
}

var addProduct = function (name, price, size, category, images) {
  this.list.push(Product(name, price, size, category, images));
};

var removeProduct = function (id) {
  this.list = this.list.filter(function (element) {
    return element.id !== id;
  });
};

var sortByPrice = function () {
  return this.list.sort(function (a, b) {
    return a.price - b.price;
  });
};

var sortByDate = function () {
  return this.list.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
};

var displayByCat = function (category) {
  return filter(this.list, function (element) {
    return element.category === category;
  });
};

var Tshirt = MakeProduct("T-Shirt");
var Shoes = MakeProduct("Shoes");
var Jeans = MakeProduct("Jeans");
var Sweats = MakeProduct("Sweats");
var Accessoires = MakeProduct("Accessoires");

// Ajout des produits aux catégories avec les nouveaux liens d'images
Tshirt.addProduct("White inscription", 50, "S-M-L-XL-XXL", "T-shirt", [
  "../image/White/inscription-removebg-preview.png",
  "../image/White/inscription1-removebg-preview.png",
]);
Tshirt.addProduct("White-Looney", 40, "M,XXL,XXXL", "T-shirt", [
  "../image/White/Looney-removebg-preview.png",
  "../image/White/Looney1-removebg-preview.png",
]);
Tshirt.addProduct("White-STWD", 60, "S-M", "T-shirt", [
  "../image/White/STWD-removebg-preview.png",
  "../image/White/STWD1-removebg-preview.png",
]);
Tshirt.addProduct("White-Metallica", 70, "M-L-XL", "T-shirt", [
  "../image/White/Metallica-removebg-preview.png",
  "../image/White/Metallica1-removebg-preview.png",
]);

Jeans.addProduct("Gre Jeans", 80, "36-44", "Jeans", [
  "../image/White/07684501406-A6M-removebg-preview.png",
  "../image/White/07684501406-A20M-removebg-preview.png",
]);

Jeans.addProduct("White Jeans", 70, "36-42", "Jeans", [
  "../image/White/07685517426-A6M-removebg-preview.png",
  "../image/White/07685517426-A20M-removebg-preview.png",
]);

Jeans.addProduct("White Jeans", 100, "36-46", "Jeans", [
  "../image/White/Capture-removebg-preview.png",
  "../image/White/cap1-removebg-preview.png",
]);
Jeans.addProduct("White jeans", 89, "36-44", "Jeans", [
  "../image/White/7686504251_2_6_0-removebg-preview.png",
  "../image/White/7686504251_2_20_0-removebg-preview.png",
]);

Shoes.addProduct("White tinnes", 150, "40-46", "Shoes", [
  "../image/White/2213340001_2_2_0-removebg-preview.png",
  "../image/White/Tennis-removebg-preview.png",
]);
Shoes.addProduct("White Baskets", 139, "40-46", "Shoes", [
  "../image/White/Baskets-removebg-preview.png",
  "../image/White/Baskets1-removebg-preview.png",
]);
Shoes.addProduct("White surpiqûres", 120, "40-46", "Shoes", [
  "../image/White/surpiqûres-removebg-preview.png",
  "../image/White/surpiqûres1-removebg-preview.png",
]);
Shoes.addProduct("White street", 180, "40-46", "Shoes", [
  "../image/White/street-removebg-preview.png",
  "../image/White/street1-removebg-preview.png",
]);

// Fonction pour afficher un produit
function displayOne(obj, container) {
  $(container).append(`
    <div class="Product">
      <img class="imgs" id="img${obj.id}" src="${obj.images[0]}" alt="${obj.name}">
      <h3 class="NameProduct">${obj.name}</h3>
      <p class="Price">Price : ${obj.price} TND</p>
      <p class="size">Size : ${obj.size}</p>
      <p class="Category">Category : ${obj.category}</p>
      <button class="add-to-cart" data-id="${obj.id}">Add to Cart</button>
    </div>
  `);
  
  $(`#img${obj.id}`).on('click', function () {
    toggleImage(obj);
  });
}

function displayAll(array, container) {
  $(container).empty(); // nafregh el container 
  for (let i = 0; i < array.length; i++) {
    displayOne(array[i], container);
  }
}

// display product 
displayAll(Tshirt.list, '.Tshirt');
displayAll(Jeans.list, '.Jeans');
displayAll(Shoes.list, '.shoes');

$(".imgs").css({ width: "250px", height: "250px" });

var countImage = 0;

//  change image 
function toggleImage(obj) {
  countImage++;
  if (countImage >= obj.images.length) {
    countImage = 0;
  }
  $(`#img${obj.id}`).attr("src", obj.images[countImage]);
}

// sort product by price 
$("body").prepend("<button id='Sort'>Sort by price</button>");
//display by categ 
$("body").prepend("<input id='input' placeholder='Insert category'>");
$("body").prepend("<button id='search'>Search</button>");

function displaySortByPrice() {
  // sort each 
  Tshirt.sortByPrice();
  Jeans.sortByPrice();
  Shoes.sortByPrice();

  $(".Tshirt").empty();
  $(".Jeans").empty();
  $(".shoes").empty();

  // display element sotred
  displayAll(Tshirt.list, ".Tshirt");
  displayAll(Jeans.list, ".Jeans");
  displayAll(Shoes.list, ".shoes");
}

// button tri click
$("#Sort").on("click", function () {
  displaySortByPrice();
});

function search() {
  var cat = $("#input").val().trim();  
  $("#Container").empty();  
  
  var results = [];
  results = results.concat(Tshirt.displayByCat(cat));
  results = results.concat(Jeans.displayByCat(cat));
  results = results.concat(Shoes.displayByCat(cat));
  
  if (results.length > 0) {
    $("#Container").removeClass("container").addClass("container");
    displayAll(results, "#Container");  
  }   if (results.length > 0) {
    $("#Container").removeClass("container").addClass("container");
    displayAll(results, "#Container");  
  } else {
    $("#Container").append("<p>No products found in this category.</p>"); 
  }
}


$("#search").on("click", function () {
  search();
});

// Partie admin
$("body").append("<button id='manager'>Manager Interface</button>");

$("body").append(`
  <div id='manager-div' style='display: none;'>
    <input id='name' placeholder='Name'>
    <input id='price' placeholder='Price'>
    <input id='size' placeholder='Size'>
    <input id='category' placeholder='Category'>
    <input id='images' placeholder='Images (comma separated)'>
    <input id='id-to-remove' placeholder='ID to Remove'>
    <button id='add'>Add Item</button>
    <button id='remove'>Remove Item</button>
  </div>
`);

$("#manager").on("click", function () {
  $("#manager-div").toggle();
});

$("#add").on("click", function () {
  var name = $("#name").val();
  var price =("#price").val();
  var size = $("#size").val();
  var category = $("#category").val();
  var images = $("#images").val().split(",");
  
  if (category === "T-shirt") {
    Tshirt.addProduct(name, price, size, category, images);
    displayAll(Tshirt.list, ".Tshirt");
  } else if (category === "Jeans") {
    Jeans.addProduct(name, price, size, category, images);
    displayAll(Jeans.list, ".Jeans");
  } else if (category === "Shoes") {
    Shoes.addProduct(name, price, size, category, images);
    displayAll(Shoes.list, ".shoes");
  }
});

$("#remove").on("click", function () {
  var id = $("#id-to-remove").val();
  
  Tshirt.removeProduct(id);
  Jeans.removeProduct(id);
  Shoes.removeProduct(id);

  displayAll(Tshirt.list, ".Tshirt");
  displayAll(Jeans.list, ".Jeans");
  displayAll(Shoes.list, ".shoes");
});
