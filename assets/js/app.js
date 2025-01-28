
// <!-- order cart popup js start -->
let body = document.querySelector("body"); 
let orderCartWrap = document.getElementById('orderCartWrap');

function showOrderCart() {
    orderCartWrap.classList.add('overlay');
    orderCartWrap.style.opacity = 0; // Start with invisible
    orderCartWrap.style.display = 'block';
    setTimeout(() => {
        orderCartWrap.style.opacity = 1; // Gradual fade-in
    }, 50);
    // body.style.overflow = "hidden";
}

function closeOrderCart() {
    orderCartWrap.style.opacity = 0; // Gradual fade-out
    setTimeout(() => {
        orderCartWrap.classList.remove('overlay');
        orderCartWrap.style.display = 'none';
    }, 500);
    // body.style.overflow = "auto";
}


// input validation 
function validateQtyInput(input) {
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1; // Reset to 1 if invalid
    }
}

document.querySelectorAll('.cart-input').forEach(input => {
    input.addEventListener('input', function () {
        validateQtyInput(this);
    });
});


// order cart qty plus minus js start 

const maxQty = 10;  // Replace this with your actual maximum quantity

// Function to increase quantity
function increaseQty(button) {
    const qtyInput = button.closest('.qty-layout').querySelector('.cart-input');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue < maxQty) {
        qtyInput.value = currentValue + 1;
        updateTotals();
    }
}

// Function to decrease quantity
function decreaseQty(button) {
    const qtyInput = button.closest('.qty-layout').querySelector('.cart-input');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
        updateTotals();
    }
}

// Attach event listeners to all cart-plus and cart-minus buttons
document.querySelectorAll('.cart-plus').forEach(button => {
    button.addEventListener('click', function () {
        increaseQty(this);
    });
});

document.querySelectorAll('.cart-minus').forEach(button => {
    button.addEventListener('click', function () {
        decreaseQty(this);
    });
});

// delete items from cart js 
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function () {
        // Get the closest 'cart-item' row and remove it
        const cartItem = this.closest('.cart-item');
        if (cartItem) {
            cartItem.remove();
        }
        // Optionally, update the subtotal and gross total after deletion
        updateTotals();
    });
});

// Example function to update subtotal, gross total, etc.
function updateTotals() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');

    // Loop through all cart items to calculate the subtotal
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.price');
        if (priceElement) {
            const price = parseFloat(priceElement.innerText.replace(/[^\d.-]/g, '')); // Extract price as a number
            subtotal += price;
        }
    });

    // Update the subtotal and gross total in the table
    document.querySelector('td.text-end').innerText = subtotal;
}

// cart js end 






// products details js start ////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const qtyControls = document.querySelectorAll('.qty-controls');

    qtyControls.forEach(control => {
        const minusBtn = control.querySelector('.pro-qty-minus');
        const plusBtn = control.querySelector('.pro-qty-plus');
        const qtyInput = control.querySelector('.pro-qty-input');

        // Handle minus button click
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value, 10);
            if (currentValue > 1) { // Prevent going below 1
                qtyInput.value = currentValue - 1;
            }
        });

        // Handle plus button click
        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value, 10);
            qtyInput.value = currentValue + 1;
        });
    });
});



// product thum img slider js start 
document.querySelectorAll('.thum-slider-wrapper').forEach((sliderWrapper, index) => {
    const productCards = sliderWrapper.querySelectorAll('.product-thum-card');
    const prevBtn = sliderWrapper.closest('.thum-slider-container').querySelector('.prev-btn');
    const nextBtn = sliderWrapper.closest('.thum-slider-container').querySelector('.next-btn');
    let currentIndex = 0;
    let slideInterval;

    function slideTo(index) {
        const cardHeight = productCards[0].offsetHeight + 12; // Adjust according to product-thum-card css margin 8*2=16 (margin: 8px 0;)
        const translateYValue = -(index * cardHeight); // Regular translation for full cards
        sliderWrapper.style.transform = `translateY(${translateYValue}px)`;

        // Adjust for 30% of the next card on the bottom
        if (index < productCards.length - 5) {
            sliderWrapper.style.transform += `translateY(-${cardHeight * 0.2}px)`;
        }

        currentIndex = index;
    }

    function nextSlide() {
        if (currentIndex < productCards.length - 5) {
            slideTo(currentIndex + 1);
        } else {
            slideTo(0);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            slideTo(currentIndex - 1);
        } else {
            slideTo(productCards.length - 5);
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000); // Adjust interval as needed
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    sliderWrapper.addEventListener('mouseover', stopAutoSlide);
    sliderWrapper.addEventListener('mouseout', startAutoSlide);

    startAutoSlide();
    slideTo(0); // Start with the first card showing
});


// <!-- product view img js start  -->
document.addEventListener('DOMContentLoaded', function () {
// Main product view image
const productViewImg = document.querySelector('.product-view-img');

// Thumbnail images
const thumbImgs = document.querySelectorAll('.product-thum-img');

// Add click event listeners to each thumbnail image
thumbImgs.forEach(function (thumbImg) {
    thumbImg.addEventListener('click', function () {
        // Update the main product view image with the clicked thumbnail's src
        productViewImg.src = this.src;
        });
    });
});





// home page js 
// feedback/testimonial 3 cards continous silder js start || index page
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.three-card-slider-wrapper').forEach((sliderWrapper, index) => {
        let productCards = sliderWrapper.querySelectorAll('.three-card');
        const prevBtn = sliderWrapper.closest('.three-card-slider-container').querySelector('.prev-btn');
        const nextBtn = sliderWrapper.closest('.three-card-slider-container').querySelector('.next-btn');
        let currentIndex = 3; // Start from the first real card set after cloning
        let slideInterval;

        // Clone first and last few slides to create infinite looping effect
        for (let i = 0; i < 3; i++) {
            const firstClone = productCards[i].cloneNode(true);
            const lastClone = productCards[productCards.length - 1 - i].cloneNode(true);
            sliderWrapper.appendChild(firstClone);
            sliderWrapper.insertBefore(lastClone, sliderWrapper.firstChild);
        }

        // Update productCards to include cloned elements
        productCards = sliderWrapper.querySelectorAll('.three-card');

        // Adjust the initial position to be at the start of the actual cards
        const cardWidth = productCards[0].offsetWidth + 24; // Adjust margin here
        sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

        function slideTo(index) {
            const translateXValue = -(index * cardWidth);
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            sliderWrapper.style.transform = `translateX(${translateXValue}px)`;
            currentIndex = index;

            // Handle looping effect
            sliderWrapper.addEventListener(
                'transitionend',
                () => {
                    if (index === 0) {
                        sliderWrapper.style.transition = 'none';
                        currentIndex = productCards.length - 6; // Real last set of cards
                        sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
                    } else if (index === productCards.length - 3) {
                        sliderWrapper.style.transition = 'none';
                        currentIndex = 3; // Real first set of cards
                        sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
                    }
                },
                { once: true }
            );
        }

        function nextSlide() {
            slideTo(currentIndex + 1);
        }

        function prevSlide() {
            slideTo(currentIndex - 1);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 3000); // Adjust interval as needed
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        sliderWrapper.addEventListener('mouseover', stopAutoSlide);
        sliderWrapper.addEventListener('mouseout', startAutoSlide);

        startAutoSlide();
    });
});