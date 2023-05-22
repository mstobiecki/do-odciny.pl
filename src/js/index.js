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
const galleryButtonClose = document.querySelector('.gallery__close');

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
	let imgAlt = currentImg.getAttribute('alt');

	let currentID = +id;
	const allImgs = galleryImgs.length;

	const openGallery = function (img, dataId, alt) {
		galleryOpen.src = img;
		galleryOpen.dataset.img = dataId;
		galleryOpen.alt = alt;

		galleryPopup.classList.remove('gallery__hidden--js');
	};
	openGallery(imgSrc, id, imgAlt);

	const imgData = function (dataID) {
		const img = document.querySelector(`.gallery__img[data-img="${dataID}"]`);

		if (!img) return;

		imgSrc = img.getAttribute('src');
		id = img.dataset.img;
		imgAlt = img.getAttribute('alt');
	};

	const nextImg = function () {
		if (currentID === allImgs) currentID = 1;
		else currentID++;

		imgData(currentID);
		openGallery(imgSrc, id, imgAlt);
	};

	const previousImg = function () {
		if (currentID === 1) currentID = allImgs;
		else currentID--;

		imgData(currentID);
		openGallery(imgSrc, id, imgAlt);
	};

	const closeGallery = function () {
		galleryPopup.classList.add('gallery__hidden--js');
	};

	galleryButtonNext.addEventListener('click', nextImg);
	galleryButtonPrevious.addEventListener('click', previousImg);
	galleryButtonClose.addEventListener('click', closeGallery);
	document.addEventListener('keyup', function (e) {
		if (!galleryPopup.classList.contains('gallery__hidden--js')) {
			e.key === 'ArrowRight' && nextImg();
			e.key === 'ArrowLeft' && previousImg();
			e.key === 'Escape' && closeGallery();
		}
	});
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
	document.addEventListener('keyup', function (e) {
		e.key === 'ArrowRight' && nextSlide();
		e.key === 'ArrowLeft' && previousSlide();
	});
};

const validateFormContact = function () {
	const form = document.querySelector('.contact__form');
	const inputName = document.querySelector('.contact__input--name');
	const inputSurname = document.querySelector('.contact__input--surname');
	const inputEmail = document.querySelector('.contact__input--email');
	const inputTel = document.querySelector('.contact__input--tel');
	const inputMessage = document.querySelector('.contact__message--js');

	const showError = function (message, input) {
		clearError(input);
		html = `<span class="contact__error">${message}</span>`;
		input.insertAdjacentHTML('afterend', html);
	};

	const clearError = function (input) {
		input.nextSibling?.remove();
	};

	const checkLength = function (input, message) {
		if (input.value.trim() === '') showError(message, input);
		else clearError(input);
	};

	const checkEmail = function (message) {
		const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if (!pattern.test(inputEmail.value)) showError(message, inputEmail);
		else clearError(inputEmail);

		// if (!inputEmail.value.includes('@') && !inputEmail.value.endsWith('.'))
		// 	showError(message, inputEmail);
		// else clearError(inputEmail);
	};

	const checkNumberPhone = function (message) {
		if (!(+inputTel.value.length === 9)) showError(message, inputTel);
		else clearError(inputTel);
	};

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		checkLength(inputName, 'Pole imię nie może być puste.');
		checkLength(inputSurname, 'Pole nazwisko nie może być puste.');
		checkEmail('Uzupełnij poprawnie pole adres email.');
		checkNumberPhone('Podaj prawidłowy numer telefonu.');
		checkLength(inputMessage, 'Podaj wiadomość.');
	});
};

const init = function () {
	stickyNavigation();
	slider();
	validateFormContact();
};
init();

hamburgerNavigation.addEventListener('click', navigationMenu);
navigationList.addEventListener('click', smoothNavigation);
heroButton.addEventListener('click', scrollToOfferSection);
accordion.addEventListener('click', accordionMenu);
galleryImgs.forEach((img) => img.addEventListener('click', gallery));
