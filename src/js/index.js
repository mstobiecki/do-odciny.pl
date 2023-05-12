const navigation = document.querySelector('.navigation');
const hamburgerNavigation = document.querySelector('.btn-mobile-nav');
const accordion = document.querySelector('.accordion');
const allElementsAccordion = document.querySelectorAll(
	'.accordion__description'
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

hamburgerNavigation.addEventListener('click', navigationMenu);
accordion.addEventListener('click', accordionMenu);
