let isLogin = true;

const togglePageState = () => {
    isLogin = !isLogin
    
    const loginTitle = document.querySelector("#loginBoxTitle");
    loginTitle.innerHTML = isLogin ? "Login" : "Register";

    const toggleButton = document.querySelector("#toggleButton");
    toggleButton.innerHTML = isLogin ? "Register" : "Login";
}

const confirmAction = () => {
    if (isLogin) {
        //redirect to dashboard with user
    }
    else {
        //Register user to the database
    }
}

window.onload = () => {
    //Check for a current user if yes?
    //redirect dashboard
}
