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

function dospecific(category){
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
            createCardsSpecific(data);
        })
}

function doroute(category){
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
    console.log("bitch please:", category)
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
    for (var i = 0; i < category.length; i++) {
        var location = { name: category[i].name, placeId: category[i].placeId, zone: category[i].zone,
            location: { lat: category[i].latitude, lon: category[i].longitude } }

        var card = document.createElement('div');
        card.classList = "card text-center";
        card.innerHTML = `<img class="card-img-top img-padding" src="/images/cinema.png"/>
                                <div class="card-body">
                                    <h5>${location.name}</h5>
                                </div>
                        </div>`;

        console.log("name:", name);

        card.addEventListener('click', function(){
            var zone = getLetter(location.zone);
            console.log("name:", location.name);
            console.log("zone:", location.zone);
        })

        $(".specificcard").append(card)
    }
}

function changchang(location){
    var zone = getLetter(location.zone);
    console.log("zone:", zone);
}

function createCardsFood( category ) {
    for (var i = 0; i < category.length; i++) {
        var restaurant = { name: category[i].name, placeId: category[i].placeId, zone: category[i].zone,
            location: { lat: category[i].latitude, lon: category[i].longitude } }
        
            console.log("rests:", restaurant);

        var card = document.createElement('div');
        card.classList = "card text-center";
        card.innerHTML = `<img class="card-img-top img-padding" src="/images/cinema.png"/>
                                <div class="card-body">
                                    <h5>${restaurant.name}</h5>
                                </div>
                        </div>`;
        card.addEventListener('click', function(){
            var zone = getLetter(restaurant.zone);
            console.log("zone:", zone);
        })
        $(".foodcard").append(card)
    }
}

/** QR Code  */
function generateQRCode(className, url){
    var qr = createQR(url, qrcb);
}

function createQR(url){
    $.ajax({
        method: "GET",
        data: {url: url},
        url: "/api/create-qr",
        dataType: "text",
        }).fail(function(err){
            console.error("Failed to create QR Code.", err)

        }).always(function(){
            console.info("Building QR Code.")
        }).done(function(data){
            qrcb(data);
        })
}

function qrcb(data){
    console.log('buffer:', data);
    document.querySelector('.qr-code').src = data;
}