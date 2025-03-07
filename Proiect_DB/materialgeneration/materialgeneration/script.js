
let uploadedFiles = [];
let editCardData = null;

function showPopup(isEdit = false, cardType = null, cardData = null) {
    const modal = document.getElementById('cardModal');
    modal.style.display = 'flex';
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Card' : 'Create Card';

    // Populate fields based on card type and whether we're editing or creating
    if (isEdit) {
        editCardData = cardData;

        if (cardType === 'pdf') {
            document.getElementById('cardType').value = 'pdf';
            handleCardTypeChange();
            document.getElementById('pdfTitle').value = cardData.title;
        } else if (cardType === 'newFile') {
            document.getElementById('cardType').value = 'newFile';
            handleCardTypeChange();
            document.getElementById('newFileTitle').value = cardData.title;
            document.getElementById('newFileParagraph').value = cardData.paragraph || ''; // Set paragraph if available
        }
        document.getElementById('cardType').disabled = true;
    } else {
        document.getElementById('cardType').value = 'pdf';
        handleCardTypeChange();
    }
}

function closePopup() {
    const modal = document.getElementById('cardModal');
    modal.style.display = 'none';
    resetModal();
}

function handleCardTypeChange() {
    const cardType = document.getElementById('cardType').value;
    document.getElementById('pdfFields').classList.toggle('hidden', cardType !== 'pdf');
    document.getElementById('newFileFields').classList.toggle('hidden', cardType !== 'newFile');
}

function saveCard() {
    if (editCardData) {
        updateCard();
    } else {
        addCard();
    }
}

function addCard() {
    const container = document.querySelector('.container');
    const cardType = document.getElementById('cardType').value;

    if (cardType === 'pdf') {
        const title = document.getElementById('pdfTitle').value;
        const fileInput = document.getElementById('pdfFile');
        const file = fileInput.files[0];
        const fileURL = file ? URL.createObjectURL(file) : null;

        if (!title) return alert('Please enter a title for the PDF card.');
        const template = document.getElementById('pdfCardTemplate');
        const newCard = template.content.cloneNode(true);
        newCard.querySelector('.card-title').textContent = title;

        const cardElement = newCard.querySelector('.card');
        cardElement.addEventListener('click', () => {
            if (fileURL) window.open(fileURL, '_blank');
        });

        cardElement.querySelector('.edit-btn').addEventListener('click', (event) => {
            event.stopPropagation();
            showPopup(true, 'pdf', { element: cardElement, title, fileURL });
        });

        uploadedFiles.push({ type: 'pdf', title, fileURL });
        container.appendChild(newCard);
    } else if (cardType === 'newFile') {
        const title = document.getElementById('newFileTitle').value;
        const paragraph = document.getElementById('newFileParagraph').value;
        const fileInput = document.getElementById('newFileDocument');
        const file = fileInput.files[0];
        const fileURL = file ? URL.createObjectURL(file) : null;

        if (!title) return alert('Please enter a title for the New File card.');

        const template = document.getElementById('newFileCardTemplate');
        const newCard = template.content.cloneNode(true);
        newCard.querySelector('.card-title').textContent = title;

        const cardElement = newCard.querySelector('.card');

        cardElement.addEventListener('click', () => {
            if (fileURL) window.open(fileURL, '_blank');
        });

        cardElement.querySelector('.edit-btn').addEventListener('click', (event) => {
            event.stopPropagation();
            showPopup(true, 'newFile', { element: cardElement, title, paragraph, fileURL });
        });

        uploadedFiles.push({ type: 'newFile', title, paragraph, fileURL });
        container.appendChild(newCard);
    }

    closePopup();
}

function updateCard() {
    const cardType = document.getElementById('cardType').value;

    if (cardType === 'pdf') {
        const title = document.getElementById('pdfTitle').value;
        const fileInput = document.getElementById('pdfFile');
        const file = fileInput.files[0];
        const fileURL = file ? URL.createObjectURL(file) : editCardData.fileURL;

        editCardData.element.querySelector('.card-title').textContent = title;
        editCardData.fileURL = fileURL;
    } else if (cardType === 'newFile') {
        const title = document.getElementById('newFileTitle').value;
        const paragraph = document.getElementById('newFileParagraph').value;
        const fileInput = document.getElementById('newFileDocument');
        const file = fileInput.files[0];
        const fileURL = file ? URL.createObjectURL(file) : editCardData.fileURL;

        editCardData.element.querySelector('.card-title').textContent = title;
        editCardData.paragraph = paragraph; // Store paragraph internally
        editCardData.fileURL = fileURL;
    }

    closePopup();
    editCardData = null;
}

function resetModal() {
    document.getElementById('cardType').disabled = false;
    document.getElementById('pdfTitle').value = '';
    document.getElementById('pdfFile').value = '';
    document.getElementById('newFileTitle').value = '';
    document.getElementById('newFileParagraph').value = ''; // Reset paragraph field
    document.getElementById('newFileDocument').value = '';
}
