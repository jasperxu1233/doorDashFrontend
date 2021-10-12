// include all requests to the server
//login api ->make a request to the server
export const login = credential => {
    //config req obj
    const { username, password} = credential;
    const loginUrl = `/login?username=${username}&password=${password}`;

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
        .then(response => {
        if(response.status < 200 || response.status >= 300) {
            throw new Error("Fail to login");
        }
    })
}

//fetch restaurant  Api
export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get restaurants");
        }

        return response.json();
    });
};

//fetch Menu API
export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get menus");
        }

        return response.json();
    });
};

//fetch Cart Api
export const getCart = () => {
    return fetch("/cart").then((response) => {  //向后端发送request的时候，浏览器的cookies会自动发送当前用户的信息到后端
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get shopping cart data");
        }

        return response.json();
    });
};

//fetch checkout Api
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to checkout");
        }
    });
};

//fetch additemToCart Api
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};

//fetch sign up
export const signup = (data) => {
    const signupUrl = "/signup";

    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};