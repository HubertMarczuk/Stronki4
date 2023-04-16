const hamburgerBtn = document.querySelector('.icon');
const navLinks = document.querySelector('.nav_links');

const onMenu = () => {
  navLinks.classList.toggle('show');
};

hamburgerBtn.addEventListener('click', () => onMenu());
