let tbody= document.getElementById("tbody");
let form=document.getElementById("add-form");
let books =( JSON.parse(localStorage.getItem(" books ")) || []);
let books_titre=books.map((livre)=>livre.titre);
document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("books"))
    { 
        let books=JSON.parse(localStorage.getItem("books"))
        for(let i=0 ; i<books.length;i++){
            const ligne=document.createElement("tr")
            ligne.innerHTML=
            `  <td>${books[i].titre}</td>  
                <td>${books[i].auteur}</td>
                <td>${books[i].categorie}</td>
                <td>${books[i].isbn}</td>
                <td><button onclick="delete_book(${i});">supprimer</button></td>
                <td><button onclick="modify.book(${i});">Modifier</button></td>
            `
            tbody.appendChild(ligne)
        }
    }
})

//Ajout de nouveau livre
document.getElementById("add-form").addEventListener("submit" , (e)=>{
    e.preventDefault();
    const titre = document.getElementById("titre").value
    const auteur = document.getElementById("auteur").value
    const categorie = document.getElementById("categorie").value
    const isbn = document.getElementById("isbn").value
    if(titre.trim()==""  ||  auteur.trim()=="" || categorie.trim()=="" ||isbn.trim()==""){
        document.getElementById("message").style.color="red"
        document.getElementById("message").textContent="Veuillez remplir toutes les informations"
    }
    else{
        if(books_titre.includes(titre)){
            document.getElementById("message").style.color="red"
            document.getElementById("message").textContent="Un livre possède deja ce titre"
        }
        else{
            books.push(
                {
                    titre ,
                    auteur,
                    categorie,
                    isbn
                });
            form.reset();
            localStorage.setItem("books",JSON.stringify(books));
            alert("Livre ajouté")
            location.reload();
        }
    }
    
})

function delete_book(index){
    books.splice(index,1)
    localStorage.setItem("books",JSON.stringify(books))
    location.reload()
}

function modify_book(index){
    document.querySelector("button[type='submit']").textContent="Enrégistrer les modifications"
    document.getElementById("titre").value= books[index].titre
    document.getElementById("auteur").value=books[index].auteur
    document.getElementById("categorie").value=books[index].categorie
    document.getElementById("isbn").value=books[index].isbn
    document.querySelector("button[type='submit']").addEventListener("click",
        (e)=>{
            e.preventDefault();
            books[index]={
                titre:document.getElementById("titre").value,
                auteur:document.getElementById("auteur").value,
                categorie:document.getElementById("categorie").value,
                isbn:document.getElementById("isbn").value
            }
            //mise à jour du localStorage
            localStorage.setItem("books",JSON.stringify(books))
            location.reload();
        }
        
    )
}


