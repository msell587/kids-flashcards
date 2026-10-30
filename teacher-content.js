// Teacher guides for each topic: goal, 1-hour lesson plan, crafts, songs and games (for ages 3–5).
// Keys match the topic keys in topics.js. Edit freely; the teacher page builds itself from this file.
// Songs: "search" is what gets typed into YouTube's search, so links never go out of date.
// "words" holds original lyrics written for this app, sung to a traditional tune.

const TEACHER = {
  animals: {
    goal: "Children can recognise and say the 11 animal names, and copy each animal's movement or sound.",
    materials: [
      "Screen or tablet with the Animals flashcards",
      "Printed animal cards (use “Print flashcards” above)",
      "A cloth bag and a sheet of paper to cover the screen",
      "Craft supplies: see “Paper Plate Lion” below",
      "An animal picture book"
    ],
    plan: [
      { time: "5 min", step: "Hello and mystery animal", details: "Sing your hello song. Hide one printed card in a bag and give clues (“It's big. It's grey. It has a long nose!”) until someone guesses." },
      { time: "8 min", step: "Meet the animals", details: "Go through the flashcards on screen. Say each word, press 🔊, and have the class repeat it twice. Add an action for each one (stomp like an elephant, hop like a rabbit)." },
      { time: "5 min", step: "Song: I'm an Elephant", details: "Sing it with actions. Let children pick the next animal card for each new verse." },
      { time: "10 min", step: "Games", details: "Play Animal Moves, then Big or Small with the printed cards." },
      { time: "5 min", step: "Movement break", details: "Stand up and sing Old MacDonald, acting out the dog, cat, horse and sheep." },
      { time: "15 min", step: "Craft: Paper Plate Lion", details: "Follow the craft steps below. While children work, ask “What does a lion say?” and “Is a lion big or small?”" },
      { time: "7 min", step: "Show and tell, then story", details: "Each child holds up their lion and roars: “This is my lion!” Then read a short animal picture book, pausing to let children name the animals." },
      { time: "5 min", step: "Review and goodbye", details: "Play a quick Slow Reveal, then click through the flashcards together all the way to the 🎉 screen and cheer!" }
    ],
    crafts: [
      {
        name: "Paper Plate Lion",
        time: "15 min",
        supplies: ["Paper plates", "Yellow and orange paper strips (cut before class)", "Glue sticks", "Crayons", "Googly eyes (optional)"],
        steps: [
          "Children colour the middle of the plate yellow for the lion's face.",
          "Glue paper strips all around the edge to make the mane.",
          "Draw (or stick on) eyes, a nose and a big smiling mouth.",
          "Hold it up and ROAR!"
        ],
        tip: "Pre-cut the strips so little hands only need to glue. Curl a few strips round a pencil for a fluffy mane."
      },
      {
        name: "Paper Bag Animal Puppets",
        time: "15 min",
        supplies: ["Small paper bags", "Coloured paper shapes (ears, noses, tails)", "Glue sticks", "Crayons"],
        steps: [
          "Each child chooses an animal from the flashcards.",
          "Glue ears and a nose onto the bottom flap of the bag (that's the face).",
          "Draw eyes and whiskers or spots.",
          "Put a hand inside and make the puppet talk: “I'm a cat. Meow!”"
        ],
        tip: "Use the puppets the next lesson to say hello, so children get a second go at the words."
      }
    ],
    songs: [
      {
        title: "Old MacDonald Had a Farm",
        tune: "Traditional",
        how: "Sing verses for the farm animals in the deck: dog, cat, horse and sheep. Hold up each card before its verse, then let children choose the next card.",
        search: "old macdonald had a farm kids song"
      },
      {
        title: "I'm an Elephant",
        tune: "Frère Jacques (Are You Sleeping?)",
        words: "I'm an elephant, I'm an elephant,\nStomp, stomp, stomp! Stomp, stomp, stomp!\nSwinging my long trunk, swinging my long trunk,\nStomp, stomp, stomp! Stomp, stomp, stomp!",
        how: "Do the actions while singing. New verses: “I'm a rabbit… hop, hop, hop”, “I'm a lion… roar, roar, roar”, “I'm a little mouse… squeak, squeak, squeak”.",
        search: "frere jacques kids song"
      }
    ],
    games: [
      { name: "Animal Moves", how: "Show a card and everyone moves like that animal: stomp like an elephant, stretch tall like a giraffe, tiny tiptoe steps like an ant. Then say the word without showing the card." },
      { name: "Slow Reveal", how: "Cover the screen with paper and slide it away slowly. The first child to shout the animal's name picks the next card." },
      { name: "Big or Small", how: "Lay the printed cards on the floor. Children take turns sorting them into a “big” pile (elephant, giraffe, horse, camel, lion) and a “small” pile (ant, mouse, rabbit, cat)." },
      { name: "Animal Sounds", how: "Make an animal's sound. Children point to the right card and say its name. For quiet animals like the ant or giraffe, use a movement instead." }
    ]
  },

  colors: {
    goal: "Children can name the 12 colours and find things of each colour around them.",
    materials: [
      "Screen or tablet with the Colours flashcards",
      "Printed colour cards",
      "Coloured toys or blocks for sorting",
      "Music to play and pause",
      "Craft supplies: see “Rainbow Collage” and “Colour Mixing Magic” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and colour check", details: "Sing hello, then ask each child: “What colour is your shirt?” Help with the word if needed." },
      { time: "8 min", step: "Meet the colours", details: "Go through the flashcards. Say each colour, press 🔊, and have the class repeat. Children point to something in the room of that colour." },
      { time: "5 min", step: "Song: If You're Wearing Red Today", details: "Children stand up (or touch their nose, or jump) when their colour is called." },
      { time: "10 min", step: "Games", details: "Play Colour Hunt, then Colour Simon Says." },
      { time: "5 min", step: "Movement break", details: "Play Pass the Colour with music. Whoever holds the card when the music stops says the colour." },
      { time: "15 min", step: "Craft: Rainbow Collage", details: "Follow the craft steps below. Name each colour as children stick it on." },
      { time: "7 min", step: "Science moment: Colour Mixing Magic", details: "Make the mixing bags from the Crafts section. Children squish and shout the new colour." },
      { time: "5 min", step: "Review and goodbye", details: "A quick round of Colour Sorting, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Rainbow Collage",
        time: "15 min",
        supplies: ["A large rainbow outline printed or drawn on paper", "Torn tissue or magazine paper in each colour", "Glue sticks", "Cotton wool for clouds"],
        steps: [
          "Show the rainbow outline and name each stripe's colour together.",
          "Children tear paper into small pieces (great for little fingers!).",
          "Glue the pieces onto the matching stripe, one colour at a time.",
          "Add cotton wool clouds at each end."
        ],
        tip: "Put each colour in its own tray so children practise finding and naming the colour they need."
      },
      {
        name: "Colour Mixing Magic",
        time: "7 min",
        supplies: ["Zip-lock bags", "Red, yellow and blue paint", "Strong tape"],
        steps: [
          "Squeeze two colours into each bag, e.g. red and yellow.",
          "Seal the bag and tape the top so it can't open.",
          "Children squish the bag on the table and watch the colours mix.",
          "Ask: “What colour did it make?” (red + yellow = orange, blue + yellow = green, red + blue = purple)."
        ],
        tip: "Tape the bags to a sunny window afterwards for a mini colour display."
      }
    ],
    songs: [
      {
        title: "If You're Wearing Red Today",
        tune: "If You're Happy and You Know It",
        words: "If you're wearing red today, stand up!\nIf you're wearing red today, stand up!\nIf you're wearing red today,\nIf you're wearing red today,\nIf you're wearing red today, stand up!",
        how: "Hold up the matching flashcard for each verse. Change the colour and the action: “…blue today, touch your nose!”",
        search: "if you're happy and you know it kids song"
      },
      {
        title: "Mary Wore Her Red Dress",
        tune: "Traditional",
        how: "Swap in children's names and what they're wearing (“Sam wore his blue shirt”). Children love hearing their own name.",
        search: "mary wore her red dress song"
      },
      {
        title: "I Can Sing a Rainbow",
        tune: "Well-known children's song",
        how: "Listen together and point to the matching flashcard, or something in the room, as each colour is sung.",
        search: "i can sing a rainbow song for kids"
      }
    ],
    games: [
      { name: "Colour Hunt", how: "Show a card and say “Find something red!” Children walk to touch something of that colour, then come back to the circle." },
      { name: "Colour Simon Says", how: "“Simon says touch something blue!” If you leave out “Simon says”, children stay still. Keep it gentle, with no one going out." },
      { name: "Colour Sorting", how: "Put the printed cards on the floor. Children place toys or blocks on the matching colour card, saying the colour each time." },
      { name: "Pass the Colour", how: "Pass a card around the circle while music plays. When the music stops, the child holding it says the colour." }
    ]
  },

  shapes: {
    goal: "Children can name the 8 shapes and find them in the world around them.",
    materials: [
      "Screen or tablet with the Shapes flashcards",
      "Printed shape cards",
      "Cardboard shapes and a cloth bag (for Feely Bag)",
      "Craft supplies: see “Shape Pictures” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and shape surprise", details: "Sing hello. Hold up a ball, a book and a cracker and ask: “What shape is this?”" },
      { time: "8 min", step: "Meet the shapes", details: "Go through the flashcards. Say each shape, press 🔊, have the class repeat, and draw it in the air together with one finger." },
      { time: "5 min", step: "Song: This Is a Circle", details: "Sing a verse for circle, square and triangle, drawing each shape in the air." },
      { time: "10 min", step: "Games", details: "Play Shape Hunt around the room, then Body Shapes." },
      { time: "5 min", step: "Movement break", details: "Sing Twinkle Twinkle Little Star. Stretch up tall into a star shape on the last line." },
      { time: "15 min", step: "Craft: Shape Pictures", details: "Follow the craft steps below. Ask “Which shape is the roof?” and “How many circles?”" },
      { time: "7 min", step: "Share and Feely Bag", details: "Each child names one shape in their picture. Then play Feely Bag." },
      { time: "5 min", step: "Review and goodbye", details: "Draw in the Air with elbows and noses, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Shape Pictures",
        time: "15 min",
        supplies: ["Paper shapes in many colours (cut before class)", "Large paper", "Glue sticks", "Crayons"],
        steps: [
          "Show an example: a house made from a square and a triangle, or a car from a rectangle and two circles.",
          "Children choose shapes and arrange them on the paper before gluing.",
          "Glue them down to make a house, a robot, a train or anything they like.",
          "Add details with crayons, then name the shapes they used."
        ],
        tip: "Keep each shape in its own tray and ask children to ask for what they need: “A circle, please!”"
      },
      {
        name: "Star Wands",
        time: "10 min",
        supplies: ["Cardboard stars (cut before class)", "Straws or craft sticks", "Glitter glue or stickers", "Tape"],
        steps: [
          "Children decorate their star with stickers or glitter glue.",
          "Tape the star to a straw or stick (adult helps).",
          "Wave the wands while singing Twinkle Twinkle."
        ],
        tip: "Use the wands in later lessons to point at shapes around the room."
      }
    ],
    songs: [
      {
        title: "This Is a Circle",
        tune: "Frère Jacques (Are You Sleeping?)",
        words: "This is a circle, this is a circle,\nRound and round, round and round,\nDraw it in the air now, draw it in the air now,\nRound and round, round and round.",
        how: "Draw each shape in the air while singing. New verses: “This is a square… four sides, four sides”, “This is a triangle… three sides, three sides”.",
        search: "frere jacques kids song"
      },
      {
        title: "Twinkle Twinkle Little Star",
        tune: "Traditional",
        how: "Sing it when the star card comes up. Children open and close their hands like twinkling stars.",
        search: "twinkle twinkle little star kids song"
      }
    ],
    games: [
      { name: "Draw in the Air", how: "Show a card and everyone draws the shape in the air with a finger, then with their elbow, then with their nose!" },
      { name: "Shape Hunt", how: "Find shapes in the room: the clock is a circle, the door is a rectangle, a window is a square. Children point and say the shape." },
      { name: "Body Shapes", how: "Children make shapes with their bodies: arms over the head for a circle, two children together for a triangle, the whole class lying down for a big square." },
      { name: "Feely Bag", how: "Put cardboard shapes in a bag. A child feels one without looking and guesses the shape, then pulls it out to check." }
    ]
  },

  house: {
    goal: "Children can name the rooms and parts of a house, and say what we do in each room.",
    materials: [
      "Screen or tablet with the My House flashcards",
      "Printed house cards",
      "Craft supplies: see “Lift-the-Flap House” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and knock, knock", details: "Sing hello. Then say the “Knock, Knock, Open the Door” rhyme with actions." },
      { time: "8 min", step: "Meet the house", details: "Go through the flashcards. Say each word, press 🔊, and have the class repeat. Touch the real door, floor, window and wall in your classroom." },
      { time: "5 min", step: "Song: This Is the Way We…", details: "Show each room's card and mime the action: brush teeth in the bathroom, sleep in the bedroom, cook in the kitchen." },
      { time: "10 min", step: "Games", details: "Play Where Do You…?, then What's Missing? with the printed cards." },
      { time: "5 min", step: "Movement break", details: "Go on a pretend House Tour together (see Games)." },
      { time: "15 min", step: "Craft: Lift-the-Flap House", details: "Follow the craft steps below. Ask “Who lives in your house?” and “Which room is this?”" },
      { time: "7 min", step: "Visit each other's houses", details: "Children knock on a friend's paper door and open the flap: “Who lives here?” The owner answers: “This is my bedroom!”" },
      { time: "5 min", step: "Review and goodbye", details: "Play a quick Point and Touch, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Lift-the-Flap House",
        time: "15 min",
        supplies: ["A house outline on card, with a door and windows drawn on", "Safety scissors (or pre-cut flaps)", "Crayons", "Glue sticks"],
        steps: [
          "An adult cuts three sides of the door and windows so they open like flaps.",
          "Glue the house onto a second sheet of paper (don't glue the flaps!).",
          "Children open each flap and draw what's inside: their family, a bed, a kitchen table.",
          "Colour the outside of the house, the roof and the garden."
        ],
        tip: "Write the room name on each flap as children tell you, e.g. “bedroom”, so they see the word."
      },
      {
        name: "Cut-and-Glue Rooms",
        time: "15 min",
        supplies: ["Old furniture catalogues or magazines", "Paper with simple room outlines", "Safety scissors", "Glue sticks"],
        steps: [
          "Children find pictures of a bed, a bath, a sofa and a fridge.",
          "Cut them out (or tear them out) with adult help.",
          "Glue each one into the right room: bed into the bedroom, sofa into the living room.",
          "Point to each room and say its name."
        ],
        tip: "This works well as a follow-up lesson after the Lift-the-Flap House."
      }
    ],
    songs: [
      {
        title: "This Is the Way We…",
        tune: "Here We Go Round the Mulberry Bush",
        words: "This is the way we brush our teeth,\nBrush our teeth, brush our teeth,\nThis is the way we brush our teeth,\nIn the bathroom!",
        how: "Show the room's card for each verse and mime the action. More verses: sleep in the bedroom, cook in the kitchen, eat in the dining room, play in the garden, watch TV in the living room.",
        search: "here we go round the mulberry bush kids song"
      },
      {
        title: "Knock, Knock, Open the Door",
        tune: "Action rhyme (spoken)",
        words: "Knock, knock! Open the door,\nStep inside and walk on the floor,\nLook through the window, touch the wall,\nThis is my house, and I love it all!",
        how: "Say it slowly with actions, pointing to the real door, floor, window and wall. Repeat it faster each time.",
        search: ""
      }
    ],
    games: [
      { name: "Where Do You…?", how: "Ask “Where do you sleep?”, “Where do you cook?”, “Where do you take a bath?” Children point to the card or say the room." },
      { name: "House Tour", how: "Pretend to walk through a house together: knock on the door, wipe your feet, tiptoe into the bedroom, splash in the bathroom, smell dinner in the kitchen." },
      { name: "What's Missing?", how: "Lay 4–5 printed cards on the floor. Children close their eyes while you take one away. “What's missing?” Add more cards as they get better." },
      { name: "Point and Touch", how: "Call out “Door!”, “Window!”, “Floor!”, “Wall!” and children run to touch the real one in the classroom." }
    ]
  },

  seasons: {
    goal: "Children can name the 4 seasons and say one thing that happens in each.",
    materials: [
      "Screen or tablet with the Seasons flashcards",
      "Printed season cards (use “Print flashcards” above)",
      "Dress-up clothes if you have them (hat, scarf, sunglasses)",
      "Craft supplies: see “Four Seasons Tree” below"
    ],
    plan: [
      { time: "5 min", step: "Hello", details: "Sing hello, then ask “Which season is it now?” and listen to the answers." },
      { time: "8 min", step: "Meet the seasons", details: "Go through the flashcards: summer, winter, spring, autumn. Say each word, press 🔊, have the class repeat, and add an action (sunglasses for summer, a shiver for winter, a jump for spring, a rake for autumn)." },
      { time: "10 min", step: "Games", details: "Play Four Corners with the season cards, then Autumn Guess on the screen: tap the picture for clues, then show the word." },
      { time: "5 min", step: "Movement break", details: "Play Dress for the Season: put on a coat in winter, sunglasses in summer." },
      { time: "15 min", step: "Craft: Four Seasons Tree", details: "Follow the craft steps below. Name each season as children decorate its branch." },
      { time: "7 min", step: "Season Guess", details: "Say something a season is like (“Snow falls!”, “Flowers grow!”). Children hold up the matching season card." },
      { time: "5 min", step: "Review and goodbye", details: "Click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Four Seasons Tree",
        time: "15 min",
        supplies: ["A bare tree outline with four branches, on large paper", "Pink tissue paper (spring)", "Green paper (summer)", "Orange and brown paper (autumn)", "Cotton wool (winter)", "Glue sticks"],
        steps: [
          "Label the four branches spring, summer, autumn and winter together.",
          "Spring: scrunch pink tissue into blossoms and glue them on.",
          "Summer: glue on green leaves. Autumn: glue on orange and brown leaves.",
          "Winter: stick cotton wool snow on the last branch."
        ],
        tip: "Ask “What happens in winter?” as children work, so they say one thing about each season."
      }
    ],
    songs: [
      {
        title: "The Four Seasons",
        tune: "Frère Jacques (Are You Sleeping?)",
        words: "Spring has flowers, spring has flowers,\nSummer sun, summer sun,\nAutumn leaves fall down, autumn leaves fall down,\nWinter snow, winter snow.",
        how: "Hold up each season card as its line is sung. Children do the action: jump for spring, big arms for summer, leaves floating down for autumn, a shiver for winter.",
        search: "frere jacques kids song"
      }
    ],
    games: [
      { name: "Four Corners", how: "Put a season card in each corner of the room. Call a season and children run to that corner. Then call “Summer, sunny!” for a challenge." },
      { name: "Dress for the Season", how: "Call out a season and children mime putting on the right clothes: a coat and hat for winter, sunglasses for summer, a raincoat for autumn." },
      { name: "Autumn Guess", how: "Open the Autumn Guess game on the screen. Show a picture of an autumn object, such as a leaf, a pumpkin or an umbrella. Tap the picture to clear it a little more with each clue. Children guess the object in English or Spanish, then show the word." }
    ]
  },

  weather: {
    goal: "Children can name the 8 weather words (sunny, rainy, cloudy, snowy, windy, stormy, hot, cold) and say what the weather is like today.",
    materials: [
      "Screen or tablet with the Weather flashcards",
      "Printed weather cards (use “Print flashcards” above)",
      "Dress-up clothes if you have them (hat, scarf, sunglasses)",
      "Craft supplies: see “Weather Wheel” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and weather check", details: "Sing hello, then sing “What's the Weather?” and look out of the window together." },
      { time: "8 min", step: "Meet the weather", details: "Go through the flashcards: sunny, rainy, cloudy, snowy, windy, stormy, hot, cold. Say each word, press 🔊, have the class repeat, and add an action (big arms for sunny, tapping fingers for rainy, a shiver for snowy, a sway for windy, fanning for hot, hugging yourself for cold)." },
      { time: "5 min", step: "Song: Rain, Rain, Go Away", details: "Tap fingers like rain, then throw arms up for the sun." },
      { time: "10 min", step: "Games", details: "Play Act the Weather, then Weather Reporter. Older or more confident children can also try Weather Sort, Weather Quiz and Weather Memory from the More menu." },
      { time: "5 min", step: "Movement break", details: "Play Dress for the Weather, using real clothes if you have them." },
      { time: "15 min", step: "Craft: Weather Wheel", details: "Follow the craft steps below. Name each weather as children colour their section." },
      { time: "7 min", step: "Weather Reporter", details: "Children take turns being the reporter, holding up the right card: “Today it's sunny!” Others point to the matching picture on their wheel." },
      { time: "5 min", step: "Review and goodbye", details: "Sing “What's the Weather?” once more, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Weather Wheel",
        time: "15 min",
        supplies: ["Paper plates divided into eight sections", "Crayons", "A card arrow", "Split pin fastener (adult only)"],
        steps: [
          "Children draw sunny, rainy, cloudy, snowy, windy, stormy, hot and cold, one in each section.",
          "An adult attaches the arrow to the centre with the split pin.",
          "Each morning, children turn the arrow to today's weather and say it."
        ],
        tip: "Split pins are a choking hazard, so an adult should attach them and check they're secure."
      }
    ],
    songs: [
      {
        title: "What's the Weather?",
        tune: "Frère Jacques (Are You Sleeping?)",
        words: "What's the weather? What's the weather?\nLook outside, look outside,\nIs it sunny? Is it rainy?\nLet us see! Let us see!",
        how: "Sing it at the start of every lesson. At the end, a child holds up the card for today's weather.",
        search: "frere jacques kids song"
      },
      {
        title: "Rain, Rain, Go Away",
        tune: "Traditional",
        how: "Tap fingers on the floor like rain while singing, then throw arms up for the sun at the end.",
        search: "rain rain go away kids song"
      }
    ],
    games: [
      { name: "Act the Weather", how: "Show a card and everyone acts it out: big arms for sunny, tapping fingers for rainy, swaying for windy, shivering for snowy, floating slowly for cloudy, stamping for stormy." },
      { name: "Weather Reporter", how: "A child stands at the front, looks outside and holds up the right card: “Today it's sunny!” The class claps." },
      { name: "Dress for the Weather", how: "Call out a weather and children mime putting on the right clothes: a coat and scarf for snowy, sunglasses for sunny, boots for rainy." }
    ]
  },

  city: {
    goal: "Children can name 12 places and things in a city, and say what we do there.",
    materials: [
      "Screen or tablet with the City flashcards",
      "Printed city cards (stick some on the walls for Bus Stops)",
      "A toy car (optional)",
      "Craft supplies: see “Paper Traffic Light” below",
      "A long strip of paper for a road (for sharing time)"
    ],
    plan: [
      { time: "5 min", step: "Hello and bus ride", details: "Sing hello. Line up chairs like a bus. You're the driver: “Everyone on the bus! Let's go to the city!” Steer and beep together." },
      { time: "8 min", step: "Meet the city", details: "Go through the flashcards. Say each word, press 🔊, and have the class repeat. Add actions: steer for car, stop with a hand up for traffic light, wave for bus, tiptoe for bridge." },
      { time: "5 min", step: "Song: Red Means Stop", details: "Sing it with the traffic light card. Freeze on “stop” and march on “go”." },
      { time: "10 min", step: "Games", details: "Play Traffic Light, then Where Am I?" },
      { time: "5 min", step: "Movement break", details: "Play Bus Stops (see Games), riding the bus around the room to each place." },
      { time: "15 min", step: "Craft: Paper Traffic Light", details: "Follow the craft steps below. Ask “What does red mean?” and “What colour means go?”" },
      { time: "7 min", step: "Our city road", details: "Lay a long paper road on the floor and place the printed cards along it. Each child drives a toy car (or their finger) along the road, naming each place they pass: “Here's the park!”" },
      { time: "5 min", step: "Review and goodbye", details: "One last round of Traffic Light using the children's crafts, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Paper Traffic Light",
        time: "15 min",
        supplies: ["Black paper rectangles", "Red, yellow and green paper circles (cut before class)", "Glue sticks", "Craft sticks (optional, to make a handle)"],
        steps: [
          "Show the traffic light flashcard and name the colours, top to bottom: red, yellow, green.",
          "Children glue the circles onto the black paper in the right order.",
          "Tape on a craft stick to make a handle (adult helps).",
          "Hold it up and play Traffic Light: red, stop! Green, go!"
        ],
        tip: "Draw faint circles on the black paper first so children know where each colour goes."
      },
      {
        name: "Box Buildings",
        time: "20 min",
        supplies: ["Small boxes (cereal, tea or juice boxes)", "Paper to wrap the boxes", "Crayons and stickers", "Tape and glue sticks"],
        steps: [
          "An adult wraps each box in plain paper beforehand.",
          "Each child chooses a building: a shop, a school, a hospital or a house.",
          "Draw doors and windows, and add a sign with an adult's help (“SHOP”, “SCHOOL”).",
          "Line the buildings up along a paper road to make a class city."
        ],
        tip: "Keep the box city in the classroom and use it for Where Am I? in the next lesson."
      }
    ],
    songs: [
      {
        title: "Red Means Stop",
        tune: "Frère Jacques (Are You Sleeping?)",
        words: "Red means stop! Red means stop!\nGreen means go! Green means go!\nYellow means slow down, yellow means slow down,\nStop and go! Stop and go!",
        how: "Hold up the traffic light card. Freeze on “stop”, march on “go” and walk in slow motion on “slow down”.",
        search: "frere jacques kids song"
      },
      {
        title: "The Wheels on the Bus",
        tune: "Well-known children's song",
        how: "Sing along with actions: rolling hands for the wheels, swishing arms for the wipers, beeping the horn. Show the bus card at the start.",
        search: "the wheels on the bus kids song"
      }
    ],
    games: [
      { name: "Traffic Light", how: "Hold up red, yellow or green (use the craft or coloured paper). Green: walk or “drive” around the room. Yellow: tiptoe slowly. Red: freeze! Anyone still moving gives a big beep-beep." },
      { name: "Where Am I?", how: "Mime an activity and children guess the place: going down a slide (playground), buying an apple (shop), a doctor listening to a heartbeat (hospital). Then let children take turns miming." },
      { name: "Bus Stops", how: "Stick printed cards around the room. Children line up behind you as a bus. Call “Next stop: the park!” and drive there together. At each stop, everyone says the word." },
      { name: "I Spy in the City", how: "Lay the printed cards on the floor. “I spy something red… with wheels!” Children point to the bus. Then let a child give the clue." }
    ],
    photoCredits: [
      { word: "city", url: "https://www.pexels.com/photo/17555989/" },
      { word: "street", url: "https://www.pexels.com/photo/25242991/" },
      { word: "park", url: "https://www.pexels.com/photo/32666094/" },
      { word: "playground", url: "https://www.pexels.com/photo/12586010/" },
      { word: "shop", url: "https://www.pexels.com/photo/8228650/" },
      { word: "school", url: "https://www.pexels.com/photo/8500353/" },
      { word: "hospital", url: "https://www.pexels.com/photo/668300/" },
      { word: "bus", url: "https://www.pexels.com/photo/20152874/" },
      { word: "car", url: "https://www.pexels.com/photo/17078638/" },
      { word: "traffic light", url: "https://www.pexels.com/photo/11574912/" },
      { word: "bridge", url: "https://www.pexels.com/photo/37404655/" }
    ]
  },
  christmas: {
    goal: "Children can name 12 Christmas words, and say “Merry Christmas!” and “Here's a present for you!”",
    materials: [
      "Screen or tablet with the Christmas flashcards",
      "Printed Christmas cards (two sets for Memory Match)",
      "A small bell, and a box wrapped like a present",
      "Craft supplies: see “Paper Plate Santa” below",
      "Christmas music to play and pause"
    ],
    plan: [
      { time: "5 min", step: "Hello and mystery present", details: "Sing hello. Shake the wrapped box: “What's in the present?” Open it slowly and pull out one printed card. Everyone says the word." },
      { time: "8 min", step: "Meet the Christmas words", details: "Go through the flashcards. Say each word, press 🔊, and have the class repeat. Add actions: ring a bell, shiver for snowflake, “ho ho ho” for Santa, hands up like branches for Christmas tree." },
      { time: "5 min", step: "Song: Jingle Bells", details: "Sing or listen. Children shake pretend bells (or the real bell) every time they hear “jingle”." },
      { time: "10 min", step: "Games", details: "Play What's in the Stocking?, then Ring the Bell." },
      { time: "5 min", step: "Movement break", details: "Sing I'm a Little Snowman with actions, then Freeze like a Snowman to the music." },
      { time: "15 min", step: "Craft: Paper Plate Santa", details: "Follow the craft steps below. Ask “What colour is Santa's hat?” and “Is the beard white or red?”" },
      { time: "7 min", step: "Present swap", details: "Children sit in a circle and pass the wrapped box. Each child gives it to the next one: “Here's a present for you!” “Thank you! Merry Christmas!”" },
      { time: "5 min", step: "Review and goodbye", details: "Quick round of What's Missing?, then click through the flashcards together to the 🎉 screen and say “Merry Christmas!”" }
    ],
    crafts: [
      {
        name: "Paper Plate Santa",
        time: "15 min",
        supplies: ["Paper plates", "Red paper triangles for the hat (cut before class)", "Cotton wool balls", "Glue sticks", "Crayons"],
        steps: [
          "Children colour a face in the middle of the plate: two eyes, a red nose and pink cheeks.",
          "Glue the red triangle at the top for Santa's hat.",
          "Glue cotton wool along the bottom half for the beard, and one ball on the tip of the hat.",
          "Hold it up and say “Ho ho ho! Merry Christmas!”"
        ],
        tip: "Put a big dot of glue where the beard goes, so children just press the cotton wool on."
      },
      {
        name: "Handprint Christmas Tree",
        time: "15 min",
        supplies: ["Green paint in a shallow tray", "White paper", "A brown paper rectangle for the trunk", "Coloured stickers or dot paints for baubles", "Wet wipes"],
        steps: [
          "Each child makes 3–6 green handprints, fingers pointing down, stacked like a triangle (adult guides).",
          "Glue the brown trunk at the bottom.",
          "When dry, add stickers as baubles and a yellow star on top.",
          "Count the baubles together in English: “One, two, three…”"
        ],
        tip: "Write each child's name on the paper first, and have wipes ready before the paint comes out."
      }
    ],
    songs: [
      {
        title: "Jingle Bells",
        tune: "Traditional",
        how: "Show the bell card before you start. Children shake pretend bells on every “jingle”, and gallop on the spot for “one-horse open sleigh”.",
        search: "jingle bells kids song"
      },
      {
        title: "I'm a Little Snowman",
        tune: "I'm a Little Teapot",
        words: "I'm a little snowman, round and white,\nHere is my scarf and my hat so bright.\nWhen the sun comes out, I melt away,\nDrip, drip, drip… goodbye for today!",
        how: "Hands make a big round tummy, touch your neck for the scarf and your head for the hat. On “melt away”, sink slowly to the floor.",
        search: "i'm a little teapot kids song"
      },
      {
        title: "We Wish You a Merry Christmas",
        tune: "Traditional",
        how: "Sing the first verse only. Children wave on “Merry Christmas” and hug themselves on “and a happy new year”.",
        search: "we wish you a merry christmas kids song"
      }
    ],
    games: [
      { name: "What's in the Stocking?", how: "Hide a printed card in a sock or stocking. Give clues (“It's cold. It's white. It has a carrot nose!”) until a child guesses. The winner hides the next card." },
      { name: "Ring the Bell", how: "Lay out 4–6 printed cards. Say a word and a child rings the bell, then touches the right card. Let children take turns calling the word." },
      { name: "What's Missing?", how: "Show 5 cards, say them together, then children close their eyes. Take one away: “What's missing?” Make it harder by adding more cards." },
      { name: "Memory Match", how: "Print two sets and lay them face down. Children turn over two cards and say both words. A matching pair stays face up." },
      { name: "Spain tip: Los Reyes Magos", how: "After the holidays, use the star, present and candle cards to talk about the Three Kings: “The Three Kings follow the star. They bring presents!” Children can draw their own crown." }
    ]
  },
  garden: {
    goal: "Children can name 12 things found in a garden, and say what a plant needs: water and sun.",
    materials: [
      "Screen or tablet with the My Little Garden flashcards",
      "Printed garden cards (stick a few around the room for Bug Hunt)",
      "A real flower or leaf, and a few seeds (beans or sunflower seeds)",
      "Small cups, soil and a watering can for the planting activity",
      "Craft supplies: see “Paper Plate Flower” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and mystery bag", details: "Sing hello. Pull a real leaf, flower or seed out of a bag: “What is it? It's a leaf!” Let children touch and smell it." },
      { time: "8 min", step: "Meet the garden", details: "Go through the flashcards. Say each word, press 🔊, and have the class repeat. Add actions: flap for butterfly, buzz for bee, wiggle for worm, slow creeping hands for snail, digging for spade." },
      { time: "5 min", step: "Song: This Is the Way We Water the Flowers", details: "Sing it with actions: digging, planting a seed, watering and growing tall." },
      { time: "10 min", step: "Games", details: "Play Bug Hunt, then Grow, Little Seed!" },
      { time: "5 min", step: "Movement break", details: "Play Garden Moves: call out a card and children move like it (flutter, buzz, crawl, wriggle). Freeze when you say “Rain!”" },
      { time: "15 min", step: "Craft: Paper Plate Flower", details: "Follow the craft steps below. Ask “What colour is your flower?” and “What does a flower need?” (water, sun)." },
      { time: "7 min", step: "Plant a seed", details: "Each child puts soil in a cup, pushes in a seed and gives it a little water with the watering can. Say together: “Grow, grow, grow!” Put the cups by a sunny window." },
      { time: "5 min", step: "Review and goodbye", details: "Quick round of Who's in the Garden?, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Paper Plate Flower",
        time: "15 min",
        supplies: ["Small paper plates (one per child)", "Coloured paper petals (cut before class)", "A green paper strip for the stem and two leaves", "Glue sticks", "Yellow crayons"],
        steps: [
          "Children colour the middle of the plate yellow.",
          "Glue the petals all around the edge of the plate.",
          "Glue on the green stem and two leaves.",
          "Count the petals together in English: “One, two, three…”"
        ],
        tip: "Write each child's name on a leaf so the flowers can make a class garden on the wall."
      },
      {
        name: "Handprint Butterfly",
        time: "15 min",
        supplies: ["Paint in two bright colours", "White paper", "A black paper strip for the body", "Wet wipes"],
        steps: [
          "Children press two handprints next to each other, thumbs touching (adult guides).",
          "When dry, glue the black strip down the middle for the body.",
          "Draw two antennae and add dots to the wings.",
          "Flap your arms and fly your butterfly round the room!"
        ],
        tip: "Fold the paper in half for a quick mirror butterfly: paint dots on one side, fold, press and open."
      }
    ],
    songs: [
      {
        title: "This Is the Way We Water the Flowers",
        tune: "Here We Go Round the Mulberry Bush",
        words: "This is the way we dig the ground, dig the ground, dig the ground,\nThis is the way we dig the ground in my little garden.\nThis is the way we plant a seed…\nThis is the way we water the flowers…\nThis is the way the flowers grow…",
        how: "Do the actions: dig with a pretend spade, push in a seed, pour the watering can, then crouch down and grow up tall on tiptoes.",
        search: "here we go round the mulberry bush kids song"
      },
      {
        title: "Incy Wincy Spider",
        tune: "Traditional",
        how: "A favourite garden rhyme. Use finger actions for the spider climbing, rain falling and sun coming out. Then try it with “Busy busy bee” or “Slow slow snail”.",
        search: "incy wincy spider kids song"
      }
    ],
    games: [
      { name: "Bug Hunt", how: "Hide the butterfly, bee, ladybird, snail and worm cards around the room. Children hunt for them. When they find one, they shout its name and bring it back to the “garden” (a green mat)." },
      { name: "Grow, Little Seed!", how: "Children curl up small like seeds. Pretend to water them and say “Sun! Rain! Grow, grow, grow!” They slowly grow into tall flowers or trees, then open their arms like petals." },
      { name: "Who's in the Garden?", how: "Lay out the cards and cover one with your hand. “Who's in the garden? It's small, red and has black dots!” Children guess: ladybird!" },
      { name: "Garden Tools", how: "Mime using a spade or a watering can, or picking a flower. Children guess and point to the right card, then take turns miming." },
      { name: "Spain tip: el huerto escolar", how: "If your school has a huerto, take the printed cards outside. Children find the real thing (a leaf, a worm, the spade) and hold the card next to it: “Look, a worm!”" }
    ]
  },
  feelings: {
    goal: "Children can name 10 feelings, show each one with their face, and say when they might feel it.",
    materials: [
      "Screen or tablet with the Feelings flashcards",
      "Printed feelings cards (use “Print cards” on the topic page)",
      "A small mirror for each pair of children (or one for the class)",
      "Feelings colouring sheets (see the Printable Worksheets page)",
      "Craft supplies: see “Paper Plate Face” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and mirror faces", details: "Sing hello. Children look in a mirror and show how they feel today: “I feel happy!” Let them swap and say what they see." },
      { time: "8 min", step: "Meet the feelings", details: "Go through the flashcards. Say each word, press 🔊, and have the class copy the face together. Ask “When do you feel this way?” and take one or two answers." },
      { time: "5 min", step: "Song: If You're Happy and You Know It", details: "Sing with actions for each feeling: clap for happy, stomp for angry, rub the eyes for sleepy." },
      { time: "10 min", step: "Games", details: "Play Feelings Freeze, then Guess the Feeling." },
      { time: "5 min", step: "Movement break", details: "Feeling Walk: stomp like angry, tiptoe like scared, wiggle like silly, then freeze with a calm face." },
      { time: "15 min", step: "Craft: Paper Plate Face", details: "Follow the craft steps below. Ask “What face are you making?” and “What would make you feel that way?”" },
      { time: "7 min", step: "Colour the feelings", details: "Give out the feelings colouring sheet. Children colour one face and say which feeling it shows." },
      { time: "5 min", step: "Review and goodbye", details: "Click through the flashcards together all the way to the 🎉 screen. Each child shows their favourite feeling face." }
    ],
    crafts: [
      {
        name: "Paper Plate Face",
        time: "15 min",
        supplies: ["Paper plates (one per child)", "Crayons", "Cotton wool for hair or a beard", "Yarn for hair", "Glue sticks"],
        steps: [
          "Children draw eyes, a nose and a mouth with crayons, showing one feeling.",
          "Glue on cotton wool or yarn for hair.",
          "Hold the face up and say the feeling: “I am sleepy!”",
          "Ask the class to guess the feeling from the face."
        ],
        tip: "Draw a simple face outline on each plate before class, so children only add the features."
      }
    ],
    songs: [
      {
        title: "If You're Happy and You Know It",
        tune: "Traditional",
        how: "Use the actions for each feeling: clap for happy, stomp for angry, tiptoe for scared, rub eyes for sleepy, and wave for silly.",
        search: "if you're happy and you know it kids song"
      }
    ],
    games: [
      { name: "Feelings Freeze", how: "Play music and dance. When the music stops, call out a feeling. Children freeze and show that face. Children who show it well can call the next feeling." },
      { name: "Guess the Feeling", how: "Make a face without words. Children guess the feeling, then point to the right card. Take turns so each child has a go." },
      { name: "Calm Down", how: "When a child is upset, use the calm card. Breathe in like smelling a flower, and breathe out like blowing out a candle. Repeat three times together." }
    ]
  },
  opposites: {
    goal: "Children can say the opposite of each word in the 10 pairs, and point to the one that matches.",
    materials: [
      "Screen or tablet with the Opposites pairs",
      "Printed opposites cards (use “Print cards” on the topic page)",
      "A big ball and a small ball, or a big cup and a small cup",
      "A torch, for light and dark",
      "A cardboard box, for in and out",
      "Craft supplies: see “Big and Small Paper Balls” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and big and small", details: "Sing hello. Stand up big with arms wide, then small, crouched down. Ask “Am I big or small?”" },
      { time: "8 min", step: "Meet the pairs", details: "Show each pair on the screen. Press 🔊 Say the pair, so children hear “hot is the opposite of cold”, then have them repeat it and point to each picture." },
      { time: "5 min", step: "Song: Up and Down", details: "Sing with actions: arms up for up, bend down for down. Then try fast and slow, moving quickly, then slowly." },
      { time: "10 min", step: "Games", details: "Play Say the Opposite, then Find the Pair." },
      { time: "5 min", step: "Movement break", details: "Hop up and down, then move fast and then slow. Call out “In!” and children go into a circle, “Out!” and they step out." },
      { time: "15 min", step: "Craft: Big and Small Paper Balls", details: "Follow the craft steps below. Ask “Which one is big? Which one is small?”" },
      { time: "7 min", step: "Light and dark", details: "Turn off the lights for ten seconds, then switch them on. Ask “Is it light or dark?” Use the torch to show light." },
      { time: "5 min", step: "Review and goodbye", details: "Click through the pairs together to the 🎉 screen. Each child says one pair." }
    ],
    crafts: [
      {
        name: "Big and Small Paper Balls",
        time: "15 min",
        supplies: ["Sheets of scrap paper", "Glue sticks", "Crayons", "A sheet of coloured paper for each child"],
        steps: [
          "Children crumple one sheet tightly into a small ball and one sheet loosely into a big ball.",
          "Glue the small ball on one side of the coloured paper and the big ball on the other.",
          "Write or draw “big” and “small” next to each ball.",
          "Hold up the two balls and say “big and small” together."
        ],
        tip: "Use a sheet of paper for the big ball and a quarter sheet for the small one, so the difference is clear."
      }
    ],
    songs: [
      {
        title: "Up and Down",
        tune: "Head, Shoulders, Knees and Toes",
        words: "Up and down, up and down,\nHands go up and hands go down,\nFast and slow, fast and slow,\nWe can move the way we go.",
        how: "Sing the verses and do the actions: hands up for up, bend down for down, hop fast, then move slowly.",
        search: "head shoulders knees and toes kids song"
      }
    ],
    games: [
      { name: "Say the Opposite", how: "Say a word, such as “big”. Children shout the opposite, “small!”, then point to the card. Change the words quickly as they get good at it." },
      { name: "Find the Pair", how: "Put two cards from one pair on the floor, one at each side of the room. Children run to the one that matches the word you say." },
      { name: "Open or Closed?", how: "Hold up the card for open or closed. Children make the action: arms wide for open, hands together for closed." }
    ]
  },
  madrid: {
    goal: "Children can name 5 places in Madrid, point to each one on a picture, and say which one they like best.",
    materials: [
      "Screen or tablet with the Madrid flashcards",
      "Printed Madrid cards (use “Print cards” on the topic page)",
      "A map of Spain, or a globe, to show where Madrid is",
      "A picture of a bus or a metro train, if you have one",
      "Craft supplies: see “Madrid Postcard” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and where are we?", details: "Sing hello. Show the map of Spain and point to Madrid in the middle. Say “This is where we are going today!”" },
      { time: "8 min", step: "Meet Madrid", details: "Go through the flashcards. Say each name, press 🔊, and have the class repeat it. Point to the picture and ask “What can you see?”" },
      { time: "5 min", step: "Song: Madrid, Madrid", details: "Sing to a traditional tune, pointing to each card as you name it." },
      { time: "10 min", step: "Games", details: "Play Where Am I?, then Walk to the Park." },
      { time: "5 min", step: "Movement break", details: "Walk around the room like a visitor, stopping at each card to say its name and do a big stretch for the tall buildings." },
      { time: "15 min", step: "Craft: Madrid Postcard", details: "Follow the craft steps below. Ask “Which place would you like to visit?”" },
      { time: "7 min", step: "Show and tell", details: "Each child holds up their postcard and says the name of their place: “This is Retiro Park!”" },
      { time: "5 min", step: "Review and goodbye", details: "Click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Madrid Postcard",
        time: "15 min",
        supplies: ["A4 card, cut in half (one per child)", "Crayons", "A printed Madrid card for each child"],
        steps: [
          "Children draw a picture of the place on the front of the card.",
          "Glue the printed card or write the name in the middle.",
          "On the back, draw a line for the address and a stamp.",
          "Read the name together: “Madrid!”"
        ],
        tip: "Give each child a different place, so the class ends up with a set of five postcards."
      }
    ],
    songs: [
      {
        title: "Madrid, Madrid",
        tune: "Frère Jacques",
        words: "Madrid, Madrid,\nWhere is the sun?\nPark, park, Retiro park,\nWe have big fun.",
        how: "Sing the words, pointing to each card in turn. Change the last line to name another place from the cards.",
        search: "frere jacques kids song"
      }
    ],
    games: [
      { name: "Where Am I?", how: "Show a card with its picture covered, then slowly show more. Children guess the place, then point to the matching card." },
      { name: "Walk to the Park", how: "Lay the cards in a line on the floor, with Retiro Park at the end. Children take turns walking from one card to the next, saying each name." },
      { name: "Which One Is It?", how: "Describe a place: “It has a big park and a lake!” Children guess and point to the card, such as Retiro Park." }
    ]
  }
};
