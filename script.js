
const addBookBtn = document.getElementById("addBtn");
const modalBox = document.getElementById("custom-modal");
const booksContainer = document.querySelector(".books-cards-container");
const formToSubmit = document.getElementById("book-form");
const title = document.getElementById("book-title");
const author = document.getElementById("book-author");
const genre = document.getElementById("book-genre");
const pages = document.getElementById("pages");
const types = document.querySelectorAll('input[name="booktype"]');
const modalBtnAdd = document.getElementById("submit-button");
const modalBtnCancel = document.getElementById("cancel-button");
const navLinks = document.querySelectorAll(".nav-link");
const mainContent = document.querySelector(".main-content-details");

let currentPage = 'home';

const pageBackground = {
    home: {
        image: 'url("./images/the-blowup-QWWfNjXer40-unsplash.jpg")',
        /*attribution: 'Photo by <a href="https://unsplash.com/@affe8a?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">goodrich kingrey</a> on <a href="https://unsplash.com/photos/old-brick-school-building-framed-by-trees-nGlQGJZ-9k8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'*/
        authorName: 'the blowup',
        authorURL: 'https://unsplash.com/@theblowup?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        sourceName: 'Unsplash',
        sourceURL: 'https://unsplash.com/photos/brown-wooden-door-near-gray-concrete-building-during-daytime-QWWfNjXer40?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        icon: "./images/home.png",
        text: "WELCOME TO OUR LIBRARY"
    
    },
    browse: {
        image: 'url("./images/priscilla-du-preez-ggeZ9oyI-PE-unsplash.jpg")',
        /*attribution: 'Photo by <a href="https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Priscilla Du Preez 🇨🇦</a> on <a href="https://unsplash.com/photos/shallow-focus-photography-of-bookshelfs-ggeZ9oyI-PE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'*/
        authorName: 'Priscilla Du Preez 🇨🇦',
        authorURL: 'https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        sourceName: 'Unsplash',
        sourceURL: 'https://unsplash.com/photos/shallow-focus-photography-of-bookshelfs-ggeZ9oyI-PE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
        icon: "./images/book-icon-155.png",
        text: "BOOKS AND E-BOOKS"

    }

};


const pageBackgroundImage = document.querySelector(".background-image");
const attributionText = document.querySelector(".attribution");
const pageIcon = document.querySelector(".page-icon");
const pageText = document.querySelector(".text-overlay p");
const textOverlay = document.querySelector(".text-overlay");


function swapPageBackground(pageName) {
    const pageBackgroundData = pageBackground[pageName];

    pageBackgroundImage.style.backgroundImage = pageBackgroundData.image;

    const text1 = document.createTextNode('Photo by ');
    const text2 = document.createTextNode(' on ');

    /*create author link*/
    const authorLink = document.createElement('a');
    authorLink.textContent = pageBackgroundData.authorName;
    authorLink.href = pageBackgroundData.authorURL;
    authorLink.target = '_blank';
    authorLink.rel = 'noopener';

    /*create source link*/
    const sourceLink = document.createElement('a');
    sourceLink.textContent = pageBackgroundData.sourceName;
    sourceLink.href = pageBackgroundData.sourceURL;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';

    const imageIcon = document.createElement('img');
    imageIcon.src = pageBackgroundData.icon;
    imageIcon.alt = `${currentPage}`;

    pageText.textContent = pageBackgroundData.text;

    /*replace previous elements and append new*/
    attributionText.replaceChildren(text1, authorLink, text2, sourceLink);
    pageIcon.replaceChildren(imageIcon);
    textOverlay.replaceChildren(pageIcon, pageText);

}


function navLinkActive(pageName) {

    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');

        }
        else {
            link.classList.remove('active');
        }

    });
}



let libraryOfBooks = [];

function Book(id, cover, title, author, genre, pages, type) {
    this.id = id;
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.type = type;

}


const fonts = [
    "Brush Script MT, cursive",
    "Segoe Script, cursive",
    "Lucida Handwriting, cursive",
    "Segoe Print, cursive",
    "Comic Sans MS, cursive",
    "Edwardian Script ITC, cursive",
    "Freestyle Script, cursive",
    "Harlow Solid Italic, cursive",
    "Kunstler Script, cursive"
]


const colors = [
    "#27D2FF",
    "#4E7B18",
    "#3A17BD",
    "#240F4E",
    "#0A2215",
    "#67571A"

]

const pick = array => array[Math.floor(Math.random() * array.length)];

function addNewBook() {
    
    const id = crypto.randomUUID();

    const bookCover = {
        image: `https://picsum.photos/400/300?random=${Math.random()}`,
        font: pick(fonts),
        color: pick(colors),
        position: pick(["top", "center", "bottom"]),
        alignment: pick(["left", "center", "right"]),
        weight: pick(["400", "700"])
    }

    const enteredTitle = convertText(title.value.toUpperCase());
    
    const authorName = author.value;
    let nameArray = [];
    let enteredAuthor;
    if (authorName.includes(" ")) {
        const fullName = authorName.split(" ");
        for (let eachName of fullName) {
            const convertName = convertText(eachName.toUpperCase());
            nameArray.push(convertName);
        }
        
        enteredAuthor = nameArray.join(" ");

    }
    else {
        enteredAuthor = convertText(author.value.toUpperCase());
    }

    let selectedGenre;
    const index = genre.selectedIndex  
    selectedGenre = convertText(genre.options[index].textContent);
    
    const enteredPages = pages.value;

    let selectedType = "";
    types.forEach((type) => {
        if(type.checked) {
            selectedType = type.parentElement.textContent;
        }

    });

    const newBook = new Book(id, bookCover, enteredTitle, enteredAuthor, selectedGenre, enteredPages, selectedType);

    libraryOfBooks.push(newBook);

    if (currentPage === 'browse') {
        displayBooks();
    }

}

/*convert to title case*/
function convertText(string) {
    return string.charAt(0) + string.slice(1).toLowerCase();
}


addBookBtn.addEventListener('click', () => {
    modalBox.showModal();
    clearAllInputs();
    formToSubmit.reset();

});


function clearAllInputs() {
    title.value = "";
    author.value = "";
    genre.value = "select";
    pages.value = "";
    types.forEach((type) => {
        type.checked = false;
    });


}


pages.addEventListener('input', () => {
    if(pages.value <= 0) { /*disallow zero and negative numbers*/
        pages.value = 1;
    }

});


formToSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewBook();
    alert("New book has been successfully added.");
    modalBox.close();
    

});



modalBtnCancel.addEventListener('click', () => {
    modalBox.close();
    
});


function createImageBook(book) {
    const imgContainer = document.createElement("div");
    imgContainer.className = "book-image-container";
        
    const imgBook = document.createElement("img");
    imgBook.src = book.cover.image;
    imgBook.alt = `Cover of ${book.title}`;

    imgContainer.append(imgBook);

    /*create a "Reading" mark across the book for read books upon display of books*/
    if (book.read) {
        const readingOverlay = document.createElement("div");
        readingOverlay.className = "reading-overlay";
        readingOverlay.textContent = "Reading";

        imgContainer.append(imgBook, readingOverlay);

    }

    return imgContainer;

}


function createBookOverlay(book) {
    
    const overlay = document.createElement("div");
    overlay.classList.add(
        "book-image-overlay", 
        book.cover.position
    );
    overlay.style.fontFamily = book.cover.font;
    overlay.style.color = book.cover.color;
    overlay.style.textAlign = book.cover.alignment;
    overlay.style.fontWeight = book.cover.weight;

    const overlayTitle = document.createElement("h2");
    overlayTitle.textContent = book.title;

    const overlayAuthor = document.createElement("p");
    overlayAuthor.textContent = book.author;

    overlay.append(overlayTitle, overlayAuthor);

    return overlay;


}


function displayBookDetails(book) {
    const bookDetails = document.createElement("div");
    bookDetails.className = "book-details";
        
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("h4");
    bookAuthor.textContent = `by ${book.author}`;

    const bookGenre = document.createElement("h4");
    bookGenre.textContent = `Genre: ${book.genre}`;

    const numberOfPages = document.createElement("h4");
    numberOfPages.textContent = `Number of pages: ${book.pages}`;

    const typeOfBookContainer = document.createElement("div");
    typeOfBookContainer.className = "type-of-book-container";
        
    const typeOfBook = document.createElement("h5");
    typeOfBook.textContent = book.type;

    const bookIconType = createTypeIcon((book.type).trim().toLowerCase());

    typeOfBookContainer.append(bookIconType, typeOfBook)
    bookDetails.append(bookTitle, bookAuthor, bookGenre, numberOfPages, typeOfBookContainer);

    return bookDetails;

}


const typeIcons = {
    paperback: './images/book-open-blank-variant-outline.png',
    ebook: './images/book-outline.png',
    audiobook: './images/headphone-svgrepo-com.png'

}


function createTypeIcon(type) {
    const typeIconContainer = document.createElement("div");
    typeIconContainer.className = "type-icon-container";

    const imgTypeContainer = document.createElement("img");
    imgTypeContainer.src = typeIcons[type];
    imgTypeContainer.alt = `${typeIcons[type]}`;
    
    typeIconContainer.replaceChildren(imgTypeContainer);

    return typeIconContainer;

}



Book.prototype.read = false;


Book.prototype.toggleReadStatus = function(books, bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.read = !book.read;
        return true;

    }
    return false;

}



function bookActionRead(book) {
    
    const readBookButton = document.createElement("button");
        
    const imgReadIcon = document.createElement("img");
    imgReadIcon.src = "./images/student_18170261.png";
    imgReadIcon.alt = "Read this book";

    readBookButton.dataset.id = book.id;
 
    const classReadStatus = book.read ? "btn-read" : "btn-unread";
    
    readBookButton.classList.add("read-book-button", classReadStatus);
    
    const readButtonText = book.read ? document.createTextNode('Done reading') : document.createTextNode('Read this book');

    readBookButton.append(imgReadIcon, readButtonText);
    
    readBookButton.addEventListener('click', (event) => {
        const bookId = event.currentTarget.dataset.id;

        const bookExists = book.toggleReadStatus(libraryOfBooks, bookId);
        
        if (bookExists) {
            const updatedBook = libraryOfBooks.find(b => b.id === bookId);
            
            readButtonText.textContent = updatedBook.read ? "Done reading" : "Read this book";

            readBookButton.classList.toggle("btn-read", updatedBook.read);
            readBookButton.classList.toggle("btn-unread", !updatedBook.read);

            createReadingMark(readBookButton, updatedBook);
            
        }

    })
    
    return readBookButton;

}


function createReadingMark(button, book) {
    const bookCard = button.closest(".book-card"); /*traverse from the read button up to the common parent*/
    let readingOverlay = bookCard.querySelector(".reading-overlay");

    /*create a "Reading" mark across the book when toggling read*/
    if (book.read && !readingOverlay) {
        readingOverlay = document.createElement("div");
        readingOverlay.className = "reading-overlay";
        readingOverlay.textContent = "Reading";

        const overlayContainer = bookCard.querySelector(".book-image-container"); /*traverse down to the correct container to append*/
        overlayContainer.append(readingOverlay); 

    }
    else if (!book.read && readingOverlay) {
        readingOverlay.remove();
    }


}



Book.prototype.removeBook = function(books, bookId) {

    const index = books.findIndex(book => book.id === bookId )

    if (index != -1) {
        books.splice(index, 1);
        return true;

    }

    return false;

}


function bookActionRemove(book) {
    const removeBookButton = document.createElement("button");
    removeBookButton.className = "remove-book-button";

    const imgRemoveIcon = document.createElement("img");
    imgRemoveIcon.src = "./images/delete_1632602.png";
    imgRemoveIcon.alt = "Remove this book";

    removeBookButton.dataset.id = book.id;

    removeBookButton.append(imgRemoveIcon);

    removeBookButton.addEventListener('click', (event) => {
        const bookId = event.currentTarget.dataset.id;

        const confirmRemove = confirm("Are you sure you want to delete this book?");

        if (confirmRemove) {
            
            const bookIsRemoved = book.removeBook(libraryOfBooks, bookId); /*book is removed from array*/

            if (bookIsRemoved) {
                removeBookButton.closest(".book-card").remove(); /*traverse from the button up to the parent (book card) to remove it*/
            }

            if (libraryOfBooks.length === 0) {
                noBooksText();
            }

        }


    });

    return removeBookButton;

}



function createBookActions(book) {
    const bookActionsContainer = document.createElement("div");
    bookActionsContainer.className = "book-actions-container";
    
    const readButton = bookActionRead(book);

    const removeButton = bookActionRemove(book);

    bookActionsContainer.append(readButton, removeButton);

    return bookActionsContainer;


}


function noBooksText() {
    const textToDisplay = document.createElement("p");
    textToDisplay.textContent = "NO BOOKS TO DISPLAY. PLEASE ADD A BOOK.";
    booksContainer.append(textToDisplay);

}


function displayBooks() {
    
    if (libraryOfBooks.length === 0) {
        noBooksText();
    }
    else {
        booksContainer.replaceChildren();

        libraryOfBooks.forEach(function(book) {
            const card = document.createElement("div");
            card.className = "book-card";

            const bookImage = createImageBook(book);

            const overlay = createBookOverlay(book);

            const bookDetails = displayBookDetails(book);

            const bookActions = createBookActions(book);

            card.append(bookImage, overlay, bookDetails, bookActions);
            booksContainer.appendChild(card);
            
        }); 

    }
    
}


navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const pageName = event.currentTarget.getAttribute('data-page');

        currentPage = pageName;

        navLinkActive(pageName);
        swapPageBackground(pageName);
       
        if (pageName === 'home') {
            booksContainer.replaceChildren(); /*make the books container NOT visible*/
        
        }
        else if (pageName === 'browse') {
            displayBooks();
        }


    });

});


swapPageBackground('home'); /*default page*/