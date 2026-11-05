// Every topic's flashcards, in one place. The topic pages, teacher pages and print page all read from here.
// "drawing" is an optional simple drawn picture (no photo licence needed), used by the print page.
const TOPICS = {
  animals: {
    title: "Animals",
    page: "animals.html",
    cards: [
      { word: "elephant", es: "elefante", picture: "images/animals/elephant.webp", group: "wild" },
      { word: "pig", es: "cerdo", picture: "images/animals/pig.webp", group: "farm" },
      { word: "giraffe", es: "jirafa", picture: "images/animals/giraffe.webp", group: "wild" },
      { word: "mouse", es: "ratón", picture: "images/animals/mouse.webp", group: "wild" },
      { word: "dog", es: "perro", picture: "images/animals/dog.webp", group: "pets" },
      { word: "cat", es: "gato", picture: "images/animals/cat.webp", group: "pets" },
      { word: "rabbit", es: "conejo", picture: "images/animals/rabbit.webp", group: "pets" },
      { word: "horse", es: "caballo", picture: "images/animals/horse.webp", group: "farm" },
      { word: "lion", es: "león", picture: "images/animals/lion.webp", group: "wild" },
      { word: "cow", es: "vaca", picture: "images/animals/cow.webp", group: "farm" },
      { word: "sheep", es: "oveja", picture: "images/animals/sheep.webp", group: "farm" },
      { word: "hen", es: "gallina", picture: "images/animals/hen.webp", group: "farm" },
      { word: "parrot", es: "loro", picture: "images/animals/parrot.webp", group: "pets" },
      { word: "guinea pig", es: "conejillo de indias", picture: "images/animals/guineapig.webp", group: "pets" },
      { word: "tortoise", es: "tortuga", picture: "images/animals/tortoise.webp", group: "pets" },
      { word: "hamster", es: "hámster", picture: "images/animals/hamster.webp", group: "pets" },
      { word: "budgie", es: "periquito", picture: "images/animals/budgie.webp", group: "pets" },
      { word: "goldfish", es: "pez dorado", picture: "images/animals/goldfish.webp", group: "pets" },
      { word: "duck", es: "pato", picture: "images/animals/duck.webp", group: "farm" },
      { word: "pony", es: "poni", picture: "images/animals/pony.webp", group: "farm" },
      { word: "turkey", es: "pavo", picture: "images/animals/turkey.webp", group: "farm" },
      { word: "donkey", es: "burro", picture: "images/animals/donkey.webp", group: "farm" },
      { word: "goose", es: "ganso", picture: "images/animals/goose.webp", group: "farm" },
      { word: "llama", es: "llama", picture: "images/animals/llama.webp", group: "farm" },
      { word: "goat", es: "cabra", picture: "images/animals/goat.webp", group: "farm" },
      { word: "zebra", es: "cebra", picture: "images/animals/zebra.webp", group: "wild" },
      { word: "kangaroo", es: "canguro", picture: "images/animals/kangaroo.webp", group: "wild" },
      { word: "tiger", es: "tigre", picture: "images/animals/tiger.webp", group: "wild" },
      { word: "panda", es: "panda", picture: "images/animals/panda.webp", group: "wild" },
      { word: "owl", es: "búho", picture: "images/animals/owl.webp", group: "wild" },
      { word: "wolf", es: "lobo", picture: "images/animals/wolf.webp", group: "wild" },
      { word: "penguin", es: "pingüino", picture: "images/animals/penguin.webp", group: "wild" },
      { word: "monkey", es: "mono", picture: "images/animals/monkey.webp", group: "wild" },
      { word: "fox", es: "zorro", picture: "images/animals/fox.webp", group: "wild" },
      { word: "snake", es: "serpiente", picture: "images/animals/snake.webp", group: "wild" },
      { word: "bear", es: "oso", picture: "images/animals/bear.webp", group: "wild" }
    ]
  },
  colors: {
    title: "Colours",
    page: "colors.html",
    cards: [
      { word: "red", es: "rojo", picture: "images/colors/red.webp", drawing: "images/colors/drawn/red.svg" },
      { word: "blue", es: "azul", picture: "images/colors/blue.webp", drawing: "images/colors/drawn/blue.svg" },
      { word: "green", es: "verde", picture: "images/colors/green.webp", drawing: "images/colors/drawn/green.svg" },
      { word: "yellow", es: "amarillo", picture: "images/colors/yellow.webp", drawing: "images/colors/drawn/yellow.svg" },
      { word: "orange", es: "naranja", picture: "images/colors/orange.webp", drawing: "images/colors/drawn/orange.svg" },
      { word: "purple", es: "morado", picture: "images/colors/purple.webp", drawing: "images/colors/drawn/purple.svg" },
      { word: "pink", es: "rosa", picture: "images/colors/pink.webp", drawing: "images/colors/drawn/pink.svg" },
      { word: "brown", es: "marrón", picture: "images/colors/brown.webp", drawing: "images/colors/drawn/brown.svg" },
      { word: "black", es: "negro", picture: "images/colors/black.webp", drawing: "images/colors/drawn/black.svg" },
      { word: "white", es: "blanco", picture: "images/colors/white.webp", drawing: "images/colors/drawn/white.svg" },
      { word: "grey", es: "gris", picture: "images/colors/grey.webp" },
      { word: "turquoise", es: "turquesa", picture: "images/colors/turquoise.webp" }
    ]
  },
  shapes: {
    title: "Shapes",
    page: "shapes.html",
    cards: [
      { word: "circle", es: "círculo", picture: "images/shapes/circle.webp", drawing: "images/shapes/drawn/circle.svg" },
      { word: "square", es: "cuadrado", picture: "images/shapes/square.webp", drawing: "images/shapes/drawn/square.svg" },
      { word: "triangle", es: "triángulo", picture: "images/shapes/triangle.webp", drawing: "images/shapes/drawn/triangle.svg" },
      { word: "star", es: "estrella", picture: "images/shapes/star.webp", drawing: "images/shapes/drawn/star.svg" },
      { word: "heart", es: "corazón", picture: "images/shapes/heart.webp", drawing: "images/shapes/drawn/heart.svg" },
      { word: "diamond", es: "rombo", picture: "images/shapes/diamond.webp", drawing: "images/shapes/drawn/diamond.svg" },
      { word: "rectangle", es: "rectángulo", picture: "images/shapes/rectangle.webp", drawing: "images/shapes/drawn/rectangle.svg" },
      { word: "oval", es: "óvalo", picture: "images/shapes/oval.webp", drawing: "images/shapes/drawn/oval.svg" }
    ]
  },
  house: {
    title: "Parts of the House",
    page: "house.html",
    cards: [
      { word: "house", es: "casa", picture: "images/house/house.webp" },
      { word: "living room", es: "salón", picture: "images/house/livingroom.webp" },
      { word: "dining room", es: "comedor", picture: "images/house/diningroom.webp" },
      { word: "bedroom", es: "dormitorio", picture: "images/house/bedroom.webp" },
      { word: "bathroom", es: "baño", picture: "images/house/bathroom.webp" },
      { word: "kitchen", es: "cocina", picture: "images/house/kitchen.webp" },
      { word: "door", es: "puerta", picture: "images/house/door.webp" },
      { word: "floor", es: "suelo", picture: "images/house/floor.webp" },
      { word: "window", es: "ventana", picture: "images/house/window.webp" },
      { word: "garden", es: "jardín", picture: "images/house/garden.webp" },
      { word: "wall", es: "pared", picture: "images/house/wall.webp" },
      { word: "terrace", es: "terraza", picture: "images/house/terrace.webp" }
    ]
  },
  seasons: {
    title: "Seasons",
    page: "seasons.html",
    cards: [
      { word: "summer", es: "verano", picture: "images/seasons and weather/summer.webp" },
      { word: "winter", es: "invierno", picture: "images/seasons and weather/winter.webp" },
      { word: "spring", es: "primavera", picture: "images/seasons and weather/spring.webp" },
      { word: "autumn", es: "otoño", picture: "images/seasons and weather/autumn.webp" }
    ]
  },
  weather: {
    title: "Weather",
    page: "weather.html",
    cards: [
      // picture: the flashcard photo. picture2: a second photo of the same weather, used in the games
      { word: "sunny", es: "soleado", picture: "images/seasons and weather/sunny.webp", picture2: "images/seasons and weather/sunny-2.webp" },
      { word: "rainy", es: "lluvioso", picture: "images/seasons and weather/rainy.webp", picture2: "images/seasons and weather/rainy-2.webp" },
      { word: "cloudy", es: "nublado", picture: "images/seasons and weather/cloudy.webp", picture2: "images/seasons and weather/cloudy-2.webp" },
      { word: "snowy", es: "nevado", picture: "images/seasons and weather/snowy.webp", picture2: "images/seasons and weather/snowy-2.webp" },
      { word: "windy", es: "ventoso", picture: "images/seasons and weather/windy.webp", picture2: "images/seasons and weather/windy-2.webp" },
      { word: "stormy", es: "tormentoso", picture: "images/seasons and weather/stormy.webp", picture2: "images/seasons and weather/stormy-2.webp" },
      { word: "hot", es: "caliente", picture: "images/seasons and weather/hot.webp", picture2: "images/seasons and weather/hot-2.webp" },
      { word: "cold", es: "frío", picture: "images/seasons and weather/cold.webp", picture2: "images/seasons and weather/cold-2.webp" }
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
      { word: "wet", es: "mojado", picture: "images/seasons and weather/wet.webp" },
      { word: "dry", es: "seco", picture: "images/seasons and weather/dry.webp" },
      { word: "hot", es: "caliente", picture: "images/opposites/hot.webp" },
      { word: "cold", es: "frío", picture: "images/opposites/cold.webp" },
      { word: "happy", es: "feliz", picture: "images/feelings/happy.webp" },
      { word: "sad", es: "triste", picture: "images/feelings/sad.webp" },
      { word: "big", es: "grande", picture: "images/opposites/big.webp" },
      { word: "small", es: "pequeño", picture: "images/opposites/small.webp" },
      { word: "up", es: "arriba", picture: "images/opposites/up.webp" },
      { word: "down", es: "abajo", picture: "images/opposites/down.webp" },
      { word: "open", es: "abierto", picture: "images/opposites/open.webp" },
      { word: "closed", es: "cerrado", picture: "images/opposites/closed.webp" },
      { word: "fast", es: "rápido", picture: "images/opposites/fast.webp" },
      { word: "slow", es: "lento", picture: "images/opposites/slow.webp" },
      { word: "full", es: "lleno", picture: "images/opposites/full.webp" },
      { word: "empty", es: "vacío", picture: "images/opposites/empty.webp" },
      { word: "light", es: "claro", picture: "images/opposites/light.webp" },
      { word: "dark", es: "oscuro", picture: "images/opposites/dark.webp" },
      { word: "in", es: "dentro", picture: "images/opposites/in.webp" },
      { word: "out", es: "fuera", picture: "images/opposites/out.webp" }
    ]
  },
  city: {
    title: "City",
    page: "city.html",
    cards: [
      { word: "city", es: "ciudad", picture: "images/city/city.webp" },
      { word: "street", es: "calle", picture: "images/city/street.webp" },
      { word: "park", es: "parque", picture: "images/city/park.webp" },
      { word: "playground", es: "parque infantil", picture: "images/city/playground.webp" },
      { word: "shop", es: "tienda", picture: "images/city/shop.webp" },
      { word: "school", es: "colegio", picture: "images/city/school.webp" },
      { word: "hospital", es: "hospital", picture: "images/city/hospital.webp" },
      { word: "bus", es: "autobús", picture: "images/city/bus.webp" },
      { word: "car", es: "coche", picture: "images/city/car.webp" },
      { word: "traffic light", es: "semáforo", picture: "images/city/traffic-light.webp" },
      { word: "bridge", es: "puente", picture: "images/city/bridge.webp" },
      { word: "train", es: "tren", picture: "images/city/train.webp" }
    ]
  },
  christmas: {
    title: "Christmas",
    page: "christmas.html",
    cards: [
      { word: "Santa", es: "Papá Noel", picture: "images/christmas/santa.webp" },
      { word: "Christmas tree", es: "árbol de Navidad", picture: "images/christmas/christmas-tree.webp" },
      { word: "star", es: "estrella", picture: "images/christmas/star.webp" },
      { word: "present", es: "regalo", picture: "images/christmas/present.webp" },
      { word: "bell", es: "campana", picture: "images/christmas/bell.webp" },
      { word: "snowman", es: "muñeco de nieve", picture: "images/christmas/snowman.webp" },
      { word: "reindeer", es: "reno", picture: "images/christmas/reindeer.webp" },
      { word: "candle", es: "vela", picture: "images/christmas/candle.webp" },
      { word: "stocking", es: "calcetín", picture: "images/christmas/stocking.webp" },
      { word: "gingerbread man", es: "hombre de jengibre", picture: "images/christmas/gingerbread-man.webp" },
      { word: "snowflake", es: "copo de nieve", picture: "images/christmas/snowflake.webp" },
      { word: "candy cane", es: "bastón de caramelo", picture: "images/christmas/candy-cane.webp" }
    ]
  },
  garden: {
    title: "My Garden",
    page: "garden.html",
    // A card can also have video and crop: tapping the picture plays that part of the video (x, y, width, height in video pixels)
    cards: [
      { word: "flower", es: "flor", picture: "images/garden/flower.webp" },
      { word: "tree", es: "árbol", picture: "images/garden/tree.webp" },
      { word: "leaf", es: "hoja", picture: "images/garden/leaf.webp" },
      { word: "seed", es: "semilla", picture: "images/garden/seed.webp" },
      { word: "grass", es: "hierba", picture: "images/garden/grass.webp" },
      { word: "watering can", es: "regadera", picture: "images/garden/watering-can.webp" },
      { word: "spade", es: "pala", picture: "images/garden/spade.webp" },
      { word: "apples", es: "manzanas", food: true, picture: "images/garden/apple.webp" },
      { word: "bananas", es: "plátanos", food: true, picture: "images/garden/banana.webp" },
      { word: "grapes", es: "uvas", food: true, picture: "images/garden/grapes.webp" },
      { word: "oranges", es: "naranjas", food: true, picture: "images/garden/orange.webp" },
      { word: "strawberries", es: "fresas", food: true, picture: "images/garden/strawberry.webp" },
      { word: "carrot", es: "zanahoria", food: true, picture: "images/garden/carrot.webp" },
      { word: "tomato", es: "tomate", food: true, picture: "images/garden/tomato.webp" },
      { word: "cucumber", es: "pepino", food: true, picture: "images/garden/cucumber.webp" },
      { word: "potato", es: "patata", food: true, picture: "images/garden/potato.webp" }
    ]
  },
  explorers: {
    title: "Insects and Bugs",
    page: "explorers.html",
    // Insects and bugs (minibeasts). "insect" is true for insects: six legs and three body parts.
    // "moves" are the action words that fit the creature (see the What Can It Do? game).
    cards: [
      { word: "butterfly", es: "mariposa", insect: true, moves: ["fly"], picture: "images/garden/butterfly.webp" },
      { word: "bee", es: "abeja", insect: true, moves: ["fly", "buzz"], picture: "images/garden/bee.webp" },
      { word: "ladybird", es: "mariquita", insect: true, moves: ["walk", "crawl", "fly"], picture: "images/garden/ladybird.webp" },
      { word: "ant", es: "hormiga", insect: true, moves: ["walk", "crawl"], picture: "images/explorers/ant.webp" },
      { word: "dragonfly", es: "libélula", insect: true, moves: ["fly"], picture: "images/explorers/dragonfly.webp" },
      { word: "grasshopper", es: "saltamontes", insect: true, moves: ["jump", "climb"], picture: "images/explorers/grasshopper.webp" },
      { word: "beetle", es: "escarabajo", insect: true, moves: ["walk", "crawl"], picture: "images/explorers/beetle.webp" },
      { word: "caterpillar", es: "oruga", insect: true, moves: ["crawl", "climb"], picture: "images/explorers/caterpillar.webp" },
      { word: "snail", es: "caracol", insect: false, moves: ["slide", "crawl"], picture: "images/garden/snail.webp" },
      { word: "worm", es: "gusano", insect: false, moves: ["wriggle"], picture: "images/garden/worm.webp" },
      { word: "spider", es: "araña", insect: false, moves: ["climb", "walk"], picture: "images/explorers/spider.webp" }
    ]
  },
  transport: {
    title: "Modes of Transportation",
    page: "transport.html",
    // Vehicles for the grammar lessons: singular and plural, this and that, its and they're (see the teacher guide)
    // "plural" is the plural word; "size" (small, medium, big), "speed" (slow, fast) and "wheels" are used by the On the Move games
    cards: [
      { word: "car", es: "coche", plural: "cars", size: "medium", speed: "fast", wheels: true, picture: "images/city/car.webp" },
      { word: "bus", es: "autobús", plural: "buses", size: "big", wheels: true, picture: "images/city/bus.webp" },
      { word: "train", es: "tren", plural: "trains", size: "big", speed: "fast", wheels: true, picture: "images/city/train.webp" },
      { word: "taxi", es: "taxi", plural: "taxis", size: "medium", speed: "fast", wheels: true, picture: "images/transport/taxi.webp" },
      { word: "truck", es: "camión", plural: "trucks", size: "big", speed: "slow", wheels: true, picture: "images/transport/truck.webp" },
      { word: "aeroplane", es: "avión", plural: "aeroplanes", size: "big", speed: "fast", wheels: false, picture: "images/transport/aeroplane.webp" },
      { word: "helicopter", es: "helicóptero", plural: "helicopters", size: "medium", speed: "fast", wheels: false, picture: "images/transport/helicopter.webp" },
      { word: "boat", es: "barco", plural: "boats", size: "medium", speed: "slow", wheels: false, picture: "images/transport/boat.webp" },
      { word: "motorcycle", es: "moto", plural: "motorcycles", size: "small", speed: "fast", wheels: true, picture: "images/transport/motorcycle.webp" },
      { word: "bicycle", es: "bicicleta", plural: "bicycles", size: "small", speed: "slow", wheels: true, picture: "images/transport/bicycle.webp" },
      { word: "scooter", es: "patinete", plural: "scooters", size: "small", speed: "slow", wheels: true, picture: "images/transport/scooter.webp" }
    ]
  },
  community: {
    title: "Professions",
    page: "community.html",
    // "is" is "He/She is a ...", "doing" is the present continuous, "does" answers "What does a ... do?"
    cards: [
      { word: "doctor", es: "médica", picture: "images/community-helpers/doctor.webp", is: "She is a doctor.", doing: "She is helping sick people.", does: "A doctor helps sick people." },
      { word: "teacher", es: "profesor", picture: "images/community-helpers/teacher.webp", is: "He is a teacher.", doing: "He is teaching children.", does: "A teacher teaches children." },
      { word: "firefighter", es: "bombero", picture: "images/community-helpers/firefighter.webp", is: "He is a firefighter.", doing: "He is putting out a fire.", does: "A firefighter puts out fires." },
      { word: "police officer", es: "policía", picture: "images/community-helpers/police-officer.webp", is: "He is a police officer.", doing: "He is keeping people safe.", does: "A police officer keeps people safe." },
      { word: "nurse", es: "enfermero", picture: "images/community-helpers/nurse.webp", is: "He is a nurse.", doing: "He is looking after patients.", does: "A nurse looks after patients." },
      { word: "farmer", es: "granjero", picture: "images/community-helpers/farmer.webp", is: "He is a farmer.", doing: "He is growing food.", does: "A farmer grows food." },
      { word: "cook", es: "cocinera", picture: "images/community-helpers/cook.webp", is: "She is a cook.", doing: "She is cooking dinner.", does: "A cook makes meals." },
      { word: "postal worker", es: "cartera", picture: "images/community-helpers/postal-worker.webp", is: "She is a postal worker.", doing: "She is delivering letters.", does: "A postal worker delivers letters." },
      { word: "builder", es: "albañil", picture: "images/community-helpers/builder.webp", is: "He is a builder.", doing: "He is building a house.", does: "A builder builds houses." },
      { word: "dentist", es: "dentista", picture: "images/community-helpers/dentist.webp", is: "She is a dentist.", doing: "She is looking after teeth.", does: "A dentist looks after teeth." },
      { word: "vet", es: "veterinario", picture: "images/community-helpers/vet.webp", is: "He is a vet.", doing: "He is looking after animals.", does: "A vet looks after animals." },
      { word: "bus driver", es: "conductora", picture: "images/community-helpers/bus-driver.webp", is: "She is a bus driver.", doing: "She is driving a bus.", does: "A bus driver drives the bus." }
    ]
  },
  toys: {
    title: "Toys and Sports",
    page: "toys.html",
    // Toys take a possessive sentence ("I have a kite. It is ___ kite." -> my).
    // Sports take a "ball" flag (true when a ball is in the picture) and a "doing" sentence for the present continuous.
    cards: [
      { word: "kite", es: "cometa", picture: "images/toys/kite.webp", owner: "I have a kite. It is ___ kite.", possessive: "my" },
      { word: "toy car", es: "coche de juguete", picture: "images/toys/toy-car.webp", owner: "You have a toy car. It is ___ toy car.", possessive: "your" },
      { word: "teddy bear", es: "oso de peluche", picture: "images/toys/teddy-bear.webp", owner: "He has a teddy bear. It is ___ teddy bear.", possessive: "his" },
      { word: "doll", es: "muñeca", picture: "images/toys/doll.webp", owner: "She has a doll. It is ___ doll.", possessive: "her" },
      { word: "toy train", es: "tren de juguete", picture: "images/toys/train.webp", owner: "The toy train has a bell. ___ bell is loud.", possessive: "its" },
      { word: "robot", es: "robot", picture: "images/toys/robot.webp", owner: "We have a robot. It is ___ robot.", possessive: "our" },
      { word: "drum", es: "tambor", picture: "images/toys/drum.webp", owner: "They have a drum. It is ___ drum.", possessive: "their" },
      { word: "football", es: "fútbol", picture: "images/sports/football.webp", ball: true, pronoun: "he", doing: "He is playing football." },
      { word: "basketball", es: "baloncesto", picture: "images/sports/basketball.webp", ball: true, pronoun: "she", doing: "She is playing basketball." },
      { word: "tennis", es: "tenis", picture: "images/sports/tennis.webp", ball: true, pronoun: "he", doing: "He is playing tennis." },
      { word: "swimming", es: "nadar", picture: "images/sports/swimming.webp", ball: false, pronoun: "he", doing: "He is swimming." },
      { word: "cycling", es: "ir en bicicleta", picture: "images/sports/cycling.webp", ball: false, pronoun: "they", doing: "They are cycling." },
      { word: "running", es: "correr", picture: "images/sports/running.webp", ball: false, pronoun: "they", doing: "They are running." }
    ]
  },
  undersea: {
    title: "Sea Creatures",
    page: "undersea.html",
    // "sentence" has a blank for the place word; "answer" is the right one (in, on, under, behind, next to)
    cards: [
      { word: "fish", es: "pez", picture: "images/undersea/fish.webp", sentence: "The fish is ___ the water.", answer: "in" },
      { word: "shark", es: "tiburón", picture: "images/undersea/shark.webp", sentence: "The shark is ___ the water.", answer: "in" },
      { word: "octopus", es: "pulpo", picture: "images/undersea/octopus.webp", sentence: "The octopus is ___ the rock.", answer: "on" },
      { word: "crab", es: "cangrejo", picture: "images/undersea/crab.webp", sentence: "The crab is ___ the sand.", answer: "on" },
      { word: "dolphin", es: "delfín", picture: "images/undersea/dolphin.webp", sentence: "The dolphin is ___ the water.", answer: "in" },
      { word: "whale", es: "ballena", picture: "images/undersea/whale.webp", sentence: "The whale is ___ the water.", answer: "in" },
      { word: "starfish", es: "estrella de mar", picture: "images/undersea/starfish.webp", sentence: "The starfish is ___ the waves.", answer: "next to" },
      { word: "turtle", es: "tortuga", picture: "images/undersea/turtle.webp", sentence: "The turtle is ___ the water.", answer: "in" },
      { word: "seahorse", es: "caballito de mar", picture: "images/undersea/seahorse.webp", sentence: "The seahorse is ___ the water.", answer: "in" },
      { word: "jellyfish", es: "medusa", picture: "images/undersea/jellyfish.webp", sentence: "The jellyfish is ___ the sea.", answer: "in" }
    ]
  },
  days: {
    title: "Days of the Week",
    page: "days.html",
    // "prev" and "next" are the days before and after, for the "What day comes after ___?" game
    cards: [
      { word: "Monday", es: "lunes", picture: "images/days/monday.webp", prev: "Sunday", next: "Tuesday" },
      { word: "Tuesday", es: "martes", picture: "images/days/tuesday.webp", prev: "Monday", next: "Wednesday" },
      { word: "Wednesday", es: "miércoles", picture: "images/days/wednesday.webp", prev: "Tuesday", next: "Thursday" },
      { word: "Thursday", es: "jueves", picture: "images/days/thursday.webp", prev: "Wednesday", next: "Friday" },
      { word: "Friday", es: "viernes", picture: "images/days/friday.webp", prev: "Thursday", next: "Saturday" },
      { word: "Saturday", es: "sábado", picture: "images/days/saturday.webp", prev: "Friday", next: "Sunday" },
      { word: "Sunday", es: "domingo", picture: "images/days/sunday.webp", prev: "Saturday", next: "Monday" }
    ]
  },
  feelings: {
    title: "Feelings",
    page: "feelings.html",
    cards: [
      { word: "happy", es: "feliz", picture: "images/feelings/happy.webp", animal: "dog" },
      { word: "sad", es: "triste", picture: "images/feelings/sad.webp", animal: "dog" },
      { word: "angry", es: "enfadado", picture: "images/feelings/angry.webp", animal: "cat" },
      { word: "scared", es: "asustado", picture: "images/feelings/scared.webp", animal: "rabbit" },
      { word: "surprised", es: "sorprendido", picture: "images/feelings/surprised.webp", animal: "owl" },
      { word: "sleepy", es: "con sueño", picture: "images/feelings/sleepy.webp", animal: "cat" },
      { word: "worried", es: "preocupado", picture: "images/feelings/worried.webp", animal: "dog" },
      { word: "excited", es: "emocionado", picture: "images/feelings/excited.webp", animal: "dog" },
      { word: "calm", es: "tranquilo", picture: "images/feelings/calm.webp", animal: "cat" },
      { word: "silly", es: "gracioso", picture: "images/feelings/silly.webp", animal: "sheep" }
    ]
  },
  madrid: {
    title: "Madrid",
    page: "madrid.html",
    cards: [
      { word: "Madrid", es: "Madrid", picture: "images/madrid/madrid.webp" },
      { word: "Puerta del Sol", es: "Puerta del Sol", picture: "images/madrid/sol.webp" },
      { word: "Cibeles", es: "Cibeles", picture: "images/madrid/cibeles.webp" },
      { word: "Retiro Park", es: "Parque del Retiro", picture: "images/madrid/retiro.webp" },
      { word: "Bernabéu", es: "Bernabéu", picture: "images/madrid/bernabeu.webp" }
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
