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
  $('#add-location').submit(function(event) {
    event.preventDefault();

    var data = getFormData($('#add-location'));
    data = cleanAddInput(data);
    var location = new Location(data);
    console.log(location);

  });
});
