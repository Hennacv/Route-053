$(document).ready(displayPage);

var list;

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

// function showList(locations){
//     for (var i = 0; i < locations.length; i++) {
//         list = "<li>" + locations[i].categories + "</li>";
//         $(".displaylist").append(list);
//         // list = "";
//     }
// }


function createButtons( locations ){

    // console.log("loaded")
    // for (var i = 0; i < locations.length; i++) {
    //     var categories = locations[i].category;

    //     for (var i = 0; i < categories.length; i++) {
    //         var buttons = $( '<button>' + categories[i] + '</button>');
    //         buttons.appendTo('buttongroup');
    //         console.log( categories );
    //     }
        

        // for (var i = 0; i < categories.length; i++) {
            
        //     $('.buttongroup').append( button );
            
        // }
        
    
}

function determineSpecificRoute(category){
    if(category) window.location.href = `./specific/${category}`;
    console.log("finding cat:", category);
}

function determineMultipleRoute(category){
    if(category) window.location.href = `./route/${category}`;
    console.log("finding cat2:", category);
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
            console.log("route works"); // --> make cards, ho
            // createCardsSpecific(data);
        })
}

function createCardsSpecific( category ) {
    console.log("yes bitch") 
    for (var i = 0; i < category.length; i++) {
        var name = category[i].name;
        var card =  $(`<div class="card text-center" onclick="film()">
                            <img class="card-img-top img-padding" src="/images/cinema.png" alt="Film"/>
                            <div class="card-body">
                                <h5>`+ category[i].name +`</h5>
                            </div>
                        </div>) `)
        $(".specificcard").append(card)

        // card.click(cardclicked);


        
    }
}
