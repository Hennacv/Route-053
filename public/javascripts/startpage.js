// $(document).ready(displayPage);

var list, selectedCultures = [], zoneArray = [], bothQRandMapCompleted = { map: false, qr: false };

// function displayPage(){
//     document.querySelector(".clickable").addEventListener("click", nextPage);
// }

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

function fetchStores(listId){
    if(listId) window.location.href = `/list/masterSheet/${listId}`;
}

function fetchQRCode(name, dataString){
    if(dataString) window.location.href = `/qr/${name}/${dataString}`;
}

function fetchCulture(cultures){
    var listOfCultures = cultures.toString().replace(/,/g, "+");
    if(listOfCultures) window.location.href = `/qr-multi/${listOfCultures}`;
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
    card.addEventListener('click', function(){
        handleMultiClick(this, location);
    })
}

function handleMultiClick(el, placeId){
    if(checkDuplicate(placeId)){
        el.classList.remove("selected-card");
        selectedCultures = selectedCultures.filter(function(el){
            return el.placeId !== location.placeId
        })
    } else {
        el.classList.add("selected-card");
        selectedCultures.push(location);
    }
    // counterButton();
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

function fetchMultipleLocations(dataString){
    $.ajax({
        method: "GET",
        data: dataString,
        url: "/api/fetchMultipleLocations",
        contentType: "plain/text",
        dataType: "json",
    }).fail(function(err){
        console.error("Filter food Sheet call failed.", err)
        $('.disappearingact3').html("");
    }).always(function(){
        console.info("Processing food route call.")
    }).done(function(data){
        console.log("display stores data:", data);
        if(data.length > 0) handleMultipleLocationsData(data);
    })
}

// ######## QR Code  #############################################

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
            removeLoadingScreen('.disappearingact2');
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

function multipleLocationsQR(url){
    $.ajax({
        method: "GET",
        data: url,
        url: "/api/qr-multiple",
        dataType: "text",
        contentType: "text/plain"
        }).fail(function(err){
            console.error("Failed to create QR Code.", err)
        }).always(function(){
            console.info("Building QR Code.")
        }).done(function(data){
            console.log("qr data:", data);
            document.querySelector(".qr-code-big").src = data;
            bothQRandMapCompleted.qr = true;
            removeLoadingScreen('.disappearingact3');
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
    removeLoadingScreen('.disappearingact2');
    console.log("map response:", response);
}


// ####### UTILITIES #################################
function removeLoadingScreen(className){
    if(bothQRandMapCompleted.qr && bothQRandMapCompleted.map){
        $(className).html("");
    }
}

function selectedCulture(el, listId){
    if(checkDuplicate(selectedCultures, listId)){
        el.classList.remove("selected-card");
        selectedCultures = selectedCultures.filter(function(item){
            return item !== listId
        })
    } else {
        el.classList.add("selected-card");
        selectedCultures.push(listId);
    }
}

function checkDuplicate(arr, location){
    var found = false;
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === location) {
            found = true;
            break;
        }
    }
    return found;
}

function handleMultipleLocationsData(data){
    var waypoints = [];
    var markers = [];
    var qrString = "";

    for(let i = 0; i < data.length; i++){
        waypoints.push({ location: { lat: data[i].latitude, lng: data[i].longitude }, stopover: true })
        markers.push(data[i].placeId)
        qrString += `@${data[i].placeId},${data[i].latitude},${data[i].longitude}`
    }
    multipleLocationsQR(qrString);
    var response = createWayPointsMap("qr-map-waypoints", waypoints, markers);
    bothQRandMapCompleted.map = response;
    removeLoadingScreen('.disappearingact3');

}