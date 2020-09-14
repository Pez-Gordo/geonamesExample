// In the event of a click in the button with ID of #api we trigger an anonnymous function
$("#api").click(function () {
  
  // We store latitude and longitude values in the "dataToSend variable"
  var dataToSend = {
    lat: $("#selLat").val(),
    lng: $("#selLng").val(),
  };
  // Here starts our asynchronous JavaScript code, but instead of XML we are using JSON
  $.ajax({
    // Parameters
    url: "libs/php/functions.php",
    type: "POST",
    dataType: "json",
    data: dataToSend,
    // In case of success
    success: function (result) {

      console.log(result);

      if (result.status.name == "ok") {

        // We use the empty() method to erase any existing table
        $("#results").find("tbody").empty();

        // We loop the JSON and execute the iterate function on each item
        $.each(result, function (key, value) {
            $.each(value, iterate);
        });
        // The iterate function builds the table with the results
        function iterate(key, value) {
          if (value != null && typeof value == "object") {
            // Recurse into children
            $.each(value, iterate);
          } else {
            //Removes request info from JSON and adds to results table
            if (key !== "code" && key !== "name" && key !== "description" && key !== "returnedIn") {
              $("#results tbody").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
            }
          }
        }
      }
    },
    // In case of error...
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
});
