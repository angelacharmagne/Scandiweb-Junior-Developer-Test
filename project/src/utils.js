let url = "https://scandiweb-test-junior-dev.herokuapp.com/";

let globalRequestParameters = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
};

module.exports.globalRequestParameters = globalRequestParameters;
module.exports.url = url;