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
        var location = { name: category[i].name, placeId: category[i].placeId, zone: category[i].zone,
            location: { lat: category[i].latitude, lon: category[i].longitude } }

        var card = document.createElement('div');
        card.classList = "card text-center";
        card.innerHTML = `<img class="card-img-top img-padding" src="/images/cinema.png"/>
                                <div class="card-body">
                                    <h5>${location.name}</h5>
                                </div>
                        </div>`;
        addClickEvent(card, location);
        $(`.${className}`).append(card)
    }
}

function addClickEvent(card, location){
    card.addEventListener('click', function(){
        handleZoning(this, location);
    })
}

function handleZoning(el, location){
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

function submitZones(){
    if(zoneArray.length <= 1) return false;
    var zones = {
        zone0:  { zone: '0', value: 0, letter: 'nah' },
        zone1:  { zone: '1', value: 0, letter: 'a' },
        zone2:  { zone: '2', value: 0, letter: 'b' },
        zone3:  { zone: '3', value: 0, letter: 'c' },
        zone4:  { zone: '4', value: 0, letter: 'd' },
        zone5:  { zone: '5', value: 0, letter: 'e' },
        zone6:  { zone: '6', value: 0, letter: 'f' },
        zone7:  { zone: '7', value: 0, letter: 'j' },
        zone8:  { zone: '8', value: 0, letter: 'k' },
        zone9:  { zone: '9', value: 0, letter: 'l' },
        zone10: { zone: '10', value: 0, letter: 'm' },
        zone11: { zone: '11', value: 0, letter: 'n' },
        zone12: { zone: '12', value: 0, letter: 'o' },
        zone13: { zone: '13', value: 0, letter: 'p' },
        zone14: { zone: '14', value: 0, letter: 'r' },
        zone15: { zone: '15', value: 0, letter: 's' },
        zone16: { zone: '16', value: 0, letter: 't' },
        zone17: { zone: '17', value: 0, letter: 'u' },
        zoneplaceholder18: { zone: 'none', value: 0, letter: 'z' }
    }

    console.log("zoneArr:", zoneArray);
    for( var i = 0; i < zoneArray.length; i++ ){
        var singleZone = zoneArray[i].zone;
        var propertyName = "zone" + singleZone;
        if(zones.hasOwnProperty(propertyName)){
            zones[propertyName].value = zones[propertyName].value + 1
        } else {
            zones[propertyName].value = 1;
        }
    }
    debugger;
    var candidates = [
        { zonedot: "abc", value1: zones.zone1.zone, value2: zones.zone2.zone, value3: zones.zone3.zone   },
        { zonedot: "bst", value1: zones.zone2.zone, value2: zones.zone15.zone, value3: zones.zone16.zone   },
        { zonedot: "stur", value1: zones.zone15.zone, value2: zones.zone16.zone, value3: zones.zone17.zone, zonedotValue4: zones.zone14.zone  },
        { zonedot: "rpo", value1: zones.zone14.zone, value2: zones.zone13.zone, value3: zones.zone12.zone   },
        { zonedot: "opn", value1: zones.zone12.zone, value2: zones.zone13.zone, value3: zones.zone11.zone   },
        { zonedot: "umn", value1: zones.zone17.zone, value2: zones.zone10.zone, value3: zones.zone11.zone   },
        { zonedot: "clm", value1: zones.zone3.zone, value2: zones.zone9.zone, value3: zones.zone10.zone   },
        { zonedot: "lkj", value1: zones.zone9.zone, value2: zones.zone8.zone, value3: zones.zone7.zone   },
        { zonedot: "kfe", value1: zones.zone8.zone, value2: zones.zone6.zone, value3: zones.zone5.zone   },
        { zonedot: "adfe", value1: zones.zone1.zone, value2: zones.zone4.zone, value3: zones.zone6.zone, zonedotValue4: zones.zone5.zone  }
    ];

    console.log("initial zones:", zones);
    console.table(candidates);
    debugger;
    var calculatedFinalists = determineFinalists(zones, candidates);
    console.log("finalists:", calculatedFinalists);
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