
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

document.getElementById("contactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Faleminderit për kontaktin tuaj! Do t'ju përgjigjemi sa më shpejt të mundemi.");
    this.reset();
});

// REPLACE THIS with your Google Apps Script Deployment URL
// Get new URL from: Google Sheet → Extensions → Apps Script → Deploy → Copy Web app URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzse9w8Cc0rQ3iAjTTTzEoN1T_S9a1cjv_36gHsSGu3gSpDrdo4OLlv-7up-gRNc5zZ0g/exec";

document.getElementById("appointmentForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
    };

    // Show loading message
    const btn = document.getElementById("rezervim");
    const originalText = btn.textContent;
    btn.textContent = "Duke u dërguar...";
    btn.disabled = true;

    fetch(scriptURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                alert("✅ Rezervimi u ruajt me sukses!");
                document.getElementById("appointmentForm").reset();
            } else {
                alert("⚠️ Problemi: " + (result.message || "Nuk ishte i mundur të ruajë"));
            }
            btn.textContent = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Dështoi: Kontrolloni nëse URL-ja është e saktë.\n\nURL ndodhet në script.js linja 16");
            btn.textContent = originalText;
            btn.disabled = false;
        });
});

// ========== TESTIMONIAL SLIDER ==========
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
}

function previousTestimonial() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentIndex);
}

// Initial display
showTestimonial(currentIndex);
