function addToCart(restaurant) {
    const li = document.createElement('li');
    li.textContent = restaurant;
    document.getElementById('cartList').appendChild(li);
}

document.getElementById('userInput').addEventListener('keyup', function(event) {
    const filter = event.target.value.toUpperCase();
    const li = document.getElementById('restaurantList').getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        const h2 = li[i].getElementsByTagName('h2')[0];
        if (h2.textContent.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
});
