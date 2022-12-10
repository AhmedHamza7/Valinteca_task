// U S E R   I N P U T  &  E R R O R S
let userInput = document.getElementById('userInput');
let userError = document.getElementById('userError') 

// E M A I L   I N P U T  &  E R R O R S
let emailInput = document.getElementById("emailInput")
let emailError = document.getElementById("emailError")

// P A S S   I N P U T  &  E R R O R S
let passInput = document.getElementById('passInput')
let passError = document.getElementById('passError')

// C O N F I R M  P A S S   I N P U T  &  E R R O R S
let confirmPassInput = document.getElementById("confirmPassInput")
let confirmPassError = document.getElementById("confirmPassError")

let submitBtn = document.getElementById('submitBtn')


function submitData() {

fetch('https://goldblv.com/api/hiring/tasks/register',

 { method:'post',

    body:JSON.stringify({"username":userInput.value,
                        "email":emailInput.value,
                        "password":passInput.value,
                        "password_confirmation":confirmPassInput.value}),

    headers: {
        "content-type":"application/json; charset=UTF-8",
        "accept":'application/json'
    }
}).then((res) =>{
    return res.json()
} ).then((json) => {

    // Navigate if no errors
    if(json.errors == null) { 
        localStorage.setItem('userEmail',JSON.stringify(json.email))
            location.assign("../success.html")
    } else {  // if found errors display errors in each paragraph
        if (json.errors.username) {
            userError.style.display = 'block'
            userError.innerText = json.errors.username
        } else if(json.errors.email) {
            emailError.style.display = 'block'
            emailError.innerText = json.errors.email
        } else if(json.errors.password) {
            passError.style.display = 'block'
            passError.innerText = json.errors.password
        }else if(json.errors.password_confirmation) {
            confirmPassError.style.display = 'block'
            confirmPassError.innerText = json.errors.password_confirmation
        }
    }
})
}

submitBtn.addEventListener('click', submitData)
