// Every game for each topic, in one place. The Class Game page and the Teacher's Corner both read from here,
// so a new game is added once and shows up in both. Keys match the topic keys in topics.js.
// Games that take a ?topic= address work for any topic; the others are written for one topic.
const TOPIC_GAMES = {
  explorers: [
    { name: "Insect or Bug?", href: "insect-or-bug.html" },
    { name: "What Can It Do?", href: "what-can-it-do.html" }
  ],
  seasons: [
    { name: "Picture Guess", href: "picture-guess.html?topic=seasons" },
    { name: "Spring Guess", href: "spring-guess.html" },
    { name: "Summer Guess", href: "summer-guess.html" },
    { name: "Autumn Guess", href: "autumn-guess.html" },
    { name: "Winter Guess", href: "winter-guess.html" },
    { name: "Season Sort", href: "season-game.html" },
    { name: "Season Quiz", href: "season-quiz.html" }
  ],
  garden: [
    { name: "Food Game", href: "food-game.html" }
  ],
  transport: [
    { name: "Big, Small, Fast or Slow?", href: "on-the-move-games.html?game=adjectives" },
    { name: "One or Many?", href: "on-the-move-games.html?game=plural" },
    { name: "Its or They're?", href: "on-the-move-games.html?game=its" },
    { name: "This or That?", href: "on-the-move-games.html?game=thisthat" }
  ],
  community: [
    { name: "Who is a ___?", href: "community-game.html?game=who" },
    { name: "Who is ___ing?", href: "community-game.html?game=doing" },
    { name: "What does a ___ do?", href: "community-game.html?game=does" }
  ],
  animals: [
    { name: "Farm, Pets or Wild?", href: "animals-game.html?game=group" },
    { name: "Which one says ___?", href: "animals-game.html?game=sound" },
    { name: "Find the ___", href: "topic-game.html?topic=animals&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=animals&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=animals&game=spanish" }
  ],
  colors: [
    { name: "Find the ___", href: "topic-game.html?topic=colors&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=colors&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=colors&game=spanish" }
  ],
  shapes: [
    { name: "Find the ___", href: "topic-game.html?topic=shapes&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=shapes&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=shapes&game=spanish" }
  ],
  house: [
    { name: "Find the ___", href: "topic-game.html?topic=house&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=house&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=house&game=spanish" }
  ],
  opposites: [
    { name: "Find the ___", href: "topic-game.html?topic=opposites&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=opposites&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=opposites&game=spanish" }
  ],
  city: [
    { name: "Find the ___", href: "topic-game.html?topic=city&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=city&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=city&game=spanish" }
  ],
  christmas: [
    { name: "Find the ___", href: "topic-game.html?topic=christmas&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=christmas&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=christmas&game=spanish" }
  ],
  feelings: [
    { name: "Find the ___", href: "topic-game.html?topic=feelings&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=feelings&game=what" },
    { name: "In Spanish?", href: "topic-game.html?topic=feelings&game=spanish" }
  ],
  madrid: [
    { name: "Find the ___", href: "topic-game.html?topic=madrid&game=which" },
    { name: "What Is This?", href: "topic-game.html?topic=madrid&game=what" }
  ],
  days: [
    { name: "What Comes After?", href: "days-game.html?game=after" },
    { name: "What Comes Before?", href: "days-game.html?game=before" },
    { name: "Which Picture Is It?", href: "days-game.html?game=which" }
  ],
  undersea: [
    { name: "This or That?", href: "undersea-game.html?game=thisthat" },
    { name: "Where Is It?", href: "undersea-game.html?game=where" },
    { name: "Which One Is a ___?", href: "undersea-game.html?game=which" }
  ],
  toys: [
    { name: "Ball or no ball?", href: "toys-game.html?game=ball" },
    { name: "What is he or she doing?", href: "toys-game.html?game=doing" },
    { name: "Whose is it?", href: "toys-game.html?game=owner" }
  ],
  weather: [
    { name: "Picture Guess", href: "picture-guess.html?topic=weather" },
    { name: "Weather Sort", href: "weather-sort.html" },
    { name: "Weather Quiz", href: "weather-quiz.html" },
    { name: "Weather Memory", href: "weather-memory.html" },
    { name: "Hot or Cold?", href: "hot-cold-game.html?game=hotcold" },
    { name: "What Should I Wear?", href: "hot-cold-game.html?game=wear" },
    { name: "It Is ___ Today", href: "weather-sentence-game.html?game=fill" },
    { name: "Is It ___ Today?", href: "weather-sentence-game.html?game=yesno" },
    { name: "Find the Clothes", href: "clothes-game.html?game=find" },
    { name: "I Need My ___", href: "clothes-game.html?game=sentence" },
    { name: "When Do I Wear It?", href: "clothes-game.html?game=when" },
    { name: "How Do I Feel?", href: "weather-feelings-game.html?game=feel" },
    { name: "I Am Cold! Find Me", href: "weather-feelings-game.html?game=find" },
    { name: "It Is Snowy. I Am ___", href: "weather-feelings-game.html?game=weather" }
  ]
};
