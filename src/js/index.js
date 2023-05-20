const header = document.querySelector('.header');
const hamburgerNavigation = document.querySelector('.btn-mobile-nav');
const navigationList = document.querySelector('.navigation__list');
const heroSection = document.querySelector('.hero');
const heroButton = document.querySelector('.hero__button');
const offerSection = document.querySelector('.offer');
const accordion = document.querySelector('.accordion');
const slides = document.querySelectorAll('.testimonials__item');
const buttonLeftSlider = document.querySelector('.testimonials__button--left');
const buttonRightSlider = document.querySelector(
	'.testimonials__button--right'
);
const galleryImgs = document.querySelectorAll('.gallery__img');
const galleryOpen = document.querySelector('.gallery__img--js');
const galleryPopup = document.querySelector('.gallery__popup');
const galleryButtonNext = document.querySelector('.gallery__next');
const galleryButtonPrevious = document.querySelector('.gallery__previous');

const navigationMenu = function () {
	header.classList.toggle('navigation__open--js');
};

const smoothNavigation = function (e) {
	e.preventDefault();

	if (e.target.classList.contains('navigation__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
		navigationMenu();
	}
};

const stickyNavigation = function () {
	const headerHeight = header.getBoundingClientRect().height;
	const sticky = function (entries) {
		const [entry] = entries;

		if (!entry.isIntersecting) document.body.classList.add('sticky');
		else document.body.classList.remove('sticky');
	};
	const heroSectionObserver = new IntersectionObserver(sticky, {
		root: null,
		threshold: 0,
		rootMargin: `-${headerHeight}px`,
	});
	heroSectionObserver.observe(heroSection);
};

const scrollToOfferSection = function (e) {
	e.preventDefault();
	offerSection.scrollIntoView({ behavior: 'smooth' });
};

const gallery = function (e) {
	const currentImg = e.target;
	let imgSrc = currentImg.getAttribute('src');
	let id = currentImg.dataset.img;

	let currentID = id;
	const allImgs = galleryImgs.length;

	const openGallery = function (img, dataId) {
		galleryOpen.src = img;
		galleryOpen.dataset.img = dataId;
		galleryPopup.classList.remove('gallery__hidden--js');
	};
	openGallery(imgSrc, id);

	const nextImg = function () {
		if (currentID === allImgs) currentID = 1;
		else currentID++;

		const img = document.querySelector(
			`.gallery__img[data-img="${currentID}"]`
		);
		imgSrc = img.getAttribute('src');
		id = img.dataset.img;

		openGallery(imgSrc, id);
	};

	const previousImg = function () {
		if (currentID === 1) currentID = allImgs;
		else currentID--;

		const img = document.querySelector(
			`.gallery__img[data-img="${currentID}"]`
		);
		imgSrc = img.getAttribute('src');
		id = img.dataset.img;

		openGallery(imgSrc, id);
	};

	galleryButtonNext.addEventListener('click', nextImg);
	galleryButtonPrevious.addEventListener('click', previousImg);

	console.log(galleryOpen);
	console.log(allImgs);
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

	const previousSlide = function () {
		if (currentSlide === 0) currentSlide = slidesLength;
		else currentSlide--;

		activateSlide(currentSlide);
	};

	buttonRightSlider.addEventListener('click', nextSlide);
	buttonLeftSlider.addEventListener('click', previousSlide);
};

const init = function () {
	stickyNavigation();
	slider();
};
init();

hamburgerNavigation.addEventListener('click', navigationMenu);
navigationList.addEventListener('click', smoothNavigation);
heroButton.addEventListener('click', scrollToOfferSection);
accordion.addEventListener('click', accordionMenu);
galleryImgs.forEach((img) => img.addEventListener('click', gallery));
