"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".nav__toggle");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie__close");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

/////////////////////////////////////////////////////////////
// COOKIE
/////////////////////////////////////////////////////////////

cookieCloseBtn.addEventListener("click", function () {
  cookieBody.classList.add("hidden"); // adding 'hidden' class to the cookie body
  cookieBody.style.bottom = "-12rem"; // it'll go 12rem downside
});

/////////////////////////////////////////////////////////////
// STICKY NAVBAR
/////////////////////////////////////////////////////////////

/* The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

The returned value is a DOMRect object which is the smallest rectangle which contains the entire element, including its padding and border-width. The left, top, right, bottom, x, y, width, and height properties describe the position and size of the overall rectangle in pixels. Properties other than width and height are relative to the top-left of the viewport.
*/

// browser API - insersectionObserver(callBack func, object)

/* Intersection Observer API -- The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Historically, detecting visibility of an element, or the relative visibility of two elements in relation to each other, has been a difficult task for which solutions have been unreliable and prone to causing the browser and the sites the user is accessing to become sluggish. As the web has matured, the need for this kind of information has grown. Intersection information is needed for many reasons, such as:

1. Lazy-loading of images or other content as a page is scrolled.
2. Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
3. Reporting of visibility of advertisements in order to calculate ad revenues.
4. Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:

1. A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of the Intersection Observer API.
2. The first time the observer is initially asked to watch a target element.
*/

// nav's height calculation dynamically

const navHeight = nav.getBoundingClientRect().height; // getting nav height dynamically

function sticky(entries) {
  const entry = entries[0]; // it'll take only first index of first event(IntersectionObserverEntry) which is made after scrolling up or down

  if (!entry.isIntersecting) nav.classList.add("sticky");
  // add sticky class to the navbar when intersecting line is out of viewport
  else nav.classList.remove("sticky"); // otherwise remove sticky class from navbar
}

const headerObserver = new IntersectionObserver(sticky, {
  root: null, // target viewport
  threshold: 0, // ratio -- Starting value of targetted element shows in viewport is known as thresold
  rootMargin: `-${navHeight}px`, // changing intersecting point(rootMargin) at -90px(upward);
  // Navbar becomes sticky before ending the header section & before the beggining of a new section
});

headerObserver.observe(header); // observing header class using headerObserver

/////////////////////////////////////////////////////////////
// REVEAL SECTION
/////////////////////////////////////////////////////////////

function revealSection(entries, observer) {
  // const entry = entries.at(0);

  const [entry] = entries; // destructuring -- select zero index value, entries means creating events after scrolling
  if (!entry.isIntersecting) return; // return nothing
  entry.target.classList.remove("section--hidden"); // removes hidden class from every section when intersection became true, here entry.target means single section

  observer.unobserve(entry.target); // entry.target, targets every single element individually...target used because it has multiple elements
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2, // after entering 20% of a section, it
}); // observer itself

allSections.forEach((section) => {
  sectionObserver.observe(section); // observing section
  section.classList.add("section--hidden"); // adding hidden class to every single section
});

/////////////////////////////////////////////////////////////
// DISPLAY MODAL WINDOW
/////////////////////////////////////////////////////////////

function openModal(e) {
  e.preventDefault(); // preventing default behavior of link which is "link targets homepage"

  modal.classList.remove("hidden"); // remove hidden class from html
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden"); // adding hidden class to the html
  overlay.classList.add("hidden");
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal)); // adding event listener to every btn-show-modal class individually

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
}); // after keydown to 'Escape' button if the key : "Escape" && modal doesn't contain hidden class then close the modal

/////////////////////////////////////////////////////////////
// SMOOTH SCROLLING
/////////////////////////////////////////////////////////////

// The contains() method of the Node interface returns a boolean value indicating whether a node is a descendant of a given node, that is the node itself, one of its direct children (childNodes), one of the children's direct children, and so on.

/*The Element interface's scrollIntoView() method scrolls the element's ancestor containers such that the element on which scrollIntoView() is called is visible to the user.

scrollIntoView(scrollIntoViewOptions)
An Object with the following properties:

behavior :
Defines the transition animation. One of auto or smooth. Defaults to auto.

block :
Defines vertical alignment. One of start, center, end, or nearest. Defaults to start.

inline :
Defines horizontal alignment. One of start, center, end, or nearest. Defaults to nearest.
*/

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const attr = e.target.getAttribute("href"); // selecting location inside href attribute
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" }); // scrollIntoView means we will go into defined location after scrolling
  }
});

// Button Learn More smooth scrolling
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////////////////////
// TOGGLE NAVBAR
/////////////////////////////////////////////////////////////

toggleBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("nav__open")) {
    navLinks.classList.remove("nav__open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav__open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navLinks.addEventListener("click", function () {
  navLinks.classList.contains("nav__open") &&
    navLinks.classList.remove("nav__open");
  document.querySelector("html").style.overflow = "visible";
});

/////////////////////////////////////////////////////////////
// Implementing Lazy Loading -- we'll never do it
/////////////////////////////////////////////////////////////

const loadImg = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img"); // blur gone show main img
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "252px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

/////////////////////////////////////////////////////////////
// SLIDER
/////////////////////////////////////////////////////////////

let currentSlide = 0;
const maxSlide = slides.length - 1; // last element of slides array

// dots

function creatingDots() {
  slides.forEach((_, i) => {
    const dot = `<button class = "dots__dot" data-slide = ${i} > </button.>`;
    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
}

creatingDots();

function changeSlide(cs) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - cs)}%)`)
  );
}

changeSlide(0);

function previousSlide() {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  changeSlide(currentSlide);
}

function nextSlide() {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  changeSlide(currentSlide);
}

// handling buttons
btnLeft.addEventListener("click", previousSlide);
btnRight.addEventListener("click", nextSlide);
