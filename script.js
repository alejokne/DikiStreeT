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
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 6;

// Obtener la tabla de productos y la descripción
const productTable = document.querySelector(".product-table");
const productDescription = document.querySelector(".product-description");
// Función para mostrar la descripción del producto seleccionado
function showProductDescription(index) {
    const productName = filteredProducts[index].name;
    const productDescriptionText = filteredProducts[index].description;
    const productPrice = filteredProducts[index].price;
    const productViews = filteredProducts[index].views;

    productDescription.innerHTML = `
        <h2>${productName}</h2>
        <p>${productDescriptionText}</p>
        <p>Precio: $${productPrice} MXN</p>
        <p>Vistas: ${productViews}</p>
        <!-- Agregar más detalles aquí -->
        <button class="buy-now-btn">Comprar Ahora</button>
    `;
}

// Función para generar la tabla de productos
function generateProductTable() {
    let tableHTML = "";

    for (let i = (currentPage - 1) * productsPerPage; i < currentPage * productsPerPage; i++) {
        if (i >= filteredProducts.length) {
            break;
        }

        const product = filteredProducts[i];

        tableHTML += `
            <div class="product-item" onclick="showProductDescription(${i})">
                <img src="ruta_del_producto_${product.id}.png" alt="${product.name}">
                <p>${product.name}</p>
            </div>
        `;
    }

    productTable.innerHTML = tableHTML;
}
// Función para cambiar el producto mostrado en la descripción
function changeProduct(direction) {
    if (direction === "next") {
        currentProductIndex = (currentProductIndex + 1) % filteredProducts.length;
    } else {
        currentProductIndex = (currentProductIndex - 1 + filteredProducts.length) % filteredProducts.length;
    }

    showProductDescription(currentProductIndex);
}

// Función para manejar el cambio de página
function changePage(page) {
    currentPage = page;
    generateProductTable();
    updatePaginationButtons();
}
// Función para ordenar productos por nombre
function sortProductsByName() {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    generateProductTable();
}

// Función para ordenar productos por precio (de menor a mayor)
function sortProductsByPrice() {
    filteredProducts.sort((a, b) => a.price - b.price);
    generateProductTable();
}

// Función para ordenar productos por cantidad de vistas (de mayor a menor)
function sortProductsByViews() {
    filteredProducts.sort((a, b) => b.views - a.views);
    generateProductTable();
}

// Función para filtrar productos por precio
function filterProductsByPrice() {
    const minPrice = parseFloat(document.querySelector("#price-filter").value);
    const maxPrice = parseFloat(document.querySelector("#max-price-filter").value);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        currentPage = 1;
        generateProductTable();
        updatePaginationButtons();
    }
}
// Función para agregar una vista al producto seleccionado
function addViewToProduct() {
    const currentProduct = filteredProducts[currentProductIndex];
    currentProduct.views++;
    showProductDescription(currentProductIndex);
}

// Función para mostrar el menú desplegable
function showDropdownMenu() {
    // Agrega aquí el código para mostrar el menú desplegable
    console.log("Mostrar menú desplegable");
}

// Función para redirigir a la página del carrito de compras
function redirectToCartPage() {
    // Agrega aquí el código para redirigir a la página del carrito de compras
    console.log("Redirigir a la página del carrito de compras");
}
// Event Listener para el botón de menú desplegable
document.querySelector(".menu-icon").addEventListener("click", showDropdownMenu);

// Event Listener para el botón de "Comprar Ahora"
document.querySelector(".buy-now-btn").addEventListener("click", redirectToCartPage);

// Event Listener para el botón "Siguiente" y "Anterior"
document.querySelector(".next-btn").addEventListener("click", () => changePage(currentPage + 1));
document.querySelector(".prev-btn").addEventListener("click", () => changePage(currentPage - 1));

// Event Listener para el filtro de precios
document.querySelector("#filter-btn").addEventListener("click", filterProductsByPrice);

// Cargar la tabla de productos al cargar la página
generateProductTable();
// Mostrar la descripción del primer producto por defecto
let currentProductIndex = 0;
showProductDescription(currentProductIndex);
// Función para actualizar los botones de paginación
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}
// Función para mostrar el menú desplegable
function showDropdownMenu() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.classList.toggle("show");
}

// Función para redirigir a la página del carrito de compras
function redirectToCartPage() {
    // Agrega aquí el código para redirigir a la página del carrito de compras
    // Por ejemplo:
    window.location.href = "/carrito";
}
// Función para inicializar la paginación y mostrar la primera página de productos
function initPagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationContainer = document.querySelector(".pagination");
    let paginationHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
    }

    paginationContainer.innerHTML = paginationHTML;
}

// Actualizar vistas al mostrar la descripción del producto
function updateViews() {
    const currentProduct = filteredProducts[currentProductIndex];
    currentProduct.views++;
    showProductDescription(currentProductIndex);
}
// Llamada a la función de inicialización de la paginación
initPagination();

// Mostrar la descripción del primer producto por defecto
let currentProductIndex = 0;
showProductDescription(currentProductIndex);

// Event Listener para el botón "Siguiente" y "Anterior" en la descripción del producto
document.querySelector(".next-btn-desc").addEventListener("click", () => changeProduct("next"));
document.querySelector(".prev-btn-desc").addEventListener("click", () => changeProduct("prev"));

// Event Listener para agregar vistas al producto seleccionado
document.querySelector(".add-view-btn").addEventListener("click", updateViews);
