/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
        .querySelectorAll("a, button, .menu-card, .gallery-item")
        .forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });
}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   MAGNETIC BUTTONS
========================================= */

document.querySelectorAll(".magnetic").forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* =========================================
   ORDER PANEL
========================================= */

const orderOverlay =
    document.querySelector(".order-overlay");

const openOrderButtons =
    document.querySelectorAll(".open-order");

const closeOrderButton =
    document.querySelector(".close-order");


function openOrder() {

    if (!orderOverlay) return;

    orderOverlay.classList.add("active");

    document.body.classList.add("order-open");

}


function closeOrder() {

    if (!orderOverlay) return;

    orderOverlay.classList.remove("active");

    document.body.classList.remove("order-open");

}


openOrderButtons.forEach((button) => {

    button.addEventListener("click", openOrder);

});


if (closeOrderButton) {

    closeOrderButton.addEventListener(
        "click",
        closeOrder
    );

}


if (orderOverlay) {

    orderOverlay.addEventListener("click", (event) => {

        if (event.target === orderOverlay) {
            closeOrder();
        }

    });

}


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeOrder();
    }

});


/* =========================================
   MENU CATEGORY FILTER
========================================= */

const categories =
    document.querySelectorAll(".category");

const orderItems =
    document.querySelectorAll(".order-item");


categories.forEach((category) => {

    category.addEventListener("click", () => {

        categories.forEach((item) => {
            item.classList.remove("active");
        });

        category.classList.add("active");

        const selectedCategory =
            category.dataset.category;

        orderItems.forEach((item) => {

            const itemCategory =
                item.dataset.category;

            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.style.display = "grid";

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* =========================================
   ADD TO ORDER
========================================= */

const addButtons =
    document.querySelectorAll(".add-item");

const orderCount =
    document.querySelector("#order-count");

let totalItems = 0;


addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        totalItems++;

        if (totalItems === 1) {

            orderCount.textContent = "1 ITEM";

        } else {

            orderCount.textContent =
                `${totalItems} ITEMS`;

        }

        button.classList.add("added");

        button.textContent = "✓";

        setTimeout(() => {

            button.classList.remove("added");

            button.textContent = "+";

        }, 700);

    });

});


/* =========================================
   CONTINUE BUTTON
========================================= */

const checkoutButton =
    document.querySelector(".checkout-button");


if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (totalItems === 0) {

            checkoutButton.innerHTML =
                'ADD SOMETHING FIRST';

            setTimeout(() => {

                checkoutButton.innerHTML =
                    'CONTINUE <span>→</span>';

            }, 1500);

            return;

        }

        checkoutButton.innerHTML =
            'ORDER STARTED ✓';

    });

}


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.04) translateY(${scrollY * 0.12}px)`;

    }

});


/* =========================================
   MENU CARD TILT
========================================= */

document.querySelectorAll(".menu-card").forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -4;

        const rotateY =
            ((x / rect.width) - 0.5) * 4;

        card.style.transform =
            `translateY(-10px)
             perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});