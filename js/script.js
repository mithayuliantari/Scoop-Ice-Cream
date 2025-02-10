// services

const services = [
    {
        id: 1,
        title: "Celebration Ice Cream",
        image: "./image/pic 6.jpeg",
        description: "Make every celebration more special with our delicious ice cream, crafted to add joy and sweetness to your memorable moments"
    },
    {
        id: 2,
        title: "Delivery To Any Point",
        image: "./image/pic 7.jpeg",
        description: "We focus on using the finest ingredients and applying strict quality control to ensure every scoop delivers the same smooth, indulgent, and delightful taste you love"
    },
    {
        id: 3,
        title: "Quality Maintain",
        image: "./image/pic 8.jpeg",
        description: "We prioritize premium ingredients and strict quality control to ensure every scoop delivers the same rich, delightful taste you love"
    },
    {
        id: 4,
        title: "Customer Support",
        image: "./image/pic 9.jpeg",
        description: "Our dedicated team is always available to assist you with orders, inquiries, or any support you need to enhance your ice cream experience"
    }
];

let currentIndex = 0;

function createServiceCard(service) {
    return `
        <div class="col-lg-4 col-md-6 col-12 mb-3">
            <div class="service-card card border-0 text-center p-4">
                <div class="service-img-wrapper mb-4">
                    <img src="${service.image}" alt="${service.title}" class="service-img">
                </div>
                <h5 class="card-title mb-3">${service.title}</h5>
                <p class="card-text text-muted mb-3">${service.description}</p>
                <a href="#" class="text-decoration-none service-learn-text">Learn More</a>
            </div>
        </div>
    `;
}

function getCardsToShow() {
    if (window.innerWidth >= 992) {
        return 3; 
    } else if (window.innerWidth >= 768) {
        return 2; 
    }
    return 1; 
}

function updateCarousel() {
    const container = document.getElementById('servicesContainer');
    const cardsToShow = getCardsToShow();
    let html = '';
    
    for (let i = 0; i < cardsToShow; i++) {
        const serviceIndex = (currentIndex + i) % services.length;
        html += createServiceCard(services[serviceIndex]);
    }
    
    container.innerHTML = html;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % services.length;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + services.length) % services.length;
    updateCarousel();
});


window.addEventListener('resize', updateCarousel);


updateCarousel();







// promo
document.addEventListener('DOMContentLoaded', function() {
    
    let videoSrc;
    
    
    const videoButtons = document.querySelectorAll('.btn-play');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('video');
    
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            videoSrc = this.getAttribute('data-src');
        });
    });
    
    
    videoModal.addEventListener('shown.bs.modal', function() {
        videoFrame.setAttribute('src', videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });
    
    
    videoModal.addEventListener('hide.bs.modal', function() {
        videoFrame.setAttribute('src', '');
    });
});








// product
class ProductCarousel {
    constructor() {
        this.productsList = [
            {
                id: 1,
                name: "Blueberry Ice Cream",
                price: "$99",
                image: "image/blueberry ice.jpeg"
            },
            {
                id: 2,
                name: "Cookies Ice Cream",
                price: "$99",
                image: "image/cookies & cream ice.jpeg"
            },
            {
                id: 3,
                name: "Chocolate Ice Cream",
                price: "$99",
                image: "image/Chocolate Brownie Ice Cream.jpeg"
            },
            {
                id: 4,
                name: "Vanilla Ice Cream",
                price: "$99",
                image: "image/vanilla bean ice.jpeg"
            },
            {
                id: 5,
                name: "Coconut Ice Cream",
                price: "$99",
                image: "image/coconut ice.jpeg"
            },
            {
                id: 6,
                name: "Mango Ice Cream",
                price: "$99",
                image: "image/mango ice.jpeg"
            },
            {
                id: 7,
                name: "Mint Choco Ice Cream",
                price: "$99",
                image: "image/mint choco ice.jpeg"
            },
            {
                id: 8,
                name: "Pistachio Ice Cream",
                price: "$99",
                image: "image/Pistachio Ice Cream.jpeg"
            }
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.container = document.getElementById('productContainer');
        this.setupEventListeners();
        this.updateSlider();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.updateSlider());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());

        
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, false);
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    getProductsPerView() {
        if (window.innerWidth >= 992) return 4; 
        if (window.innerWidth >= 576) return 2; 
        return 1; 
    }

    createProductCard(product) {
        return `
            <div class="product-card text-center">
                <div class="price-tag">${product.price}</div>
                <div class="image-circle">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h5 class="product-name">${product.name}</h5>
                <button class="order-btn">Order Now</button>
            </div>
        `;
    }

    updateSlider() {
        const productsPerView = this.getProductsPerView();
        let html = '';
        
        for (let i = 0; i < productsPerView; i++) {
            const productIndex = (this.currentIndex + i) % this.productsList.length;
            html += this.createProductCard(this.productsList[productIndex]);
        }
        
        this.container.innerHTML = html;
    }

    nextSlide() {
        const productsPerView = this.getProductsPerView();
        this.currentIndex = (this.currentIndex + productsPerView) % this.productsList.length;
        this.updateSlider();
    }

    prevSlide() {
        const productsPerView = this.getProductsPerView();
        this.currentIndex = (this.currentIndex - productsPerView + this.productsList.length) % this.productsList.length;
        this.updateSlider();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
});