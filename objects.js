
//display book objects using divs

let myLibrary = [];
let submitButton = document.querySelector("#submit");
let addBookButton = document.querySelector("#addBook");
let cancelButton = document.querySelector("#cancel");

let resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', resetArray);

submitButton.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', openForm);
cancelButton.addEventListener('click', closeForm);

/** Clears the container */
function resetContainer(){
    document.getElementById("library").innerHTML = "";
}

/** Clears the array */
function resetArray(){
    myLibrary =[];
    displayLibrary();
}

/** Gets the information from the form and creates a book object
 * then calls the displayLibrary function to display the newly added book
 */
function addBookToLibrary() {
    // do stuff here
    let form = document.forms[0];
    
    let titleForm = form.titleInput.value;
    let authorForm = form.authorInput.value;
    let pagesForm = form.pagesInput.value;
    let readForm = form.readInput.value;
    let existingBook = false;

    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].title == titleForm){
            existingBook = true;
            break;
        }
    }

    if(!(existingBook)){
        let book = new Book(titleForm, authorForm, pagesForm, readForm);
        myLibrary.push(book);
        form.titleInput.value = "";
        form.authorInput.value = "";
        form.pagesInput.value = "";
        form.readInput.value = "";
        displayLibrary();
    }
    else{
        alert("This book already exists in the library");
    }
    closeForm();
    
}
/** Makes the adding book form visible  */
function openForm(){
    document.getElementById("formContainer").style.display = "flex";
    document.getElementById("formContainer").style.justifyContent = "center";
    document.getElementById("addBook").style.display = "none";
    document.getElementById("reset").style.display = "none";
}
/** Makes the form hidden 
*/
function closeForm(){
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("addBook").style.display = "flex";
    document.getElementById("reset").style.display = "flex";
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.log(title + " by " + author + ", " + pages + " pages, " + read);
    }
}
/** First calls the reset function to clear the library div
 * then loops through the array of book objects creating a div for each
 * and displaying each books information
 */
function displayLibrary(){
    resetContainer();
    for(let i = 0; i < myLibrary.length; i++){
        let bookCard = document.createElement('div');
        let bookTitle = document.createElement('h2');
        let bookAuthor = document.createElement('h3');
        let bookPages = document.createElement('h4');
        let bookRead = document.createElement('button');
        let removeButton = document.createElement('button');

        bookRead.addEventListener('click', function() {updateReadStatus(bookRead)});
        removeButton.addEventListener('click', function() {removeBook(myLibrary[i].title)});


        bookCard.classList.add("bookCard");

        bookTitle.innerHTML = myLibrary[i].title;
        bookAuthor.innerHTML = myLibrary[i].author;
        bookPages.innerHTML = myLibrary[i].pages + " pages";
        if(myLibrary[i].read == "on"){
            bookRead.innerHTML = "Not read";
            bookRead.classList.add("notRead");

        }
        else{
            bookRead.innerHTML = "Read";
            bookRead.classList.add("read");

        }
        removeButton.innerHTML = "Remove";

        document.getElementById("library").appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(removeButton);

    }
}

    function removeBook(title){
            for(let i = 0; i < myLibrary.length; i++){
                if(myLibrary[i].title == title){
                    myLibrary.splice(i, 1);
                    break;
                }
            }
        displayLibrary();
    }
    
    function updateReadStatus(book){
        if(book.innerHTML == "Read"){
            book.innerHTML = "Not Read";
            book.classList.remove("read");
            book.classList.add("notRead");
        }
        else{
            book.innerHTML = "Read";
            book.classList.remove("notRead");
            book.classList.add("read");

        }
    }
    


