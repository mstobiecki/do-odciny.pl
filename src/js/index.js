const navigation = document.querySelector('.navigation');
const hamburgerNavigation = document.querySelector('.btn-mobile-nav');

const navigationMenu = function () {
	navigation.classList.toggle('navigation__open--js');
};

hamburgerNavigation.addEventListener('click', navigationMenu);
