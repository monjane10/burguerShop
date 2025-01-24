const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensContainer = document.getElementById("cart-itens");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

//Abre o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex";
  
});
//Fecha o modal ao clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none";
});

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn");
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

//Função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name);
    if(existingItem){
        //Se o item existir, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
    } else{
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal();
 
}

//Actualiza o carrinho
function updateCartModal(){
    cartItensContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p><span class="font-medium">Qtd:</span>${item.quantity}</p>
                <p class="font-medium mt-2">${(item.price).toFixed(2)}Mzn</p>
            </div>
            <div>
                <button class="remove-cart-btn" data-name="${item.name}">Remover</button>
            </div>
        </div>
    `;
    total += item.price *item.quantity;
    cartItensContainer.appendChild(cartItemElement);
    });
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency:"BRL"
    });

    cartCounter.innerHTML = cart.length;
}

//função para remover  item do carrinho
cartItensContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-cart-btn")) {
        const itemName = event.target.getAttribute("data-name");
        removeItemCart(itemName);
    } 
});

function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name);
    if (index !== -1) {
        const item = cart[index];
        if(item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}



