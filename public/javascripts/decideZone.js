var zone0 = {zone: '0', value: 0, letter: 'nah'};
var zone1 = {zone: '1', value: 3.1, letter: 'a'};
var zone2 = {zone: '2', value: 7.1, letter: 'b'};
var zone3 = {zone: '3', value: 8.1, letter: 'c'};
var zone4 = {zone: '4', value: 4.1, letter: 'd'};
var zone5 = {zone: '5', value: 2.1, letter: 'e'};
var zone6 = {zone: '6', value: 2.2, letter: 'f'};
var zone7 = {zone: '7', value: 3.2, letter: 'j'};
var zone8 = {zone: '8', value: 2.3, letter: 'k'};
var zone9 = {zone: '9', value: 6.1, letter: 'l'};
var zone10 = {zone: '10', value: 10, letter: 'm'};
var zone11 = {zone: '11', value: 4.2, letter: 'n'};
var zone12 = {zone: '12', value: 15, letter: 'o'};
var zone13 = {zone: '13', value: 4.3, letter: 'p'};
var zone14 = {zone: '14', value: 6.2, letter: 'r'};
var zone15 = {zone: '15', value: 8.2, letter: 's'};
var zone16 = {zone: '16', value: 5, letter: 't'};
var zone17 = {zone: '17', value: 7.2, letter: 'u'};
var zoneplaceholder18 = {zone: 'none', value: 0, letter: 'z'};

var zoneArray = [zone0, zone1, zone2, zone3, zone4, zone5, zone6, zone7, zone8, zone9, zone10, zone11, zone12, zone13, zone14, zone15, zone16, zone17];
var LetterArray = []

//Filter the paths
var candidates = [
{ zonedot: "abc", zonedotValue1: zone1.zone, zonedotValue2: zone2.zone, zonedotValue3: zone3.zone   },
{ zonedot: "bst", zonedotValue1: zone2.zone, zonedotValue2: zone15.zone, zonedotValue3: zone16.zone   },
{ zonedot: "stur", zonedotValue1: zone15.zone, zonedotValue2: zone16.zone, zonedotValue3: zone17.zone, zonedotValue4: zone14.zone  },
{ zonedot: "rpo", zonedotValue1: zone14.zone, zonedotValue2: zone13.zone, zonedotValue3: zone12.zone   },
{ zonedot: "opn", zonedotValue1: zone12.zone, zonedotValue2: zone13.zone, zonedotValue3: zone11.zone   },
{ zonedot: "umn", zonedotValue1: zone17.zone, zonedotValue2: zone10.zone, zonedotValue3: zone11.zone   },
{ zonedot: "clm", zonedotValue1: zone3.zone, zonedotValue2: zone9.zone, zonedotValue3: zone10.zone   },
{ zonedot: "lkj", zonedotValue1: zone9.zone, zonedotValue2: zone8.zone, zonedotValue3: zone7.zone   },
{ zonedot: "kfe", zonedotValue1: zone8.zone, zonedotValue2: zone6.zone, zonedotValue3: zone5.zone   },
{ zonedot: "adfe", zonedotValue1: zone1.zone, zonedotValue2: zone4.zone, zonedotValue3: zone6.zone, zonedotValue4: zone5.zone  },
];

//Varibles for the While Loop
var i= 0;
var t= 2;
var g= 0;
var f= 0;

//Final array containing the path taken (the end result I need)
var finalists = [];
// Function that pushes part3 (the answer) to our finalists array
function pushToFinalArray() {finalists.push(part3);}
// Function that pushes the pzth chosen to our finalists array
function pushLetterToFinalArray() {finalists.push(letter);}

// HIGHEST VALUE | Function that compares valueArray = Results for the highest value and resturns it
function getHighestVal(valueArray){
var highestVal = 0;
var maxIndex = 0;
for(var g = 0; g < valueArray.length; g++){
    if( valueArray[g] > highestVal && typeof valueArray[g] != 'string' ){
        highestVal = valueArray[g];
        var arr = [];
        arr.push( valueArray[g]);
    }
 }
 return arr;
};
//NEW CODE meant to return the correct zone
function getZone(value){
var zone = 0;
for(var h = 0; h < zoneArray.length; h++){
    if( zoneArray[h].value == highestVal ){
      zone = zoneArray[h].zone;
    }
 }
 return zone;
}
///////////////////////////////////////////////////
function getLetter(value){
var letter = 0;
for(var h = 0; h < zoneArray.length; h++){
    if( zoneArray[h].value == highestVal ){
      letter = zoneArray[h].letter;
    }
 }
 return letter;
}

//WHILE LOOP | The While loop begins
while ( i < 20 ) {

var
  abc = [zone1.value, zone2.value, zone3.value, zoneplaceholder18.value, zone1.zone, zone2.zone, zone3.zone],
  bst = [zone2.value, zone15.value, zone16.value, zoneplaceholder18.value, zone2.zone, zone15.zone, zone16.zone],
  stur = [zone15.value, zone16.value, zone17.value, zone14.value, zone15.zone, zone16.zone, zone17.zone, zone14.zone],
  rpo = [zone14.value, zone13.value, zone12.value, zoneplaceholder18.value, zone14.zone, zone13.zone, zone12.zone],
  opn = [zone12.value, zone13.value, zone11.value, zoneplaceholder18.value, zone12.zone, zone13.zone, zone11.zone],
  umn = [zone17.value, zone10.value, zone11.value, zoneplaceholder18.value, zone17.zone, zone10.zone, zone11.zone],
  clm = [zone3.value, zone9.value, zone10.value, zoneplaceholder18.value, zone3.zone, zone9.zone, zone10.zone],
  lkj = [zone9.value, zone8.value, zone7.value, zoneplaceholder18.value, zone9.zone, zone8.zone, zone7.zone],
  kfe = [zone8.value, zone6.value, zone5.value, zoneplaceholder18.value, zone8.zone, zone6.zone, zone5.zone],
  adfe = [zone1.value, zone4.value, zone6.value, zone5.value, zone1.zone, zone4.zone, zone6.zone, zone5.zone];

//FILTER CANDIDATES | This code sorts through the candidates looking for 'B' (value2)
var results = candidates.filter(function (el){

             return ((el.zonedotValue1 === eval('zone'+t+'.zone') ||
                      el.zonedotValue2 === eval('zone'+t+'.zone') ||
                      el.zonedotValue3 === eval('zone'+t+'.zone') ||
                      el.zonedotValue4 === eval('zone'+t+'.zone')) &&
                      el.zonedot !== "abc");
            }).map(function(el)
             {
               return el.zonedot;
             }).sort();
             var part3 = results.toString();

      // Function that pushes part3 (the answer) to our finalists array
      pushToFinalArray();

//DELETION OF RESULT FROM OPTIONS NEEDED
for (var j = 0; j < candidates.length; j++) {
    if( candidates[j].zonedot == results[0] ){
        candidates.splice( j, 1 );
    }
 }

//HIGHEST VALUE | Function that compares valueArray = Results for the highest value and resturns it
var highestVal = getHighestVal( window[results[results.length-1]] );
//NEW CODE meant to return the correct zone
var zone = getZone( highestVal[0] );
var letter = getLetter( highestVal[0] );
pushLetterToFinalArray();
var t = zone;

// Makes value T unnatractive so the algorithm doesn't choose this path again
zone1.value = 0;
zone2.value = 0;
zone3.value = 0;
eval('zone'+t).value = 0;

if ( t == 7 || t == 4 ) {
    break;
}
i++;

}
console.log(finalists);

var coordinates = [
{ name: "a",      comparison: null,   theNumbers: ["6.89791,52.21983,0", "6.89786,52.21994,0", "6.8978,52.22005,0", "6.89773,52.22019,0", "6.89765,52.22031,0"] },
{ name: "b",      compariaon: null,   theNumbers: ["6.89795,52.21941,0", "6.89789,52.21938,0", "6.89756,52.2193,0", "6.8971,52.21921,0", "6.89676,52.21916,0", "6.89657,52.21914,0"] },
{ name: "c",      comparison: null,   theNumbers: ["6.89814,52.21948,0", "6.89838,52.21953,0"] },
{ name: "d",      comparison: null,   theNumbers: [1, 2, 3]   },
{ name: "e",      comparison: null,   theNumbers: ["6.89817,52.221,0", "6.8981,52.22108,0", "6.89799,52.22119,0", "6.8979,52.22126,0", "6.89781,52.22132,0", "6.89762,52.22143,0", "6.89742,52.22153,0", "6.897,52.22108,0", "6.8971,52.221,0", "6.89722,52.22091,0", "6.89732,52.2208,0", "6.89755,52.22049,0"] },
{ name: "f",      comparison: null,   theNumbers: ["6.89784,52.22072,0", "6.89775,52.22068,0", "6.89767,52.22064,0", "6.89763,52.22059,0", "6.89758,52.22054,0", "6.89755,52.22049,0"] },
{ name: "j",      comparison: null,   theNumbers: [1, 2, 3]   },
{ name: "k",      comparison: null,   theNumbers: ["6.89843,52.22073,0", "6.89857,52.22053,0"] },
{ name: "l",      comparison: null,   theNumbers: ["6.89881,52.22,0", "6.89876,52.22016,0", "6.89869,52.22032,0"] },
{ name: "m",      comparison: null,   theNumbers: ["6.89873,52.21897,0", "6.89877,52.21906,0", "6.89881,52.21918,0", "6.89883,52.21931,0"] },
{ name: "n",      comparison: null,   theNumbers: ["6.89845,52.21837,0", "6.89865,52.21868,0", "6.89867,52.21878,0"] },
{ name: "o",      comparison: null,   theNumbers: ["6.89924,52.218,0", "6.89947,52.21796,0", "6.89938,52.21775,0", "6.8991,52.21707,0", "6.89905,52.21695,0"] },
{ name: "p",      comparison: null,   theNumbers: "6.89773,52.21729,0" },
{ name: "r",      comparison: null,   theNumbers: ["6.89666,52.21777,0", "6.89657,52.2175,0", "6.89652,52.21736,0"] },
{ name: "s",      comparison: null,   theNumbers: ["6.89643,52.21816,0", "6.89627,52.21816,0", "6.89609,52.21816,0", "6.89587,52.21818,0", "6.89566,52.2182,0", "6.89547,52.21823,0", "6.89531,52.21827,0", "6.89476,52.21844,0", "6.89535,52.21877,0", "6.89543,52.21881,0", "6.89581,52.21898,0", "6.89604,52.21906,0"] },
{ name: "t",      comparison: null,   theNumbers: ["6.89658,52.21835,0", "6.89643,52.2187,0"] },
{ name: "u",      comparison: null,   theNumbers: ["6.89698,52.21822,0", "6.89738,52.21829,0", "6.89771,52.2184,0", "6.89813,52.21854,0", "6.89838,52.21866,0", "6.89851,52.21872,0", "6.8986,52.21879,0"] },
{ name: "abc",    comparison: 1,      theNumbers: "6.898,52.21944,0" },
{ name: "bst",    comparison: 2,      theNumbers: "6.89626,52.21909,0" },
{ name: "stur",   comparison: 1,      theNumbers: "6.89662,52.21817,0" },
{ name: "rpo",    comparison: 2,      theNumbers: "6.89766,52.21717,0" },
{ name: "opn",    comparison: 1,      theNumbers: "6.89832,52.21814,0" },
{ name: "umn",    comparison: 2,      theNumbers: "6.89868,52.21886,0" },
{ name: "clm",    comparison: 3,      theNumbers: "6.89884,52.21954,0" },
{ name: "lkj",    comparison: 2,      theNumbers: "6.89869,52.22032,0" },
{ name: "kfe",    comparison: 1,      theNumbers: "6.89829,52.22087,0" },
{ name: "adfe",   comparison: 2,      theNumbers: "6.8976,52.2204,0" },
{ name: "dEnd",   comparison: 1,      theNumbers: " blah" },
{ name: "jEnd",   comparison: 1,      theNumbers: " blah" }
];


var finalcoordinates = [];

var d=0;
var i=0;
for(var d = 0; d < finalists.length; d++){
//console.log("length is " + finalists.length);
//console.log("d is " + d);
//while(d<1){
var sorting = coordinates.filter(function (el) {
return (el.name === finalists[i]);
}).map(function(el) {
return el.theNumbers;
}).sort();

var point1 = sorting.toString();
//  console.log("point1 is " + point1);
finalcoordinates.push(point1);


var sorting = coordinates.filter(function (el) {
return (el.name === (finalists[i]));
}).map(function(el) {
return el.comparison;
}).sort();

var ranking1 = sorting.toString();

//  console.log("ranking is " + ranking1);



var sorting = coordinates.filter(function (el) {
return (el.name === finalists[i + 2]);
}).map(function(el) {
return el.theNumbers;
}).sort();

var point3 = sorting.toString();
//  console.log("point2 is " + point3);



var sorting = coordinates.filter(function (el) {
return (el.name === (finalists[i + 2]));
}).map(function(el) {
return el.comparison;
}).sort();

var ranking2 = sorting.toString();

//console.log("ranking is " + ranking2);

var sorting = coordinates.filter(function (el) {
return (el.name === (finalists[i + 1]));
}).map(function(el) {
if (ranking1 < ranking2) {
  return el.theNumbers;
} else {
  return el.theNumbers.reverse();
}
}).sort();

var betweenCoordinates = sorting;
//  console.log(betweenCoordinates);
//  console.log("between coordinates are " + betweenCoordinates)
finalcoordinates.push(betweenCoordinates);
//  console.log("point 3 is " + point3)
//  finalcoordinates.push(point3);

//d++
d = d + 2;
i = i + 2;


}
finalcoordinates.push(point3);

console.log(finalcoordinates);