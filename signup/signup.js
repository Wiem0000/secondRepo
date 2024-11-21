$(document).ready(function() {
    $('#Form').on('submit', function(event) {   
        event.preventDefault()// Prevent the form from submitting
   
//nhothom fi valeur
var username = $("#name").val()
var email = $("#email").val()
var pass = $("#pass").val()
var Cpass = $("#Cpass").val()

let users = JSON.parse(localStorage.getItem("users")) || []
console.log(users);

//functionality
if (username ==="" || email ==="" || pass ==="" || Cpass ==="") {
    $("#msgErreur").text("please fill")
}else if (username.length< 3) {
    $("#msgErreur").text("username must be at least 3 character")
}else if (pass.length < 6) {
$('#msgErreur').text("password must be at least 6 characters")
}else if (pass !== Cpass) {
$("#msgErreur").text("check your password")
}else {

// localStorage.setItem('username', username)
// localStorage.setItem('email', email)
// localStorage.setItem('password', password)
users.push({username : username ,
     email : email ,
     pass : pass ,
     Cpass : Cpass})
//storihom fi window
localStorage.setItem("users" , JSON.stringify(users));

//bch nraj3ouhom vide
 $("#name").val("")
 $("#email").val("")
 $("#pass").val("")
$("#Cpass").val("")
alert("Signup successful!");
        }

        console.log(users.users);

    })

})
