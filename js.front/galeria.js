const imagens = document.querySelectorAll(".corte img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const fechar = document.querySelector(".fechar");

imagens.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

fechar.addEventListener("click", () => fecharModal());
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

function fecharModal() {
  modal.style.animation = "fadeOut .4s ease";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "";
  }, 400);
}
