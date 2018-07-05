$(document).ready(displayPage);

function displayPage(){
    // $(".clickable").click(nextPage);
    var clicky = document.querySelector(".clickable");
    clicky.addEventListener("click", nextPage);
}

function nextPage( e ){
    console.log("page clicked");    
    window.location.href = "./firstCh";
}

function goBack( e ){
    window.history.back();
}

function doFun(){
    console.log("clicked");
    window.location.href = "./fun";
}

function funActivities(){
    console.log("clicked");
    window.location.href = "./funactivities";
}

function culture(){
    console.log("clicked");
    window.location.href = "./culture";
}

// function museum(){
//     // console.log("museum clicked");
//     // window.location.href = "./museum";
// }

// function church(){
//     // console.log("church clicked");
//     // window.location.href = "./church";
// }

// function galleries(){
//     // console.log("gallery clicked");
//     // window.location.href = "./gal";
// }

function pool(){
    console.log("clicked");
    window.location.href = "./pool";
}

function pool1(){
    console.log("clicked");
    window.location.href = "./pool1";
}

function pool2(){
    console.log("clicked");
    window.location.href = "./pool2";
}

function film(){
    console.log("clicked");
    window.location.href = "./film";
}

function escapeRoom(){
    console.log("clicked");
    window.location.href = "./eroom";
}

function goShopping(){
    console.log("clicked");
    window.location.href = "./shop";
}

function eatFood(){
    console.log("clicked");
    window.location.href = "./food";
}

function somethingSpecific(){
    console.log("clicked");
    window.location.href = "./specific";
}

function goToRoute(){
    console.log("clicked");
    window.location.href = "./route";
}

function allStores(){
    console.log("clicked");
    window.location.href = "./allstores";
}

function terras(){
    console.log("clicked");
    window.location.href = "./terras";
}

function cafe(){
    console.log("clicked");
    window.location.href = "./cafe";
}

function restaurant(){
    console.log("clicked");
    window.location.href = "./restaurant";
}
