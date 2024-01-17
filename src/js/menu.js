const burgerIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const menuLinks = document.querySelectorAll('.menu__link');
const menuExtraLinks = document.querySelectorAll('.menu__extraLink');

if (burgerIcon) {
  burgerIcon.addEventListener('click', function (e) {
    document.body.classList.toggle('lock');
    burgerIcon.classList.toggle('menu__icon_active');
    menuBody.classList.toggle('menu__body_active');
  });
}

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', () => {
    document.body.classList.toggle('lock');
    burgerIcon.classList.toggle('menu__icon_active');
    menuBody.classList.toggle('menu__body_active');
  });
});
