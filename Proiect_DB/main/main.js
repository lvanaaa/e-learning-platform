
//schimba culoarea la navbar cand dai scroll

window.addEventListener('scroll', ()=>{
    document.querySelector('nav').classList.toggle('window-scroll',window.scrollY>0)
})


//cand apesi + la forum vezi raspunsul
const forums=document.querySelectorAll('.forum');
forums.forEach(forum=>{
    forum.addEventListener('click',()=>{
        forum.classList.toggle('open');


        //schimb acum + cu -
        const icon=forum.querySelector('.forum_icon i');
        if(icon.className==='uil uil-plus'){
            icon.className="uil uil-minus";
        } else { 
            icon.className="uil uil-plus";
        }
    })
})


//pentru stelute la review
const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
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

function addCard() {
    console.log("Add Card function called");

    
    const container = document.querySelector('.courses_container');
    if (!container) {
        console.error("Container .courses_container not found");
        return;
    }

 
    const template = document.getElementById('newCardTemplate');
    if (!template) {
        console.error("Template #newCardTemplate not found");
        return;
    }

 
    const newCard = template.content.cloneNode(true);

   
    container.appendChild(newCard);

    console.log("New course added successfully");
}

//alea de open file si lalala

function openPDF() {
    window.location.href = '1_thermal radiation_p1.pdf';
}

function openNewFile() {
    window.location.href = 'newfile.html';
}


//file

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-upload');
const fileList = document.getElementById('file-list');

uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadArea.classList.remove('dragging');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        // Display each file in the list
        const listItem = document.createElement('li');

        // Create a download link for the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.textContent = file.name;

        // Create a Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.onclick = () => removeFile(listItem);

        listItem.appendChild(link);
        listItem.appendChild(removeButton);

        fileList.appendChild(listItem);
    }
}

function removeFile(listItem) {
    fileList.removeChild(listItem);
}


