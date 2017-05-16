function Location (location),
  {
    this["name"]: location.name,
    this["address"]: location.address,
    this["phone-number]": location.phoneNumber,
    this["area"]: location.area,
    this["days"]: {
      "monday": {
        "start-time": location.monday.startTime,
        "end-time": location.monday.endTime,
      },
      "tuesday": {
        "start-time": location.tuesday.startTime,
        "end-time": location.tuesday.endTime
      },
      "wednesday": {
        "start-time": location.wednesday.startTime,
        "end-time": location.wednesday.endTime
      },
      "thursday": {
        "start-time": location.thursday.startTime,
        "end-time": location.thursday.endTime
      },
      "friday": {
        "start-time": location.friday.startTime,
        "end-time": location.friday.endTime
      },
      "saturday": {
        "start-time": location.saturday.startTime,
        "end-time": location.saturday.endTime
      },
      "sunday": {
        "start-time": location.sunday.startTime,
        "end-time": location.sunday.endTime
      }
    },
    this["has-food"]: location.hasFood,
    this["has-drink"]: location.hasDrink,
    this["other-amenities"]: {
      "outdoor-seating": location.other.outdoorSeating,
      "games": location.other.games,
      "trivia": location.other.trivia,
      "karaoke": location.other.karaoke,
      "pool": location.other.pool,
      "vegan-options": location.other.veganOptions,
      "gluten-free-options": location.other.glutenFreeOptions
    },
    this["link"]: location.link,
    this["pricing"]: location.pricing,
    this["description"]: location.description
  }
]
