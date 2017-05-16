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

Data.prototype.build = function(data, locations) {
  locations.forEach(function(location) {
    data.locations.push(new Location(location));
  });
}

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

$(document).ready(function() {
  var data = new Data();
  data.build(data, locations);
  console.log(data);

  $('#add-location').submit(function(event) {
    event.preventDefault();

    var data = getFormData($('#add-location'));
    data = cleanAddInput(data);

  });

  data.locations.forEach(function(location, index) {
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
  });
});
