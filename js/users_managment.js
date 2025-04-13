let users_signup_infos=(JSON.parse(localStorage.getItem("users_signup_infos"))||[]);
let users_username=users_signup_infos.map((user)=>user.username);
let users_password=users_signup_infos.map((user)=>user.password);
let users_role=users_signup_infos.map((user)=>user.role)
let users_email=users_signup_infos.map((user)=>user.email)
let tbody=document.getElementById("tbody");
document.addEventListener("DOMContentLoaded",()=>{
    if(users_signup_infos){
        for(let i=0;i<users_signup_infos.length;i++){
            let ligne=document.createElement("tr");
            ligne.innerHTML=`
            <td>${users_signup_infos[i].username}</td>
            <td>${users_signup_infos[i].email}</td>
            <td>${users_signup_infos[i].role}</td>
            <td><button onclick="delete_user(${i});">supprimer</button></td>
            <td><button onclick="modify_user(${i});">Modifier</button></td>
            `
            tbody.appendChild(ligne);
        };
    }
})

document.getElementById("add-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let password_confirm=document.getElementById("password-confirm").value;
    let email=document.getElementById("email").value;
    let role=document.getElementById("role").value;
    if(username.trim()==""||password.trim()==""||password_confirm.trim()==""||email.trim()==""|| role=="Selectionner le role"){
        document.getElementById("message").style.color="red";
        document.getElementById("message").textContent="Veuillez remplir tout les champs";

    }
    else if(users_username.includes(username)||users_email.includes(email)){
        document.getElementById("message").style.color="green";
        document.getElementById("message").textContent="Votre compte existe déja";
    }
    else{
        if(password===password_confirm){
            users_signup_infos.push({username,password,email,role});
            localStorage.setItem("users_signup_infos",JSON.stringify(users_signup_infos));
            alert("Le compte à été créé avec succès");
            location.reload();
        }
        else{
            document.getElementById("message").style.color="red";
            document.getElementById("message").textContent="Les mots de passe ne sont pas identique";
        }
    }
})


function delete_user(index){
    users_signup_infos.splice(index,1);
    localStorage.setItem("users_signup_infos",JSON.stringify(users_signup_infos));
    location.reload();
}
function modify_user(index){
    document.getElementById("username").value=users_signup_infos[index].username;
    document.getElementById("email").value=users_signup_infos[index].email;
    document.getElementById("role").value=users_signup_infos[index].role;
    document.getElementById("password-confirm").style.display="none";
    document.getElementById("password").style.display="none";
    document.querySelector("button[type='submit']").textContent="Enrégistrer";
    document.querySelector("button[type='submit']").addEventListener("click",()=>{
        users_signup_infos[index]={
            username:document.getElementById("username").value,
            email:document.getElementById("email").value,
            password:users_signup_infos[index].password,
            role:document.getElementById("role").value
        };
        //Mise à jour du localStorage
        localStorage.setItem("users_signup_infos",JSON.stringify(users_signup_infos));
        alert("Modifications réussis")
        location.reload();
    })
}
