// Same as Week 14, Day 2, Activity 5 Exercise

let $tbody = document.querySelector("tbody");
let $stateInput = document.querySelector("#state");
let $searchBtn = document.querySelector("#search");

// Event Listener
$searchBtn.addEventListener("click", handleSearchButtonClick);

// filter by address 
let filteredAddresses = addressData;

// creat table
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];}}}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterstate = $stateInput.value.trim().toLowerCase();
  filteredAddresses = addressData.filter(function(address) {
    var addressstate = address.state.toLowerCase();
   
    return addressstate === filterstate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();