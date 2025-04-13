let users_signup_infos=JSON.parse(localStorage.getItem("users_signup_infos")) || [];
let users_username=users_signup_infos.map((user)=>user.username);
let users_password=users_signup_infos.map((user)=>user.password);
let users_role=users_signup_infos.map((user)=>user.role);
let owner_signup_infos=JSON.parse(localStorage.getItem("owner_signup_infos"))
document.getElementById("login-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    if(username.trim()=="" || password.trim()==""){
        document.getElementById("error-message").textContent="Veuiller remplir touts les champs";
    }
    else{
        if(users_username.includes(username) || owner_signup_infos[0].username==username){
            let index=users_username.indexOf(username) ;
            if(users_password[index]===password || owner_signup_infos[0].password==password){
                if(users_role[index]=="staffs"){
                    let role=users_role[index]
                    localStorage.setItem("users_login_infos",JSON.stringify({username,role}));
                    location.href="staffs/dashboard.html";
                }
                else if(users_role[index]=="users"){
                    let role=users_role[index]
                    localStorage.setItem("users_login_infos",JSON.stringify({username,role}));
                    location.href="users/dashboard.html";
                }
                else if(owner_signup_infos[0].role=="owner"){
                    let role="owner"
                    localStorage.setItem("users_login_infos",JSON.stringify({username,role}));
                    location.href="owner/dashboard.html";
                }
            } 
            else{
                document.getElementById("error-message").textContent="Mot de passe incorrect";
            }
        }
        else{
            document.getElementById("error-message").textContent="Votre nom d'utilisateur est incorrect ou Vous n'avez pas de compte";
        }
    }
})
