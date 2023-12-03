const restaurants = [
  {
    name: "Restaurant A",
    menu: [
      { name: "Item 1", price: 10 },
      { name: "Item 2", price: 12 },
      // Add more menu items for Restaurant A
    ]
  },
  {
    name: "Restaurant B",
    menu: [
      { name: "B Dish", price: 15 },
      { name: "B Item", price: 11 },
      // Add more menu items for Restaurant B
    ]
  },
  {
    name: "Restaurant C",
    menu: [
      { name: "C Dish", price: 15 },
      { name: "C Item", price: 11 },
      // Add more menu items for Restaurant C
    ]
  },
  {
    name: "Restaurant D",
    menu: [
      { name: "D Dish", price: 15 },
      { name: "D Item", price: 11 },
      // Add more menu items for Restaurant D
    ]
  },
  {
    name: "Restaurant E",
    menu: [
      { name: "E Dish", price: 15 },
      { name: "E Item", price: 11 },
      // Add more menu items for Restaurant E
    ]
  },
  {
    name: "Restaurant F",
    menu: [
      { name: "F Dish", price: 15 },
      { name: "F Item", price: 11 },
      // Add more menu items for Restaurant F
    ]
  }
  // Add more restaurants and menus as needed
];

// Merge login and registration handling functions
function handleUser(action) {
  const email = document.getElementById(`${action}Email`).value;
  const password = document.getElementById(`${action}Password`).value;

  if (action === 'login') {
    const loginResult = loginUser(email, password);
    if (loginResult.success) {
      // Display user account information after successful login
      displayAccountInfo(email);
      alert(`${loginResult.message}! Redirecting to GrabEAT!`);
      window.location.href = 'index.html';
    } else {
      alert('User not found. Make sure to register before logging in');
    }
  } else if (action === 'register') {
    const registrationResult = registerUser(email, password);
    if (registrationResult.success) {
      alert('Registration successful. You can now log in.');
    } else {
      alert(registrationResult.message);
    }
  }
}

function saveAccountInfo(email) {
  // Gather account information from the form
  const fullName = document.getElementById('fullName').value;
  const section = document.getElementById('section').value;
  const mobileNumber = document.getElementById('mobileNumber').value;

  // Create an object to represent the account information
  const accountInfo = {
    email: email,
    fullName: fullName,
    section: section,
    mobileNumber: mobileNumber
    // Add other fields if needed
  };

  // Store the account information in localStorage or a database (for example)
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
}

function registerUser(email, password) {
  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }

  // Register the new user
  users.push({ email, password });
  return { success: true, message: 'User registered successfully' };
}


function handleRegistration() {
  const registerEmail = document.getElementById('registerEmail').value;
  const registerPassword = document.getElementById('registerPassword').value;

  const registrationResult = registerUser(registerEmail, registerPassword);
  if (registrationResult.success) {
    alert('Registration successful. You can now log in.');
  } else {
    alert(registrationResult.message);
  }
}

function loginUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  return user;
}

// Function to display the restaurant list
function displayRestaurantList() {
  const restaurantList = document.getElementById('restaurantList');
  restaurantList.innerHTML = '<h2>Restaurants</h2>';

  restaurants.forEach((restaurant, index) => {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.classList.add('restaurant');
    restaurantDiv.innerHTML = `
      <h3>${restaurant.name}</h3>
      <button onclick="showMenu(${index})">View Menu</button>
    `;
    restaurantList.appendChild(restaurantDiv);
  });
} // Function to show payment section
function proceedToPayment() {
  const paymentTotal = document.getElementById('paymentTotal');
  const cartItemsPayment = document.getElementById('cartItemsPayment');

  const serviceFee = 10;
  let totalAmountToPay = 0;
  let uniqueRestaurants = []; // Array to track unique restaurants

  cartItemsPayment.innerHTML = '';
  for (const [itemName, { price, quantity, restaurant }] of Object.entries(cartItems)) {
    const listItem = document.createElement('li');
    listItem.innerText = `${itemName} - ₱${price} x ${quantity}`;
    cartItemsPayment.appendChild(listItem);

    // Calculate total amount for each unique restaurant
    if (!uniqueRestaurants.includes(restaurant)) {
      totalAmountToPay += price * quantity + serviceFee;
      uniqueRestaurants.push(restaurant);
    } else {
      totalAmountToPay += price * quantity;
    }
  }

  paymentTotal.innerText = `₱${totalAmountToPay}`;

  const cartSection = document.getElementById('cart');
  const paymentSection = document.getElementById('payment');

  cartSection.style.display = 'none';
  paymentSection.style.display = 'block';
}

// Function to display the menu for a selected restaurant 
function showMenu(index) {
  const selectedRestaurant = restaurants[index];
  const menuSection = document.getElementById('menu');
  const menuItems = document.getElementById('menuItems');
  
  menuItems.innerHTML = '';
  selectedRestaurant.menu.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `<span>${item.name}</span> - ₱${item.price} <button onclick="addToCart('${item.name}', ${item.price})">Add to cart</button>`;
    menuItems.appendChild(menuItem);
  });

  document.getElementById('restaurantName').innerText = selectedRestaurant.name;
  document.getElementById('restaurantList').style.display = 'none';
  menuSection.style.display = 'block';
}

// Define cartItems as an object to track quantities
let cartItems = {};

// Function to decrease the quantity of an item in the cart
function increaseQuantity(itemName) {
  cartItems[itemName].quantity++;
  updateCart();
}

function decreaseQuantity(itemName) {
  if (cartItems[itemName].quantity > 1) {
    cartItems[itemName].quantity--;
  } else {
    delete cartItems[itemName]; // Remove item if quantity becomes zero
  }
  updateCart();
}

function addToCart(itemName, itemPrice) {
  const existingCartItem = cartItems[itemName];
  if (existingCartItem) {
    existingCartItem.quantity++; // Increment quantity if item already exists
  } else {
    cartItems[itemName] = { price: itemPrice, quantity: 1 }; // Add new item with quantity 1
  }
  updateCart();
}

function updateCart() {
  const cart = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');

  cart.innerHTML = '';
  let total = 0;

  // Loop through cartItems object to display items and quantities
  for (const [itemName, { price, quantity }] of Object.entries(cartItems)) {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      ${itemName} - ₱${price} 
      <span>Quantity: ${quantity}</span>
      <button onclick="decreaseQuantity('${itemName}')">-</button>
      <button onclick="increaseQuantity('${itemName}')">+</button>`;
    cart.appendChild(cartItem);
    total += price * quantity;
  }

  cartTotalElement.innerText = `₱${total}`;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('cart').style.display = 'block';
}

// Function to remove an item from the cart
function removeFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0]; // Remove the item at the specified index
  cartTotal -= removedItem.price; // Update the cart total
  
  updateCart(); // Update the cart UI to reflect the changes
}

// Function to go back to the menu without clearing the cart
function goBackToMenu() {
  updateCart(); // Update the cart UI
  showRestaurantList(); // Show the menu/restaurant list
  

}

// ... (Remaining functions remain unchanged)

// Initialize the app by displaying the restaurant list
displayRestaurantList();


// Function to show the shopping cart
function showCart() 
{
  updateCart(); // Update the cart UI
  const cartSection = document.getElementById('cart');
  const menuSection = document.getElementById('menu');

  if (cartSection.style.display === 'none') {
    cartSection.style.display = 'block';
    menuSection.style.display = 'none';
  } else {
    cartSection.style.display = 'none';
    menuSection.style.display = 'block';
  }
}
{
  document.getElementById('menu').style.display = 'none';
  document.getElementById('cart').style.display = 'block';
}



// Function to show the payment section
function showPayment() {
  document.getElementById('cart').style.display = 'none';
  document.getElementById('payment').style.display = 'block';
}

// Function to display the restaurant list when going back
function showRestaurantList() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('restaurantList').style.display = 'block';
}

// Initialize the app by displaying the restaurant list
displayRestaurantList();

function scrollToSection() {
  const ShoppingCart = document.getElementById('sectionToScrollTo');
  if (ShoppingCart) {
      ShoppingCart.scrollIntoView({ behavior: 'smooth' });
  }
  // Variable to keep track of unique restaurants
let uniqueRestaurants = [];


}

// Add a function to show payment options
function showPaymentOptions() {
  const paymentOptions = document.getElementById('paymentOptions');
  const paymentMethod = document.getElementById('paymentMethod').value;

  if (paymentMethod === 'Gcash') {
    // Redirect to Gcash app for payment
    window.location.href = 'gcash://payment'; // Replace 'gcash://payment' with the appropriate Gcash payment URL
  } else if (paymentMethod === 'CreditCard') {
    // Redirect to a page showing order update for Cash on Delivery
    window.location.href = 'order_update_page.html'; // Replace 'order_update_page.html' with the page URL for order updates
  } else {
    // Handle other payment methods or show an error message
    alert('Invalid payment method selected');
  }
}