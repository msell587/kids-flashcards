// Every topic's flashcards, in one place. The topic pages, teacher pages and print page all read from here.
// "drawing" is an optional simple drawn picture (no photo licence needed), used by the print page.
const TOPICS = {
  animals: {
    title: "Animals",
    page: "animals.html",
    cards: [
      { word: "elephant", picture: "images/animals/elephant.jpg" },
      { word: "ant", picture: "images/animals/ant.jpg" },
      { word: "giraffe", picture: "images/animals/giraffe.jpg" },
      { word: "mouse", picture: "images/animals/mouse.jpg" },
      { word: "dog", picture: "images/animals/dog.jpg" },
      { word: "cat", picture: "images/animals/cat.jpg" },
      { word: "rabbit", picture: "images/animals/rabbit.jpg" },
      { word: "horse", picture: "images/animals/horse.jpg" },
      { word: "lion", picture: "images/animals/lion.jpg" },
      { word: "camel", picture: "images/animals/camel.jpg" },
      { word: "sheep", picture: "images/animals/sheep.jpg" }
    ]
  },
  colors: {
    title: "Colours",
    page: "colors.html",
    cards: [
      { word: "red", picture: "images/colors/red-apple.jpg", drawing: "images/colors/drawn/red.svg" },
      { word: "blue", picture: "images/colors/blue-towel.jpg", drawing: "images/colors/drawn/blue.svg" },
      { word: "green", picture: "images/colors/green-leaf.jpg", drawing: "images/colors/drawn/green.svg" },
      { word: "yellow", picture: "images/colors/yellow-banana.jpg", drawing: "images/colors/drawn/yellow.svg" },
      { word: "orange", picture: "images/colors/orange-orange.jpg", drawing: "images/colors/drawn/orange.svg" },
      { word: "purple", picture: "images/colors/purple-grapes.jpg", drawing: "images/colors/drawn/purple.svg" },
      { word: "pink", picture: "images/colors/pink-flower.jpg", drawing: "images/colors/drawn/pink.svg" },
      { word: "brown", picture: "images/colors/brown-bear.jpg", drawing: "images/colors/drawn/brown.svg" },
      { word: "black", picture: "images/colors/black-plate.jpg", drawing: "images/colors/drawn/black.svg" },
      { word: "white", picture: "images/colors/white-snow.jpg", drawing: "images/colors/drawn/white.svg" }
    ]
  },
  shapes: {
    title: "Shapes",
    page: "shapes.html",
    cards: [
      { word: "circle", picture: "images/shapes/circle.jpg", drawing: "images/shapes/drawn/circle.svg" },
      { word: "square", picture: "images/shapes/square.jpg", drawing: "images/shapes/drawn/square.svg" },
      { word: "triangle", picture: "images/shapes/triangle.jpg", drawing: "images/shapes/drawn/triangle.svg" },
      { word: "star", picture: "images/shapes/star.jpg", drawing: "images/shapes/drawn/star.svg" },
      { word: "heart", picture: "images/shapes/heart.jpg", drawing: "images/shapes/drawn/heart.svg" },
      { word: "diamond", picture: "images/shapes/diamond.jpg", drawing: "images/shapes/drawn/diamond.svg" },
      { word: "rectangle", picture: "images/shapes/rectangle.jpg", drawing: "images/shapes/drawn/rectangle.svg" },
      { word: "oval", picture: "images/shapes/oval.jpg", drawing: "images/shapes/drawn/oval.svg" }
    ]
  },
  house: {
    title: "My House",
    page: "house.html",
    cards: [
      { word: "house", picture: "images/house/house.jpg" },
      { word: "living room", picture: "images/house/livingroom.jpg" },
      { word: "dining room", picture: "images/house/diningroom.jpg" },
      { word: "bedroom", picture: "images/house/bedroom.jpg" },
      { word: "bathroom", picture: "images/house/bathroom.jpg" },
      { word: "kitchen", picture: "images/house/kitchen.jpg" },
      { word: "door", picture: "images/house/door.jpg" },
      { word: "floor", picture: "images/house/floor.jpg" },
      { word: "window", picture: "images/house/window.jpg" },
      { word: "garden", picture: "images/house/garden.jpg" },
      { word: "wall", picture: "images/house/wall.jpg" }
    ]
  },
  seasons: {
    title: "Seasons and Weather",
    page: "seasons and weather.html",
    cards: [
      { word: "summer", picture: "images/seasons and weather/summer.jpg" },
      { word: "winter", picture: "images/seasons and weather/winter.jpg" },
      { word: "spring", picture: "images/seasons and weather/spring.jpg" },
      { word: "autumn", picture: "images/seasons and weather/fall.jpg" },
      { word: "sunny", picture: "images/seasons and weather/sunny.jpg" },
      { word: "rainy", picture: "images/seasons and weather/rainy.jpg" },
      { word: "cloudy", picture: "images/seasons and weather/cloudy.jpg" },
      { word: "snowy", picture: "images/seasons and weather/snowy.jpg" },
      { word: "windy", picture: "images/seasons and weather/windy.jpg" }
    ]
  },
  city: {
    title: "City",
    page: "city.html",
    cards: [
      { word: "city", picture: "images/city/city.jpg" },
      { word: "street", picture: "images/city/street.jpg" },
      { word: "park", picture: "images/city/park.jpg" },
      { word: "playground", picture: "images/city/playground.jpg" },
      { word: "shop", picture: "images/city/shop.jpg" },
      { word: "school", picture: "images/city/school.jpg" },
      { word: "hospital", picture: "images/city/hospital.jpg" },
      { word: "bus", picture: "images/city/bus.jpg" },
      { word: "car", picture: "images/city/car.jpg" },
      { word: "traffic light", picture: "images/city/traffic-light.jpg" },
      { word: "bridge", picture: "images/city/bridge.jpg" }
    ]
  },
  christmas: {
    title: "Christmas",
    page: "christmas.html",
    cards: [
      { word: "Santa", picture: "images/christmas/santa.svg" },
      { word: "Christmas tree", picture: "images/christmas/christmas-tree.svg" },
      { word: "star", picture: "images/christmas/star.svg" },
      { word: "present", picture: "images/christmas/present.svg" },
      { word: "bell", picture: "images/christmas/bell.svg" },
      { word: "snowman", picture: "images/christmas/snowman.svg" },
      { word: "reindeer", picture: "images/christmas/reindeer.svg" },
      { word: "candle", picture: "images/christmas/candle.svg" },
      { word: "stocking", picture: "images/christmas/stocking.svg" },
      { word: "gingerbread man", picture: "images/christmas/gingerbread-man.svg" },
      { word: "snowflake", picture: "images/christmas/snowflake.svg" },
      { word: "candy cane", picture: "images/christmas/candy-cane.svg" }
    ]
  },
  garden: {
    title: "My Little Garden",
    page: "garden.html",
    // A card can also have video and crop: tapping the picture plays that part of the video (x, y, width, height in video pixels)
    cards: [
      { word: "flower", picture: "images/garden/flower.jpg" },
      { word: "tree", picture: "images/garden/tree.jpg" },
      { word: "leaf", picture: "images/garden/leaf.jpg" },
      { word: "seed", picture: "images/garden/seed.jpg" },
      { word: "grass", picture: "images/garden/grass.jpg" },
      { word: "butterfly", picture: "images/garden/butterfly.jpg" },
      { word: "bee", picture: "images/garden/bee.jpg" },
      { word: "ladybird", picture: "images/garden/ladybird.jpg" },
      { word: "snail", picture: "images/garden/snail.jpg" },
      { word: "worm", picture: "images/garden/worm.jpg" },
      { word: "watering can", picture: "images/garden/watering-can.jpg" },
      { word: "spade", picture: "images/garden/spade.jpg" }
    ]
  },
  madrid: {
    title: "Madrid",
    page: "madrid.html",
    cards: [
      { word: "Madrid", picture: "images/madrid/madrid.jpg" },
      { word: "Puerta del Sol", picture: "images/madrid/sol.jpg" },
      { word: "Cibeles", picture: "images/madrid/cibeles.jpg" },
      { word: "Retiro Park", picture: "images/madrid/retiro.jpg" },
      { word: "Bernabéu", picture: "images/madrid/bernabeu.jpg" }
    ]
  }
};

// Returns a shuffled copy of a list (used for the Shuffle button, the listening game and worksheets)
function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
