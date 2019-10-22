// Adding listeners to the searchbar and button
window.onload = function(){
$("button").on('click', function(){
    searchWord = $("input").val();
    search();
});

$("input").on('keypress', function(event){
    if(event.which === 13){
        searchWord = $("input").val();
        search();
    }
});

// Building the table rows
$.getJSON("Javascript/Data/data.json", function(data){
    for(var i = 0; i < data.length; i++){
        let output = [];
        output.push(
            "<td>" + data[i].name + "</td>" + 
            "<td>" + data[i].phoneNumber + "</td>" + 
            "<td class='mobile'>" + data[i].email + "</td>" + 
            "<td>" + data[i].address + "</td>" + 
            "<td class='mobile'>" + data[i].zipcode + "</td>" + 
            "<td>" + data[i].city + "</td>");
        $("<tr/>",{
            "class": "addressRow",
            html: output.join("")
        }).appendTo("table");
        $(".mobile").addClass("d-none d-md-table-cell");
    }
});
}

// searchword variable for use in the getJSON function
var searchWord = "";
var limit = 5;

// Searchfunction , gets data from JSON file depending on the searchWord
function search(){
    $.getJSON("Javascript/Data/data.json", function(data){
        $(".addressRow").remove();
        for(var i = 0; i < limit; i++){
            // checking for the searchWord in the data[i] Object
            if((data[i].name).includes(searchWord)||
            (data[i].phoneNumber).includes(searchWord)||
            (data[i].email).includes(searchWord)||
            (data[i].address).includes(searchWord)||
            (data[i].zipcode).includes(searchWord)||
            (data[i].city).includes(searchWord)){
                // putting the data into td's and pushing that into a new array
                let output = [];
                output.push(
                    "<td>" + data[i].name + "</td>" + 
                    "<td>" + data[i].phoneNumber + "</td>" + 
                    "<td class='mobile'>" + data[i].email + "</td>" + 
                    "<td>" + data[i].address + "</td>" + 
                    "<td class='mobile'>" + data[i].zipcode + "</td>" + 
                    "<td>" + data[i].city + "</td>");
                $("<tr/>",{
                    "class": "addressRow",
                    html: output.join("")
                }).appendTo("table");
                $(".mobile").addClass("d-none d-md-table-cell");
                console.log("succes");
            } else{
                limit++;
            }
        }
    });
}

function mobileSwitch(){
    $(".mobile").addClass("d-none d-md-table-cell");
}

// Old Searchfunction; disables and enables rows depending on the searchword
// function search(){
//     for(i = 1; i < $("tr").length; i++){
//         var rowContent = $("tr")[i].textContent;
//         if(rowContent.includes(searchWord)){
//             $("tr")[i].style.display = "table-row";
//         } else {
//             $("tr")[i].style.display = "none";
//         }
//     }
// }

//https://randomuser.me/api/?results=1?inc=name,location,email,phone

getContact();

function getContact() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=1?inc=name,location,email,phone',
        dataType: 'json',
        success: function (data) {
            console.log(data.results[0].name);
            console.log(data.results[0].cell);
            console.log(data.results[0].email);
            console.log(data.results[0].location.street);
            console.log(data.results[0].location.postcode);
            console.log(data.results[0].location.city);
        }
    });
}
