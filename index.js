// ================= MOBILE MENU =================
function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("show");
}

// ================= DROPDOWN MOBILE =================
function toggleDropdown(){
    let d = document.getElementById("deptDropdown");

    if(d.style.display === "block"){
        d.style.display = "none";
    }else{
        d.style.display = "block";
    }
}

// ================= OUTSIDE CLICK AUTO HIDE =================
window.onclick = function(e){

    if(!e.target.matches('.dropbtn')){
        let dropdown = document.getElementById("deptDropdown");

        if(dropdown && dropdown.style.display === "block"){
            dropdown.style.display = "none";
        }
    }
};

/* SLIDER */
const slides = document.querySelectorAll(".slide");
let index = 0;

if(slides.length > 0){
    function showSlide(){
        slides.forEach(slide => slide.classList.remove("active"));
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }
    setInterval(showSlide, 3000);
}

/* BENEFIT CLICK ACTIVE */
const cards = document.querySelectorAll(".benefit-item");

cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});

/* MODAL */
function openModal(){
    document.getElementById("principalModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("principalModal").style.display = "none";
}
