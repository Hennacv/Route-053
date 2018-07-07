$(document).ready(displayPage);

var list;

function displayPage(){
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

function somethingSpecific(locations){
    console.log("clicked");
    window.location.href = "./specific";
    // retrieveStores();
}

function goToRoute(){
    console.log("clicked");
    window.location.href = "./route";
}

function allStores(){
    console.log("clicked");
    window.location.href = "./allstores";
}

function retrieveStores(){
    $.ajax({
        method: "GET",
        url: "/api/mastersheet",
        dataType: "json",
    }).fail(function(err){
        console.error("Mastersheet call failed.", err)
    }).always(function(){
        console.info("Processing mastersheet call.")
    }).done(function(data){
        createButtons(data);
    })
}

function determineSpecificRoute(category){
    if(category) window.location.href = `./specific/${category}`;
    console.log("finding cat:", category);
}

function determineMultipleRoute(category){
    if(category) window.location.href = `./route/${category}`;
    console.log("finding cat2:", category);
}

function determineFood(category){
    if(category) window.location.href = `./food/${category}`;
    console.log("finding food:", category);
}

function fetchSpecificStores(janky){
    console.log("fuck me");
    console.log("poops:", janky);
}

function dospecific(category){
    console.log("triggered *autistic spaz*")
    $.ajax({
        method: "GET",
        data: {filter: category},
        url: "/api/specific-mastersheet",
        dataType: "json",
        }).fail(function(err){
            console.error("Filter Sheet call failed.", err)
        }).always(function(){
            console.info("Processing filter call.")
        }).done(function(data){
            // console.log(data); // --> make cards, ho
            createCardsSpecific(data);
        })
}

function doroute(category){
    console.log("triggered route *autistic spaz*")
    $.ajax({
        method: "GET",
        data: {filter: category},
        url: "/api/route-mastersheet",
        dataType: "json",
        }).fail(function(err){
            console.error("Filter Route Sheet call failed.", err)
        }).always(function(){
            console.info("Processing filter route call.")
        }).done(function(data){
            console.log("route works"); 
        
        })
}

function dofood(category){
    console.log("food bitch")
    $.ajax({
        method: "GET",
        data: {filter: category},
        url: "/api/food-restsheet",
        dataType: "json",
        }).fail(function(err){
            console.error("Filter food Sheet call failed.", err)
        }).always(function(){
            console.info("Processing food route call.")
        }).done(function(data){
            console.log("food works");
            createCardsFood(data); 
        })
}
function createCardsSpecific( category ) {
    console.log("yes bitch") 
    for (var i = 0; i < category.length; i++) {
        var name = category[i].name;
        var cardS =  $(`<div class="card text-center" onclick="film()">
                            <img class="card-img-top img-padding" src="/images/cinema.png" alt="Film"/>
                            <div class="card-body">
                                <h5>`+ name +`</h5>
                            </div>
                        </div>) `)
        $(".specificcard").append(cardS)

        cardS.click(cardSclicked); 
    }
}

function cardSclicked(){
    console.log("card clicked")
}

function createCardsFood( category ) {
    console.log("yes bitch") 
    for (var i = 0; i < category.length; i++) {
        var name = category[i].name;
        var cardF =  $(`<div class="card text-center" onclick="film()">
                            <img class="card-img-top img-padding" src="/images/cinema.png" alt="Film"/>
                            <div class="card-body">
                                <h5>`+ name +`</h5>
                            </div>
                        </div>) `)
        $(".specificcard").append(cardF)

        cardF.click(cardSclicked); 
    }
}
