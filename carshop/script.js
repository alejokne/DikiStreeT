


  // Función para calcular y mostrar el subtotal por producto
  function updateSubtotals() {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const priceElement = product.querySelector('.product-info p');
      const quantityInput = product.querySelector('.quantity input');
      const subtotalElement = product.querySelector('.subtotal');

      const price = parseFloat(priceElement.textContent.replace('$', ''));
      const quantity = parseInt(quantityInput.value);
      const subtotal = price * quantity;

      subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    });

    updateTotal();
  }

  // Función para guardar el estado del carrito en el Local Storage
  function saveCartToLocalStorage() {
    const products = document.querySelectorAll('.product');
    const cartItems = [];

    products.forEach(product => {
      const name = product.querySelector('h2').textContent;
      const price = parseFloat(product.querySelector('.product-info p').textContent.replace('$', ''));
      const quantity = parseInt(product.querySelector('.quantity input').value);

      cartItems.push({ name, price, quantity });
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Función para cargar el carrito desde el Local Storage
  function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    if (cartItems) {
      const products = document.querySelectorAll('.product');

      products.forEach((product, index) => {
        product.querySelector('.quantity input').value = cartItems[index].quantity;
      });

      updateSubtotals();
      updateCartCounter();
    }
  }

  // Función para mostrar una notificación emergente cuando se agrega un producto al carrito
  function showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = 'Producto agregado al carrito';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000); // Desaparecer la notificación después de 3 segundos
  }

  // Función para aplicar descuento al total de la compra
  function applyDiscount(discountPercentage) {
    const totalElement = document.querySelector('.total h2');
    const total = parseFloat(totalElement.textContent.replace('Total: $', ''));

    const discountAmount = total * (discountPercentage / 100);
    const discountedTotal = total - discountAmount;

    totalElement.textContent = `Total: $${discountedTotal.toFixed(2)}`;
  }

  // Función para calcular el costo de envío
  function calculateShipping() {
    const shippingAddressInput = document.getElementById('shipping-address');
    const shippingAddress = shippingAddressInput.value;

    // Simulación: costo de envío se calcula basado en la longitud de la dirección ingresada
    const shippingCost = shippingAddress.length * 0.1;

    const totalElement = document.querySelector('.total h2');
    const total = parseFloat(totalElement.textContent.replace('Total: $', ''));

    const totalWithShipping = total + shippingCost;
    totalElement.textContent = `Total + Envío: $${totalWithShipping.toFixed(2)}`;
  }

  // Función para verificar y establecer la cantidad máxima de productos que el usuario puede agregar al carrito
  function setMaxQuantity() {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const maxQuantity = 10; // Cantidad máxima de productos (puedes cambiarla según tu inventario)
      const quantityInput = product.querySelector('.quantity input');
      quantityInput.setAttribute('max', maxQuantity);

      const currentQuantity = parseInt(quantityInput.value);
      if (currentQuantity > maxQuantity) {
        quantityInput.value = maxQuantity;
      }
    });
  }

  // Función para actualizar el contador de elementos en el carrito
  function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    const products = document.querySelectorAll('.product');
    let totalCount = 0;

    products.forEach(product => {
      const quantityInput = product.querySelector('.quantity input');
      totalCount += parseInt(quantityInput.value);
    });

    cartCounter.textContent = totalCount;
  }

  // Función para actualizar el total general de la compra
  function updateTotal() {
    const totalElement = document.querySelector('.total h2');
    const products = document.querySelectorAll('.product');
    let total = 0;

    products.forEach(product => {
      const priceElement = product.querySelector('.product-info p');
      const quantityInput = product.querySelector('.quantity input');

      const price = parseFloat(priceElement.textContent.replace('$', ''));
      const quantity = parseInt(quantityInput.value);

      total += price * quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Asignar eventos a los botones y campos de cantidad
  document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage(); // Cargar el carrito desde el Local Storage al cargar la página
    setMaxQuantity(); // Establecer la cantidad máxima de productos al cargar la página
    updateSubtotals(); // Calcular y mostrar los subtotales por producto al cargar la página

    const quantityInputs = document.querySelectorAll('.quantity input');
    const removeButtons = document.querySelectorAll('.remove-product');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const calculateShippingButton = document.querySelector('.calculate-shipping');

    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        updateSubtotals();
        saveCartToLocalStorage();
      });
    });

    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.parentElement.parentElement.remove();
        updateSubtotals();
        updateCartCounter();
        saveCartToLocalStorage();
      });
    });

    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const discountPercentage = parseInt(button.dataset.discount);
        applyDiscount(discountPercentage);
        showNotification();
        updateCartCounter();
        saveCartToLocalStorage();
      });
    });

    calculateShippingButton.addEventListener('click', () => {
      calculateShipping();
    });
  });


