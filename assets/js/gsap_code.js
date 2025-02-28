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

window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".home-navbar");
    let header = document.querySelector(".home-header");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle transparent background when at the top
    if (scrollTop === 0) {
        navbar.classList.remove("scrolled");  // Remove 'scrolled' class when at the top
    } else {
        navbar.classList.add("scrolled");  // Add 'scrolled' class when scrolled
    }

    // Remove any previous timeout to reset the auto-show feature
    clearTimeout(scrollTimeout);

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
    }, 2500);  // Adjust the time (in ms) based on how long you want to wait after scrolling stops

    // Update the last scroll position
    lastScrollTop = scrollTop;
});

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
        }
    });
}
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

function triggerGSAPAnimation2() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".card-wrapper", // The parent container that wraps all the cards
            start: "top 80%", // When the top of .card-wrapper reaches 80% of the viewport
            toggleActions: "play none none none" // Play animation once when it enters
        }
    })
        .from(".card-1", {
            y: -0,
            x: 40,
            scale: 1.3,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out"
        })
        .from(".card-2", {
            y: -0,
            x: 40,
            scale: 1.1,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out"
        })
        .from(".card-3", {
            y: -0,
            x: 40,
            scale: 1.3,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out"
        });
};

gsap.timeline({
    scrollTrigger: {
        trigger: ".card-wrapper", // The parent container that wraps all the cards
        start: "top 80%", // When the top of .card-wrapper reaches 80% of the viewport
        toggleActions: "play none none none" // Play animation once when it enters
    }
})
    .from(".card-1", {
        y: -0,
        x: 40,
        scale: 1.2,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    })
    .from(".card-2", {
        y: -0,
        x: 40,
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    })
    .from(".card-3", {
        y: -0,
        x: 40,
        scale: 1.2,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    });

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


function bloglines() {
    let tl = new TimelineMax({});
    tl.staggerFrom(
        ".lines span",
        1,
        {
            y: 40, ease: "power4.easeOut", opacity: 0,
            delay: 1
        },
        0.35
    );
}
function opline() {
    let tl = new TimelineMax({});
    tl.from(
        ".opacityline",
        2.0, // Increased from 1.5 to 2.0
        {
            ease: "power4.easeOut",
            opacity: 0,
            delay: 1
        },
        0.15
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
