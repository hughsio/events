let slideIndex = 1;
let slideInterval;

function initSlideshow() {
    showSlides(slideIndex);
    startSlideshow();
}

function plusSlides(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    startSlideshow();
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startSlideshow();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    // Handle edge cases
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = "0";
    }
    
    // Show current slide with fade effect
    slides[slideIndex - 1].style.display = "block";
    setTimeout(() => {
        slides[slideIndex - 1].style.opacity = "1";
    }, 50);
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 8000);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlideshow); 