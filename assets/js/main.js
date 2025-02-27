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
    wrapper.classList.toggle("h-[76px]")
    nav.classList.toggle("max-lg:backdrop-blur-lg");
});


function checkScrollAndAnimate() {
    const windowImages = document.querySelectorAll(".window"); // Select all elements with .window class

    if (window.scrollY > 150) {
        // Hide images when scrolled beyond 150px
        windowImages.forEach((image) => {
            image.style.display = "none";
        });
    } else {
        // Show images and add animation when within 0-150px
        windowImages.forEach((image) => {
            // image.style.display = "block"; // Ensure it's visible
            image.classList.add("animate-scale_first");
            setTimeout(() => {
                            image.style.display = "none";
                        }, 1500);
        });
    }
}

// Run on page load and also listen to scroll events
window.addEventListener("load", checkScrollAndAnimate);
window.addEventListener("scroll", checkScrollAndAnimate);


//add white bg
// document.addEventListener("DOMContentLoaded", function () {
//     const navbar = document.getElementById("navbar");

//     window.addEventListener("scroll", function () {
//         if (window.scrollY > 50) {
//             navbar.classList.add("nav-white");
//         } else {
//             navbar.classList.remove("nav-white");
//         }
//     });
// });

// let lastScrollTop = 0;
//         window.addEventListener("scroll", function() {
//             let navbar = document.getElementById("navbar");
//             let header = document.getElementById("header");
//             let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             if (scrollTop > lastScrollTop) {
//                 header.style.transform = "translateY(-100%)";
//                 navbar.style.transform = "translateY(-100%)";
//                 navbar.style.background = "!important";
//                 navbar.style.backdropfilter = "blur(5px)";
//                 navbar.style.opacity = "0";
//                 header.style.opacity = "0";
//             } else {
//                 navbar.style.transform = "translateY(0)";
//                 navbar.style.background = "rgba(0,0,0,0.6)";
//                 navbar.style.backdropFilter  = "blur(5px)";
//                 navbar.style.opacity = "1";
//                 header.style.transform = "translateY(0)";
                
//                 header.style.opacity = "1";
                
//             }
//             lastScrollTop = scrollTop;
//         });

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

    function initSwiper() {
        let swiperDirection = window.innerWidth <= 768 ? 'horizontal' : 'vertical';

        if (swiper) {
            let currentIndex = swiper.activeIndex; // Store the current index
            swiper.destroy(true, true); // Destroy the existing Swiper instance
            swiper = null; // Reset swiper instance
            initializeNewSwiper(swiperDirection, currentIndex); // Reinitialize with stored index
        } else {
            initializeNewSwiper(swiperDirection, 0); // Initialize for the first time
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
            initialSlide: startIndex, // Ensure it starts from the correct slide
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
                        triggerGSAPAnimation2(activeSlide);
                        resetAndTriggerOdometer(activeSlide);
                    }
                }
            }
        });

        // Ensure event listeners are attached correctly
        document.querySelectorAll(".year").forEach((year, index) => {
            year.onclick = function () {
                swiper.slideTo(index);
            };
        });
    }

    initSwiper(); // Initialize Swiper on page load

    // Update Swiper direction dynamically on resize
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
        let odometerElement = activeSlide.querySelector(".odometer");
        if (odometerElement) {
            let value = parseInt(odometerElement.getAttribute("data-value")) || 0;
            odometerElement.innerHTML = "0000";

             // Ensure consistent text alignment
        odometerElement.style.textAlign = "center";
        odometerElement.style.display = "inline-block";
        odometerElement.style.minWidth = "4ch"; // Ensures width stability

            setTimeout(() => {
            let odometer = new Odometer({
                el: odometerElement,
                value: 0,
                format: "d", // Remove formatting (no commas or extra symbols)
                theme: "minimal" // Use minimal theme for clean look
            });
            odometer.update(value);
        }, 50); // Delay ensures proper execution
        }
    }

    function resetOdometer(slide) {
        let odometerElement = slide.querySelector(".odometer");
        if (odometerElement) {
            odometerElement.innerHTML = "0";
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

/*=======load more==========*/
document.getElementById("loadMoreBtn").addEventListener("click", function () {
    const hiddenCards = document.querySelectorAll(".press-card.hidden");

    hiddenCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove("hidden");
            card.classList.add("opacity-100");
        }, index * 300); // Stagger effect
    });

    this.style.display = "none"; // Hide button after showing cards
});

 /*========news slider===========*/
 $(document).ready(function () {
    const newsswiper = new Swiper('.news-slider', {
        // loop: true,
       
        navigation: {
            nextEl: "#news-btn-next",
            prevEl: "#news-btn-prev",
        },
        pagination: {
            el: ".swiper-pagination3", // Pagination container
            type: "custom", // Use custom pagination
            renderCustom: function (swiper, current, total) {
                // Add leading zero to current and total
                const formattedCurrent = current < 10 ? `0${current}` : current;
                const formattedTotal = total < 10 ? `0${total}` : total;
                return `<span class="swiper-pagination-current">${formattedCurrent}</span>/<span class="swiper-pagination-total">${formattedTotal}</span>`;
            },
        },
        on: {

            slideChange: function () {
                bloglines()
                opline()
            },
        },
        slidesPerView: 1,
        speed: 1000
    });
});


