
var i = 0, t = 2, g = 0, f = 0, finalists = [], zones, candidates;

//Filter the paths


// var
//     abc = [ zones.zone1.value, zones.zone2.value, zones.zone3.value, zones.zoneplaceholder18.value, zones.zone1.zone, zones.zone2.zone, zones.zone3.zone ],

//     bst = [ zones.zone2.value, zones.zone15.value, zones.zone16.value, zones.zoneplaceholder18.value, zones.zone2.zone, zones.zone15.zone, zones.zone16.zone ],

//     stur = [ zones.zone15.value, zones.zone16.value, zones.zone17.value, zones.zone14.value, zones.zone15.zone, zones.zone16.zone, zones.zone17.zone, zones.zone14.zone ],

//     rpo = [ zones.zone14.value, zones.zone13.value, zones.zone12.value, zones.zoneplaceholder18.value, zones.zone14.zone, zones.zone13.zone, zones.zone12.zone ],

//     opn = [ zones.zone12.value, zones.zone13.value, zones.zone11.value, zones.zoneplaceholder18.value, zones.zone12.zone, zones.zone13.zone, zones.zone11.zone ],

//     umn = [ zones.zone17.value, zones.zone10.value, zones.zone11.value, zones.zoneplaceholder18.value, zones.zone17.zone, zones.zone10.zone, zones.zone11.zone ],

//     clm = [ zones.zone3.value, zones.zone9.value, zones.zone10.value, zones.zoneplaceholder18.value, zones.zone3.zone, zones.zone9.zone, zones.zone10.zone ],

//     lkj = [ zones.zone9.value, zones.zone8.value, zones.zone7.value, zones.zoneplaceholder18.value, zones.zone9.zone, zones.zone8.zone, zones.zone7.zone ],

//     kfe = [ zones.zone8.value, zones.zone6.value, zones.zone5.value, zones.zoneplaceholder18.value, zones.zone8.zone, zones.zone6.zone, zones.zone5.zone ],

//     adfe = [ zones.zone1.value, zones.zone4.value, zones.zone6.value, zones.zone5.value, zones.zone1.zone, zones.zone4.zone, zones.zone6.zone, zones.zone5.zone ];

function getHighestVal(valueArray){
    console.log("valArr:", valueArray);
    var highestVal = 0, maxIndex = 0, arr = [];
    for( var i = 0; i < valueArray.length; i++ ) {
        if( valueArray[i] > highestVal && typeof valueArray[i] !== 'string' ) {
            highestVal = valueArray[i];
            arr.push( valueArray[i]);
        }
    }
    return arr;
};

function getZone(highestVal, zones){
    var newZone = 0;
    console.log(typeof(zones), zones);
    Object.keys(zones).forEach(function(zone) {
        if( zone.value === highestVal ) {
            newZone = zones[zone].zone;
        }
    });
    return newZone;
    // for( var i = 0; i < zoneArray.length; i++ ) {
    //     if( zoneArray[i].value === highestVal ) {
    //         zone = zoneArray[i].zone;
    //     }
    // }
    // return zone;
}

function getLetter(highestVal, zones){
    var letter = 0;
    Object.keys(zones).forEach(function(zone){
        if( zone.value === highestVal ){
            letter = zones[zone].letter;
        }
    })
    // for( var i = 0; i < zoneArray.length; i++ ){
    //     if( zoneArray[i].value === highestVal ){
    //         letter = zoneArray[i].letter;
    //     }
    // }
    return letter;
}

function sortCandidates(arr, zones){
    //this code sorts through the candidates looking for 'B' (value2)
    // return arr.filter(function(el){
    //     console.log("eval:", el.value1 === eval('zones.zone'+t+'.zone'));
    //     return ((el.value1 === eval('zones.zone'+t+'.zone') ||
    //             el.value2 === eval('zones.zone'+t+'.zone') ||
    //             el.value3 === eval('zones.zone'+t+'.zone') ||
    //             el.zonedotValue4 === eval('zones.zone'+t+'.zone')) &&
    //             el.zonedot !== "abc");
    //     }).map(function(el){
    //         return el.zonedot;
    //     }).sort();
    return arr.map(function(el){
        return el.zonedot;
    }).sort();
}

function determineFinalists(zones, candidates){
    zones = zones;
    candidates = candidates;
    console.log("Zones: ", zones);
    console.log("Candidates:", candidates);
    for ( i = 0; i < 20; i++ ) {

        console.log("looper:", i);
        var results = sortCandidates(candidates, zones);
        console.log("upper results:", results);
        var part3 = results.toString();
        finalists.push(part3)

        // delete the results from the options needed
        for (var i = 0; i < candidates.length; i++) {
            if( candidates[i].zonedot === results[0] ){
                candidates.splice( i, 1 );
            }
        }

        console.log("results:", results);
        // compares valueArray = results for the highest value and resturns it
        var highestVal = getHighestVal( results[results.length-1], zones );

        // return the correct zone
        var zone = getZone( highestVal[0], zones );
        var letter = getLetter( highestVal[0], zones );
        finalists.push(letter);

        var t = zone;

        // Makes value T unnatractive so the algorithm doesn't choose this path again
        zones.zone1.value = 0;
        zones.zone2.value = 0;
        zones.zone3.value = 0;
        // if('zone'+t) eval('zone'+t).value = 0;

        if ( t == 7 || t == 4 ) {
            break;
        }
    }
    console.log("decideZone:", finalists);
    return finalists;
}

// var coordinates = [
// { name: "a",      comparison: null,   theNumbers: ["6.89791,52.21983,0", "6.89786,52.21994,0", "6.8978,52.22005,0", "6.89773,52.22019,0", "6.89765,52.22031,0"] },
// { name: "b",      compariaon: null,   theNumbers: ["6.89795,52.21941,0", "6.89789,52.21938,0", "6.89756,52.2193,0", "6.8971,52.21921,0", "6.89676,52.21916,0", "6.89657,52.21914,0"] },
// { name: "c",      comparison: null,   theNumbers: ["6.89814,52.21948,0", "6.89838,52.21953,0"] },
// { name: "d",      comparison: null,   theNumbers: [1, 2, 3]   },
// { name: "e",      comparison: null,   theNumbers: ["6.89817,52.221,0", "6.8981,52.22108,0", "6.89799,52.22119,0", "6.8979,52.22126,0", "6.89781,52.22132,0", "6.89762,52.22143,0", "6.89742,52.22153,0", "6.897,52.22108,0", "6.8971,52.221,0", "6.89722,52.22091,0", "6.89732,52.2208,0", "6.89755,52.22049,0"] },
// { name: "f",      comparison: null,   theNumbers: ["6.89784,52.22072,0", "6.89775,52.22068,0", "6.89767,52.22064,0", "6.89763,52.22059,0", "6.89758,52.22054,0", "6.89755,52.22049,0"] },
// { name: "j",      comparison: null,   theNumbers: [1, 2, 3]   },
// { name: "k",      comparison: null,   theNumbers: ["6.89843,52.22073,0", "6.89857,52.22053,0"] },
// { name: "l",      comparison: null,   theNumbers: ["6.89881,52.22,0", "6.89876,52.22016,0", "6.89869,52.22032,0"] },
// { name: "m",      comparison: null,   theNumbers: ["6.89873,52.21897,0", "6.89877,52.21906,0", "6.89881,52.21918,0", "6.89883,52.21931,0"] },
// { name: "n",      comparison: null,   theNumbers: ["6.89845,52.21837,0", "6.89865,52.21868,0", "6.89867,52.21878,0"] },
// { name: "o",      comparison: null,   theNumbers: ["6.89924,52.218,0", "6.89947,52.21796,0", "6.89938,52.21775,0", "6.8991,52.21707,0", "6.89905,52.21695,0"] },
// { name: "p",      comparison: null,   theNumbers: "6.89773,52.21729,0" },
// { name: "r",      comparison: null,   theNumbers: ["6.89666,52.21777,0", "6.89657,52.2175,0", "6.89652,52.21736,0"] },
// { name: "s",      comparison: null,   theNumbers: ["6.89643,52.21816,0", "6.89627,52.21816,0", "6.89609,52.21816,0", "6.89587,52.21818,0", "6.89566,52.2182,0", "6.89547,52.21823,0", "6.89531,52.21827,0", "6.89476,52.21844,0", "6.89535,52.21877,0", "6.89543,52.21881,0", "6.89581,52.21898,0", "6.89604,52.21906,0"] },
// { name: "t",      comparison: null,   theNumbers: ["6.89658,52.21835,0", "6.89643,52.2187,0"] },
// { name: "u",      comparison: null,   theNumbers: ["6.89698,52.21822,0", "6.89738,52.21829,0", "6.89771,52.2184,0", "6.89813,52.21854,0", "6.89838,52.21866,0", "6.89851,52.21872,0", "6.8986,52.21879,0"] },
// { name: "abc",    comparison: 1,      theNumbers: "6.898,52.21944,0" },
// { name: "bst",    comparison: 2,      theNumbers: "6.89626,52.21909,0" },
// { name: "stur",   comparison: 1,      theNumbers: "6.89662,52.21817,0" },
// { name: "rpo",    comparison: 2,      theNumbers: "6.89766,52.21717,0" },
// { name: "opn",    comparison: 1,      theNumbers: "6.89832,52.21814,0" },
// { name: "umn",    comparison: 2,      theNumbers: "6.89868,52.21886,0" },
// { name: "clm",    comparison: 3,      theNumbers: "6.89884,52.21954,0" },
// { name: "lkj",    comparison: 2,      theNumbers: "6.89869,52.22032,0" },
// { name: "kfe",    comparison: 1,      theNumbers: "6.89829,52.22087,0" },
// { name: "adfe",   comparison: 2,      theNumbers: "6.8976,52.2204,0" },
// { name: "dEnd",   comparison: 1,      theNumbers: " blah" },
// { name: "jEnd",   comparison: 1,      theNumbers: " blah" }
// ];


// var finalcoordinates = [];

// var d=0;
// var i=0;
// for(var d = 0; d < finalists.length; d++){
// //console.log("length is " + finalists.length);
// //console.log("d is " + d);
// //while(d<1){
// var sorting = coordinates.filter(function (el) {
// return (el.name === finalists[i]);
// }).map(function(el) {
// return el.theNumbers;
// }).sort();

// var point1 = sorting.toString();
// //  console.log("point1 is " + point1);
// finalcoordinates.push(point1);


// var sorting = coordinates.filter(function (el) {
// return (el.name === (finalists[i]));
// }).map(function(el) {
// return el.comparison;
// }).sort();

// var ranking1 = sorting.toString();

// //  console.log("ranking is " + ranking1);



// var sorting = coordinates.filter(function (el) {
// return (el.name === finalists[i + 2]);
// }).map(function(el) {
// return el.theNumbers;
// }).sort();

// var point3 = sorting.toString();
// //  console.log("point2 is " + point3);



// var sorting = coordinates.filter(function (el) {
// return (el.name === (finalists[i + 2]));
// }).map(function(el) {
// return el.comparison;
// }).sort();

// var ranking2 = sorting.toString();

// //console.log("ranking is " + ranking2);

// var sorting = coordinates.filter(function (el) {
// return (el.name === (finalists[i + 1]));
// }).map(function(el) {
// if (ranking1 < ranking2) {
//   return el.theNumbers;
// } else {
//   return el.theNumbers.reverse();
// }
// }).sort();

// var betweenCoordinates = sorting;
// //  console.log(betweenCoordinates);
// //  console.log("between coordinates are " + betweenCoordinates)
// finalcoordinates.push(betweenCoordinates);
// //  console.log("point 3 is " + point3)
// //  finalcoordinates.push(point3);

// //d++
// d = d + 2;
// i = i + 2;


// }
// finalcoordinates.push(point3);

// console.log(finalcoordinates);