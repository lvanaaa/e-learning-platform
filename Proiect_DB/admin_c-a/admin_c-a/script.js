// Get DOM elements
const addCardBtn = document.getElementById("addCardBtn");
const cardForm = document.getElementById("cardForm");
const cardTypeSelect = document.getElementById("cardType");
const createCardBtn = document.getElementById("createCardBtn");
const cancelCardBtn = document.getElementById("cancelCardBtn");
const cardsContainer = document.getElementById("cardsContainer");

// Show the form to select card type
addCardBtn.addEventListener("click", () => {
    cardForm.style.display = "block";
});

// Cancel and hide the form
cancelCardBtn.addEventListener("click", () => {
    cardForm.style.display = "none";
});

// Create the card based on the selection
createCardBtn.addEventListener("click", () => {
    const cardType = cardTypeSelect.value;

    if (cardType === "pdf") {
        createPDFCard();
    } else if (cardType === "newFile") {
        createNewFileCard();
    }

    // Hide the form after creating the card
    cardForm.style.display = "none";
});

function createPDFCard() {
    const cardTemplate = document.getElementById("pdfCardTemplate");
    const cardClone = cardTemplate.content.cloneNode(true);
    
    // Create the card and insert it at the top of the container
    const card = cardClone.querySelector(".card");
    cardsContainer.insertBefore(card, cardsContainer.firstChild);

    const cardTitleInput = card.querySelector(".cardTitle");
    const pdfUploadInput = card.querySelector(".pdfUpload");
    const saveCardBtn = card.querySelector(".saveCardBtn");
    const editCardBtn = card.querySelector(".editCardBtn");
    const deleteCardBtn = card.querySelector(".deleteCardBtn");

    let isSaved = false;

    pdfUploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`PDF file selected: ${file.name}`);
        }
    });

    saveCardBtn.addEventListener("click", () => {
        isSaved = true;
        pdfUploadInput.disabled = true;
        saveCardBtn.disabled = true;
        cardTitleInput.disabled = true;
    });

    editCardBtn.addEventListener("click", () => {
        if (isSaved) {
            isSaved = false;
            pdfUploadInput.disabled = false;
            saveCardBtn.disabled = false;
            cardTitleInput.disabled = false;
        }
    });

    deleteCardBtn.addEventListener("click", () => {
        card.remove();
    });
}

function createNewFileCard() {
    const cardTemplate = document.getElementById("newFileCardTemplate");
    const cardClone = cardTemplate.content.cloneNode(true);

    // Create the card and insert it at the top of the container
    const card = cardClone.querySelector(".card");
    cardsContainer.insertBefore(card, cardsContainer.firstChild);

    const cardTitleInput = card.querySelector(".cardTitle");
    const newFileUploadInput = card.querySelector(".newFileUpload");
    const textArea = card.querySelector("textarea");
    const saveCardBtn = card.querySelector(".saveCardBtn");
    const editCardBtn = card.querySelector(".editCardBtn");
    const deleteCardBtn = card.querySelector(".deleteCardBtn");

    let isSaved = false;

    newFileUploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`File selected: ${file.name}`);
        }
    });

    saveCardBtn.addEventListener("click", () => {
        isSaved = true;
        textArea.disabled = true;
        newFileUploadInput.disabled = true;
        saveCardBtn.disabled = true;
        cardTitleInput.disabled = true;
    });

    editCardBtn.addEventListener("click", () => {
        if (isSaved) {
            isSaved = false;
            textArea.disabled = false;
            newFileUploadInput.disabled = false;
            saveCardBtn.disabled = false;
            cardTitleInput.disabled = false;
        }
    });

    deleteCardBtn.addEventListener("click", () => {
        card.remove();
    });
}
