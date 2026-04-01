const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuOpenIcon = document.getElementById("menuOpenIcon");
const menuCloseIcon = document.getElementById("menuCloseIcon");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const fadeElements = document.querySelectorAll(".fade-up");
const progressFills = document.querySelectorAll(".progress-fill");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        menuOpenIcon.classList.toggle("hidden");
        menuCloseIcon.classList.toggle("hidden");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            menuOpenIcon.classList.remove("hidden");
            menuCloseIcon.classList.add("hidden");
        }
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                if (entry.target.querySelectorAll(".progress-fill").length > 0) {
                    const bars = entry.target.querySelectorAll(".progress-fill");
                    bars.forEach((bar) => {
                        bar.style.width = bar.dataset.width;
                    });
                }
            }
        });
    },
    {
        threshold: 0.15,
    }
);

fadeElements.forEach((el) => observer.observe(el));

function setActiveNav() {
    let currentId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.className = "text-sm font-medium text-red-500 block";
            return;
        }

        formMessage.textContent = "Message sent successfully! This is a demo form.";
        formMessage.className = "text-sm font-medium text-green-600 block";

        contactForm.reset();

        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 3500);
    });
}