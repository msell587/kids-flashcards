// Colouring pictures for every topic, drawn as cute cartoon characters with faces.
// Each scene is a drawing in a 400 × 300 box.
// "regions" are the parts a child can colour (on screen, or on a printed sheet).
// "details" are lines, eyes and words that are drawn on top and are never coloured:
//   class "line" = an outline to colour around, "dot" = a black dot, "shine" = a white eye shine,
//   class "label" = a word.
// "name" is said aloud when a region is tapped on screen.
// Keys match the topic keys in topics.js.

// A cute face: two eyes with shines, and a smile. (cx, cy) is the centre, d is half the eye gap, s is size
function face(cx, cy, d, s) {
  return (
    `<circle class="dot" cx="${cx - d}" cy="${cy}" r="${3.5 * s}"/>` +
    `<circle class="shine" cx="${cx - d + 1.2 * s}" cy="${cy - 1.2 * s}" r="${1.2 * s}"/>` +
    `<circle class="dot" cx="${cx + d}" cy="${cy}" r="${3.5 * s}"/>` +
    `<circle class="shine" cx="${cx + d + 1.2 * s}" cy="${cy - 1.2 * s}" r="${1.2 * s}"/>` +
    `<path class="line" d="M${cx - 6 * s},${cy + 8 * s} Q${cx},${cy + 16 * s} ${cx + 6 * s},${cy + 8 * s}"/>`
  );
}

// A fluffy cloud, painted as one region: (cx, cy) is the middle, s is size
function cloud(cx, cy, s) {
  // One outline with rounded bumps, so no lines show inside the cloud
  return (
    `<path d="M${cx - 40 * s},${cy + 22 * s} ` +
    `Q${cx - 56 * s},${cy + 22 * s} ${cx - 50 * s},${cy + 8 * s} ` +
    `Q${cx - 46 * s},${cy - 8 * s} ${cx - 26 * s},${cy - 6 * s} ` +
    `Q${cx - 18 * s},${cy - 34 * s} ${cx + 6 * s},${cy - 26 * s} ` +
    `Q${cx + 26 * s},${cy - 36 * s} ${cx + 32 * s},${cy - 8 * s} ` +
    `Q${cx + 56 * s},${cy - 2 * s} ${cx + 48 * s},${cy + 14 * s} ` +
    `Q${cx + 46 * s},${cy + 22 * s} ${cx + 34 * s},${cy + 22 * s} Z"/>`
  );
}

// Rays round a sun centred on (cx, cy)
function sunRays(cx, cy, inner, outer) {
  let out = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const x1 = cx + inner * Math.cos(a), y1 = cy + inner * Math.sin(a);
    const x2 = cx + outer * Math.cos(a), y2 = cy + outer * Math.sin(a);
    out += `<line class="line" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  return out;
}

// Little window grid: outline rectangles for a block of windows
function windowGrid(x, y, cols, rows, gapX, gapY, w, h) {
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out += `<rect class="line" x="${x + c * gapX}" y="${y + r * gapY}" width="${w}" height="${h}" rx="3"/>`;
    }
  }
  return out;
}

const SCENES = {
  shapes: {
    title: "Shapes",
    regions: [
      { name: "circle", svg: '<circle cx="60" cy="80" r="45"/>' },
      { name: "square", svg: '<rect x="130" y="35" width="90" height="90" rx="10"/>' },
      { name: "triangle", svg: '<polygon points="270,125 225,40 315,40"/>' },
      { name: "oval", svg: '<ellipse cx="350" cy="80" rx="45" ry="30"/>' },
      { name: "heart", svg: '<path d="M60,250 C20,215 20,180 45,180 C58,180 60,192 60,192 C60,192 62,180 75,180 C100,180 100,215 60,250 Z"/>' },
      { name: "diamond", svg: '<polygon points="200,170 240,215 200,260 160,215"/>' },
      { name: "rectangle", svg: '<rect x="280" y="185" width="95" height="60" rx="10"/>' }
    ],
    details:
      face(60, 78, 16, 1.1) +
      face(175, 72, 16, 1.1) +
      face(265, 88, 10, 0.9) +
      face(350, 78, 14, 1) +
      face(50, 212, 14, 1) +
      face(200, 212, 10, 0.9) +
      face(327, 212, 16, 1) +
      '<text class="label" x="60" y="152">circle</text>' +
      '<text class="label" x="175" y="152">square</text>' +
      '<text class="label" x="270" y="152">triangle</text>' +
      '<text class="label" x="350" y="152">oval</text>' +
      '<text class="label" x="60" y="292">heart</text>' +
      '<text class="label" x="200" y="292">diamond</text>' +
      '<text class="label" x="327" y="292">rectangle</text>'
  },

  // Same rainbow on screen and on paper
  colors: {
    title: "Colours",
    regions: [
      { name: "red", svg: '<path d="M20,260 A180,180 0 0 1 380,260 L360,260 A160,160 0 0 0 40,260 Z"/>' },
      { name: "orange", svg: '<path d="M40,260 A160,160 0 0 1 360,260 L340,260 A140,140 0 0 0 60,260 Z"/>' },
      { name: "yellow", svg: '<path d="M60,260 A140,140 0 0 1 340,260 L320,260 A120,120 0 0 0 80,260 Z"/>' },
      { name: "green", svg: '<path d="M80,260 A120,120 0 0 1 320,260 L300,260 A100,100 0 0 0 100,260 Z"/>' },
      { name: "blue", svg: '<path d="M100,260 A100,100 0 0 1 300,260 L280,260 A80,80 0 0 0 120,260 Z"/>' },
      { name: "purple", svg: '<path d="M120,260 A80,80 0 0 1 280,260 L260,260 A60,60 0 0 0 140,260 Z"/>' }
    ],
    details: ""
  },

  animals: {
    title: "Animals",
    regions: [
      { name: "grass", svg: '<rect x="0" y="240" width="400" height="60"/>' },
      { name: "sun", svg: '<circle cx="355" cy="50" r="26"/>' },
      // Elephant: big round ears, a curly trunk, two little legs
      { name: "elephant", svg: '<ellipse cx="100" cy="176" rx="60" ry="44"/><ellipse cx="100" cy="118" rx="46" ry="40"/><ellipse cx="52" cy="118" rx="16" ry="28"/><ellipse cx="148" cy="118" rx="16" ry="28"/><path d="M120,140 Q142,166 128,190 Q120,200 112,194 Q124,180 110,160 Z"/><rect x="66" y="196" width="22" height="36" rx="10"/><rect x="112" y="196" width="22" height="36" rx="10"/>' },
      // Cow: rounded body, horns, two-tone spots
      { name: "cow", svg: '<rect x="170" y="150" width="112" height="64" rx="28"/><rect x="248" y="110" width="58" height="52" rx="22"/><polygon points="258,116 254,94 270,112"/><polygon points="294,112 304,92 302,118"/><rect x="184" y="200" width="18" height="36" rx="8"/><rect x="210" y="200" width="18" height="36" rx="8"/><rect x="242" y="200" width="18" height="36" rx="8"/><rect x="266" y="200" width="18" height="36" rx="8"/>' },
      // Pig: round body, snout, floppy ear, little legs
      { name: "pig", svg: '<ellipse cx="332" cy="182" rx="54" ry="38"/><ellipse cx="386" cy="182" rx="14" ry="11"/><polygon points="306,152 314,124 332,150"/><rect x="306" y="204" width="16" height="26" rx="8"/><rect x="342" y="204" width="16" height="26" rx="8"/>' }
    ],
    details:
      // Elephant face, tail
      face(100, 122, 16, 1.2) +
      '<path class="line" d="M162,158 q12,-6 10,8"/>' +
      // Cow face, spots, tail
      face(268, 136, 12, 1) +
      '<ellipse class="line" cx="290" cy="158" rx="10" ry="7"/>' +
      '<circle class="line" cx="206" cy="170" r="9"/>' +
      '<circle class="line" cx="236" cy="184" r="7"/>' +
      '<circle class="line" cx="252" cy="160" r="6"/>' +
      '<path class="line" d="M282,176 q14,-2 16,12"/>' +
      // Pig face, nostrils, curly tail
      face(340, 170, 10, 1) +
      '<circle class="dot" cx="383" cy="180" r="1.8"/>' +
      '<circle class="dot" cx="390" cy="180" r="1.8"/>' +
      '<path class="line" d="M280,180 q-12,-8 -6,-18 q6,-6 10,0"/>' +
      // Grass tufts
      '<path class="line" d="M30,240 l-6,-12 M36,240 l0,-14 M42,240 l6,-12 M200,240 l-6,-12 M206,240 l0,-14 M212,240 l6,-12"/>' +
      sunRays(355, 50, 34, 44) +
      face(355, 50, 10, 1)
  },

  house: {
    title: "My House",
    regions: [
      { name: "sun", svg: '<circle cx="340" cy="50" r="28"/>' },
      { name: "chimney", svg: '<rect x="260" y="80" width="22" height="45"/>' },
      { name: "roof", svg: '<polygon points="96,140 175,66 254,140"/>' },
      { name: "wall", svg: '<rect x="110" y="135" width="130" height="105" rx="6"/>' },
      { name: "window", svg: '<rect x="122" y="152" width="26" height="26" rx="4"/><rect x="204" y="152" width="26" height="26" rx="4"/>' },
      { name: "door", svg: '<path d="M160,240 L160,192 Q160,178 175,178 Q190,178 190,192 L190,240 Z"/>' },
      { name: "tree", svg: '<rect x="330" y="170" width="14" height="70"/><circle cx="337" cy="150" r="32"/>' },
      { name: "garden", svg: '<rect x="0" y="240" width="400" height="60"/>' }
    ],
    details:
      sunRays(340, 50, 36, 48) +
      face(340, 50, 10, 1) +
      '<line class="line" x1="135" y1="152" x2="135" y2="178"/>' +
      '<line class="line" x1="122" y1="165" x2="148" y2="165"/>' +
      '<line class="line" x1="217" y1="152" x2="217" y2="178"/>' +
      '<line class="line" x1="204" y1="165" x2="230" y2="165"/>' +
      '<circle class="dot" cx="182" cy="212" r="3"/>' +
      '<path class="line" d="M160,240 L140,300 M190,240 L210,300"/>' +
      '<path class="line" d="M292,96 q-6,-8 0,-12"/>'
  },

  seasons: {
    title: "Seasons",
    // Printable sheets: one picture per season, each printed on its own A4 page
    sheetImages: [
      { label: "Spring", src: "images/coloring-sheets/spring.png" },
      { label: "Summer", src: "images/coloring-sheets/summer.png" },
      { label: "Autumn", src: "images/coloring-sheets/autumn.png" },
      { label: "Winter", src: "images/coloring-sheets/winter.png" }
    ],
    regions: [
      { name: "summer sun", svg: '<circle cx="50" cy="80" r="34"/>' },
      { name: "spring flower", svg: '<circle cx="130" cy="70" r="20"/><circle cx="160" cy="100" r="20"/><circle cx="130" cy="130" r="20"/><circle cx="100" cy="100" r="20"/><circle cx="130" cy="100" r="16"/>' },
      { name: "autumn leaf", svg: '<path d="M195,160 C190,110 230,70 270,70 C275,120 240,160 195,160 Z"/>' },
      { name: "winter snowman", svg: '<circle cx="320" cy="215" r="30"/><circle cx="320" cy="170" r="22"/><circle cx="320" cy="135" r="17"/><rect x="302" y="110" width="36" height="9" rx="3"/><rect x="310" y="88" width="20" height="22" rx="3"/>' },
      { name: "grass", svg: '<rect x="0" y="262" width="400" height="38"/>' }
    ],
    details:
      sunRays(50, 80, 42, 56) +
      face(50, 80, 12, 1) +
      '<path class="line" d="M130,134 L130,262"/>' +
      '<path class="line" d="M130,200 q-18,-14 -26,4"/>' +
      '<path class="line" d="M197,158 L262,80"/>' +
      '<path class="line" d="M195,160 L185,215"/>' +
      face(130, 100, 9, 0.8) +
      face(232, 110, 10, 0.9) +
      '<polygon class="line" points="318,150 326,152 318,156"/>' +
      '<circle class="dot" cx="320" cy="180" r="2.5"/>' +
      '<circle class="dot" cx="320" cy="200" r="2.5"/>' +
      face(320, 134, 6, 0.8) +
      '<text class="label" x="50" y="292">summer</text>' +
      '<text class="label" x="130" y="292">spring</text>' +
      '<text class="label" x="232" y="292">autumn</text>' +
      '<text class="label" x="320" y="292">winter</text>'
  },

  weather: {
    title: "Weather",
    // Printable sheets: one picture with all the weather, and one with hot and cold; each is printed on its own A4 page
    sheetImages: [
      { label: "Weather", src: "images/coloring-sheets/weather.png" },
      { label: "Hot and cold", src: "images/coloring-sheets/hot-and-cold.svg" }
    ],
    regions: [
      { name: "sunny", svg: '<circle cx="65" cy="75" r="34"/>' },
      { name: "cloudy", svg: cloud(190, 75, 1.1) },
      { name: "rainy", svg: cloud(320, 62, 0.9) + '<ellipse cx="302" cy="104" rx="6" ry="10"/><ellipse cx="320" cy="118" rx="6" ry="10"/><ellipse cx="338" cy="104" rx="6" ry="10"/>' },
      { name: "snowy", svg: '<circle cx="65" cy="230" r="26"/><circle cx="65" cy="196" r="18"/><rect x="50" y="176" width="30" height="7" rx="3"/><rect x="56" y="162" width="18" height="14" rx="2"/>' },
      { name: "windy", svg: '<rect x="118" y="212" width="120" height="14" rx="7"/><rect x="138" y="234" width="130" height="14" rx="7"/><rect x="116" y="256" width="110" height="14" rx="7"/>' },
      { name: "stormy", svg: cloud(345, 200, 0.8) + '<polygon points="335,226 315,256 331,256 321,286 355,250 339,250 351,226"/>' }
    ],
    details:
      sunRays(65, 75, 40, 52) +
      face(65, 75, 12, 1) +
      face(190, 72, 13, 1) +
      face(320, 58, 10, 0.9) +
      face(345, 196, 9, 0.8) +
      '<path class="line" d="M36,240 q-10,6 0,14 M96,240 q10,6 0,14"/>'
  },

  city: {
    title: "City",
    regions: [
      { name: "building", svg: '<rect x="30" y="60" width="80" height="190" rx="6"/><rect x="230" y="110" width="70" height="140" rx="6"/>' },
      { name: "shop", svg: '<rect x="130" y="160" width="85" height="90" rx="6"/><polygon points="122,160 134,136 212,136 222,160"/>' },
      { name: "car", svg: '<rect x="150" y="205" width="90" height="35" rx="12"/><rect x="172" y="186" width="44" height="22" rx="8"/><circle cx="170" cy="242" r="12"/><circle cx="222" cy="242" r="12"/>' },
      { name: "bus", svg: '<rect x="255" y="190" width="125" height="50" rx="12"/><circle cx="275" cy="245" r="12"/><circle cx="360" cy="245" r="12"/>' },
      { name: "traffic light", svg: '<rect x="316" y="95" width="28" height="46" rx="8"/><rect x="326" y="141" width="8" height="109"/>' },
      { name: "sun", svg: '<circle cx="370" cy="40" r="24"/>' },
      { name: "road", svg: '<rect x="0" y="250" width="400" height="50"/>' }
    ],
    details:
      windowGrid(44, 78, 2, 4, 30, 34, 18, 20) +
      windowGrid(244, 128, 2, 3, 30, 36, 18, 20) +
      '<rect class="line" x="140" y="180" width="30" height="70" rx="4"/>' +
      '<rect class="line" x="186" y="176" width="22" height="22" rx="3"/>' +
      '<circle class="line" cx="330" cy="106" r="6"/>' +
      '<circle class="line" cx="330" cy="120" r="6"/>' +
      '<circle class="line" cx="330" cy="134" r="6"/>' +
      '<rect class="line" x="265" y="198" width="28" height="18" rx="3"/>' +
      '<rect class="line" x="298" y="198" width="28" height="18" rx="3"/>' +
      '<rect class="line" x="331" y="198" width="28" height="18" rx="3"/>' +
      face(370, 40, 8, 0.8) +
      sunRays(370, 40, 30, 40) +
      '<path class="line" d="M20,275 L60,275 M90,275 L130,275 M160,275 L200,275 M230,275 L270,275 M300,275 L340,275"/>'
  },

  christmas: {
    title: "Christmas",
    regions: [
      { name: "tree", svg: '<polygon points="150,40 115,110 185,110"/><polygon points="150,80 105,160 195,160"/><polygon points="150,120 95,210 205,210"/><rect x="135" y="210" width="30" height="40"/>' },
      { name: "star", svg: '<polygon points="150,5 160,30 186,30 165,45 173,70 150,55 127,70 135,45 114,30 140,30"/>' },
      { name: "present", svg: '<rect x="40" y="190" width="70" height="60" rx="6"/><rect x="72" y="190" width="8" height="60"/><rect x="40" y="215" width="70" height="8"/>' },
      { name: "bell", svg: '<path d="M280,160 Q320,160 320,200 L330,220 L270,220 L280,200 Q280,160 280,160 Z"/>' },
      { name: "candle", svg: '<rect x="345" y="190" width="18" height="60" rx="3"/><ellipse cx="354" cy="180" rx="6" ry="10"/>' }
    ],
    details:
      face(150, 16, 8, 0.6) +
      '<circle class="line" cx="170" cy="130" r="7"/>' +
      '<circle class="line" cx="128" cy="180" r="7"/>' +
      '<circle class="line" cx="170" cy="185" r="7"/>' +
      '<circle class="dot" cx="300" cy="232" r="5"/>' +
      face(300, 190, 10, 0.9) +
      '<path class="line" d="M354,168 L354,190"/>' +
      face(354, 212, 6, 0.6)
  },

  garden: {
    title: "My Little Garden",
    regions: [
      { name: "sun", svg: '<circle cx="350" cy="50" r="28"/>' },
      { name: "tree", svg: '<rect x="195" y="170" width="24" height="80" rx="4"/><circle cx="207" cy="130" r="52"/>' },
      { name: "flower", svg: '<rect x="60" y="150" width="6" height="100" rx="3"/><circle cx="63" cy="108" r="14"/><circle cx="48" cy="122" r="14"/><circle cx="78" cy="122" r="14"/><circle cx="55" cy="138" r="14"/><circle cx="71" cy="138" r="14"/>' },
      { name: "butterfly", svg: '<ellipse cx="300" cy="92" rx="22" ry="16"/><ellipse cx="326" cy="92" rx="22" ry="16"/><ellipse cx="305" cy="114" rx="14" ry="10"/><ellipse cx="321" cy="114" rx="14" ry="10"/>' },
      { name: "ladybird", svg: '<circle cx="330" cy="220" r="20"/><circle cx="330" cy="198" r="10"/>' },
      { name: "grass", svg: '<rect x="0" y="250" width="400" height="50"/>' }
    ],
    details:
      sunRays(350, 50, 36, 48) +
      face(350, 50, 10, 1) +
      face(63, 122, 6, 0.9) +
      '<line class="line" x1="313" y1="84" x2="313" y2="116"/>' +
      '<path class="line" d="M326,84 q8,-14 14,-14 M312,84 q-6,-14 -12,-14"/>' +
      '<line class="line" x1="310" y1="220" x2="350" y2="220"/>' +
      '<circle class="line" cx="322" cy="212" r="4"/>' +
      '<circle class="line" cx="338" cy="212" r="4"/>' +
      '<circle class="line" cx="330" cy="232" r="4"/>' +
      '<circle class="dot" cx="326" cy="196" r="2.2"/>' +
      '<circle class="dot" cx="334" cy="196" r="2.2"/>' +
      '<path class="line" d="M326,204 q4,3 8,0"/>' +
      '<path class="line" d="M30,250 l-6,-12 M36,250 l0,-14 M42,250 l6,-12"/>'
  },

  madrid: {
    title: "Madrid",
    regions: [
      { name: "building", svg: '<rect x="40" y="80" width="80" height="170" rx="6"/><rect x="230" y="120" width="70" height="130" rx="6"/>' },
      { name: "tower", svg: '<rect x="140" y="40" width="70" height="210" rx="6"/><polygon points="140,40 175,10 210,40"/>' },
      { name: "tree", svg: '<circle cx="340" cy="170" r="28"/><rect x="336" y="195" width="8" height="55"/>' },
      { name: "ground", svg: '<rect x="0" y="250" width="400" height="50"/>' }
    ],
    details:
      windowGrid(50, 96, 2, 4, 30, 36, 18, 20) +
      windowGrid(240, 136, 2, 3, 30, 36, 18, 20) +
      windowGrid(152, 120, 2, 3, 30, 36, 16, 18) +
      '<circle class="line" cx="175" cy="88" r="14"/>' +
      '<path class="line" d="M175,88 L175,78 M175,88 L183,92"/>'
  }
};
