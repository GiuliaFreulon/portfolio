let lastScrollTop = 0; // Armazena a posição de rolagem anterior
const navbar = document.querySelector("header nav"); // Seleciona a navbar
let isMouseOver = false; // Flag para verificar se o mouse está sobre a navbar
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navbarItems = document.querySelector(".navbar-items");

// Garante que a navbar esteja visível ao carregar a página
window.addEventListener("load", function () {
  navbar.classList.add("header-initial");
  // Remove a classe header-initial após a página carregar
  setTimeout(() => {
    navbar.classList.remove("header-initial");
    navbar.classList.add("showing-nav");
  }, 100);
});

// Atualiza a visibilidade da navbar com base na rolagem
function handleScroll() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Posição atual de rolagem

  if (!isMouseOver) {
    if (currentScroll > lastScrollTop) {
      // Rolando para baixo
      navbar.classList.remove("showing-nav");
      navbar.classList.add("hiding-nav");
    } else {
      // Rolando para cima
      navbar.classList.remove("hiding-nav");
      navbar.classList.add("showing-nav");
    }
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Atualiza a posição de rolagem anterior
}

window.addEventListener("scroll", handleScroll);

// Mostrar a navbar quando o mouse estiver sobre o cabeçalho
document.querySelector("header").addEventListener("onmouseover", function () {
  isMouseOver = true; // Define a flag como verdadeira quando o mouse está sobre a navbar
  navbar.classList.remove("hiding-nav"); // Remove a classe para mostrar a navbar completamente
  navbar.classList.add("showing-nav");
});

// Ocultar a navbar quando o mouse sair do cabeçalho
document.querySelector("header").addEventListener("onmouseout", function () {
  isMouseOver = false; // Define a flag como falsa quando o mouse sai da navbar
  handleScroll(); // Verifica a rolagem atual e aplica o estilo apropriado
});

// Adiciona uma pequena margem para o mouse sair do cabeçalho
document.querySelector("header").addEventListener("onmouseleave", function () {
  isMouseOver = false;
  handleScroll();
});

hamburgerMenu.addEventListener("click", () => {
  navbarItems.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});
