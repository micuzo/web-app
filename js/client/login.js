var _a;
var isLogin = true;
var formLogin = (_a = {
        email: "",
        password: "",
        name: "",
        city: "",
        country: ""
    },
    _a["postal code"] = "",
    _a);
var togglePageState = function () {
    var _a;
    isLogin = !isLogin;
    var loginTitle = document.querySelector("#loginBoxTitle");
    loginTitle.innerHTML = isLogin ? "Login" : "Register";
    var toggleButton = document.querySelector("#toggleButton");
    toggleButton.innerHTML = isLogin ? "Register" : "Login";
    if (!isLogin) {
        var root = document.querySelector("#register-form");
        var labelTypeMap = (_a = {
                name: "text",
                city: "text",
                country: "text"
            },
            _a["postal code"] = "text",
            _a);
        var formInputs = createFormInputs(labelTypeMap, root, formLogin);
    }
    else {
        document.querySelector("#register-form").innerHTML = "";
    }
};
var confirmAction = function () {
    var _a;
    store.setUser({
        email: formLogin.email,
        name: formLogin.name,
        address: JSON.stringify((_a = {
                city: formLogin.city,
                country: formLogin.country
            },
            _a["postal code"] = formLogin["postal code"],
            _a))
    });
    store.initCart();
    if (isLogin) {
        //get user
        post("/api/login", { email: formLogin.email, password: formLogin.password })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (res.res === "ok")
                window.location.href = formLogin.email === "admin@example.com" ? "/home-admin" : "/home";
            else
                alert("incorrect username / password");
        });
    }
    else {
        //add user to db
        store.initCart();
        store.setUser();
    }
};
window.onload = function () {
    if (store.getUser()) {
        window.location.href = "/home";
    }
    var root = document.querySelector("#og-form");
    var labelTypeMap = {
        email: "email",
        password: "password"
    };
    var formInputs = createFormInputs(labelTypeMap, root, formLogin);
    //Check for a current user if yes?
    //redirect dashboard
};
