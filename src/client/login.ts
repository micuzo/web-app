let isLogin = true;

const formLogin = {
    email: "",
    password: "",
    name: "",
    city: "",
    country: "",
    ["postal code"]: ""
}

const togglePageState = () => {
    isLogin = !isLogin
    
    const loginTitle = document.querySelector("#loginBoxTitle");
    loginTitle.innerHTML = isLogin ? "Login" : "Register";

    const toggleButton = document.querySelector("#toggleButton");
    toggleButton.innerHTML = isLogin ? "Register" : "Login";

    if (!isLogin){
        const root = document.querySelector("#register-form");
        const labelTypeMap = {
            name: "text",
            city: "text",
            country: "text",
            ["postal code"]: "text"
        }
        const formInputs = createFormInputs(labelTypeMap, root, formLogin);
    }
    else {
        document.querySelector("#register-form").innerHTML = "";
    }
}

const confirmAction = () => {

    store.setUser({
        email: formLogin.email,
        name: formLogin.name,
        address: JSON.stringify({
            city: formLogin.city,
            country: formLogin.country,
            ["postal code"]: formLogin["postal code"]
        })
    });
    store.initCart();

    if (isLogin) {
        //get user
        post("/api/login", {email: formLogin.email, password: formLogin.password})
        .then(res => res.json())
        .then(res => {
            if (res.res === "ok") window.location.href = formLogin.email === "admin@example.com" ? "/home-admin" : "/home";
            else alert("incorrect username / password");
        });
    }
    else {
        //add user to db
        store.initCart();
        store.setUser();
    }

}

window.onload = () => {
    if (store.getUser()){
        window.location.href = "/home";
    }
    const root = document.querySelector("#og-form");
    const labelTypeMap = {
        email: "email",
        password: "password"
    }
    const formInputs = createFormInputs(labelTypeMap, root, formLogin);
    //Check for a current user if yes?
    //redirect dashboard
}
