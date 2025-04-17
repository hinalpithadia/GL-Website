const tl = gsap.timeline({ delay: 1.4 });

tl.from(".home-header", {
    y: -200,
    opacity: 0,
    duration: 1.4,
})
    .from(".home-navbar", {
        y: -220,
        opacity: 0,
        duration: 1.4,
    }, "-=1.4") // Starts at the same time
    .from("#hero-Bottom", {
        y: 220,
        opacity: 0,
        duration: 1.4,
    }, "-=1.4"); // Starts at the same time

let lastScrollTop = 0;
let scrollTimeout;
let addScrolledTimeout;

function debounceScroll() {
    let navbar = document.querySelector(".home-navbar");
    let header = document.querySelector(".home-header");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear any previous timeouts
    clearTimeout(addScrolledTimeout);
    clearTimeout(scrollTimeout);

    // If we're at the top of the page, stop all scroll effects
    if (scrollTop === 0) {
        navbar.classList.remove("scrolled");
        header.classList.remove("scrolled");

        // Reset any GSAP animations and prevent further scroll effects from running
        gsap.to([navbar, header], { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power1.out" 
        });

        // Return early to avoid any other code execution when at the top
        return;
    }

    // Delay adding 'scrolled' class
    addScrolledTimeout = setTimeout(() => {
        navbar.classList.add("scrolled");
        header.classList.add("scrolled");
    }, 300); // Delay of 500ms

    // GSAP animations for hiding or showing navbar and header when scrolling
    if (scrollTop > lastScrollTop) {
        // Scrolling down - Hide both navbar and header
        gsap.to([navbar, header], { 
            y: -100, 
            opacity: 0, 
            duration: 0.5, 
            ease: "power1.out" 
        });
    } else {
        // Scrolling up - Show both navbar and header
        gsap.to([navbar, header], { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power1.out" 
        });
    }

    // Set a timeout to automatically show navbar and header after a period of no scrolling
    scrollTimeout = setTimeout(() => {
        gsap.to([navbar, header], { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power1.out" 
        });
        navbar.classList.add("scrolled");  // Ensure scrolled class is added after timeout
        header.classList.add("scrolled");  // Ensure scrolled class is added after timeout
    }, 3500);  // Adjust the time (in ms) based on how long you want to wait after scrolling stops

    // Update the last scroll position
    lastScrollTop = scrollTop;
}

// Throttle the scroll event handler to prevent too many calls
window.addEventListener("scroll", debounceScroll, { passive: true });

window.addEventListener("load", function () {
    gsap.killTweensOf("#efforts-section .efforts"); // Kill any existing animation
    triggerGSAPAnimation3(); // Restart GSAP animation
});
function triggerGSAPAnimation3() {
    gsap.to("#efforts-section .efforts", {
        scale: 1,
        borderRadius: '0px',
        scrollTrigger: {
            trigger: ".efforts",
            start: "top 95%",
            scrub: 2,
            end: "top 55%",
            markers: false,
        },
        
    });
}
// function rotateAnimation() {
//     gsap.to(".rotate-img", {
//         rotate: '-6.25deg',
//         y: 50,  // Move slightly up
//         x: -100,   // Move slightly right
//         duration: 0.5,
//         ease: "power1.out",
//         scrollTrigger: {
//             trigger: ".efforts",
//             start: "top 95%",
//             end: "top 55%",
//             markers: false,
//             toggleActions: "restart none none reverse",
//         }

//     });
// }

// Call function after a short delay to ensure GSAP is initialized

gsap.from(".text-anim1", {
    y: 200,
    opacity: 0.2,
    duration: 2,
    scrollTrigger: {
        trigger: ".efforts",
        scroller: "body",
        start: "top 45%", // The timeline starts when the .hsContainer top reaches 65% of the viewport
        end: "top 10%", // Ends when the .hsContainer top leaves the viewport
        scrub: 3,
        markers: false,
    },
});


document.addEventListener("DOMContentLoaded", function () {
    animation_text_all(".text-anim"); // Pass the class or selector for all elements you want to animate
});

function animation_text_all(selector) {
    // Get all elements matching the selector
    const elements = document.querySelectorAll(selector);

    // Loop through each element
    elements.forEach((element) => {
        // Split text into individual characters wrapped in <div>
        let newText = "";
        for (let i = 0; i < element.innerText.length; i++) {
            newText += "<div>";
            newText += element.innerText[i] === " " ? "&nbsp;" : element.innerText[i];
            newText += "</div>";
        }
        element.innerHTML = newText; // Update the element's innerHTML with the new structure

        // Apply GSAP animation
        gsap.fromTo(
            element.querySelectorAll("div"),
            {
                opacity: 0,
                y: 90,
            },
            {
                duration: 0.5,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Adjust as needed
                    toggleActions: "restart none none reverse",
                },
            }
        );
    });
}
function triggerGSAPAnimation2(activeSlide) {
    const cards = activeSlide.querySelectorAll('.card');
    const textElements = activeSlide.querySelectorAll('.small_Title, .counter-pera');

    // Clear old inline styles just in case
    gsap.set([...cards, ...textElements], { clearProps: "all" });

    const tl = gsap.timeline();

    // Animate cards (no scale here to avoid hover conflict)
    tl.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05
    });

    // Animate text right after cards
    tl.from(textElements, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05
    }, "-=0.2"); // overlap a little
}

// function triggerGSAPAnimation2(activeSlide) {
//     const images = activeSlide.querySelectorAll(".card img");
//     const tl = gsap.timeline();
//     // Animate images with stagger
//     if (images.length) {
//         tl.from(images, {
//             opacity: 0,
//             y: 50,
//             scale: 1.2,
//             duration: 0.6,
//             ease: "power4.out",
//             stagger: 0.05
//         });
//     }
//     // Animate cards individually with a fixed 0.4s delay before each
//     const card1 = activeSlide.querySelector(".card-1");
//     const card2 = activeSlide.querySelector(".card-2");
//     const card3 = activeSlide.querySelector(".card-3");
//     if (card1) {
//         tl.from(card1, {
//             opacity: 0,
//             y: 40,
//             duration: 0.6,
//             ease: "power4.out",
//             delay: 0.2
//         });
//     }
//     if (card2) {
//         tl.from(card2, {
//             opacity: 0,
//             y: 40,
//             duration: 0.6,
//             ease: "power4.out",
//             delay: 0.2
//         });
//     }
//     if (card3) {
//         tl.from(card3, {
//             opacity: 0,
//             y: 40,
//             duration: 0.6,
//             ease: "power4.out",
//             delay: 0.2
//         });
//     }
//     // Animate small title and counter text together
//     const smallTitle = activeSlide.querySelector(".small_Title");
//     const counterText = activeSlide.querySelector(".counter-pera");
//     tl.from([smallTitle, counterText], {
//         opacity: 0,
//         y: 50,
//         duration: 0.6,
//         ease: "power4.out",
//         stagger: 0.05
//     }, "-=1.5"); // Overlap with previous animation
// }

/*optional code*/

// function triggerGSAPAnimation2(activeSlide) {
//     // 1. Reset all inline styles from previous GSAP animations (important for hover to work)
//     gsap.set(activeSlide.querySelectorAll('.card'), { clearProps: 'all' });
//     gsap.set(activeSlide.querySelectorAll('.card img'), { clearProps: 'all' });
//     gsap.set(activeSlide.querySelectorAll('.small_Title, .counter-pera'), { clearProps: 'all' });

//     const tl = gsap.timeline();

//     // 2. Animate images immediately (remove delay, keep short duration)
//     const images = activeSlide.querySelectorAll(".card img");
//     if (images.length) {
//         tl.from(images, {
//             opacity: 0,
//             y: 30,
//             scale: 1.05,
//             duration: 0.3,
//             ease: "power1.out",
//             stagger: 0.05
//         });
//     }

//     // 3. Animate cards instantly (no delays)
//     const card1 = activeSlide.querySelector(".card-1");
//     const card2 = activeSlide.querySelector(".card-2");
//     const card3 = activeSlide.querySelector(".card-3");

//     [card1, card2, card3].forEach(card => {
//         if (card) {
//             tl.from(card, {
//                 opacity: 0,
//                 y: 30,
//                 duration: 0.3,
//                 ease: "power1.out"
//             }, "-=0.25"); // overlap a bit
//         }
//     });

//     // 4. Animate text (title + paragraph) together, fast, and overlapping previous
//     const smallTitle = activeSlide.querySelector(".small_Title");
//     const counterText = activeSlide.querySelector(".counter-pera");
//     if (smallTitle || counterText) {
//         tl.from([smallTitle, counterText], {
//             opacity: 0,
//             y: 30,
//             duration: 0.3,
//             ease: "power1.out",
//             stagger: 0.05
//         }, "-=0.25"); // overlap again
//     }
// }

function inconictext() {
    let tl = new TimelineMax({});
    tl.staggerFrom(
        ".line span",
        1.5,
        {
            y: "100%", ease: "power4.easeOut", opacity: 0,
            delay: 2
        },
        0.15
    );
}
function titletext() {
    const headlines = document.querySelectorAll('.title');

    headlines.forEach(hl => {
        let newHtml = '';
        let text = hl.innerHTML.trim(); // Remove extra spaces

        for (let i = 0; i < text.length; i++) {
            let ts = text[i];

            // ✅ If it's an HTML tag, add it without wrapping in a span
            if (ts === '<') {
                const tmpTxt = text.substring(i);
                const tagMatch = tmpTxt.match(/<.*?>/);
                if (tagMatch) {
                    ts = tagMatch[0];
                    i += ts.length - 1;
                }
            } 
            // ✅ If it's a space, keep it as is
            else if (ts === ' ') {
                ts = ' ';
            } 
            // ✅ Only wrap actual text characters in a <span>
            else {
                ts = `<span style="opacity: 0; display: inline-block;">${ts}</span>`;
            }

            newHtml += ts;
        }

        hl.innerHTML = newHtml;

        const letters = hl.querySelectorAll('span');
        
        // ✅ GSAP Timeline Animation
        gsap.timeline()
            .set(letters, { opacity: 0, x: 0, skewX: -40 }) // Initial State
            .to(letters, {
                opacity: 1,
                x: 0,
                ease: 'back.out',
                skewX: 0,
                delay: 2,
                stagger: 0.04
            });
    });
}

gsap.set("#sliderimg", { y: 100, opacity: 0 }); // Set initial position (below screen)

gsap.to("#sliderimg", {
    duration: 1.5,
    y: 0,          // Moves up to original position
    opacity: 1,    // Fades in
    ease: "power3.out" // Smooth easing
});




gsap.utils.toArray("#press .presscard, #press .carddetail").forEach((element) => {
    gsap.from(element, {
        y: element.classList.contains("presscard") ? 150 : 60, // Different y values
        duration: element.classList.contains("presscard") ? 1.5 : 1, // Different durations
        delay: element.classList.contains("carddetail") ? 0.2 : 0, // Delay only for carddetail
        opacity: 0,
        ease: "power4.out",
        scrollTrigger: {
            trigger: element,
            scroller: "body",
            start: "top 90%",
            yoyo: true,
            toggleActions: "restart none none reverse",
        },
    });
});

function bloglines(activeSlide) {
    // Kill any previous animations to prevent overlap
    gsap.killTweensOf(".lines span");
    // Select only elements inside the active slide
    let lines = $(activeSlide).find(".lines span");
    // Animate only the active slide's elements
    gsap.from(lines, {
        y: 25,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        delay: 0.5 // Adjust delay if needed
    });
}
function opline() {
    let tl = new TimelineMax({});
    tl.from(
        ".opacityline",
        0.5, // Increased from 1.5 to 2.0
        {
            ease: "power4.easeOut",
            opacity: 0,
            delay: 0.4
        },
        0.35
    );
}
document.addEventListener("DOMContentLoaded", function () {
    let time = gsap.timeline(); // Correct timeline initialization
    
    time.from(".longTitle", {
        y: 70,
        duration: 1.5,
        opacity: 0,
        ease: "power3.out"
    })
    .from(".imgloder", {
        y: 70,
        duration: 1.5,
        opacity: 0,
        delay: -1,
        ease: "power3.out"
    }); // Runs after .longTitle animation finishes
});
document.addEventListener("DOMContentLoaded", function () {

gsap.registerPlugin(ScrollTrigger);

gsap.from(".para", {
    y: 70,
    opacity: 0,
    duration: 1.5,
    delay: 0.5, 
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".para", // The element that triggers the animation
      start: "top 80%", // Trigger the animation when the top of the element reaches 80% of the viewport height
      end: "top top", // Ends when the top of the element reaches the top of the viewport
      once: true, // Ensures the animation happens only once
      scrub: false // Disables scrub so the animation doesn't happen continuously while scrolling
    }
  });
});


/*=======starting window========*/
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