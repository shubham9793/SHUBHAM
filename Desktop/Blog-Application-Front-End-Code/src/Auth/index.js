


//  checked User is logged In or Not  => is Local Storage- have  token thats mean user is logged in

export const isLoggedIn = () => {
   let data = sessionStorage.getItem("data")

    if(data === null) {
        return false;
    } else{
        return true;
    }
}

// DoLogin = data -> set to local Storage

export const doLogin = (data,next) =>{
    sessionStorage.setItem("data",JSON.stringify(data));
    next();
}

// Do Logout -> remove from localStorage

export const doLogout = (next) => {
    sessionStorage.removeItem("data");
    next();

}

// Get Current User

export const getCurrentUser = () => {
    if(isLoggedIn()) {
        return JSON.parse (sessionStorage.getItem("data")).user;
    } else {
        return undefined;
    }
}



// Get Token
export const getToken=() =>{
    if(isLoggedIn()) {
        return JSON.parse(sessionStorage.getItem("data")).token

    } else return null;
}


