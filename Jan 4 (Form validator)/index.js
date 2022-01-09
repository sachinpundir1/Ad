const userName = document.getElementById("name");
const email = document.getElementById("email");
const pass1 = document.getElementById("password1");
const pass2 = document.getElementById("password2");
const signUp = document.getElementById("signBtn");

console.log(userName.value, "hi");

signUp.addEventListener("click", function (event) {
    if (
        !validateFields(userName) ||
        !validateFields(email) ||
        !validateFields(pass1)
    )
        event.preventDefault();
    else if (pass1.value != pass2.value) {
        alert("password not matched ! try again");
        pass2.value = "";
        pass2.parentNode.classList.add("show--error");
        event.preventDefault();
    }    
});

function validateFields(field) {
    const parent = field.parentNode;
    if (field === userName) {
        if (field.value.trim() === "") {
            parent.classList.add("show--error");
            parent.classList.remove("show--success");
            return false;
        }
        parent.classList.remove("show--error");
        parent.classList.add('show--success')
        return true;
    } else if (field === email) {
        if (!ValidateEmail(field.value)) {
            parent.classList.add("show--error");
            parent.classList.remove("show--success");
            return false;
        }
        parent.classList.remove("show--error");
        parent.classList.add('show--success')
        return true;
    } else if (field === pass1) {
        if (!validatePassword(field.value)) {
            parent.classList.add("show--error");            
            parent.classList.remove("show--success");
            return false;
        }
        parent.classList.remove("show--error");
        parent.classList.add('show--success')
        return true;
    }
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    alert("You have entered an invalid email address!");
    return false;
}

function validatePassword(pass) {
    const patt =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (patt.test(pass)) return true;
    alert("password must contain one Uppercase , one lowercase , one special character and must be of length at least 10");
    return false;
}
