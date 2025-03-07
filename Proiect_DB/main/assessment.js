//schimba culoarea la navbar cand dai scroll

window.addEventListener('scroll', ()=>{
    document.querySelector('nav').classList.toggle('window-scroll',window.scrollY>0)
})

//pentru dispozitivele mai mici, cand apesi pe alea trei linii sa ti apara navbar ul
const menu=document.querySelector(".nav_menu");
const menuBtn=document.querySelector("#open-menu-btn");
const closeBtn=document.querySelector("#close-menu-btn");

menuBtn.addEventListener('click',()=>{
    menu.style.display="flex";
    closeBtn.style.display="inline-block";
    menuBtn.style.display="none";
})

const closeNav=()=>{
    menu.style.display="none";
    closeBtn.style.display="none";
    menuBtn.style.display="inline-block";
}
closeBtn.addEventListener('click',closeNav)


//ala nou

document.addEventListener("DOMContentLoaded", () => {
    const cardModal = document.getElementById("cardModal");
    const cardTypeSelect = document.getElementById("cardType");
    const pdfFields = document.getElementById("pdfFields");
    const newFileFields = document.getElementById("newFileFields");
    const cardForm = document.getElementById("cardForm");
    const coursesList = document.getElementById("coursesList"); // Secțiunea unde vor fi adăugate cardurile

    // Arată sau ascunde câmpurile în funcție de tipul cardului
    function handleCardTypeChange() {
        if (cardTypeSelect.value === "pdf") {
            pdfFields.style.display = "block";
            newFileFields.style.display = "none";
        } else {
            pdfFields.style.display = "none";
            newFileFields.style.display = "block";
        }
    }

    // Afișează modalul
    function showPopup() {
        cardModal.style.display = "block";
    }

    // Închide modalul
    function closePopup() {
        cardModal.style.display = "none";
        cardForm.reset();
        handleCardTypeChange();
    }

    // Salvează cardul și îl adaugă în containerul de carduri
    function saveCard() {
        const cardType = cardTypeSelect.value;

        if (cardType === "pdf") {
            const pdfTitle = document.getElementById("pdfTitle").value;
            const pdfFile = document.getElementById("pdfFile").files[0];

            if (!pdfTitle || !pdfFile) {
                alert("Completează toate câmpurile pentru cardul PDF!");
                return;
            }

            const pdfCardTemplate = document.getElementById("pdfCardTemplate");
            const clone = pdfCardTemplate.content.cloneNode(true);
            clone.querySelector("h3").textContent = pdfTitle;
            // Aici se adaugă cardul în containerul corespunzător
            coursesList.appendChild(clone);
        } else if (cardType === "newFile") {
            const newFileTitle = document.getElementById("newFileTitle").value;
            const newFileParagraph = document.getElementById("newFileParagraph").value;

            if (!newFileTitle || !newFileParagraph) {
                alert("Completează toate câmpurile pentru cardul de fișier nou!");
                return;
            }

            const newFileCardTemplate = document.getElementById("newFileCardTemplate");
            const clone = newFileCardTemplate.content.cloneNode(true);
            clone.querySelector("h3").textContent = newFileTitle;
            clone.querySelector(".card-paragraph").textContent = newFileParagraph;
            // Aici se adaugă cardul în containerul corespunzător
            coursesList.appendChild(clone);
        }

        closePopup();
    }

    // Evenimente
    cardTypeSelect.addEventListener("change", handleCardTypeChange);
    window.showPopup = showPopup;
    window.saveCard = saveCard;

    // Inițializează câmpurile vizibile
    handleCardTypeChange();

    // Editare card
    // Adăugăm un event listener pentru butoanele de editare
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("edit-btn")) {
            const card = e.target.closest(".course");
            const cardTitle = card.querySelector("h3").textContent;
            const cardParagraph = card.querySelector(".card-paragraph");

            // Prea simplu pentru acest exemplu: Preîncarcă datele în formular
            if (cardParagraph) {
                document.getElementById("newFileTitle").value = cardTitle;
                document.getElementById("newFileParagraph").value = cardParagraph.textContent;
                cardModal.style.display = "block";
            } else {
                document.getElementById("pdfTitle").value = cardTitle;
                cardModal.style.display = "block";
            }

            // Închide cardul existent
            card.remove();
        }
    });
});

