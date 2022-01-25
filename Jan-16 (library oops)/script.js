const add_btn = document.querySelector('.add-btn')
const model = document.querySelector('.modal')
const hide_modal = document.querySelector('.hide-modal-btn')
const book_title= document.querySelector('.book-title')
const add_book_btn=document.querySelector('.add-book-btn')
const container = document.querySelector('.container')
let delete_keys = document.querySelectorAll('.cross-btn')
const id_value=1
// console.log(container.children)


delete_keys.forEach((key)=>{
    console.log("hi")
})



class Books{    
    #title ;
    constructor(value){
        this.#title = value;
    }

    getBookTitle(){
        return this.#title
    }
    
}

const deleteBook =(event)=>{
    // console.log(event.target.classList[0])
    const bookNodes = container.children;
    const currentBookNode = event.target.parentNode;
    let ind = null;
    for(let i = 0; i < bookNodes.length; i++){
        if(bookNodes[i] === currentBookNode ){
            ind = i;            
        }
    }

    console.log(event.target.parentNode);
    console.log(ind)
    if(ind != null)
    books.splice(ind,1);    
    localStorage.setItem("books",JSON.stringify(books))
    container.removeChild(event.target.parentNode)
    
    // console.log("clicked")
}


let books=[]
const showModal =()=>{
     model.classList.add('show-modal')  
}
const hideModal =()=>{
    model.classList.remove('show-modal')
}
const BuildUi =(books)=>{
    console.log(books)
    books.forEach((book)=>{
        console.log(book)

        const book_ctn = document.createElement('div')
        book_ctn.classList.add('book')
        const book_name = document.createElement('h2')
        book_name.classList.add("book-name")
        book_name.innerText=book;

        const icon = document.createElement('img')
        icon.classList.add("cross-btn")

        // icon.setAttribute('id',"ones")
        icon.setAttribute('src',"cross.png")
        book_ctn.append(book_name,icon)
        container.append(book_ctn)
    })
    delete_keys = document.querySelectorAll('.cross-btn')
    delete_keys.forEach((key)=>{
        key.addEventListener('click',deleteBook)
    })
}
const setBooks =()=>{
    if(localStorage.getItem("books")){
        books = JSON.parse(localStorage.getItem("books"))
        BuildUi(books)
    }
    // }else{
    //     const test={
    //         title:"Manual"
    //     }
    //     books.push(test)
    // }
}




let b = new Books();

const fetchBookTitle =(event)=>{
    const book = new Books(book_title.value);       // object of class Book    
    books.push(book.getBookTitle());        

    localStorage.setItem("books",JSON.stringify(books))
    console.log(localStorage.getItem("books"))

    book_title.value=""  
    container.innerHTML = ''
    BuildUi(books);
}


add_book_btn.addEventListener('click',fetchBookTitle)
hide_modal.addEventListener('click',hideModal)
add_btn.addEventListener('click',showModal)


setBooks()