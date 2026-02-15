function applyLanguage(lang){

    const elements = document.querySelectorAll("[data-en],[data-mr]");

    elements.forEach(element => {

        if(lang === "mr"){
            const mrText = element.getAttribute("data-mr");
            if(mrText) element.textContent = mrText;
        } 
        else{
            const enText = element.getAttribute("data-en");
            if(enText) element.textContent = enText;
        }

    });

    localStorage.setItem("selectedLanguage", lang);

    const toggle = document.getElementById("languageToggle");
    if(toggle){
        toggle.checked = (lang === "mr");
    }
}

document.addEventListener("DOMContentLoaded", function(){

    const toggle = document.getElementById("languageToggle");

    // default load
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    applyLanguage(savedLang);

    if(toggle){
        toggle.addEventListener("change", function(){
            if(this.checked){
                applyLanguage("mr");
            } else {
                applyLanguage("en");
            }
        });
    }

});
