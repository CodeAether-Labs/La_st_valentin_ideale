const reveals =
document.querySelectorAll(".reveal");

function revealOnScroll() {
    const WindowHeight= 
    window.innerHeight;
    reveals.forEach(el =>{
        const elementTop= el.getBoundingClientRect().top;
        if(elementTop < WindowHeight - 100){
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll",revealOnScroll);
revealOnScroll();


function selectType(card) {
    document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('selected');
    });
    card.classList.add('selected');
}

const input = document.querySelector(".gravure-box input");
const previewText = document.getElementById("gravurePreview");
const previewImg = document.getElementById("bijouPreview");

/* texte gravure live */
input.addEventListener("input", e => {
  previewText.textContent = e.target.value || "Votre texte";
});

/* changement image selon choix */
function selectType(card) {

  document.querySelectorAll('.card')
    .forEach(c => c.classList.remove('selected'));

  card.classList.add('selected');

  const type = card.querySelector("h3").textContent;

  if (type === "Collier") {
    previewImg.src = "images/collier.png";
  } else {
    previewImg.src = "images/bracelet.png";
  }
}

const target = new Date("Feb 14, 2026 23:59:59").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((diff % (1000*60*60)) / (1000*60));

  document.getElementById("countdown").innerHTML =
    d+"j "+h+"h "+m+"m";
}, 1000);


