$(document).ready(displayPage);

var list, zoneArray = [];

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
    if(category) window.location.href = `/specific/${category}`;
    console.log("finding cat:", category);
}

function determineMultipleRoute(category){
    if(category) window.location.href = `/route/${category}`;
    console.log("finding cat2:", category);
}

function determineFood(category){
    if(category) window.location.href = `/food/${category}`;
    console.log("finding food:", category);
}

function specificChoice(location){
    if(location) window.location.href = `/specific/choice/${location}`
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
            createCards(data, "specificcard");
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
            createCards(data, "routecard");
        })
}

function dofood(category){
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
            createCards(data, "foodcard");
        })
}

function createCards( category, className ) {
    zoneArray = [];
    for (var i = 0; i < category.length; i++) {
        var location = { name: category[i].name, placeId: category[i].placeId, zone: category[i].zone, logo: category[i].logo,
            location: { lat: category[i].latitude, lon: category[i].longitude } }

        var card = document.createElement('div');
        card.classList = "card text-center";
        card.innerHTML = `<img class="card-img-top img-padding" src="${location.logo}"/>
                                <div class="card-body">
                                    <h5>${location.name}</h5>
                                </div>
                        </div>`;

        if(className === "specificcard"){
            addSingleClick(card, location);
        } else {
            // add click even thoruh function so you can add the location to the card
            // meaning you create the element in here, and attach it to the jade file
            addClickEvent(card, location);
        }
        $(`.${className}`).append(card)
    }
}

function addSingleClick(card, location){
    card.addEventListener('click', function(){
        handleSingleLocation(this, location);
    })
}

function handleSingleLocation(el, location){
    if(zoneArray.length === 0){
        el.classList.add("selected-card");
        zoneArray.push(location);
        this.removeEventListener('click', el);
        var urlString = location.placeId + "," + location.location.lat + "," + location.location.lon;
        urlString.toString();
        specificChoice(urlString);
    }
}

function addClickEvent(card, location){
    // making it actually clickable
    card.addEventListener('click', function(){
        handleMultiClick(this, location);
    })
}

function handleMultiClick(el, location){
    // copy checkDuplicate() function also
    // this section decides whether to select, or unselect something
    // IMPORTANT: zoneArray is a global array that keeps track of what's selected
    // you'll need to make another one for that section
    if(checkDuplicate(location)){
        el.classList.remove("selected-card");
        zoneArray = zoneArray.filter(function(el){
            return el.placeId !== location.placeId
        })
    } else {
        el.classList.add("selected-card");
        zoneArray.push(location);
    }
    counterButton();
}

function checkDuplicate(location){
    var found = false;
    for(var i = 0; i < zoneArray.length; i++) {
        if (zoneArray[i].placeId === location.placeId) {
            found = true;
            break;
        }
    }
    return found;
}

function counterButton(){
    var btn = document.querySelector('.submit-button');
    var selectedAmount = zoneArray.length;

    if(zoneArray.length > 0){
        btn.classList = "submit-button counting"
        btn.textContent = `Submit ${selectedAmount}`
    } else {
        btn.classList = "submit-button inactive";
        btn.textContent = "Submit"
    }
}

/** Zoning */

function singleLocationQR(location){
    if(location.split(',').length === 3){
        $.ajax({
            method: "GET",
            data: {link: location},
            url: "/api/single-qr",
            dataType: "json",
        }).fail(function(err){
            console.error("Single QR generation call failed.", err)
            var resp = err.responseText;
            document.querySelector('.qr-code').src = resp;
        }).always(function(){
            console.info("Processing filter route call.")
        }).done(function(data){
            console.log("image:", data);
            document.querySelector('.qr-code').src = data;
        })
    }
}

function submitZones(location){
    if(zoneArray.length <= 1) return false;
    var jsonString = JSON.stringify(zoneArray);
    $.ajax({
        method: "post",
        data: jsonString,
        url: "/api/qr-generator",
        dataType: "json",
        contentType: "application/json",
    }).fail(function(err){
        console.error("Filter Route Sheet call failed.", err)
        var resp = err.responseText;
        document.querySelector('.routeList-qr-code-popup-img').src = resp;
    }).always(function(){
        console.info("Processing filter route call.")
    }).done(function(data){
        console.log("image:", data);
        document.querySelector('.routeList-qr-code-popup-img').src = data;
    })
}

/** QR Code  */
function generateQRCode(className, url){
    $.ajax({
        method: "GET",
        data: {url: url},
        url: "/api/create-qr",
        dataType: "text",
        }).fail(function(err){
            console.error("Failed to create QR Code.", err)
            var resp = err.responseText;
            document.querySelector("." + className).src = resp;
        }).always(function(){
            console.info("Building QR Code.")
        }).done(function(data){
            console.log("data:", data);
            document.querySelector("." + className).src = data;
        })
}