const table = document.getElementById("myTable");
const dialog = document.getElementById("myDialog");
const myTitle = document.getElementById('title');
const myAuthor = document.getElementById('author');
const myPages = document.getElementById('pages');
const myRead = document.getElementById('read');
const confirmButton = document.getElementById("confirmButton");
const newBookDialog = document.getElementById("newBookDialog");
let error = document.createElement("p");

const myLibrary = [];
let cells = [];
let bookValues = [];
let bookIndexObjArr = [];
let reverseReadIndex = 0;
let buttonClickedCount = 0;
let bookIndexObj = 0;
let bookIndex = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    read = read ? "Have read" : "Have not read";
}

Book.prototype.changeReadStatus = function(button) {
    if(this.read === "Have read") {
        this.read = 'Have not read';
    } else {
        this.read = 'Have read';
    }
    button.parentNode.parentNode.cells[3].innerHTML = this.read;
}

function addBookToLibrary(title, author, pages, read) {
    bookIndexObjArr[bookIndexObj] = new Book(title, author, pages, read);
    myLibrary.push(bookIndexObjArr[bookIndexObj]);
    bookValues = Object.values(myLibrary[bookIndexObj]);
    for (let index = 1; index < 2; index++) {
        let row = table.insertRow(-index);
        for (let index1 = 0; index1 < 6; index1++) {
            cells = row.insertCell(index1);
            if(index1 < 4) {
                cells.innerHTML = bookValues[index1];
            } else if (index1 < 5) {
                let reverseRead = document.createElement("button");
                reverseRead.innerHTML = "Reverse state";
                reverseRead.onclick = function() {
                    let bookObj = bookIndexObjArr[this.parentNode.parentNode.rowIndex-1];
                    bookObj.changeReadStatus(this);
                };
                cells.appendChild(reverseRead);
            } else if (index < 6) {
                let removeBook = document.createElement('button');
                removeBook.innerHTML = "×";
                removeBook.onclick = function() {
                    let removeBookIndex = this.parentNode.parentNode.rowIndex;
                    table.deleteRow(removeBookIndex);
                };
                cells.appendChild(removeBook);
            }
        }
    }
    bookIndex++;
    bookIndexObj++;
}

newBookDialog.addEventListener('click', () => {
    dialog.showModal();
})

myTitle.addEventListener("input", (e) => {
    console.log(myTitle.validity);
    if (myTitle.validity.tooShort) {
        myTitle.setCustomValidity('Title name is too short');
        e.preventDefault();
    } else {
        myTitle.setCustomValidity('');
    }
})

myAuthor.addEventListener("input", e => {
    if (myAuthor.validity.tooShort) {
        myAuthor.setCustomValidity('Title name is too short');
        e.preventDefault();
    } else {
        myAuthor.setCustomValidity('');
    }
})

myPages.addEventListener("input", e => {
    if (myPages.validity.rangeUnderflow) {
        myPages.setCustomValidity('The number of pages is too small');
        e.preventDefault;
    } else {
        myPages.setCustomValidity('');
    }

    if (myPages.validity.rangeOverflow) {
        myPages.setCustomValidity('The number of pages is too large');
        e.preventDefault;
    } else {
        myPages.setCustomValidity('');
    }
})


addBookToLibrary('kek', 'lolan', 342, "Have read");
addBookToLibrary('shrek', 'blya', 12, "Have not read");
addBookToLibrary('wad', 'ek', 123, "Have not read");