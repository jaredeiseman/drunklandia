//BUSINESS LOGIC CONSTRUCTORS
function Data (location) {
  this.locations = [];
}

function Location (location) {
  this["name"] = location.name;
  this["address"] = location.address;
  this["phone-number"] = location['phone-number'];
  this["area"] = location.area;
  this["hours"] = {
    "monday-start": location['hours']['monday-start'],
    "monday-end": location['hours']['monday-end'],
    "tuesday-start": location['hours']['tuesday-start'],
    "tuesday-end": location['hours']['tuesday-end'],
    "wednesday-start": location['hours']['wednesday-start'],
    "wednesday-end": location['hours']['wednesday-end'],
    "thursday-start": location['hours']['thursday-start'],
    "thursday-end": location['hours']['thursday-end'],
    "friday-start": location['hours']['friday-start'],
    "friday-end": location['hours']['friday-end'],
    "saturday-start": location['hours']['saturday-start'],
    "saturday-end": location['hours']['saturday-end'],
    "sunday-start": location['hours']['sunday-start'],
    "sunday-end": location['hours']['sunday-end']
  };
  this["has-food"] = location['has-food'],
  this["has-drink"] = location['has-drink'],
  this["other-amenities"] = location['other-amenities'];
  this["link"] = location['link'];
  this["pricing"] = location['pricing'];
  this["description"] = location['description'];
}

//BUSINESS LOGIC PROTOTYPE METHODS
Data.prototype.build = function(data, locations) {
  locations.forEach(function(location) {
    data.locations.push(new Location(location));
  });
}

String.prototype.convertTime = function() {
  var showtime = parseInt(this);
  if (showtime >= 2500) {
    showtime = showtime - 2400;
    showtime = showtime.toString();
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "am";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "am";
    }
    return showtime;
  } else if (showtime >= 2400) {
    showtime = showtime - 1200;
    showtime = showtime.toString();
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "am";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "am";
    }
    return showtime;
  } else if (showtime > 1300) {
    showtime = showtime - 1200;
    showtime = showtime.toString();
    //cut off the last 2 characters of the string and save them in endOfString variable
    //the beginning of the string + ":" + endOfString + "pm"
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "pm";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "pm";
    }
    return showtime;
  } else if (showtime === 1300) {
    showtime = showtime - 1200;
    showtime = showtime.toString();
    //cut off the last 2 characters of the string and save them in endOfString variable
    //the beginning of the string + ":" + endOfString + "pm"
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "pm";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "pm";
    }
    return showtime;
  } else if (showtime >= 1200 && showtime <= 1300) {
    showtime = showtime.toString();
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "pm";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "pm";
    }
    return showtime;
  } else {
    showtime = showtime.toString();
    var endOfString = showtime.slice(-2);
    if (showtime.length === 3) {
      showtime = showtime.substr(0, 1) + ":" + endOfString + "am";
    } else {
      showtime = showtime.substr(0, 2) + ":" + endOfString + "am";
    }
    return showtime;
  }
}

function intersect (arr1, arr2) {
  var result = [];
  arr1.forEach(function(obj1) {
    arr2.forEach(function(obj2) {
      if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        result.push(obj2);
      }
    });
  });
  return result;
}

function removeDuplicates(arr, prop) {
     var new_arr = [];
     var lookup  = {};
     for (var i in arr) {
         lookup[arr[i][prop]] = arr[i];
     }
     for (i in lookup) {
         new_arr.push(lookup[i]);
     }
     return new_arr;
 }

Data.prototype.filterResultsFromForm = function(form) {
  var formData = getFilterFormData(form);
  var toDisplay = [];
  var areasArray = [];
  var pricingsArray = [];
  var amenitiesArray = [];
  var arr1 = [];

  formData.areas.forEach(function(area) {
    locations.forEach(function(location) {
      if (area === location.area) {
        areasArray.push(location);
      }
    });
  });

  formData.pricings.forEach(function(pricing) {
    locations.forEach(function(location) {
      if (pricing === location.pricing) {
        pricingsArray.push(location);
      }
    });
  });

  formData['other-amenities'].forEach(function(amenity) {
    locations.forEach(function(location) {
      if (location['other-amenities'].includes(amenity)) {
        amenitiesArray.push(location);
      }
    });
  });

  amenitiesArray = removeDuplicates(amenitiesArray, "name");

  var counter = 0;
  var thing = [];
  amenitiesArray.forEach(function(amenity, index2) {
    formData['other-amenities'].forEach(function(amenityTest, index) {
      if (amenity['other-amenities'].includes(amenityTest)) {
        counter++;
      }
      if (index + 1 === formData['other-amenities'].length) {
        if (counter === formData['other-amenities'].length) {
          thing.push(amenity);
        }
        counter = 0;
      }
    });
  });

  amenitiesArray = thing;

  if (areasArray.length > 0 && pricingsArray.length > 0 && amenitiesArray.length > 0) {
    arr1 = intersect(areasArray, pricingsArray);
    toDisplay = intersect(arr1, amenitiesArray);
  } else if (areasArray.length > 0 && pricingsArray.length > 0) {
    toDisplay = intersect(areasArray, pricingsArray);
  } else if (pricingsArray.length > 0 && amenitiesArray.length > 0) {
    toDisplay = intersect(pricingsArray, amenitiesArray);
  } else if (amenitiesArray.length > 0 && areasArray.length > 0) {
    toDisplay = intersect(amenitiesArray, areasArray);
  } else if (areasArray.length > 0) {
    toDisplay = areasArray;
  } else if (pricingsArray.length > 0) {
    toDisplay = pricingsArray;
  } else if (amenitiesArray.length > 0) {
    toDisplay = intersect(amenitiesArray, amenitiesArray);
  }

  if (formData.hour !== "") {
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    var thing2 = [];
    // console.log(formData.hour);
    days.forEach(function(day) {
      toDisplay.forEach(function(location) {
        if (formData.hour >= location.hours[day + '-start'] && formData.hour <= location.hours[day + '-end']) {
          thing2.push(location);
        }
      });
    });
    toDisplay = removeDuplicates(thing2, 'name');
  }

  return toDisplay;
}

//BUSINESS LOGIC FUNCTIONS
function cleanAddInput (data) {
  var amenities = ['outdoor-seating', 'games', 'trivia', 'karaoke', 'pool', 'vegan-options', 'gluten-free-options'];
  var list = [];

  var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  var hoursObj = {};
  var name = '';

  for (var i = 0; i < days.length; i++) {
    name = days[i] + '-start';
    hoursObj[name] = data[name];
    delete data[name];
    name = days[i] + '-end';
    hoursObj[name] = data[name];
    delete data[name];
  }
  data['hours'] = hoursObj;

  for (var i = 0; i < amenities.length; i++) {
    if (data[amenities[i]]) {
      list.push(data[amenities[i]]);
      delete data[amenities[i]];
    }
  }
  data['other-amenities'] = list;
  return data;
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function getFilterFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {
    areas: [],
    pricings: [],
    "other-amenities": [],
    hour: ''
  };

  $.map(unindexed_array, function(n, i){
    if (n['name'] === 'area') {
      indexed_array.areas.push(n['value']);
    }
    if (n['name'] === 'other-amenities') {
      indexed_array['other-amenities'].push(n['value']);
    }
    if (n['name'] === 'pricing') {
      indexed_array.pricings.push(n['value']);
    }
    if(n['name'] === 'hour') {
      indexed_array.hour = n['value'];
    }
  });

  return indexed_array;
}

//UI LOGIC
$(document).ready(function() {
  //UI Functions
  function displayData (locations) {
    locations.forEach(function(location, index) {
      $('#location-results').append('<tr id="item-' + index + '"class="location-panel">' +
        '<td class="food-drink">' + //conditional image
        '</td>' +
        '<td class="food-drink">' + //conditional image
        '</td>' +
        '<td class="name"><span>' + location.name + '</span>' +
        '</td>' +
        '<td class="price">' + //conditional dollar signs
        '</td>' +
        '<td class="area">' + location.area.toUpperCase() +
        '</td>' +
        '<td class="amenities">' + //conditional images for amenities
        '</td>' +
        '</tr>');
      if (location['has-drink'] === true) {
        $('#item-' + index + ' .food-drink').first().append('<img src="img/drinkicon.ico" class="img-responsive" alt="" />');
      }
      if (location['has-food'] === true) {
        $('#item-' + index + ' .food-drink').last().append('<img src="img/foodicon.png" class="img-responsive" alt="" />');
      }
      switch(location.pricing) {
        case 'low':
          $('.price').last().text('$');
          break;
        case 'medium':
          $('.price').last().text('$$');
          break;
        case 'high':
          $('.price').last().text('$$$');
          break;
        default:
          break;
      }

      location['other-amenities'].forEach(function(amenity) {
        if (amenity) {
          $('.amenities').last().append('<img src="img/' + amenity + '.png"  alt="" />');
        }
      });

      $('#item-' + index).click(function() {
        $('#detailed-description').modal('show')
        $("#detailed-location-name").text(location.name);
        $("#address-span").text(location.address);
        $("#phone-span").text(location['phone-number']);
        resetModal();
        $("#menu-link").append('<a href="' + location['link'] + '">Menu Link</a>');
        $("#deal").text("Deal: " + location['description']);
        $("#deal").text("Deal: " + location['description']);

        if (location['hours']['monday-start'] != "") {
          $("#schedule").append("<li>" + "M: " + location['hours']['monday-start'].convertTime() + " - " + location['hours']['monday-end'].convertTime() + "</li>")
        }
        if (location['hours']['tuesday-start'] != "") {
          $("#schedule").append("<li>" + "T: " + location['hours']['tuesday-start'].convertTime() + " - " + location['hours']['tuesday-end'].convertTime() + "</li>")
        }
        if (location['hours']['wednesday-start'] != "") {
          $("#schedule").append("<li>" + "W: " + location['hours']['wednesday-start'].convertTime() + " - " + location['hours']['wednesday-end'].convertTime() + "</li>")
        }
        if (location['hours']['thursday-start'] != "") {
          $("#schedule").append("<li>" + "Th: " + location['hours']['thursday-start'].convertTime() + " - " + location['hours']['thursday-end'].convertTime() + "</li>")
        }
        if (location['hours']['friday-start'] != "") {
          $("#schedule").append("<li>" + "F: " + location['hours']['friday-start'].convertTime() + " - " + location['hours']['friday-end'].convertTime() + "</li>")
        }
        if (location['hours']['saturday-start'] != "") {
          $("#schedule").append("<li>" + "Sat: " + location['hours']['saturday-start'].convertTime() + " - " + location['hours']['saturday-end'].convertTime() + "</li>")
        }
        if (location['hours']['sunday-start'] != "") {
          $("#schedule").append("<li>" + "Sun: " + location['hours']['sunday-start'].convertTime() + " - " + location['hours']['sunday-end'].convertTime() + "</li>")
        }
      });
    });
  }

  function resetModal() {
    $("#menu-link").empty();
    $("#schedule").empty();
  }

  var data = new Data();
  data.build(data, locations);

  displayData(data.locations);

  $('#filter-form').submit(function(event) {
    event.preventDefault();
    var toDisplay = data.filterResultsFromForm($(this));
    $('#location-results').empty();
    if (toDisplay.length !== 0) {
      displayData(toDisplay);
    } else {
      $('#main-content').append('<h2 class="text-center lead">There are no locations that match your search criteria</h2>');
    }
  });

  $('#add-location').submit(function(event) {
    event.preventDefault();
    var formData = getFormData($('#add-location'));
    formData = cleanAddInput(formData);
    formData = new Location(formData);

    data.locations.push(formData);

    $("#results-content").show();
    $('#key').show();
    $("#addLocationForm").hide();
    $('#location-results').empty();
    displayData(data.locations);
    $('#add-location').find('input, select').each(function() {
      $(this).val("");
      $(this).prop('checked', false);
    });
  });

  $("#add-location-button").click(function() {
    $("#results-content").hide();
    $('#key').hide();
    $("#addLocationForm").show();
  });
});
