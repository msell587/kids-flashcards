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
    goal: "Children can name the 10 colours and find things of each colour around them.",
    materials: [
      "Screen or tablet with the Colors flashcards",
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
    goal: "Children can name the 4 seasons and 5 kinds of weather, and say what the weather is like today.",
    materials: [
      "Screen or tablet with the Seasons and Weather flashcards",
      "Printed season and weather cards",
      "Dress-up clothes if you have them (hat, scarf, sunglasses)",
      "Craft supplies: see “Four Seasons Tree” below"
    ],
    plan: [
      { time: "5 min", step: "Hello and weather check", details: "Sing hello, then sing “What's the Weather?” and look out of the window together." },
      { time: "8 min", step: "Meet the weather", details: "Go through the flashcards. Say each word, press 🔊, have the class repeat, and add an action (shiver for snowy, sway for windy)." },
      { time: "5 min", step: "Song: Rain, Rain, Go Away", details: "Tap fingers like rain, then throw arms up for the sun." },
      { time: "10 min", step: "Games", details: "Play Act the Weather, then Four Corners with the season cards." },
      { time: "5 min", step: "Movement break", details: "Play Dress for the Weather, using real clothes if you have them." },
      { time: "15 min", step: "Craft: Four Seasons Tree", details: "Follow the craft steps below. Name each season as children decorate its branch." },
      { time: "7 min", step: "Weather Reporter", details: "Children take turns being the reporter, holding up the right card: “Today it's sunny!” Others point to the matching season on their tree." },
      { time: "5 min", step: "Review and goodbye", details: "Sing “What's the Weather?” once more, then click through the flashcards together to the 🎉 screen." }
    ],
    crafts: [
      {
        name: "Four Seasons Tree",
        time: "15 min",
        supplies: ["A bare tree outline with four branches, on large paper", "Pink tissue paper (spring)", "Green paper (summer)", "Orange and brown paper (fall)", "Cotton wool (winter)", "Glue sticks"],
        steps: [
          "Label the four branches spring, summer, fall and winter together.",
          "Spring: scrunch pink tissue into blossoms and glue them on.",
          "Summer: glue on green leaves. Fall: glue on orange and brown leaves.",
          "Winter: stick cotton wool snow on the last branch."
        ],
        tip: "Ask “What's the weather like in winter?” as children work, to link seasons to weather words."
      },
      {
        name: "Weather Wheel",
        time: "15 min",
        supplies: ["Paper plates divided into five sections", "Crayons", "A card arrow", "Split pin fastener (adult only)"],
        steps: [
          "Children draw sunny, rainy, cloudy, snowy and windy, one in each section.",
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
      { name: "Act the Weather", how: "Show a card and everyone acts it out: big arms for sunny, tapping fingers for rainy, swaying for windy, shivering for snowy, floating slowly for cloudy." },
      { name: "Weather Reporter", how: "A child stands at the front, looks outside and holds up the right card: “Today it's sunny!” The class claps." },
      { name: "Dress for the Weather", how: "Call out a weather and children mime putting on the right clothes: a coat and scarf for snowy, sunglasses for sunny, boots for rainy." },
      { name: "Four Corners", how: "Put a season card in each corner of the room. Call a season and children run to that corner. Then call “Summer, sunny!” for a challenge." }
    ]
  }
};
