// Every topic's flashcards, in one place. The topic pages, teacher pages and print page all read from here.
// "drawing" is an optional simple drawn picture (no photo licence needed), used by the print page.
const TOPICS = {
  animals: {
    title: "Animals",
    page: "animals.html",
    cards: [
      { word: "elephant", es: "elefante", picture: "images/animals/elephant.jpg" },
      { word: "pig", es: "cerdo", picture: "images/animals/pig.jpg" },
      { word: "giraffe", es: "jirafa", picture: "images/animals/giraffe.jpg" },
      { word: "mouse", es: "ratón", picture: "images/animals/mouse.jpg" },
      { word: "dog", es: "perro", picture: "images/animals/dog.jpg" },
      { word: "cat", es: "gato", picture: "images/animals/cat.jpg" },
      { word: "rabbit", es: "conejo", picture: "images/animals/rabbit.jpg" },
      { word: "horse", es: "caballo", picture: "images/animals/horse.jpg" },
      { word: "lion", es: "león", picture: "images/animals/lion.jpg" },
      { word: "cow", es: "vaca", picture: "images/animals/cow.jpg" },
      { word: "sheep", es: "oveja", picture: "images/animals/sheep.jpg" },
      { word: "hen", es: "gallina", picture: "images/animals/hen.jpg" }
    ]
  },
  colors: {
    title: "Colours",
    page: "colors.html",
    cards: [
      { word: "red", es: "rojo", picture: "images/colors/red.jpg", drawing: "images/colors/drawn/red.svg" },
      { word: "blue", es: "azul", picture: "images/colors/blue.jpg", drawing: "images/colors/drawn/blue.svg" },
      { word: "green", es: "verde", picture: "images/colors/green.jpg", drawing: "images/colors/drawn/green.svg" },
      { word: "yellow", es: "amarillo", picture: "images/colors/yellow.jpg", drawing: "images/colors/drawn/yellow.svg" },
      { word: "orange", es: "naranja", picture: "images/colors/orange.jpg", drawing: "images/colors/drawn/orange.svg" },
      { word: "purple", es: "morado", picture: "images/colors/purple.jpg", drawing: "images/colors/drawn/purple.svg" },
      { word: "pink", es: "rosa", picture: "images/colors/pink.jpg", drawing: "images/colors/drawn/pink.svg" },
      { word: "brown", es: "marrón", picture: "images/colors/brown.jpg", drawing: "images/colors/drawn/brown.svg" },
      { word: "black", es: "negro", picture: "images/colors/black.jpg", drawing: "images/colors/drawn/black.svg" },
      { word: "white", es: "blanco", picture: "images/colors/white.jpg", drawing: "images/colors/drawn/white.svg" },
      { word: "grey", es: "gris", picture: "images/colors/grey.jpg" },
      { word: "turquoise", es: "turquesa", picture: "images/colors/turquoise.jpg" }
    ]
  },
  shapes: {
    title: "Shapes",
    page: "shapes.html",
    cards: [
      { word: "circle", es: "círculo", picture: "images/shapes/circle.jpg", drawing: "images/shapes/drawn/circle.svg" },
      { word: "square", es: "cuadrado", picture: "images/shapes/square.jpg", drawing: "images/shapes/drawn/square.svg" },
      { word: "triangle", es: "triángulo", picture: "images/shapes/triangle.jpg", drawing: "images/shapes/drawn/triangle.svg" },
      { word: "star", es: "estrella", picture: "images/shapes/star.jpg", drawing: "images/shapes/drawn/star.svg" },
      { word: "heart", es: "corazón", picture: "images/shapes/heart.jpg", drawing: "images/shapes/drawn/heart.svg" },
      { word: "diamond", es: "rombo", picture: "images/shapes/diamond.jpg", drawing: "images/shapes/drawn/diamond.svg" },
      { word: "rectangle", es: "rectángulo", picture: "images/shapes/rectangle.jpg", drawing: "images/shapes/drawn/rectangle.svg" },
      { word: "oval", es: "óvalo", picture: "images/shapes/oval.jpg", drawing: "images/shapes/drawn/oval.svg" }
    ]
  },
  house: {
    title: "My House",
    page: "house.html",
    cards: [
      { word: "house", es: "casa", picture: "images/house/house.jpg" },
      { word: "living room", es: "salón", picture: "images/house/livingroom.jpg" },
      { word: "dining room", es: "comedor", picture: "images/house/diningroom.jpg" },
      { word: "bedroom", es: "dormitorio", picture: "images/house/bedroom.jpg" },
      { word: "bathroom", es: "baño", picture: "images/house/bathroom.jpg" },
      { word: "kitchen", es: "cocina", picture: "images/house/kitchen.jpg" },
      { word: "door", es: "puerta", picture: "images/house/door.jpg" },
      { word: "floor", es: "suelo", picture: "images/house/floor.jpg" },
      { word: "window", es: "ventana", picture: "images/house/window.jpg" },
      { word: "garden", es: "jardín", picture: "images/house/garden.jpg" },
      { word: "wall", es: "pared", picture: "images/house/wall.jpg" },
      { word: "terrace", es: "terraza", picture: "images/house/terrace.jpg" }
    ]
  },
  seasons: {
    title: "Seasons",
    page: "seasons.html",
    cards: [
      { word: "summer", es: "verano", picture: "images/seasons and weather/summer.jpg" },
      { word: "winter", es: "invierno", picture: "images/seasons and weather/winter.jpg" },
      { word: "spring", es: "primavera", picture: "images/seasons and weather/spring.jpg" },
      { word: "autumn", es: "otoño", picture: "images/seasons and weather/autumn.jpg" }
    ]
  },
  weather: {
    title: "Weather",
    page: "weather.html",
    cards: [
      // picture: the flashcard photo. picture2: a second photo of the same weather, used in the games
      { word: "sunny", es: "soleado", picture: "images/seasons and weather/sunny.jpg", picture2: "images/seasons and weather/sunny-2.jpg" },
      { word: "rainy", es: "lluvioso", picture: "images/seasons and weather/rainy.jpg", picture2: "images/seasons and weather/rainy-2.jpg" },
      { word: "cloudy", es: "nublado", picture: "images/seasons and weather/cloudy.jpg", picture2: "images/seasons and weather/cloudy-2.jpg" },
      { word: "snowy", es: "nevado", picture: "images/seasons and weather/snowy.jpg", picture2: "images/seasons and weather/snowy-2.jpg" },
      { word: "windy", es: "ventoso", picture: "images/seasons and weather/windy.jpg", picture2: "images/seasons and weather/windy-2.jpg" },
      { word: "stormy", es: "tormentoso", picture: "images/seasons and weather/stormy.jpg", picture2: "images/seasons and weather/stormy-2.jpg" },
      { word: "hot", es: "caliente", picture: "images/seasons and weather/hot.jpg", picture2: "images/seasons and weather/hot-2.jpg" },
      { word: "cold", es: "frío", picture: "images/seasons and weather/cold.jpg", picture2: "images/seasons and weather/cold-2.jpg" }
    ]
  },
  opposites: {
    title: "Opposites",
    page: "opposites.html",
    // Each pair is shown together on one card: the two words are opposites of each other
    pairs: [
      ["wet", "dry"],
      ["hot", "cold"],
      ["happy", "sad"],
      ["big", "small"],
      ["up", "down"],
      ["open", "closed"],
      ["fast", "slow"],
      ["full", "empty"],
      ["light", "dark"],
      ["in", "out"]
    ],
    cards: [
      { word: "wet", es: "mojado", picture: "images/seasons and weather/wet.jpg" },
      { word: "dry", es: "seco", picture: "images/seasons and weather/dry.jpg" },
      { word: "hot", es: "caliente", picture: "images/seasons and weather/hot.jpg" },
      { word: "cold", es: "frío", picture: "images/seasons and weather/cold.jpg" },
      { word: "happy", es: "feliz", picture: "images/feelings/happy.jpg" },
      { word: "sad", es: "triste", picture: "images/feelings/sad.jpg" },
      { word: "big", es: "grande", picture: "images/opposites/big.jpg" },
      { word: "small", es: "pequeño", picture: "images/opposites/small.jpg" },
      { word: "up", es: "arriba", picture: "images/opposites/up.jpg" },
      { word: "down", es: "abajo", picture: "images/opposites/down.jpg" },
      { word: "open", es: "abierto", picture: "images/opposites/open.jpg" },
      { word: "closed", es: "cerrado", picture: "images/opposites/closed.jpg" },
      { word: "fast", es: "rápido", picture: "images/opposites/fast.jpg" },
      { word: "slow", es: "lento", picture: "images/opposites/slow.jpg" },
      { word: "full", es: "lleno", picture: "images/opposites/full.jpg" },
      { word: "empty", es: "vacío", picture: "images/opposites/empty.jpg" },
      { word: "light", es: "claro", picture: "images/opposites/light.jpg" },
      { word: "dark", es: "oscuro", picture: "images/opposites/dark.jpg" },
      { word: "in", es: "dentro", picture: "images/opposites/in.jpg" },
      { word: "out", es: "fuera", picture: "images/opposites/out.jpg" }
    ]
  },
  city: {
    title: "City",
    page: "city.html",
    cards: [
      { word: "city", es: "ciudad", picture: "images/city/city.jpg" },
      { word: "street", es: "calle", picture: "images/city/street.jpg" },
      { word: "park", es: "parque", picture: "images/city/park.jpg" },
      { word: "playground", es: "parque infantil", picture: "images/city/playground.jpg" },
      { word: "shop", es: "tienda", picture: "images/city/shop.jpg" },
      { word: "school", es: "colegio", picture: "images/city/school.jpg" },
      { word: "hospital", es: "hospital", picture: "images/city/hospital.jpg" },
      { word: "bus", es: "autobús", picture: "images/city/bus.jpg" },
      { word: "car", es: "coche", picture: "images/city/car.jpg" },
      { word: "traffic light", es: "semáforo", picture: "images/city/traffic-light.jpg" },
      { word: "bridge", es: "puente", picture: "images/city/bridge.jpg" },
      { word: "train", es: "tren", picture: "images/city/train.jpg" }
    ]
  },
  christmas: {
    title: "Christmas",
    page: "christmas.html",
    cards: [
      { word: "Santa", es: "Papá Noel", picture: "images/christmas/santa.jpg" },
      { word: "Christmas tree", es: "árbol de Navidad", picture: "images/christmas/christmas-tree.jpg" },
      { word: "star", es: "estrella", picture: "images/christmas/star.jpg" },
      { word: "present", es: "regalo", picture: "images/christmas/present.jpg" },
      { word: "bell", es: "campana", picture: "images/christmas/bell.jpg" },
      { word: "snowman", es: "muñeco de nieve", picture: "images/christmas/snowman.jpg" },
      { word: "reindeer", es: "reno", picture: "images/christmas/reindeer.jpg" },
      { word: "candle", es: "vela", picture: "images/christmas/candle.jpg" },
      { word: "stocking", es: "calcetín", picture: "images/christmas/stocking.jpg" },
      { word: "gingerbread man", es: "hombre de jengibre", picture: "images/christmas/gingerbread-man.jpg" },
      { word: "snowflake", es: "copo de nieve", picture: "images/christmas/snowflake.jpg" },
      { word: "candy cane", es: "bastón de caramelo", picture: "images/christmas/candy-cane.jpg" }
    ]
  },
  garden: {
    title: "My Little Garden",
    page: "garden.html",
    // A card can also have video and crop: tapping the picture plays that part of the video (x, y, width, height in video pixels)
    cards: [
      { word: "flower", es: "flor", picture: "images/garden/flower.jpg" },
      { word: "tree", es: "árbol", picture: "images/garden/tree.jpg" },
      { word: "leaf", es: "hoja", picture: "images/garden/leaf.jpg" },
      { word: "seed", es: "semilla", picture: "images/garden/seed.jpg" },
      { word: "grass", es: "hierba", picture: "images/garden/grass.jpg" },
      { word: "watering can", es: "regadera", picture: "images/garden/watering-can.jpg" },
      { word: "spade", es: "pala", picture: "images/garden/spade.jpg" },
      { word: "apple", es: "manzana", food: true, picture: "images/autumn-guess/apple.jpg" },
      { word: "banana", es: "plátano", food: true, picture: "images/colors/yellow-banana.jpg" },
      { word: "grapes", es: "uvas", food: true, picture: "images/colors/purple-grapes.jpg" },
      { word: "orange", es: "naranja", food: true, picture: "images/colors/orange-orange.jpg" },
      { word: "strawberry", es: "fresa", food: true, picture: "images/garden/strawberry.jpg" },
      { word: "carrot", es: "zanahoria", food: true, picture: "images/garden/carrot.jpg" },
      { word: "tomato", es: "tomate", food: true, picture: "images/garden/tomato.jpg" },
      { word: "cucumber", es: "pepino", food: true, picture: "images/garden/cucumber.jpg" },
      { word: "potato", es: "patata", food: true, picture: "images/garden/potato.jpg" }
    ]
  },
  explorers: {
    title: "Animal Explorers",
    page: "explorers.html",
    // Insects and bugs (minibeasts). "insect" is true for insects: six legs and three body parts.
    // "moves" are the action words that fit the creature (see the What Can It Do? game).
    cards: [
      { word: "butterfly", es: "mariposa", insect: true, moves: ["fly"], picture: "images/garden/butterfly.jpg" },
      { word: "bee", es: "abeja", insect: true, moves: ["fly", "buzz"], picture: "images/garden/bee.jpg" },
      { word: "ladybird", es: "mariquita", insect: true, moves: ["walk", "crawl", "fly"], picture: "images/garden/ladybird.jpg" },
      { word: "ant", es: "hormiga", insect: true, moves: ["walk", "crawl"], picture: "images/explorers/ant.jpg" },
      { word: "dragonfly", es: "libélula", insect: true, moves: ["fly"], picture: "images/explorers/dragonfly.jpg" },
      { word: "grasshopper", es: "saltamontes", insect: true, moves: ["jump", "climb"], picture: "images/explorers/grasshopper.jpg" },
      { word: "beetle", es: "escarabajo", insect: true, moves: ["walk", "crawl"], picture: "images/explorers/beetle.jpg" },
      { word: "caterpillar", es: "oruga", insect: true, moves: ["crawl", "climb"], picture: "images/explorers/caterpillar.jpg" },
      { word: "snail", es: "caracol", insect: false, moves: ["slide", "crawl"], picture: "images/garden/snail.jpg" },
      { word: "worm", es: "gusano", insect: false, moves: ["wriggle"], picture: "images/garden/worm.jpg" },
      { word: "spider", es: "araña", insect: false, moves: ["climb", "walk"], picture: "images/explorers/spider.jpg" }
    ]
  },
  transport: {
    title: "On the Move",
    page: "transport.html",
    // Vehicles for the grammar lessons: singular and plural, this and that, its and they're (see the teacher guide)
    // "plural" is the plural word; "size" (small, medium, big), "speed" (slow, fast) and "wheels" are used by the On the Move games
    cards: [
      { word: "car", es: "coche", plural: "cars", size: "medium", speed: "fast", wheels: true, picture: "images/city/car.jpg" },
      { word: "bus", es: "autobús", plural: "buses", size: "big", wheels: true, picture: "images/city/bus.jpg" },
      { word: "train", es: "tren", plural: "trains", size: "big", speed: "fast", wheels: true, picture: "images/city/train.jpg" },
      { word: "taxi", es: "taxi", plural: "taxis", size: "medium", speed: "fast", wheels: true, picture: "images/transport/taxi.jpg" },
      { word: "truck", es: "camión", plural: "trucks", size: "big", speed: "slow", wheels: true, picture: "images/transport/truck.jpg" },
      { word: "aeroplane", es: "avión", plural: "aeroplanes", size: "big", speed: "fast", wheels: false, picture: "images/transport/aeroplane.jpg" },
      { word: "helicopter", es: "helicóptero", plural: "helicopters", size: "medium", speed: "fast", wheels: false, picture: "images/transport/helicopter.jpg" },
      { word: "boat", es: "barco", plural: "boats", size: "medium", speed: "slow", wheels: false, picture: "images/transport/boat.jpg" },
      { word: "motorcycle", es: "moto", plural: "motorcycles", size: "small", speed: "fast", wheels: true, picture: "images/transport/motorcycle.jpg" },
      { word: "bicycle", es: "bicicleta", plural: "bicycles", size: "small", speed: "slow", wheels: true, picture: "images/transport/bicycle.jpg" },
      { word: "scooter", es: "patinete", plural: "scooters", size: "small", speed: "slow", wheels: true, picture: "images/transport/scooter.jpg" }
    ]
  },
  community: {
    title: "Community Helpers",
    page: "community.html",
    // "is" is "He/She is a ...", "doing" is the present continuous, "does" answers "What does a ... do?"
    cards: [
      { word: "doctor", es: "médica", picture: "images/community-helpers/doctor.jpg", is: "She is a doctor.", doing: "She is helping sick people.", does: "A doctor helps sick people." },
      { word: "teacher", es: "profesor", picture: "images/community-helpers/teacher.jpg", is: "He is a teacher.", doing: "He is teaching children.", does: "A teacher teaches children." },
      { word: "firefighter", es: "bombero", picture: "images/community-helpers/firefighter.jpg", is: "He is a firefighter.", doing: "He is putting out a fire.", does: "A firefighter puts out fires." },
      { word: "police officer", es: "policía", picture: "images/community-helpers/police-officer.jpg", is: "He is a police officer.", doing: "He is keeping people safe.", does: "A police officer keeps people safe." },
      { word: "nurse", es: "enfermero", picture: "images/community-helpers/nurse.jpg", is: "He is a nurse.", doing: "He is looking after patients.", does: "A nurse looks after patients." },
      { word: "farmer", es: "granjero", picture: "images/community-helpers/farmer.jpg", is: "He is a farmer.", doing: "He is growing food.", does: "A farmer grows food." },
      { word: "cook", es: "cocinera", picture: "images/community-helpers/cook.jpg", is: "She is a cook.", doing: "She is cooking dinner.", does: "A cook makes meals." },
      { word: "postal worker", es: "cartera", picture: "images/community-helpers/postal-worker.jpg", is: "She is a postal worker.", doing: "She is delivering letters.", does: "A postal worker delivers letters." },
      { word: "builder", es: "albañil", picture: "images/community-helpers/builder.jpg", is: "He is a builder.", doing: "He is building a house.", does: "A builder builds houses." },
      { word: "dentist", es: "dentista", picture: "images/community-helpers/dentist.jpg", is: "She is a dentist.", doing: "She is looking after teeth.", does: "A dentist looks after teeth." },
      { word: "vet", es: "veterinario", picture: "images/community-helpers/vet.jpg", is: "He is a vet.", doing: "He is looking after animals.", does: "A vet looks after animals." },
      { word: "bus driver", es: "conductora", picture: "images/community-helpers/bus-driver.jpg", is: "She is a bus driver.", doing: "She is driving a bus.", does: "A bus driver drives the bus." }
    ]
  },
  toys: {
    title: "Toy Makers",
    page: "toys.html",
    // Toys take a possessive sentence ("I have a kite. It is ___ kite." -> my).
    // Sports take a "ball" flag (true when a ball is in the picture) and a "doing" sentence for the present continuous.
    cards: [
      { word: "kite", es: "cometa", picture: "images/toys/kite.jpg", owner: "I have a kite. It is ___ kite.", possessive: "my" },
      { word: "toy car", es: "coche de juguete", picture: "images/toys/toy-car.jpg", owner: "You have a toy car. It is ___ toy car.", possessive: "your" },
      { word: "teddy bear", es: "oso de peluche", picture: "images/toys/teddy-bear.jpg", owner: "He has a teddy bear. It is ___ teddy bear.", possessive: "his" },
      { word: "doll", es: "muñeca", picture: "images/toys/doll.jpg", owner: "She has a doll. It is ___ doll.", possessive: "her" },
      { word: "toy train", es: "tren de juguete", picture: "images/toys/train.jpg", owner: "The toy train has a bell. ___ bell is loud.", possessive: "its" },
      { word: "robot", es: "robot", picture: "images/toys/robot.jpg", owner: "We have a robot. It is ___ robot.", possessive: "our" },
      { word: "drum", es: "tambor", picture: "images/toys/drum.jpg", owner: "They have a drum. It is ___ drum.", possessive: "their" },
      { word: "football", es: "fútbol", picture: "images/sports/football.jpg", ball: true, pronoun: "he", doing: "He is playing football." },
      { word: "basketball", es: "baloncesto", picture: "images/sports/basketball.jpg", ball: true, pronoun: "she", doing: "She is playing basketball." },
      { word: "tennis", es: "tenis", picture: "images/sports/tennis.jpg", ball: true, pronoun: "he", doing: "He is playing tennis." },
      { word: "swimming", es: "nadar", picture: "images/sports/swimming.jpg", ball: false, pronoun: "he", doing: "He is swimming." },
      { word: "cycling", es: "ir en bicicleta", picture: "images/sports/cycling.jpg", ball: false, pronoun: "they", doing: "They are cycling." },
      { word: "running", es: "correr", picture: "images/sports/running.jpg", ball: false, pronoun: "they", doing: "They are running." }
    ]
  },
  feelings: {
    title: "Feelings",
    page: "feelings.html",
    cards: [
      { word: "happy", es: "feliz", picture: "images/feelings/happy.jpg" },
      { word: "sad", es: "triste", picture: "images/feelings/sad.jpg" },
      { word: "angry", es: "enfadado", picture: "images/feelings/angry.jpg" },
      { word: "scared", es: "asustado", picture: "images/feelings/scared.jpg" },
      { word: "surprised", es: "sorprendido", picture: "images/feelings/surprised.jpg" },
      { word: "sleepy", es: "con sueño", picture: "images/feelings/sleepy.jpg" },
      { word: "worried", es: "preocupado", picture: "images/feelings/worried.jpg" },
      { word: "excited", es: "emocionado", picture: "images/feelings/excited.jpg" },
      { word: "calm", es: "tranquilo", picture: "images/feelings/calm.jpg" },
      { word: "silly", es: "gracioso", picture: "images/feelings/silly.jpg" }
    ]
  },
  madrid: {
    title: "Madrid",
    page: "madrid.html",
    cards: [
      { word: "Madrid", es: "Madrid", picture: "images/madrid/madrid.jpg" },
      { word: "Puerta del Sol", es: "Puerta del Sol", picture: "images/madrid/sol.jpg" },
      { word: "Cibeles", es: "Cibeles", picture: "images/madrid/cibeles.jpg" },
      { word: "Retiro Park", es: "Parque del Retiro", picture: "images/madrid/retiro.jpg" },
      { word: "Bernabéu", es: "Bernabéu", picture: "images/madrid/bernabeu.jpg" }
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

// Games use a card's second photo half the time, when it has one, so the same word can look different
function gamePicture(card) {
  return card.picture2 && Math.random() < 0.5 ? card.picture2 : card.picture;
}
