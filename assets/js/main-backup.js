
    /*=======blog detail slider in mobile========*/
    (function () {
        'use strict';
      
        // Define breakpoint
        const breakpoint = window.matchMedia('(max-width: 767px)');
        let mySwiper;
      
        // Function to initialize Swiper
        const enableSwiper = () => {
          if (!mySwiper) {
            mySwiper = new Swiper('.swiper-blog', {
              loop: true,
              slidesPerView: 'auto',
              centeredSlides: false,
              speed:1500,
              a11y: true,
              keyboard: {
                enabled: true,
              },
              grabCursor: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
            });
          }
        };
      
        // Function to destroy Swiper
        const destroySwiper = () => {
          if (mySwiper) {
            mySwiper.destroy(true, true);
            mySwiper = null;  // Reset swiper instance
          }
        };
      
        // Function to check breakpoint and initialize/destroy Swiper accordingly
        const breakpointChecker = () => {
          if (breakpoint.matches) {
            // If screen size is below 767px and swiper is not initialized, enable it
            enableSwiper();
          } else {
            // If screen size is above 767px, destroy Swiper if it's initialized
            destroySwiper();
          }
        };
      
        // Listen for breakpoint changes
        breakpoint.addEventListener('change', breakpointChecker);
      
        // Listen for window resize events to handle resizing dynamically
        window.addEventListener('resize', breakpointChecker);
      
        // Initial check
        breakpointChecker();
      })();
      
/* ====== mobile menu ========*/

const burger = document.getElementById("toggle-button");
const menumobile = document.getElementById("toggle-menu");
const nav = document.getElementById("navbar");
const wrapper = document.getElementById("navwrapper");
burger.addEventListener("click", () => {
    menumobile.classList.toggle("-translate-y-[200%]");
    // Use a normal class for backdrop blur instead of the responsive variant
    wrapper.classList.toggle("h-[80px]")
    nav.classList.toggle("max-lg:backdrop-blur-lg");
});




//   gallery slideshow  
$(document).ready(function () {
    // Initialize all cycle-slideshow elements
    $('.cycle-slideshow').each(function () {
        $(this).cycle(); // Initialize the slideshow for each element
    });

    // Optional: Show the slideshow when the page loads
    $('.cycle-slideshow').each(function () {
        $(this).css("visibility", "visible").show();
    });
});


//iconic slider

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    var swiper = new Swiper(".iconic-swiper-container", {
        slidesPerView: 1, // Show 1 slide at a time
        spaceBetween: 60, // Spacing between slides
        loop: false,
        parallax: true,
        centeredSlides: false,
        speed: 4000,
        navigation: {
            nextEl: "#nextSlide1",
            prevEl: "#prevSlide1",
        },
        pagination: {
            el: ".swiper-pagination1", // Pagination container
            type: "custom", // Custom pagination
            renderCustom: function (swiper, current, total) {
                const formattedCurrent = current <= 3 ? "0" + current : "0" + 3; // Ensure it stops at 3
                const formattedTotal = '03'; // Always show 3 as total

                return `<span class="swiper-pagination-current">${formattedCurrent}</span>/<span class="swiper-pagination-total">${formattedTotal}</span>`;
            },
        },
        on: {
           
            slideChange: function () {
                updateProgressBar();
                animatePagination();
                inconictext();
                titletext();
                disableNextArrow();
            },
        },
        breakpoints: {
            640: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            },
        },
    });

    // Function to Update Progress Bar
    function updateProgressBar() {
        let totalGroups = Math.ceil(swiper.slides.length / swiper.params.slidesPerView);
        let progress = ((swiper.realIndex + 1) / swiper.slides.length) * 100;
        document.querySelector(".swiper-progress-bar").style.width = progress + "%";
    }

    function disableNextArrow() {
        const nextButton = document.querySelector("#nextSlide1");
        const currentIndex = swiper.realIndex;

        // Disable the next button on the 3rd slide (index 2)
        if (currentIndex >= 2) { // Disable after the 3rd slide (index 2)
            nextButton.classList.add("swiper-button-disabled");
        } else {
            nextButton.classList.remove("swiper-button-disabled");
        }
    }

    // Function to Animate Pagination
    function animatePagination() {
        const currentElement = document.querySelector(".swiper-pagination-current");
        currentElement.style.animation = "none"; // Reset animation
        setTimeout(() => {
            currentElement.style.animation = "slideInOut 0.5s ease-in-out"; // Trigger animation
        }, 10);
    }
    
    // Initialize Progress Bar
    updateProgressBar();
    disableNextArrow();
});


/*============photo slider===============*/
// JavaScript for Swiper Sliders
$(document).ready(function () {
    var interleaveOffset = 0.5;

    var mainSwiperOptions = {
        loop: true,
        speed: 1000,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".photo-swiper-button-next",
            prevEl: ".photo-swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination2", // Pagination container
            type: "custom", // Use custom pagination
            renderCustom: function (swiper, current, total) {
                // Add leading zero to current and total
                const formattedCurrent = current < 10 ? `0${current}` : current;
                const formattedTotal = total < 10 ? `0${total}` : total;
                return `<span class="swiper-pagination-current">${formattedCurrent}</span>/<span class="swiper-pagination-total">${formattedTotal}</span>`;
            },
        },
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var thumbSwiperOptions = {
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        on: {
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    var mainSwiper = new Swiper(".main-slider", mainSwiperOptions);
    var thumbSwiper = new Swiper(".thumb-slider", thumbSwiperOptions);

    // Synchronize main slider with thumb slider
    mainSwiper.controller.control = thumbSwiper;
    thumbSwiper.controller.control = mainSwiper;
});



/*========story slider===========*/
$(document).ready(function () {
    var storyswiper = new Swiper('.story-slider', {
        loop: true,
        navigation: {
            nextEl: "#story-btn-next",
            prevEl: "#story-btn-prev",
        },
        slidesPerView: 1,
        speed: 2000,
    });
});

/*========timeline slider ===========*/
document.addEventListener("DOMContentLoaded", function () {
    let swiper;

    // 🔧 Control odometer animation speed via JS
    function setOdometerSpeed(seconds = 2) {
        const styleId = "odometer-speed-style";
        let existingStyle = document.getElementById(styleId);

        const styleContent = `
            .odometer.odometer-auto-theme .odometer-digit {
                transition-duration: ${seconds}s !important;
                transition-timing-function: ease-in-out;
            }
        `;

        if (existingStyle) {
            existingStyle.innerHTML = styleContent;
        } else {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = styleContent;
            document.head.appendChild(style);
        }
    }

    function initSwiper() {
        let swiperDirection = window.innerWidth <= 768 ? 'horizontal' : 'vertical';

        if (swiper) {
            let currentIndex = swiper.activeIndex;
            swiper.destroy(true, true);
            swiper = null;
            initializeNewSwiper(swiperDirection, currentIndex);
        } else {
            initializeNewSwiper(swiperDirection, 0);
        }
    }

    function initializeNewSwiper(direction, startIndex) {
        swiper = new Swiper(".swiper-Timeline", {
            direction: direction,
            loop: false,
            speed: 1000,
            keyboard: { enabled: true, onlyInViewport: false },
            navigation: {
                nextEl: "#time-nextSlide",
                prevEl: "#time-prevSlide",
            },
            initialSlide: startIndex,
            on: {
                init: function () {
                    let firstSlide = document.querySelector(".swiper-slide-active");
                    if (firstSlide) {
                        resetAndTriggerOdometer(firstSlide);
                    }
                },
                slideChangeTransitionStart: function () {
                    updateYear(swiper.realIndex);
                    let previousSlide = document.querySelector(".swiper-slide-prev");
                    let activeSlide = document.querySelector(".swiper-slide-active");

                    if (previousSlide) {
                        resetOdometer(previousSlide);
                    }
                    if (activeSlide) {
                        triggerGSAPAnimation2(activeSlide); // your existing animation
                        resetAndTriggerOdometer(activeSlide);
                    }
                }
            }
        });

        document.querySelectorAll(".year").forEach((year, index) => {
            year.onclick = function () {
                swiper.slideTo(index);
            };
        });
    }

    initSwiper();

    window.addEventListener("resize", function () {
        let newDirection = window.innerWidth <= 768 ? 'horizontal' : 'vertical';
        if (swiper.params.direction !== newDirection) {
            swiper.changeDirection(newDirection);
        }
    });

    function updateYear(index) {
        document.querySelectorAll(".year").forEach((year, i) => {
            year.classList.toggle("active", i === index);
        });
    }

    function resetAndTriggerOdometer(activeSlide) {
        const odometerElement = activeSlide.querySelector(".odometer");
        if (odometerElement) {
            const fullYear = odometerElement.getAttribute("data-value") || "1960";
            const fixedFirstTwo = fullYear.slice(0, 2);
            const lastTwo = fullYear.slice(-2);

            // Reset to fixed base (e.g., "1900")
            odometerElement.innerHTML = fixedFirstTwo + "00";

            setTimeout(() => {
                setOdometerSpeed(3); // 👈 make the animation slow here

                const odometer = new Odometer({
                    el: odometerElement,
                    value: parseInt(fixedFirstTwo + "00"),
                    format: "dddd",
                    theme: "minimal"
                });

                odometerElement.setAttribute("data-value", fixedFirstTwo + lastTwo);
                odometer.update(parseInt(fixedFirstTwo + lastTwo));
            }, 100);
        }
    }

    function resetOdometer(slide) {
        const odometerElement = slide.querySelector(".odometer");
        if (odometerElement) {
            const fullYear = odometerElement.getAttribute("data-value") || "1900";
            const fixedFirstTwo = fullYear.slice(0, 2);
            odometerElement.innerHTML = fixedFirstTwo + "00";
        }
    }
});



// timeline card hover
document.querySelectorAll('.card').forEach((card) => {
    let isHovered = false;
    let hoverTimeout;

    card.addEventListener('mouseenter', function () {
        clearTimeout(hoverTimeout); // Stop any pending mouseleave event

        if (isHovered) return;
        isHovered = true;

        requestAnimationFrame(() => {
            let maxZIndex = Math.max(
                ...Array.from(document.querySelectorAll('.card'))
                    .map(sibling => parseInt(window.getComputedStyle(sibling).zIndex) || 0)
            );

            card.style.zIndex = maxZIndex + 1;
            card.style.transform = "scale(1.2)";
            card.style.transition = "transform 0.3s ease-out";

            document.querySelectorAll('.card').forEach(sibling => {
                if (sibling !== card) {
                    sibling.querySelector('img').style.filter = 'grayscale(100%)';
                }
            });
        });
    });

    card.addEventListener('mouseleave', function () {
        hoverTimeout = setTimeout(() => {
            isHovered = false;

            requestAnimationFrame(() => {
                document.querySelectorAll('.card img').forEach(img => {
                    img.style.filter = 'grayscale(0%)';
                });

                card.style.transform = "scale(1)";
                card.style.zIndex = "";

                const randomRotation = (Math.random() * 10 - 5).toFixed(2);
                card.style.rotate = `${randomRotation}deg`;
                card.style.transition = "transform 0.3s ease-in-out, rotate 0.5s ease-in-out";
            });
        }, 50); // Small delay prevents flicker
    });
});

document.querySelectorAll(".switcher-container").forEach((switcher) => {
    switcher.addEventListener("click", function () {
        const video = this.closest(".relative").querySelector("video"); // Find sibling video
        const volumeImage = this.closest(".relative").querySelector(".volume"); // Find volume image
        const volumeMuteImage = this.closest(".relative").querySelector(".volume-mute"); // Find volume-mute image

        if (video) {
            video.muted = !video.muted; // Toggle mute/unmute
            // Toggle visibility of the images based on mute state
            if (video.muted) {
                if (volumeImage) volumeImage.style.display = "none"; // Hide volume image
                if (volumeMuteImage) volumeMuteImage.style.display = "block"; // Show volume-mute image
            } else {
                if (volumeMuteImage) volumeMuteImage.style.display = "none"; // Hide volume-mute image
                if (volumeImage) volumeImage.style.display = "block"; // Show volume image
            }
        }
    });
});
/*=======load more==========*/
document.getElementById("loadMoreBtn").addEventListener("click", function () {
    const hiddenCards = document.querySelectorAll(".press-card");

    hiddenCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove("hidden");
            card.classList.remove("opacity-0");
            
            gsap.fromTo(card, 
                { y: 50, opacity: 0 },  // Starting position (below) and opacity 0
                { y: 0, opacity: 1, duration: 1 } // End position (normal) and opacity 1
            );

        }, index * 300); // Stagger effect
    });

    this.style.display = "none"; // Hide button after showing cards
});

/*====search input=========*/
$('.js-clearSearchBox').css('opacity', '0');

$('.js-searchBox-input').focus(function () {
    $('.searchBox-fakeInput').toggleClass("is-focussed");
});

$('.js-searchBox-input').keyup(function () {
    if ($(this).val() != '') {
        $('.js-clearSearchBox').css('opacity', '1');
    } else {
        $('.js-clearSearchBox').css('opacity', '0');
    };

    $(window).bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $('.js-searchBox-input').val('');
        };
    });
});
// click the button 
$('.js-clearSearchBox').click(function () {
    $('.js-searchBox-input').val('');
    $('.js-searchBox-input').focus();
    $('.js-clearSearchBox').css('opacity', '0');
});

/*====social modal popup=====*/
function toggleModal() {
    document.getElementById('modal').classList.toggle('hidden')
}


 /*========news slider===========*/
 $(document).ready(function () {
    const newsswiper = new Swiper('.news-slider', {
        navigation: {
            nextEl: "#news-btn-next",
            prevEl: "#news-btn-prev",
        },
        pagination: {
            el: ".swiper-pagination3",
            type: "custom",
            renderCustom: function (swiper, current, total) {
                const formattedCurrent = current < 10 ? `0${current}` : current;
                const formattedTotal = total < 10 ? `0${total}` : total;
                return `<span class="swiper-pagination-current">${formattedCurrent}</span>/<span class="swiper-pagination-total">${formattedTotal}</span>`;
            },
        },
        on: {
            slideChange: function () {
                let activeSlide = this.slides[this.activeIndex]; // Get active slide
                if (activeSlide) {
                    bloglines(activeSlide);
                    opline(activeSlide);
                }
            },
        },
        slidesPerView: 1,
        speed: 1000
    });
});

