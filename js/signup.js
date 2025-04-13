let users_signup_infos= JSON.parse(localStorage.getItem("users_signup_infos")) || [];
let users_username=users_signup_infos.map((user)=>user.username)
let users_email=users_signup_infos.map((user)=>user.email)
let  role="users"
document.getElementById("signup-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let password_confirm=document.getElementById("password-confirm").value;
    let email=document.getElementById("email").value;
    if(username.trim()==""||password.trim()==""||password_confirm.trim()==""||email.trim()==""){
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
            alert("Votre compte à été créé avec succès");
            location.href="login.html"
        }
        else{
            document.getElementById("message").style.color="red";
            document.getElementById("message").textContent="Les mots de passe ne sont pas identique";
        }
    }
})


