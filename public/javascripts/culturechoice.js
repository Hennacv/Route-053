$(document).ready(loadPage);

function loadPage(){
  $("#submit-options").click(submitter);
}

// $("#submit-options").on('click', submitter)

function submitter(e){
  // e.preventDefault(); // remove if whipe needed
  var options = { checkbox101: false, checkbox102: false, checkbox103: false };
  checker(options, decider);
}

function checker(options) {
  var checkboxes = $(".checky:checkbox");
  for(let i = 0; i < checkboxes.length; i++){

    options[checkboxes[i].id] = checkboxes[i].checked;
  }
  decider(options);
}

function decider(options){
  var first = options.checkbox101,
      second = options.checkbox102,
      third = options.checkbox103;
  if(first && second && third){
    console.log("display all 3");
    window.location.href = "./muschgal";
  } else if(first && !second && !third){
    console.log("first only");
    window.location.href = "./museum";
  } else if(first && second && !third){
    console.log("display first and second");
    window.location.href = "./musch";
  } else if(!first && second && !third){
    console.log("display second only");
    window.location.href = "./church";    
  } else if(!first && !second && third){
    console.log("display third only");
    window.location.href = "./gal";    
  } else if(first && !second && third){
    console.log("display first and third");
    window.location.href = "./musgal";    
  } else if(!first && second && third){
    console.log("display second and third");
    window.location.href = "./chgal";
  } else {
    console.log("nothing selected, idiot")
    //add red border around button
  }
}