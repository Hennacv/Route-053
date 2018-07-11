$(document).ready(displayPage);

var list, zoneArray = [], bothQRandMapCompleted = { map: false, qr: false };

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

// ####### Core Paths ###################################################

function fetchRestaurants(listId){
    if(listId) window.location.href = `/list/restSheet/${listId}`;
}

function fetchCulture(listId){
    if(listId) window.location.href = `/list/cultureSheet/${listId}`;
}

function fetchStores(listId){
    if(listId) window.location.href = `/list/masterSheet/${listId}`;
}

function fetchQRCode(name, dataString){
    if(dataString) window.location.href = `/qr/${name}/${dataString}`;
}

// ######################################################################

// function retrieveStores(){
//     $.ajax({
//         method: "GET",
//         url: "/api/mastersheet",
//         dataType: "json",
//     }).fail(function(err){
//         console.error("Mastersheet call failed.", err)
//     }).always(function(){
//         console.info("Processing mastersheet call.")
//     }).done(function(data){
//         createButtons(data);
//     })
// }

// function dospecific(category){
//     $.ajax({
//         method: "GET",
//         data: {filter: category},
//         url: "/api/specific-mastersheet",
//         dataType: "json",
//         }).fail(function(err){
//             console.error("Filter Sheet call failed.", err)
//         }).always(function(){
//             console.info("Processing filter call.")
//         }).done(function(data){
//             createCards(data, "specificcard");
//         })
// }

// function doroute(category){
//     $.ajax({
//         method: "GET",
//         data: {filter: category},
//         url: "/api/route-mastersheet",
//         dataType: "json",
//         }).fail(function(err){
//             console.error("Filter Route Sheet call failed.", err)
//         }).always(function(){
//             console.info("Processing filter route call.")
//         }).done(function(data){
//             createCards(data, "routecard");
//         })
// }

// function dofood(category){
//     $.ajax({
//         method: "GET",
//         data: {filter: category},
//         url: "/api/food-restsheet",
//         dataType: "json",
//         }).fail(function(err){
//             console.error("Filter food Sheet call failed.", err)
//         }).always(function(){
//             console.info("Processing food route call.")
//         }).done(function(data){
//             createCards(data, "foodcard");
//         })
// }

function createCards( category, className ) {
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
        console.log(`.${className} will be populated with ${location.name}`);
        addSingleClick(card, location);
        $(`.${className}`).append(card)
    }
    $('.disappearingact').html("");
}

function addSingleClick(card, location){
    card.addEventListener('click', function(){
        handleSingleLocation(this, location);
    })
}

function handleSingleLocation(el, location){
    el.classList.add("selected-card");
    var dataString = location.placeId + "," + location.location.lat + "," + location.location.lon;
    dataString.toString();
    fetchQRCode(location.name, dataString);
}

// REWORK FOR MULTIPLE FUN CATEGORY

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
    // counterButton();
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

// function counterButton(){
//     var btn = document.querySelector('.submit-button');
//     var selectedAmount = zoneArray.length;

//     if(zoneArray.length > 0){
//         btn.classList = "submit-button counting"
//         btn.textContent = `Submit ${selectedAmount}`
//     } else {
//         btn.classList = "submit-button inactive";
//         btn.textContent = "Submit"
//     }
// }

// function multipleLocationQR(location){
//     if(zoneArray.length <= 1) return false;
//     var jsonString = JSON.stringify(zoneArray);
//     $.ajax({
//         method: "post",
//         data: jsonString,
//         url: "/api/qr-multiple",
//         dataType: "json",
//         contentType: "application/json",
//     }).fail(function(err){
//         console.error("Filter Route Sheet call failed.", err)
//         var resp = err.responseText;
//         document.querySelector('.routeList-qr-code-popup-img').src = resp;
//     }).always(function(){
//         console.info("Processing filter route call.")
//     }).done(function(data){
//         console.log("image:", data);
//         document.querySelector('.routeList-qr-code-popup-img').src = data;
//     })
// }

// ######### CORE APIs ###############################################

function displayLocations(data){
    var className = data.className;
    $.ajax({
        method: "GET",
        data: data,
        url: "/api/fetchList",
        dataType: "json",
    }).fail(function(err){
        console.error("Filter food Sheet call failed.", err)
        $('.disappearingact').html("");
    }).always(function(){
        console.info("Processing food route call.")
    }).done(function(data){
        console.log("display stores data:", data);
        createCards(data, className);
    })
}

/** QR Code  */

function singleLocationQR(location){
    if(location.split(',').length === 3){
        $.ajax({
            method: "GET",
            data: {link: location},
            url: "/api/qr-single",
            dataType: "text",
            contentType: "application/json"
        }).fail(function(err){
            console.error("Single QR generation call failed.", err)
            var resp = err.responseText;
            document.querySelector('.qr-code').src = resp;
        }).always(function(){
            console.info("Processing filter route call.")
        }).done(function(data){
            console.log("image:", data);
            bothQRandMapCompleted.qr = true
            document.querySelector('.qr-code').src = data;
            removeLoadingScreen();
        })
    }
}

function generateQRCode(className, url){
    $.ajax({
        method: "GET",
        data: {url: url},
        url: "/api/qr-generic",
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

// ######## GOOGLE MAPS API ####################

function createMap(name, dataString){
    var dataArr = dataString.split(",");
    var location = {
        name: name,
        placeId: dataArr[0],
        location: {
            lat: parseFloat(dataArr[1]),
            lng: parseFloat(dataArr[2])
        }
    }
    var response = initMap("qr-map", location)
    bothQRandMapCompleted.map = true;
    removeLoadingScreen();
    console.log("map response:", response);
}

function removeLoadingScreen(){
    if(bothQRandMapCompleted.qr && bothQRandMapCompleted.map){
        $('.disappearingact2').html("");
    }
}