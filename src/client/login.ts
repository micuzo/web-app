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
        store.initCart();
        store.setUser();
    }
    else {
        store.initCart();
        store.setUser();
    }

    window.location.href = "/home";
}

window.onload = () => {
    if (store.getUser()){
        window.location.href = "/home";
    }
    //Check for a current user if yes?
    //redirect dashboard
}
