const navigation = document.querySelector('.navigation');
const hamburgerNavigation = document.querySelector('.btn-mobile-nav');
const accordion = document.querySelector('.accordion');
const allElementsAccordion = document.querySelectorAll(
	'.accordion__description'
);
const slides = document.querySelectorAll('.testimonials__item');
const buttonLeftSlider = document.querySelector('.testimonials__button--left');
const buttonRightSlider = document.querySelector(
	'.testimonials__button--right'
);

const navigationMenu = function () {
	navigation.classList.toggle('navigation__open--js');
};

const accordionMenu = function (e) {
	const clicked = e.target.closest('.accordion__item');
	const accordionDescription = clicked?.querySelector(
		'.accordion__description'
	);

	if (!clicked) return;

	document
		.querySelector(
			`.accordion__description--${accordionDescription.dataset.tab}`
		)
		.classList.toggle('accordion__open--js');

	clicked
		?.querySelector('.accordion__icon')
		.firstChild.classList.toggle('accordion__rotate--js');

	clicked.classList.toggle('accordion__border--js');
};

const slider = function () {
	const slidesLength = slides.length - 1;
	let currentSlide = 0;

	const activateSlide = function (s) {
		slides.forEach(
			(slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
		);
	};

	activateSlide(0);

	const nextSlide = function () {
		if (currentSlide === slidesLength) currentSlide = 0;
		else currentSlide++;

		activateSlide(currentSlide);
	};

	buttonRightSlider.addEventListener('click', nextSlide);
};
slider();

hamburgerNavigation.addEventListener('click', navigationMenu);
accordion.addEventListener('click', accordionMenu);
