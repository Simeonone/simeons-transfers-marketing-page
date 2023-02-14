"use strict";
// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".btn--close-modal");
// const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// function openModal(e) {
//   e.preventDefault();
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// }
// function closeModal() {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// }
// btnsOpenModal.forEach(function (element) {
//   return element.addEventListener("click", openModal);
// });
// btnCloseModal.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
//     closeModal();
//   }
// });

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(`pt 2`);
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Guard clause -- CFO
  if (!clicked) return;
  tabs.forEach(function (value) {
    return value.classList.remove("operations__tab--active");
  });
  tabsContent.forEach(function (value) {
    return value.classList.remove("operations__content--active");
  });
  clicked.classList.add("operations__tab--active");
  // console.log(`cc`);
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
function handleHover(e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // e.target.closest('.nav').querySelector('img').style.opacity = 0.1;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach(function (value) {
      if (value !== link) {
        value.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
}
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", function () {
  // console.log(e);
  // console.log(window.scrollY);
  //below - we determine the position of the first section
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/
//Above - same as below
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
function stickyNav(entries) {
  const [entry] = entries;
  //   nav.classList.add("sticky");
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

//reveal the sections
const allSections = document.querySelectorAll(".section");
const revealEachSection = {
  root: null,
  threshold: 0.15,
};
function revealSection(entries, observer) {
  const [entry] = entries;
  //   console.log(entry);
  //below - a guard clause, remember?
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(
  revealSection,
  revealEachSection
);
allSections.forEach(function (value) {
  sectionObserver.observe(value);
  value.classList.add("section--hidden");
});

//Lazy loading images - great for performance
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  //below - guard clause. look into it
  if (!entry.isIntersecting) {
    return;
  }
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //   entry.target.classList.remove("lazy-img");
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //below - the images are loading a little bit earlier because we do not want the user to notice that we are actually indeed lazy loading
  rootMargin: "200px",
});
imgTargets.forEach(function (value) {
  return imgObserver.observe(value);
});
//testimonial slider / slides
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;
  // const slider = document.querySelector(".slider");
  // slider.style.transform = "scale(0.2)";
  // slider.style.overflow = "visible";
  // slides.forEach(function (value, index) {
  //   return (value.style.transform = `translateX(${100 * index}%)`);
  // });
  //functions
  function createDots() {
    slides.forEach(function (_, key) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${key}"></button>`
      );
    });
  }
  // createDots(); - to init

  function activateDot(slide) {
    document.querySelectorAll(".dots__dot").forEach(function (value) {
      return value.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  // activateDot(0); -to init

  function goToSlide(slide) {
    slides.forEach(function (value, index) {
      return (value.style.transform = `translateX(${100 * (index - slide)}%)`);
    });
  }
  // goToSlide(0); -to init
  //going to the next slide
  function nextSlide() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }
  //function
  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  //Event handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    //   if (e.key === "ArrowLeft") {
    //     prevSlide();
    //   }
    //below is alternative of above
    e.key === "ArrowLeft" && prevSlide();
    //below-short circuiting.
    e.key === "ArrowRight" && nextSlide();
  });

  //below- using event delegation
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   section1.scrollIntoView({ behavior: "smooth" });
// });
// document
//   .querySelector(".footer__itemCC")
//   .addEventListener("click", function (e) {
//     scrollIntoView({ behavior: "smooth" });
//   });
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__links");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
