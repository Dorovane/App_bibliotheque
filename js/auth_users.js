let users_login_infos=JSON.parse(localStorage.getItem("users_login_infos"));
if( !(users_login_infos) || users_login_infos.role != "users"){
    alert("Vous devez vous connecter")
    location.href="../login.html"
}