var list, selectedCultures = [], zoneArray = [], bothQRandMapCompleted = { map: false, qr: false };

function nextPage( e ){
    window.location.href = "./firstCh";
}

function goBack( e ){
    window.history.back();
}

function doFun(){
    window.location.href = "./fun";
}

function funActivities(){
    window.location.href = "./funactivities";
}

function culture(){
    window.location.href = "./culture";
}

function pool(){
    window.location.href = "./pool";
}

function goShopping(){
    window.location.href = "./specific";
}

function eatFood(){
    window.location.href = "./food";
}

function somethingSpecific(locations){
    window.location.href = "./specific";
}

function goToRoute(){
    window.location.href = "./route";
}

function allStores(){
    window.location.href = "./allstores";
}

function determineMultipleRoute(category){
    if(category) window.location.href = `/route/${category}`;
}

function determineFood(category){
    if(category) window.location.href = `/food/${category}`;
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

// ###### Cards ###########################################################

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

// ######### CORE APIs ###############################################

function displayLocations(data){
    var className = data.className;
    $.ajax({
        method: "GET",
        data: data,
        url: "/api/fetchList",
        dataType: "json",
    }).fail(function(err){
        console.error("Displaying Locations failed.", err)
        $('.disappearingact').html("");
    }).always(function(){
        console.info("Attempting to display locations.")
    }).done(function(data){
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
        console.error("Multiple locations fetch failed.", err)
        $('.disappearingact3').html("");
    }).always(function(){
        console.info("Attempting to fetch multiple locations.")
    }).done(function(data){
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
            console.info("Creating single QR code.")
        }).done(function(data){
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
            console.error("Failed to create generic QR Code.", err)
            var resp = err.responseText;
            document.querySelector("." + className).src = resp;
        }).always(function(){
            console.info("Creating generic QR code.")
        }).done(function(data){
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
            console.error("Failed to create QR code of multiple locations.", err)
        }).always(function(){
            console.info("Creating multi QR code.")
        }).done(function(data){
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