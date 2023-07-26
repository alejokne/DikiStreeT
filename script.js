// Variables globales
let products = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1...", price: 99 },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2...", price: 129 },
    { id: 3, name: "Producto 3", description: "Descripción del producto 3...", price: 50 },
    { id: 4, name: "Producto 4", description: "Descripción del producto 4...", price: 100 },
    { id: 5, name: "Producto 5", description: "Descripción del producto 5...", price: 99 },
    { id: 6, name: "Producto 6", description: "Descripción del producto 6...", price: 129 },
    { id: 7, name: "Producto 7", description: "Descripción del producto 7...", price: 99 },
    { id: 8, name: "Producto 8", description: "Descripción del producto 8...", price: 129 },
    { id: 9, name: "Producto 9", description: "Descripción del producto 9...", price: 99 },
    { id: 10, name: "Producto 10", description: "Descripción del producto 10...", price: 129 },
    { id: 11, name: "Producto 11", description: "Descripción del producto 11...", price: 99 },
    { id: 12, name: "Producto 12", description: "Descripción del producto 12...", price: 129 },
    
];
 // Acomodar en un cuadro 3x3
let cuadro3x3 = [];
for (let i = 0; i < products.length; i += 3) {
    cuadro3x3.push(products.slice(i, i + 3));
}
 console.log(cuadro3x3);

 let currentProductIndex = 0;

// Función para mostrar la descripción del producto seleccionado
function showProductDescription(index) {
    const productDescription = document.querySelector(".product-description");
    const productName = products[index].name;
    const productDescriptionText = products[index].description;
    const productPrice = products[index].price;

    productDescription.innerHTML = `
        <h2>${productName}</h2>
        <p>${productDescriptionText}</p>
        <p>Precio: $${productPrice} MXN</p>
        <button class="buy-now-btn">Comprar Ahora</button>
    `;
}

// Función para generar la tabla de productos
function generateProductTable() {
    const productTable = document.querySelector(".product-table");
    let tableHTML = "";

    products.forEach((product, index) => {
        tableHTML += `
            <div class="product-item" onclick="showProductDescription(${index})">
                <img src="ruta_del_producto_${product.id}.png" alt="${product.name}">
                <p>${product.name}</p>
            </div>
        `;
    });

    productTable.innerHTML = tableHTML;
}

// Función para cambiar el producto mostrado en la descripción
function changeProduct(direction) {
    if (direction === "next") {
        currentProductIndex = (currentProductIndex + 1) % products.length;
    } else {
        currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    }

    showProductDescription(currentProductIndex);
}

// Event Listener para el botón de menú desplegable
document.querySelector(".menu-icon").addEventListener("click", () => {
    // Aquí agregar el código para mostrar el menú desplegable
    console.log("Mostrar menú desplegable");
});

// Event Listener para el botón de "Comprar Ahora"
document.querySelector(".buy-now-btn").addEventListener("click", () => {
    // Aquí puedes agregar el código para redirigir a la página del carrito de compras
    console.log("Redirigir a la página del carrito de compras");
});

// Generar la tabla de productos al cargar la página
generateProductTable();
// Mostrar la descripción del primer producto por defecto
showProductDescription(currentProductIndex);
