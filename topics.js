// Every topic's flashcards, in one place. The topic pages, teacher pages and print page all read from here.
// "drawing" is an optional simple drawn picture (no photo licence needed), used by the print page.
const TOPICS = {
  animals: {
    title: "Animals",
    page: "animals.html",
    cards: [
      { word: "elephant", es: "elefante", picture: "images/animals/elephant.jpg", group: "wild" },
      { word: "pig", es: "cerdo", picture: "images/animals/pig.jpg", group: "farm" },
      { word: "giraffe", es: "jirafa", picture: "images/animals/giraffe.jpg", group: "wild" },
      { word: "mouse", es: "ratón", picture: "images/animals/mouse.jpg", group: "wild" },
      { word: "dog", es: "perro", picture: "images/animals/dog.jpg", group: "pets" },
      { word: "cat", es: "gato", picture: "images/animals/cat.jpg", group: "pets" },
      { word: "rabbit", es: "conejo", picture: "images/animals/rabbit.jpg", group: "pets" },
      { word: "horse", es: "caballo", picture: "images/animals/horse.jpg", group: "farm" },
      { word: "lion", es: "león", picture: "images/animals/lion.jpg", group: "wild" },
      { word: "cow", es: "vaca", picture: "images/animals/cow.jpg", group: "farm" },
      { word: "sheep", es: "oveja", picture: "images/animals/sheep.jpg", group: "farm" },
      { word: "hen", es: "gallina", picture: "images/animals/hen.jpg", group: "farm" },
      { word: "parrot", es: "loro", picture: "images/animals/parrot.jpg", group: "pets" },
      { word: "guinea pig", es: "conejillo de indias", picture: "images/animals/guineapig.jpg", group: "pets" },
      { word: "tortoise", es: "tortuga", picture: "images/animals/tortoise.jpg", group: "pets" },
      { word: "hamster", es: "hámster", picture: "images/animals/hamster.jpg", group: "pets" },
      { word: "budgie", es: "periquito", picture: "images/animals/budgie.jpg", group: "pets" },
      { word: "goldfish", es: "pez dorado", picture: "images/animals/goldfish.jpg", group: "pets" },
      { word: "duck", es: "pato", picture: "images/animals/duck.jpg", group: "farm" },
      { word: "pony", es: "poni", picture: "images/animals/pony.jpg", group: "farm" },
      { word: "turkey", es: "pavo", picture: "images/animals/turkey.jpg", group: "farm" },
      { word: "donkey", es: "burro", picture: "images/animals/donkey.jpg", group: "farm" },
      { word: "goose", es: "ganso", picture: "images/animals/goose.jpg", group: "farm" },
      { word: "llama", es: "llama", picture: "images/animals/llama.jpg", group: "farm" },
      { word: "goat", es: "cabra", picture: "images/animals/goat.jpg", group: "farm" },
      { word: "zebra", es: "cebra", picture: "images/animals/zebra.jpg", group: "wild" },
      { word: "kangaroo", es: "canguro", picture: "images/animals/kangaroo.jpg", group: "wild" },
      { word: "tiger", es: "tigre", picture: "images/animals/tiger.jpg", group: "wild" },
      { word: "panda", es: "panda", picture: "images/animals/panda.jpg", group: "wild" },
      { word: "owl", es: "búho", picture: "images/animals/owl.jpg", group: "wild" },
      { word: "wolf", es: "lobo", picture: "images/animals/wolf.jpg", group: "wild" },
      { word: "penguin", es: "pingüino", picture: "images/animals/penguin.jpg", group: "wild" },
      { word: "monkey", es: "mono", picture: "images/animals/monkey.jpg", group: "wild" },
      { word: "fox", es: "zorro", picture: "images/animals/fox.jpg", group: "wild" },
      { word: "snake", es: "serpiente", picture: "images/animals/snake.jpg", group: "wild" },
      { word: "bear", es: "oso", picture: "images/animals/bear.jpg", group: "wild" }
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
    title: "Parts of the House",
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
      { word: "hot", es: "caliente", picture: "images/opposites/hot.jpg" },
      { word: "cold", es: "frío", picture: "images/opposites/cold.jpg" },
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
    title: "My Garden",
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
      { word: "apples", es: "manzanas", food: true, picture: "images/garden/apple.jpg" },
      { word: "bananas", es: "plátanos", food: true, picture: "images/garden/banana.jpg" },
      { word: "grapes", es: "uvas", food: true, picture: "images/garden/grapes.jpg" },
      { word: "oranges", es: "naranjas", food: true, picture: "images/garden/orange.jpg" },
      { word: "strawberries", es: "fresas", food: true, picture: "images/garden/strawberry.jpg" },
      { word: "carrot", es: "zanahoria", food: true, picture: "images/garden/carrot.jpg" },
      { word: "tomato", es: "tomate", food: true, picture: "images/garden/tomato.jpg" },
      { word: "cucumber", es: "pepino", food: true, picture: "images/garden/cucumber.jpg" },
      { word: "potato", es: "patata", food: true, picture: "images/garden/potato.jpg" }
    ]
  },
  explorers: {
    title: "Insects and Bugs",
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
    title: "Modes of Transportation",
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
    title: "Professions",
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
    title: "Toys and Sports",
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
  undersea: {
    title: "Sea Creatures",
    page: "undersea.html",
    // "sentence" has a blank for the place word; "answer" is the right one (in, on, under, behind, next to)
    cards: [
      { word: "fish", es: "pez", picture: "images/undersea/fish.jpg", sentence: "The fish is ___ the water.", answer: "in" },
      { word: "shark", es: "tiburón", picture: "images/undersea/shark.jpg", sentence: "The shark is ___ the water.", answer: "in" },
      { word: "octopus", es: "pulpo", picture: "images/undersea/octopus.jpg", sentence: "The octopus is ___ the rock.", answer: "on" },
      { word: "crab", es: "cangrejo", picture: "images/undersea/crab.jpg", sentence: "The crab is ___ the sand.", answer: "on" },
      { word: "dolphin", es: "delfín", picture: "images/undersea/dolphin.jpg", sentence: "The dolphin is ___ the water.", answer: "in" },
      { word: "whale", es: "ballena", picture: "images/undersea/whale.jpg", sentence: "The whale is ___ the water.", answer: "in" },
      { word: "starfish", es: "estrella de mar", picture: "images/undersea/starfish.jpg", sentence: "The starfish is ___ the waves.", answer: "next to" },
      { word: "turtle", es: "tortuga", picture: "images/undersea/turtle.jpg", sentence: "The turtle is ___ the water.", answer: "in" },
      { word: "seahorse", es: "caballito de mar", picture: "images/undersea/seahorse.jpg", sentence: "The seahorse is ___ the water.", answer: "in" },
      { word: "jellyfish", es: "medusa", picture: "images/undersea/jellyfish.jpg", sentence: "The jellyfish is ___ the sea.", answer: "in" }
    ]
  },
  days: {
    title: "Days of the Week",
    page: "days.html",
    // "prev" and "next" are the days before and after, for the "What day comes after ___?" game
    cards: [
      { word: "Monday", es: "lunes", picture: "images/days/monday.jpg", prev: "Sunday", next: "Tuesday" },
      { word: "Tuesday", es: "martes", picture: "images/days/tuesday.jpg", prev: "Monday", next: "Wednesday" },
      { word: "Wednesday", es: "miércoles", picture: "images/days/wednesday.jpg", prev: "Tuesday", next: "Thursday" },
      { word: "Thursday", es: "jueves", picture: "images/days/thursday.jpg", prev: "Wednesday", next: "Friday" },
      { word: "Friday", es: "viernes", picture: "images/days/friday.jpg", prev: "Thursday", next: "Saturday" },
      { word: "Saturday", es: "sábado", picture: "images/days/saturday.jpg", prev: "Friday", next: "Sunday" },
      { word: "Sunday", es: "domingo", picture: "images/days/sunday.jpg", prev: "Saturday", next: "Monday" }
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

// One short example sentence per card, shown under the picture. Each sentence describes what the card's picture shows.
const EXAMPLES = {
  "animals": {
    "elephant": "The elephant is grey and has a long trunk.",
    "pig": "The pig is pink and round.",
    "giraffe": "The giraffe has a very long neck.",
    "mouse": "The mouse is small and brown.",
    "dog": "The dog is sitting on the grass.",
    "cat": "The cat is sitting on the wall.",
    "rabbit": "The rabbit is sitting in the grass.",
    "horse": "The horse is standing by the fence.",
    "lion": "The lion has a big mane.",
    "cow": "The cow is black and white.",
    "sheep": "The sheep has soft, fluffy wool.",
    "hen": "The hen has brown feathers.",
    "parrot": "The parrot has bright yellow and blue feathers.",
    "guinea pig": "The guinea pig is brown and white.",
    "tortoise": "The tortoise has a hard shell.",
    "hamster": "The hamster is sitting in a hand.",
    "budgie": "The budgie is green and yellow.",
    "goldfish": "The goldfish is orange and swims.",
    "duck": "The duck has a green head.",
    "pony": "The pony is brown and white.",
    "turkey": "The turkey has a big fan of feathers.",
    "donkey": "The donkey has long ears.",
    "goose": "The goose is white and has a long neck.",
    "llama": "The llamas are standing in the mountains.",
    "goat": "The goat is white and has floppy ears.",
    "zebra": "The zebra has black and white stripes.",
    "kangaroo": "The kangaroo carries its baby in a pouch.",
    "tiger": "The tiger has orange and black stripes.",
    "panda": "The panda eats bamboo.",
    "owl": "The owl has big eyes.",
    "wolf": "The wolf has thick white fur.",
    "penguin": "The penguin is standing in the snow.",
    "monkey": "The monkey sits with its hands together.",
    "fox": "The fox is orange and has pointed ears.",
    "snake": "The green snake is coiled on a branch.",
    "bear": "The bear has thick brown fur."
  },
  "colors": {
    "red": "The apple is red.",
    "blue": "The towel is blue.",
    "green": "The leaves are green.",
    "yellow": "The bananas are yellow.",
    "orange": "The orange is round and juicy.",
    "purple": "The grapes are purple.",
    "pink": "The flower is pink.",
    "brown": "The teddy bear is brown.",
    "black": "The plate is black.",
    "white": "The snow is white.",
    "grey": "The stone is grey.",
    "turquoise": "The mug is turquoise."
  },
  "shapes": {
    "circle": "The circle is round, with no corners.",
    "square": "The square is black and has four equal sides.",
    "triangle": "The triangle is blue and has three sides.",
    "star": "The star is yellow and has five points.",
    "heart": "The heart is green.",
    "diamond": "The diamond is orange.",
    "rectangle": "The rectangle is purple and long.",
    "oval": "The oval is red and shaped like an egg."
  },
  "house": {
    "house": "The house has a garden with flowers.",
    "living room": "The living room has a grey sofa and a yellow chair.",
    "dining room": "We eat dinner at the table in the dining room.",
    "bedroom": "The bed has white sheets and pillows.",
    "bathroom": "The bathroom has a bath and white towels.",
    "kitchen": "The kitchen has wooden cupboards.",
    "door": "The front door is blue.",
    "floor": "The floor is made of wood.",
    "window": "The window is open.",
    "garden": "The garden has flowers and a bench.",
    "wall": "There is a picture on the wall.",
    "terrace": "The terrace has a table and two chairs."
  },
  "seasons": {
    "summer": "In summer, the sun is shining in the blue sky.",
    "winter": "In winter, the trees are bare and the ground is white.",
    "spring": "In spring, the trees have pink flowers.",
    "autumn": "In autumn, the leaves are orange."
  },
  "weather": {
    "sunny": "The sun is shining in a blue sky.",
    "rainy": "It is rainy, and there are puddles.",
    "cloudy": "The sky is grey and cloudy.",
    "snowy": "It is snowy, and the trees are white.",
    "windy": "It is windy, and the trees and grass blow.",
    "stormy": "It is stormy, with dark clouds and lightning.",
    "hot": "The drink is hot, so we wait before we sip.",
    "cold": "It is cold, and the snow sparkles."
  },
  "opposites": {
    "wet": "The grass is wet after the rain.",
    "dry": "The ground is dry and cracked.",
    "hot": "The drink in the cup is hot.",
    "cold": "The ice cream is cold.",
    "happy": "The dog is smiling. It is happy.",
    "sad": "The dog is lying down. It is sad.",
    "big": "The elephant is big.",
    "small": "The bird is small.",
    "up": "The bird flies up into the sky.",
    "down": "The apples have fallen down onto the grass.",
    "open": "The box is open.",
    "closed": "The box is closed.",
    "fast": "The rabbit runs fast.",
    "slow": "The tortoise walks slowly.",
    "full": "The glass is full of juice.",
    "empty": "The glass is empty.",
    "light": "The room is light and bright.",
    "dark": "The room is dark at night.",
    "in": "The bird is sitting in its nest.",
    "out": "The bird flies out of its nest."
  },
  "city": {
    "city": "The city has tall buildings.",
    "street": "Cars are parked along the street.",
    "park": "The park has green grass and benches.",
    "playground": "The children play on the slide.",
    "shop": "The shop has a striped awning.",
    "school": "We learn at school.",
    "hospital": "The doctor works at the hospital.",
    "bus": "The bus is red.",
    "car": "The car is blue.",
    "traffic light": "The traffic light is red, so we stop.",
    "bridge": "The bridge goes over the river.",
    "train": "The train is waiting at the station."
  },
  "christmas": {
    "Santa": "Santa is waving hello.",
    "Christmas tree": "The Christmas tree has lights on it.",
    "star": "The golden star is shining.",
    "present": "The present has a green bow.",
    "bell": "The gold bell has a red bow.",
    "snowman": "The snowman has a red scarf.",
    "reindeer": "The reindeer stands in the snow.",
    "candle": "The candle is red and burning.",
    "stocking": "The stocking hangs by the fire.",
    "gingerbread man": "The gingerbread man has icing buttons.",
    "snowflake": "The snowflake is white and sparkly.",
    "candy cane": "The candy cane is red and white."
  },
  "garden": {
    "flower": "The flower is pink.",
    "tree": "The tree has lots of green leaves.",
    "leaf": "The leaf is green.",
    "seed": "Seeds are small and brown.",
    "grass": "The grass is green and tall.",
    "watering can": "We fill the watering can with water.",
    "spade": "The spade has a metal head and a wooden handle.",
    "apples": "The apples are red and hang on the tree.",
    "bananas": "Bananas grow on a tree.",
    "grapes": "The grapes are green and red.",
    "oranges": "The oranges hang on the tree.",
    "strawberries": "The strawberries are red and sweet.",
    "carrot": "The carrot grows under the soil.",
    "tomato": "The tomato is red and round.",
    "cucumber": "The cucumber is long and green.",
    "potato": "Potatoes grow under the ground."
  },
  "explorers": {
    "butterfly": "The butterfly has orange and black wings.",
    "bee": "The bee sits on a flower.",
    "ladybird": "The ladybird has red wings with black spots.",
    "ant": "The ant is on a green leaf.",
    "dragonfly": "The dragonfly has blue wings.",
    "grasshopper": "The grasshopper is green and sits in the grass.",
    "beetle": "The beetle is black and shiny.",
    "caterpillar": "The caterpillar eats a leaf.",
    "snail": "The snail has a shell on its back.",
    "worm": "The worm wriggles in the soil.",
    "spider": "The spider has eight legs."
  },
  "transport": {
    "car": "The car is blue.",
    "bus": "The bus is red.",
    "train": "The train is on the tracks.",
    "taxi": "The taxi is yellow.",
    "truck": "The truck has a big box at the back.",
    "aeroplane": "The aeroplane is white and flies high.",
    "helicopter": "The helicopter has big blades on top.",
    "boat": "The boat floats on the water.",
    "motorcycle": "The motorcycle has two wheels.",
    "bicycle": "The bicycle is red and has two wheels.",
    "scooter": "The scooter is green."
  },
  "community": {
    "doctor": "The doctor has a stethoscope.",
    "teacher": "The teacher holds a book.",
    "firefighter": "The firefighter wears a yellow suit.",
    "police officer": "The police officer wears a blue uniform and a hat.",
    "nurse": "The nurse holds a chart.",
    "farmer": "The farmer holds a basket.",
    "cook": "The cook holds a pot.",
    "postal worker": "The postal worker holds a letter.",
    "builder": "The builder wears an orange vest and a helmet.",
    "dentist": "The dentist uses a small tool.",
    "vet": "The vet is with a dog.",
    "bus driver": "The bus driver sits at the wheel."
  },
  "toys": {
    "kite": "The kite flies in the blue sky.",
    "toy car": "The toy car is red.",
    "teddy bear": "The teddy bear is brown and soft.",
    "doll": "The doll wears a pink dress and a hat.",
    "toy train": "The toy train is blue and red.",
    "robot": "The robot has buttons on its body.",
    "drum": "I hit the drum with sticks.",
    "football": "She kicks the football.",
    "basketball": "The basketball goes through the hoop.",
    "tennis": "The tennis player hits the ball.",
    "swimming": "The swimmer swims in the pool.",
    "cycling": "The people are riding bikes.",
    "running": "The runners run fast."
  },
  "undersea": {
    "fish": "The clownfish is orange and white.",
    "shark": "The shark swims in the sea.",
    "octopus": "The octopus has eight arms.",
    "crab": "The crab has big claws.",
    "dolphin": "The dolphin swims under the water.",
    "whale": "The whale swims in the sea.",
    "starfish": "The starfish is orange.",
    "turtle": "The turtle swims in the sea.",
    "seahorse": "The seahorse has a curly tail.",
    "jellyfish": "The jellyfish is blue and glows."
  },
  "days": {
    "Monday": "On Monday, we go to school.",
    "Tuesday": "On Tuesday, we play with a ball at the beach.",
    "Wednesday": "On Wednesday, we read books.",
    "Thursday": "On Thursday, we ride our bikes.",
    "Friday": "On Friday, we sing songs.",
    "Saturday": "On Saturday, we have a picnic.",
    "Sunday": "On Sunday, the sun is shining in the sky."
  },
  "feelings": {
    "happy": "The dog is smiling. It is happy.",
    "sad": "The dog is lying down. It is sad.",
    "angry": "The cat is cross. It is angry.",
    "scared": "The rabbit has its ears up. It is scared.",
    "surprised": "The owl has big, round eyes. It is surprised.",
    "sleepy": "The kitten yawns. It is sleepy.",
    "worried": "The dog looks to the side. It is worried.",
    "excited": "The dog is running and jumping. It is excited.",
    "calm": "The cat sits quietly in the sun. It is calm.",
    "silly": "The sheep sticks out its tongue. It is silly."
  },
  "madrid": {
    "Madrid": "Madrid is a big city in Spain.",
    "Puerta del Sol": "Many people walk in the Puerta del Sol.",
    "Cibeles": "The Cibeles building has tall towers.",
    "Retiro Park": "We row a boat on the lake in Retiro Park.",
    "Bernabéu": "The Bernabéu is a big, shiny stadium."
  }
};
for (const key in TOPICS) {
  for (const card of TOPICS[key].cards) card.example = (EXAMPLES[key] || {})[card.word] || "";
}
