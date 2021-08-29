console.log("Inicia");

// from data.js
const tableData = data;

// get table references
let tbody = d3.select("tbody");

// get selection references
let selectDate = d3.select("#datetime");
let selectCity = d3.select("#city");
let selectState = d3.select("#state");
let selectCountry = d3.select("#country");
let selectShape = d3.select("#shape");


function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

function buildOptions(optionsArray,selector) {
  // First, clear out any existing data
  selector.html("");

  // Ad Any
  selector
      .append("option")
      .text("any")
      .property("value","any")

  // Next, loop through each object
  optionsArray.forEach((myOption) => {
    // Append an option to select
    selector
      .append("option")
      .text(myOption)
      .property("value",myOption)
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters.
function updateFilters() {
  // 4a. Save the element that was changed as a variable.
  let myElement = d3.select(this);
  console.log("myElement: ", myElement);

  // 4b. Save the value that was changed as a variable.

  let elementValue = myElement.property("value");
  console.log("elementValue: ", elementValue);

  // 4c. Save the id of the filter that was changed as a variable.
  let elementId = myElement.attr("id");
  console.log("elementId: ", elementId);

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue==="any") {
    delete filters[elementId];
  } else {
    filters[elementId] = elementValue;
  }

  console.log("filters: ",filters);
  // 6. Call function to apply all filters and rebuild the table
  filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key)) {
      const value = filters[key];
      filteredData = filteredData.filter((row) => row[key] === value);
    }
  }

  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}


myKeys = ["datetime","city","state","country","shape"]

let myOptions = {
  datetime:[],
  city:[],
  state:[],
  country:[],
  shape:[]
};

console.log(myOptions);

function createOptions(data) {

  // Loop through each object in the data
  data.forEach((dataRow) => {
    // Append each value
    myKeys.forEach(myKey => {
      myOptions[myKey].push(dataRow[myKey]);
    });
  });

  console.log(myOptions);

  myKeys.forEach(myKey => {
    // myOptions[myKey] = myOptions[myKey].filter(onlyUnique);
    myOptions[myKey] = [...new Set(myOptions[myKey])].sort();
  });

}

function buildAllOptions(){
  buildOptions(myOptions.datetime,selectDate);
  buildOptions(myOptions.city,selectCity);
  buildOptions(myOptions.state,selectState);
  buildOptions(myOptions.country,selectCountry);
  buildOptions(myOptions.shape,selectShape);
};

// 2. Attach an event to listen for changes to each filter
d3.selectAll(".myfilter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
createOptions(tableData);
console.log(myOptions);
buildAllOptions();
