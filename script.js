// ===== ELEMENT =====
const btnStart = document.getElementById("btnStart");
const btnToPassword = document.getElementById("btnToPassword");
const btnCheckPassword = document.getElementById("btnCheckPassword");
const btnEnd = document.getElementById("btnEnd");

const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");
const resultImage = document.getElementById("resultImage");
const reviewEl = document.getElementById("review");

const pages = [
  "page-start",
  "page-password",
  "page-terms",
  "page-category",
  "page-quiz",
  "page-result",
];

// ===== STATE =====
let state = JSON.parse(localStorage.getItem("quizState")) || {
  page: 0,
  score: 0,
  answers: [],
  qIndex: 0,
};

function save() {
  localStorage.setItem("quizState", JSON.stringify(state));
}

function showPage(i) {
  pages.forEach((p, idx) =>
    document.getElementById(p).classList.toggle("hidden", idx !== i)
  );
  state.page = i;
  save();
}

// ===== NAV =====
btnStart.onclick = () => showPage(1);
btnToPassword.onclick = () => showPage(3);

// ===== LÖSENORD LOGIK =====
// ===== AUTOMATISK LÖSENORDSKONTROLL =====
const correctPassword = "41263762";

passwordInput.addEventListener("input", () => {
  if (passwordInput.value === correctPassword) {
    passwordError.classList.add("hidden"); // döljer felmeddelande
    showPage(2); // går direkt till nästa sida
  } else {
    passwordError.classList.remove("hidden"); // visar felmeddelande
  }
});

// ===== HELPERS =====
const Q = (q, options, correct) => ({ q, options, correct });
const pick = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// ===== FRÅGEBANK (utökad) =====
const questionBanks = {
  // ---------------------------------------------------
  // 🎅 JULTOMTE
  santa: {
    easy: [
      Q(
        "Var bor jultomten enligt populär kultur?",
        ["Nordpolen", "Sydpolen", "Island", "Kanada"],
        "Nordpolen"
      ),
      Q(
        "Vilka djur drar tomtens släde?",
        ["Renar", "Hästar", "Hundar", "Katter"],
        "Renar"
      ),
      Q(
        "Vilken färg har traditionellt tomtens dräkt?",
        ["Röd", "Blå", "Grön", "Vit"],
        "Röd"
      ),
      Q(
        "Vad heter den mest kända av tomtens renar?",
        ["Rudolf", "Blitzen", "Cupid", "Comet"],
        "Rudolf"
      ),
      Q(
        "Vilket land populariserade den röda tomtedräkten?",
        ["USA", "Sverige", "Tyskland", "Ryssland"],
        "USA"
      ),
      Q(
        "Vad säger tomten ofta?",
        ["Ho Ho Ho", "Hej", "Tjoho", "Skål"],
        "Ho Ho Ho"
      ),
      Q(
        "När delar tomten ut klappar?",
        ["Julafton", "Nyår", "Påsk", "Midsommar"],
        "Julafton"
      ),
      Q(
        "Vad har tomten på huvudet?",
        ["Tomteluva", "Keps", "Hatt", "Hjälm"],
        "Tomteluva"
      ),
      Q(
        "Är tomtens skägg vanligtvis?",
        ["Vitt", "Svart", "Brunt", "Rött"],
        "Vitt"
      ),
      Q(
        "Vilket instrument spelas ofta av renar i sånger?",
        ["Bjällror", "Gitarr", "Trumpet", "Piano"],
        "Bjällror"
      ),
      Q(
        "Tomten ses som en symbol för?",
        ["Julglädje", "Krig", "Sommar", "Skörd"],
        "Julglädje"
      ),
    ],
    medium: [
      Q(
        "Vilken historisk figur inspirerade jultomten?",
        ["Sankt Nikolaus", "Oden", "Kejsar Augustus", "Platon"],
        "Sankt Nikolaus"
      ),
      Q(
        "Vilket århundrade levde Sankt Nikolaus?",
        ["300-talet", "800-talet", "1100-talet", "1500-talet"],
        "300-talet"
      ),
      Q(
        "Vad betyder 'Père Noël' på svenska?",
        ["Fader Jul", "Far Tomte", "Julfarfar", "Snögubbe"],
        "Fader Jul"
      ),
      Q(
        "I vilken kultur har Joulupukki sin ursprung?",
        ["Finland", "Frankrike", "Spanien", "Japan"],
        "Finland"
      ),
      Q(
        "Vad kallas tomtemor i engelskspråkiga länder?",
        ["Mrs. Claus", "Ms. Snow", "Lady Claus", "Miss North"],
        "Mrs. Claus"
      ),
      Q(
        "Vilket företag gjorde tomten känd med reklam på 1900‑talet?",
        ["Coca‑Cola", "Pepsi", "Nike", "Apple"],
        "Coca‑Cola"
      ),
      Q(
        "Hur många renar nämns klassiskt före Rudolf?",
        ["8", "6", "7", "9"],
        "8"
      ),
      Q(
        "Vad heter tomtens hemstad i finsk tradition?",
        ["Rovaniemi", "Helsingfors", "Tampere", "Åbo"],
        "Rovaniemi"
      ),
      Q(
        "Vilken julprydnad representerar ofta tomten inomhus?",
        ["Julfigur", "Krans", "Ljusstake", "Strumpa"],
        "Julfigur"
      ),
      Q(
        "Vilket datum firas Sankt Nikolaus dagen?",
        ["6 december", "24 december", "25 december", "1 januari"],
        "6 december"
      ),
      Q(
        "Vilket språk kommer ordet 'Noel' från?",
        ["Franska", "Tyska", "Latin", "Svenska"],
        "Franska"
      ),
      Q(
        "Vilket namn har jultomtens släde i engelska sagor?",
        ["Sleigh", "Carriage", "Wagon", "Sled"],
        "Sleigh"
      ),
    ],
    hard: [
      Q(
        "I vilket antikt rike låg Myra där Nikolaus var biskop?",
        ["Lykien", "Romarriket", "Persien", "Egypten"],
        "Lykien"
      ),
      Q(
        "Vilken kulturell fest bidrog till att flytta jul till slutet av december?",
        ["Saturnalia", "Midsommar", "Valborg", "Halloween"],
        "Saturnalia"
      ),
      Q(
        "Vilket år publicerades dikten 'A Visit from St. Nicholas'?",
        ["1823", "1750", "1901", "1855"],
        "1823"
      ),
      Q(
        "Vem skrev 'A Visit from St. Nicholas'?",
        [
          "Clement Clarke Moore",
          "Edgar Allan Poe",
          "Walt Whitman",
          "Longfellow",
        ],
        "Clement Clarke Moore"
      ),
      Q(
        "Vad är ursprunget till renen som drar släden enligt folklor?",
        [
          "Samisk tradition",
          "Skandinavisk saga",
          "Nordamerikansk legend",
          "Kinesisk folklore",
        ],
        "Nordamerikansk legend"
      ),
      Q(
        "Vilket språk skrevs ursprungliga 'Silent Night' på?",
        ["Tyska", "Latin", "Engelska", "Franska"],
        "Tyska"
      ),
      Q(
        "Vilken nordisk gud har vissa likheter med tomten?",
        ["Oden", "Loki", "Tor", "Frej"],
        "Oden"
      ),
      Q(
        "Vilken europeisk tradition har också en vistelse av gåvor på vintern?",
        ["Sankt Nikolaus", "Lammas", "Sankta Lucia", "Cinco de Mayo"],
        "Sankt Nikolaus"
      ),
    ],
    own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
  },

  // ---------------------------------------------------
  // 🎄 JULTRADITIONER
  traditions: {
    easy: [
      Q(
        "När firas jul i Sverige?",
        ["24 dec", "25 dec", "31 dec", "1 jan"],
        "24 dec"
      ),
      Q(
        "Vad pyntar man vid jul?",
        ["Julgran", "Påskris", "Pumpor", "Blommor"],
        "Julgran"
      ),
      Q(
        "Vad tänder man i advent?",
        ["Ljus", "Eld", "Fyrverkerier", "Lampor"],
        "Ljus"
      ),
      Q(
        "Vad heter julens kalender?",
        ["Julkalender", "Skördekalendar", "Vårkalender", "Sommarkalender"],
        "Julkalender"
      ),
      Q(
        "Vilken dryck är traditionellt julig i Sverige?",
        ["Julmust", "Cola", "Öl", "Te"],
        "Julmust"
      ),
      Q(
        "Vilken kaka är vanlig till jul?",
        ["Pepparkakor", "Chokladkaka", "Sockerkaka", "Muffins"],
        "Pepparkakor"
      ),
      Q("Hur många adventsöndagar finns det?", ["4", "2", "6", "8"], "4"),
      Q(
        "Vilken frukt är vanlig i julpynt?",
        ["Apelsin", "Banan", "Äpple", "Melon"],
        "Apelsin"
      ),
      Q(
        "Vad öppnar man varje dag i december?",
        ["Julkalender", "Dörr", "Present", "Brev"],
        "Julkalender"
      ),
      Q(
        "Vad heter den dag då julen avslutas i Sverige?",
        ["Tjugondag Knut", "Nyår", "Trettondagen", "Skärtorsdagen"],
        "Tjugondag Knut"
      ),
      Q(
        "Vad lägger man under kudden på julafton i vissa traditioner?",
        ["Risgryn", "Strumpa", "Kudde", "Legetet"],
        "Risgryn"
      ),
      Q(
        "Vilket djur är symbol för julbocken?",
        ["Get", "Ren", "Häst", "Ko"],
        "Get"
      ),
    ],
    medium: [
      Q(
        "Vad betyder ordet 'advent'?",
        ["Ankomst", "Slut", "Mitt", "Start"],
        "Ankomst"
      ),
      Q(
        "Vilket datum är luciadagen?",
        ["13 dec", "24 dec", "6 jan", "1 dec"],
        "13 dec"
      ),
      Q(
        "Vilken tradition har svensk julfirande med ljus och sång?",
        ["Lucia", "Halloween", "Valborg", "Midsommar"],
        "Lucia"
      ),
      Q(
        "Vad är julbord?",
        ["Festmåltid", "Uppvisning", "Parad", "Tävlingssport"],
        "Festmåltid"
      ),
      Q(
        "Vilken rätt är traditionell på julbord?",
        ["Julskinka", "Pizza", "Hamburgare", "Sushi"],
        "Julskinka"
      ),
      Q(
        "Vilken jultradition kommer från Tyskland?",
        ["Julgran", "Tomteparad", "Julkorv", "Julkor"],
        "Julgran"
      ),
      Q(
        "Vilket land gav julgranen till Sverige?",
        ["Tyskland", "Frankrike", "USA", "Spanien"],
        "Tyskland"
      ),
      Q(
        "Vad kallas julfirande på engelska?",
        ["Christmas", "Halloween", "Easter", "Thanksgiving"],
        "Christmas"
      ),
      Q(
        "Vilken dag firas trettondedag?",
        ["6 jan", "24 dec", "25 dec", "31 dec"],
        "6 jan"
      ),
      Q(
        "Vilket datum är julafton?",
        ["24 dec", "25 dec", "26 dec", "23 dec"],
        "24 dec"
      ),
      Q(
        "Vad är 'glögg'?",
        ["Kryddat vin", "Juice", "Kaffe", "Mjölk"],
        "Kryddat vin"
      ),
      Q(
        "Vilken julfrukt är vanlig i dessert?",
        ["Risgrynsgröt", "Banan", "Äpple", "Kiwi"],
        "Risgrynsgröt"
      ),
    ],
    hard: [
      Q(
        "Vilken förkristen midvinterfest firades innan jul?",
        ["Midvinterblot", "Yule", "Saturnalia", "Lammas"],
        "Midvinterblot"
      ),
      Q(
        "Vilken romersk högtid bidrog till senare december som firande?",
        ["Saturnalia", "Floralia", "Lupercalia", "Bacchanalia"],
        "Saturnalia"
      ),
      Q(
        "Vilket år infördes julfirande officiellt i Sverige?",
        ["1600‑talet", "1700‑talet", "1800‑talet", "1500‑talet"],
        "1600‑talet"
      ),
      Q(
        "Vad betyder 'Yule' i fornnordisk tradition?",
        ["Jul", "Sommar", "Vår", "Skörd"],
        "Jul"
      ),
      Q(
        "Vilket land populariserade pepparkakshus?",
        ["Tyskland", "Sverige", "Frankrike", "England"],
        "Tyskland"
      ),
      Q(
        "Vilken dag är också känd som annandag jul?",
        ["26 dec", "25 dec", "24 dec", "27 dec"],
        "26 dec"
      ),
      Q(
        "Vilket land har tradition att äta KFC på jul?",
        ["Japan", "Sverige", "USA", "England"],
        "Japan"
      ),
      Q(
        "Från vilket land kommer traditionen med mistelkyssar?",
        ["England", "USA", "Tyskland", "Frankrike"],
        "England"
      ),
    ],
    own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
  },
  // ---------------------------------------------------
  // 🎶 JULMUSIK
  music: {
    easy: [
      Q(
        "Är 'Stilla natt' en julsång?",
        ["Ja", "Nej", "Vet ej", "Ibland"],
        "Ja"
      ),
      Q("Sjungs julsånger på jul?", ["Ja", "Nej", "Aldrig", "Sällan"], "Ja"),
      Q(
        "Vad kallas julmusik?",
        ["Julsånger", "Opera", "Jazz", "Rock"],
        "Julsånger"
      ),
      Q("Är 'Bjällerklang' en julsång?", ["Ja", "Nej", "Påsk", "Sommar"], "Ja"),
      Q(
        "Vilken artist sjöng 'Last Christmas'?",
        ["Wham!", "Queen", "ABBA", "U2"],
        "Wham!"
      ),
      Q(
        "Vilket instrument används ofta i julmusik?",
        ["Klockor", "Trummor", "Bas", "Gitarr"],
        "Klockor"
      ),
      Q(
        "Vilken genre är 'O helga natt'?",
        ["Psalm", "Opera", "Jazz", "Rock"],
        "Psalm"
      ),
      Q(
        "Vilken sång börjar med 'Nu tändas tusen juleljus'?",
        [
          "Svensk julsång",
          "Engelsk julsång",
          "Amerikansk julsång",
          "Tysk julsång",
        ],
        "Svensk julsång"
      ),
      Q(
        "Vilket språk skrevs 'Silent Night' ursprungligen på?",
        ["Tyska", "Engelska", "Franska", "Latin"],
        "Tyska"
      ),
      Q(
        "Vilken julvisa är känd som 'Jingle Bells'?",
        [
          "Bjällerklang",
          "Stilla natt",
          "Gläns över sjö och strand",
          "Nu är det jul igen",
        ],
        "Bjällerklang"
      ),
      Q(
        "Är 'White Christmas' en julklassiker?",
        ["Ja", "Nej", "Vet ej", "Ibland"],
        "Ja"
      ),
      Q(
        "Vilken tonart är typisk för traditionell julsång?",
        ["Dur", "Moll", "Blues", "Jazz"],
        "Dur"
      ),
    ],
    medium: [
      Q(
        "Vilket år skrevs 'Stilla natt'?",
        ["1818", "1701", "1905", "1850"],
        "1818"
      ),
      Q(
        "Vem skrev 'Stilla natt'?",
        ["Franz Gruber", "Mozart", "Bach", "Beethoven"],
        "Franz Gruber"
      ),
      Q(
        "Vilken artist sjöng 'All I Want for Christmas Is You'?",
        ["Mariah Carey", "Whitney Houston", "Celine Dion", "Adele"],
        "Mariah Carey"
      ),
      Q(
        "Vilken genre är 'Feliz Navidad'?",
        ["Latin", "Jazz", "Rock", "Klassisk"],
        "Latin"
      ),
      Q(
        "Vilken julsång handlar om Rudolf?",
        [
          "Rudolf med röda mulen",
          "Jingle Bells",
          "Gläns över sjö och strand",
          "Stilla natt",
        ],
        "Rudolf med röda mulen"
      ),
      Q(
        "Vilket år publicerades 'White Christmas'?",
        ["1942", "1935", "1950", "1960"],
        "1942"
      ),
      Q(
        "Vilken julsång skrevs av Bing Crosby?",
        ["White Christmas", "Silent Night", "O helga natt", "Joy to the World"],
        "White Christmas"
      ),
      Q(
        "Vilken musikstil har 'Carol of the Bells'?",
        ["Klassisk", "Jazz", "Rock", "Pop"],
        "Klassisk"
      ),
      Q(
        "Vilken kompositör skrev 'Messiah' som ofta spelas till jul?",
        ["Handel", "Bach", "Mozart", "Beethoven"],
        "Handel"
      ),
      Q(
        "Vilken sång sjungs ofta vid lucia?",
        ["Sankta Lucia", "Jingle Bells", "Stilla natt", "Bjällerklang"],
        "Sankta Lucia"
      ),
      Q(
        "Vilket instrument är framträdande i 'Jingle Bells'?",
        ["Klockor", "Trumpet", "Gitarr", "Piano"],
        "Klockor"
      ),
      Q(
        "Vilken julvisa börjar med 'Gläns över sjö och strand'?",
        [
          "Svensk julsång",
          "Silent Night",
          "Bjällerklang",
          "Nu tändas tusen juleljus",
        ],
        "Gläns över sjö och strand"
      ),
    ],
    hard: [
      Q(
        "Vilket opusnummer har Bachs Juloratorium?",
        ["BWV 248", "BWV 565", "BWV 147", "BWV 100"],
        "BWV 248"
      ),
      Q("Hur många delar har Juloratoriet?", ["6", "3", "12", "9"], "6"),
      Q(
        "Vem skrev 'Carol of the Bells'?",
        ["Mykola Leontovych", "Mozart", "Bach", "Beethoven"],
        "Mykola Leontovych"
      ),
      Q(
        "Vilken sång var Mariah Careys julsingel?",
        [
          "All I Want for Christmas Is You",
          "White Christmas",
          "Silent Night",
          "Last Christmas",
        ],
        "All I Want for Christmas Is You"
      ),
      Q(
        "Vilket årtionde blev 'Last Christmas' en hit?",
        ["1980-talet", "1970-talet", "1990-talet", "2000-talet"],
        "1980-talet"
      ),
      Q(
        "Vilken julsång har temat 'frost och snö'?",
        ["Let It Snow", "White Christmas", "Rudolf", "Jingle Bells"],
        "Let It Snow"
      ),
      Q(
        "Vilken julsång innehåller texten 'Chestnuts roasting on an open fire'?",
        [
          "The Christmas Song",
          "Silent Night",
          "Joy to the World",
          "Frosty the Snowman",
        ],
        "The Christmas Song"
      ),
      Q(
        "Vem skrev 'Joy to the World'?",
        ["Isaac Watts", "Handel", "Mozart", "Bach"],
        "Isaac Watts"
      ),
    ],
    own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
  },

  // ---------------------------------------------------
  // 🎬 JULFILMER
  movies: {
    easy: [
  Q(
    "Vilken film handlar om en pojke som försvarar sitt hem mot inbrottstjuvar under julen?",
    ["Ensam hemma", "Home Alone 2", "Elf", "Frosty the Snowman"],
    "Ensam hemma"
  ),
  Q(
    "Vilken julfilm har en grön figur som hatar julen?",
    ["Grinchen", "Love Actually", "Polar Express", "Elf"],
    "Grinchen"
  ),
  Q(
    "I vilken film åker barn på ett magiskt tåg till Nordpolen?",
    ["Polar Express", "Home Alone", "The Holiday", "Frosty the Snowman"],
    "Polar Express"
  ),
  Q(
    "Vilken film handlar om en vuxen man som växt upp på Nordpolen och tror han är en tomte?",
    ["Elf", "Grinchen", "Love Actually", "The Holiday"],
    "Elf"
  ),
  Q(
    "Vilken film är en romantisk komedi som utspelar sig under julen i London?",
    ["Love Actually", "Home Alone", "Elf", "The Holiday"],
    "Love Actually"
  ),
  Q(
    "Vilken film bygger på Charles Dickens klassiska julberättelse?",
    ["A Christmas Carol", "Home Alone", "Polar Express", "Grinchen"],
    "A Christmas Carol"
  ),
  Q(
    "Vilken film innehåller karaktären Kevin McCallister?",
    ["Home Alone", "Elf", "Polar Express", "The Holiday"],
    "Home Alone"
  ),
  Q(
    "Vilken film är animerad och handlar om en snögubbe som kommer till liv?",
    ["Frosty the Snowman", "Polar Express", "Home Alone", "Elf"],
    "Frosty the Snowman"
  ),
  Q(
    "Vilken film handlar om en pojke som försöker få tillbaka sin familj efter att de åkt på semester utan honom?",
    ["Home Alone 2: Lost in New York", "Home Alone", "Elf", "The Holiday"],
    "Home Alone 2: Lost in New York"
  ),
  Q(
    "I vilken film försöker en kvinna byta hus med en annan kvinna under julen?",
    ["The Holiday", "Love Actually", "Grinchen", "Elf"],
    "The Holiday"
  ),
  Q(
    "Vilken film handlar om Rudolf med den röda mulen?",
    ["Rudolph the Red-Nosed Reindeer", "Frosty the Snowman", "Polar Express", "Elf"],
    "Rudolph the Red-Nosed Reindeer"
  ),
  Q(
    "Vilken film utspelar sig mestadels på Nordpolen med tomtar som jobbar?",
    ["Elf", "Polar Express", "Home Alone", "The Holiday"],
    "Elf"
  ),
],
    medium: [
      Q(
        "Vilket år släpptes 'Ensam hemma'?",
        ["1990", "1980", "2001", "1975"],
        "1990"
      ),
      Q(
        "Vilken skådespelare spelar Kevin?",
        ["Macaulay Culkin", "Elijah Wood", "Leonardo DiCaprio", "Tom Hanks"],
        "Macaulay Culkin"
      ),
      Q(
        "Var utspelar sig 'Die Hard'?",
        ["Los Angeles", "New York", "Chicago", "Miami"],
        "Los Angeles"
      ),
      Q(
        "Vem spelar Grinchen 2000?",
        ["Jim Carrey", "Will Ferrell", "Ben Stiller", "Adam Sandler"],
        "Jim Carrey"
      ),
      Q("Vilket år släpptes 'Elf'?", ["2003", "2000", "2005", "2008"], "2003"),
      Q(
        "Vilken film innehåller 'Rudolph'?",
        [
          "Rudolph the Red-Nosed Reindeer",
          "Home Alone",
          "Elf",
          "The Polar Express",
        ],
        "Rudolph the Red-Nosed Reindeer"
      ),
      Q(
        "Vilken skådespelare är Buddy i 'Elf'?",
        ["Will Ferrell", "Jim Carrey", "Tom Hanks", "Steve Martin"],
        "Will Ferrell"
      ),
      Q(
        "Vilken film handlar om ett juligt tåg?",
        ["Polar Express", "Home Alone", "Elf", "Grinchen"],
        "Polar Express"
      ),
      Q(
        "Vilken film har Mr. Bean i julscen?",
        ["Mr. Bean's Holiday", "Love Actually", "Elf", "Home Alone"],
        "Mr. Bean's Holiday"
      ),
      Q(
        "Vilken julfilm är animerad?",
        ["Frosty the Snowman", "Home Alone", "Elf", "Grinchen"],
        "Frosty the Snowman"
      ),
      Q(
        "Vilken film handlar om julklappar som glöms hemma?",
        ["Home Alone", "Elf", "Grinchen", "The Polar Express"],
        "Home Alone"
      ),
      Q(
        "Vilken film är baserad på Dr. Seuss bok?",
        ["Grinchen", "Home Alone", "Elf", "The Polar Express"],
        "Grinchen"
      ),
    ],
    hard: [
      Q(
        "Vilken bok baseras Grinchen på?",
        ["Dr. Seuss", "Roald Dahl", "Tolkien", "Lewis"],
        "Dr. Seuss"
      ),
      Q(
        "Vilket år publicerades boken?",
        ["1957", "1940", "1970", "1930"],
        "1957"
      ),
      Q(
        "Vilken skådespelare dubbar Polar Express i original?",
        ["Tom Hanks", "Tim Allen", "Jim Carrey", "Steve Martin"],
        "Tom Hanks"
      ),
      Q(
        "Vilken julfilm har karaktären Kevin McCallister?",
        ["Home Alone", "Elf", "Grinchen", "Polar Express"],
        "Home Alone"
      ),
      Q(
        "Vilken julfilm innehåller 'Stealers Will'?",
        ["Home Alone 2", "Home Alone", "Elf", "The Polar Express"],
        "Home Alone 2"
      ),
      Q(
        "Vilken julfilm regisserades av Chris Columbus?",
        ["Home Alone", "Elf", "Grinchen", "The Polar Express"],
        "Home Alone"
      ),
      Q(
        "Vilken film släpptes 1965 med animerad Rudolph?",
        [
          "Rudolph the Red-Nosed Reindeer",
          "Frosty the Snowman",
          "Home Alone",
          "Elf",
        ],
        "Rudolph the Red-Nosed Reindeer"
      ),
      Q(
        "Vilken film handlar om ett julfirande i England?",
        ["Love Actually", "Home Alone", "Elf", "Grinchen"],
        "Love Actually"
      ),
    ],
    own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
  },

julIVarlden: {
  easy: [
    Q("Vilket land är känt för att ha uppfunnit julgranen?", ["Tyskland", "Sverige", "USA", "Frankrike"], "Tyskland"),
    Q("I vilket land firar man 'Dia de la Virgen de Guadalupe' i december?", ["Mexiko", "Spanien", "Italien", "Argentina"], "Mexiko"),
    Q("Vilken dryck är traditionellt populär i Sverige under jul?", ["Julmust", "Cola", "Te", "Öl"], "Julmust"),
    Q("Vilken typ av figur är 'Jultomten' inspirerad av?", ["Sankt Nikolaus", "Oden", "Platon", "Santa Lucia"], "Sankt Nikolaus"),
    Q("Vilket datum firas julafton i de flesta europeiska länder?", ["24 december", "25 december", "31 december", "6 januari"], "24 december"),
    Q("I vilket land är julbocken en tradition?", ["Sverige", "USA", "Tyskland", "Frankrike"], "Sverige"),
    Q("Vilket land är känt för att äta KFC på jul?", ["Japan", "USA", "Sverige", "England"], "Japan"),
    Q("Vilket land firar 'Las Posadas' på julafton?", ["Mexiko", "Spanien", "Italien", "Chile"], "Mexiko"),
    Q("Vilken nordisk julfigur kallas 'Joulupukki'?", ["Jultomten", "Tomtenisse", "Santa Lucia", "Father Christmas"], "Jultomten"),
    Q("Vilket land firar 'Fête de Saint Nicolas' i början av december?", ["Belgien", "USA", "Tyskland", "Frankrike"], "Belgien"),
    Q("Vilken frukt är traditionell som dekoration i jul i Tyskland?", ["Apelsin", "Banan", "Äpple", "Melon"], "Apelsin"),
    Q("Vilket land firar Saint Lucia-dagen den 13 december?", ["Sverige", "Finland", "Tyskland", "Norge"], "Sverige")
  ],
  medium: [
    Q("I vilket land är 'Réveillon' en stor julmiddag på julafton?", ["Frankrike", "USA", "Tyskland", "Sverige"], "Frankrike"),
    Q("Vilket land är kända för att dekorera sina hem med ljus hela december?", ["USA", "Spanien", "Italien", "Sverige"], "USA"),
    Q("Vilket datum firas Saint Lucia-dagen i Sverige?", ["13 december", "24 december", "6 januari", "25 december"], "13 december"),
    Q("Vilket land är känt för 'Julpanettone'?", ["Italien", "Frankrike", "Tyskland", "USA"], "Italien"),
    Q("Vilken nationell julsång har texten 'Stilla natt'?", ["Österrike", "Tyskland", "Sverige", "Frankrike"], "Österrike"),
    Q("I vilket land är 'Secret Santa'-gåvor vanliga?", ["USA", "Sverige", "Tyskland", "Storbritannien"], "USA"),
    Q("Vilket land firar 'Nochebuena' på julafton?", ["Spanien", "Frankrike", "USA", "Tyskland"], "Spanien"),
    Q("Vilken typ av dekoration är typisk i Filippinerna under jul?", ["Parol-lampor", "Julgranskulor", "Ljusslingor", "Kransar"], "Parol-lampor"),
    Q("Vilken nordisk jultradition inkluderar att tända fyra ljus under fyra söndagar före jul?", ["Advent", "Lucia", "Julbock", "Midsommar"], "Advent"),
    Q("Vilket land firar 'Little Christmas' den 6 januari?", ["Irland", "USA", "Sverige", "Frankrike"], "Irland"),
    Q("Vilket land skickade julkort redan från 1840-talet?", ["Storbritannien", "USA", "Tyskland", "Frankrike"], "Storbritannien"),
    Q("Vilket land introducerade adventskalendern?", ["Tyskland", "Österrike", "Sverige", "Danmark"], "Tyskland")
  ],
  hard: [
    Q("Vilket år infördes julfirande officiellt i Sverige?", ["1600-talet", "1700-talet", "1800-talet", "1500-talet"], "1600-talet"),
    Q("Vilket land har traditionen att 'dra julbocken genom byn'?", ["Sverige", "Norge", "Finland", "Danmark"], "Sverige"),
    Q("Vilket land har traditionen med 'Julgröt med mandel', där vinnaren får en present?", ["Sverige", "Finland", "Tyskland", "Österrike"], "Sverige"),
    Q("Vilket land firar jul med fyrverkerier vid midnatt?", ["Filippinerna", "Frankrike", "Sverige", "USA"], "Filippinerna"),
    Q("I vilket land används en stor julkrubba som offentlig dekoration?", ["Italien", "Spanien", "Portugal", "Tyskland"], "Italien"),
    Q("Vilket land kallar tomten 'Père Noël'?", ["Frankrike", "Belgien", "Kanada", "Sverige"], "Frankrike"),
    Q("Vilket land kallar tomten 'Santa Claus'?", ["USA", "Storbritannien", "Tyskland", "Finland"], "USA"),
    Q("Vilket land är kända för 'Julbelysning av hus' som tävling?", ["USA", "Tyskland", "Norge", "Sverige"], "USA"),
    Q("Vilket land firar 'Little Christmas' den 6 januari?", ["Irland", "USA", "Sverige", "Frankrike"], "Irland"),
    Q("Vilket land skickade julkort redan från 1840-talet?", ["Storbritannien", "USA", "Tyskland", "Frankrike"], "Storbritannien"),
    Q("Vilket land introducerade adventskalendern?", ["Tyskland", "Österrike", "Sverige", "Danmark"], "Tyskland"),
    Q("Vilket land firar med 'Julbock' och sätter upp jättelika halmbockar i städer?", ["Sverige", "Finland", "Norge", "Danmark"], "Sverige"),
  ],
  own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
},

  // ---------------------------------------------------
  // 🔞 JULTOMTE 18+
  adult: {
    easy: [
    Q(
      "Vad gör tomten när renarna strejkar?",
      ["Erbjuder dem glögg 🍷", "Lockar med pepparkakor 🍪", "Hotar med kramar 😘", "Låter dem ta semester 🏖✅"],
      "Låter dem ta semester 🏖"
    ),
    Q(
      "Vad gillar tomten mest med vuxenfester?",
      ["Att dansa salsa 💃", "Gratis snacks 🍫", "Att gömma paket under soffan 😏", "Sjunga karaoke 🎤"],
      "Att gömma paket under soffan 😏"
    ),
    Q(
      "Vilken dryck är tomtens guilty pleasure?",
      ["Ägglikör 🥚", "Mjölk 🥛", "Julmust 🥤", "Kaffe med chili ☕🌶"],
      "Ägglikör 🥚"
    ),
    Q(
      "Vad gör tomten när han inte hittar sin mössa?",
      ["Gråter 😭", "Låtsas vara hipster 😎", "Lånar renarnas horn 🦌", "Skriver klagomail ✉️"],
      "Låtsas vara hipster 😎"
    ),
    Q(
      "Vad händer om tomten dricker för mycket glögg?",
      ["Han blir röd i ansiktet ❤️", "Somnar i skorstenen 😴", "Dansar på bordet 💃", "Blir extra snäll 😇"],
      "Somnar i skorstenen 😴"
    ),
    Q(
      "Hur håller tomten sig i form?",
      ["Snowboard 🏂", "Dansar runt granen 🎄", "Lyfter paket 🎁", "Joggar med renar 🦌"],
      "Dansar runt granen 🎄"
    ),
    Q(
      "Vad lämnar tomten oftast efter sig på en vuxenfest?",
      ["Kramar 😘", "Mystiska lappar med hemligheter 📝😏", "Snacks 🍪", "Glittrigt konfetti ✨"],
      "Kramar 😘"
    ),
    Q(
      "Vad gör tomten om han blir kär på festen?",
      ["Skickar brev 💌", "Bjuder på pepparkakor 🍪", "Dansar med renar 🦌", "Ritar hjärtan på paketen ❤️"],
      "Bjuder på pepparkakor 🍪"
    ),
    Q(
      "Hur vet man att tomten varit på afterwork?",
      ["Släden står felvänd 🛷", "Renarna sjunger karaoke 🎤", "Han lämnar glittrigt glitter ✨", "Alla får extra paket 🎁"],
      "Han lämnar glittrigt glitter ✨"
    ),
    Q(
      "Vilken musik får tomten att tappa kontrollen?",
      ["Jingle Bell Rock 🎸", "Klassisk 🎼", "Opera 🎭", "Jazz 🎷"],
      "Jingle Bell Rock 🎸"
    ),
    Q(
      "Vad använder tomten för att locka gäster?",
      ["Julskinka 🐖", "Glögg 🍷", "Humor 😏", "Renar 🦌"],
      "Humor 😏"
    ),
    Q(
      "Vilket är tomtens partytrick?",
      ["Dansar på bordet 💃", "Trolleri 🪄", "Sjunger karaoke 🎤", "Bygger paketborg 🏰"],
      "Dansar på bordet 💃"
    ),
    Q(
      "Vad är tomtens hemliga superkraft på fester?",
      ["Osynlighet 👻", "Flygning ✈️", "Superstyrka 💪", "Teleportering 🌀"],
      "Osynlighet 👻"
    ),
    Q(
      "Vad tycker tomten om på vuxenjulbordet?",
      ["Pepparkakor 🍪", "Chokladfondue 😏", "Julskinka 🐖", "Gravad lax 🐟"],
      "Chokladfondue 😏"
    ),
    Q(
      "Hur fördriver tomten tiden innan midnatt?",
      ["Bygger paket 🏗", "Dansar disco 💃", "Pratar med renarna 🦌", "Dricker glögg 🍷"],
      "Dansar disco 💃"
    ),
    Q(
      "Vad händer om tomten glömmer listan?",
      ["Alla blir glada 😄", "Han får panik 😱", "Renarna skrattar 🦌", "Alla paket försvinner 🎁"],
      "Han får panik 😱"
    ),
    Q(
      "Vilken färg gillar tomten på partymössan?",
      ["Röd ❤️", "Grön 💚", "Glittrig rosa 🌟", "Guld ✨"],
      "Glittrig rosa 🌟"
    ),
    Q(
      "Vad är tomtens största last?",
      ["Tid ⏳", "Kakor 🍪", "Hemliga paket 😎", "Rykten 🗣"],
      "Hemliga paket 😎"
    ),
    Q(
      "Vilken muskelgrupp använder tomten mest på festnätter?",
      ["Armar 💪", "Ben 🦵", "Rygg 🏋️‍♂️", "Hjärta ❤️"],
      "Hjärta ❤️"
    ),
    Q(
      "Hur ofta tar tomten selfies med gäster?",
      ["Aldrig ❌", "Ibland 🤳", "Alltid 😎", "Endast med renar 🦌"],
      "Ibland 🤳"
    )
  ],
  medium: [
    Q(
      "Vad gör tomten om renarna vägrar köra släden?",
      ["Hotar med kramar 😘", "Erbjuder extra morötter 🥕", "Ringer Uber 🚗", "Bygger snösläde ⛄"],
      "Erbjuder extra morötter 🥕"
    ),
    Q(
      "Hur hanterar tomten partytrötthet?",
      ["Dricker glögg 🍷", "Tar powernap 😴", "Hoppar i snön ❄️", "Skriver hemliga listor 📝"],
      "Tar powernap 😴"
    ),
    Q(
      "Vad händer när tomten blir blyg?",
      ["Gömmer sig i säcken 🎁", "Dansar extra mycket 💃", "Låter renarna ta över 🦌", "Blir röd i ansiktet ❤️"],
      "Gömmer sig i säcken 🎁"
    ),
    Q(
      "Vilket är tomtens hemliga vapen på fester?",
      ["Charm 😏", "Glögg 🍷", "Renar 🦌", "Pepparkakor 🍪"],
      "Charm 😏"
    ),
    Q(
      "Vad gör tomten om han tappar sitt skägg?",
      ["Låtsas vara alien 👽", "Får panik 😱", "Lånar renarnas skägg 🦌", "Bygger nytt skägg av glitter ✨"],
      "Får panik 😱"
    ),
    Q(
      "Hur lockar tomten gäster till efterfesten?",
      ["Gratis snacks 🍫", "Glögg 🍷", "Mystiska paket 😏", "Renarna dansar 🦌💃"],
      "Mystiska paket 😏"
    ),
    Q(
      "Vad är tomtens favoritdans?",
      ["Disco 💃", "Salsa 💃", "Karaoke 💃", "Snowboard 🏂"],
      "Disco 💃"
    ),
    Q(
      "Vad gör tomten när han vill imponera på gäster?",
      ["Bygger paketborg 🏰", "Dansar på bordet 💃", "Sjunger opera 🎭", "Föder renar 🦌"],
      "Dansar på bordet 💃"
    ),
    Q(
      "Hur får tomten alla att skratta?",
      ["Berättar julskämt 😏", "Dansar salsa 💃", "Bygger paketborg 🏰", "Dricker glögg 🍷"],
      "Berättar julskämt 😏"
    ),
    Q(
      "Vad är tomtens favoritgodis på fester?",
      ["Chokladfondue 😏", "Pepparkakor 🍪", "Polkagrisar 🍭", "Mjölkchoklad 🍫"],
      "Chokladfondue 😏"
    ),
    Q(
      "Vad gör tomten när han är sugen på romantik?",
      ["Skriver hemliga lappar 📝😏", "Dansar med renar 🦌", "Dricker glögg 🍷", "Bygger paketborg 🏰"],
      "Skriver hemliga lappar 📝😏"
    ),
    Q(
      "Hur överraskar tomten sina gäster?",
      ["Med glittrigt glitter ✨", "Med dansmoves 💃", "Med hemliga paket 😏", "Med renarna 🦌"],
      "Med glittrigt glitter ✨"
    ),
    Q(
      "Vilket är tomtens hemliga partytrick?",
      ["Osynlighet 👻", "Flygning ✈️", "Teleportering 🌀", "Superstyrka 💪"],
      "Osynlighet 👻"
    ),
    Q(
      "Vad gör tomten om gästerna inte lyssnar?",
      ["Hotar med paket 🎁", "Ger kramar 😘", "Trollar lite 🪄", "Dansar salsa 💃"],
      "Trollar lite 🪄"
    ),
    Q(
      "Vilken färg gillar tomten på sina partystrumpor?",
      ["Röd ❤️", "Grön 💚", "Glittrig rosa 🌟", "Guld ✨"],
      "Glittrig rosa 🌟"
    ),
    Q(
      "Hur överlever tomten nattens alla fester?",
      ["Powernap 😴", "Dricker glögg 🍷", "Dansar disco 💃", "Hoppar i snön ❄️"],
      "Powernap 😴"
    ),
    Q(
      "Vad gör tomten när han vill smyga?",
      ["Osynlighet 👻", "Låtsas vara paket 🎁", "Dansar salsa 💃", "Bygger snögubbar ⛄"],
      "Osynlighet 👻"
    ),
    Q(
      "Hur håller tomten humöret uppe på fest?",
      ["Chokladfondue 😏", "Pepparkakor 🍪", "Kaffe ☕", "Glögg 🍷"],
      "Chokladfondue 😏"
    ),
    Q(
      "Vilken superkraft använder tomten när han blir stressad?",
      ["Teleportering 🌀", "Osynlighet 👻", "Flygning ✈️", "Superstyrka 💪"],
      "Osynlighet 👻"
    )
  ],
  hard: [
    Q(
      "Hur levererar tomten vuxenpaket utan att bli upptäckt?",
      ["Osynlighet 👻", "Teleportering 🌀", "Flygning ✈️", "Renar 🦌"],
      "Osynlighet 👻"
    ),
    Q(
      "Vad är tomtens största hemlighet?",
      ["Alla paket är doppade i glitter ✨", "Han har danslektioner 💃", "Han sjunger opera 🎭", "Han har renar som assistenter 🦌"],
      "Alla paket är doppade i glitter ✨"
    ),
    Q(
      "Hur lyckas tomten med nattens alla leveranser?",
      ["Magisk tid ⏳", "Superstyrka 💪", "Flygande renar 🦌", "Teleportering 🌀"],
      "Magisk tid ⏳"
    ),
    Q(
      "Vilket är tomtens favoritpartyspel?",
      ["Gömma paket 😏", "Musikstol 💺", "Dansstopp 💃", "Glöggprovning 🍷"],
      "Gömma paket 😏"
    ),
    Q(
      "Vad gör tomten om han blir kär på festen?",
      ["Skriver hemliga lappar 📝😏", "Dansar med renar 🦌", "Dricker glögg 🍷", "Bygger paketborg 🏰"],
      "Skriver hemliga lappar 📝😏"
    ),
    Q(
      "Vilket är tomtens mest pinsamma ögonblick?",
      ["Tappar skägget 😱", "Ramlade i skorstenen ⛓", "Dansade fel 💃", "Renarna retas 🦌"],
      "Tappar skägget 😱"
    ),
    Q(
      "Hur vet man att tomten är på fest?",
      ["Glittrigt glitter ✨", "Kramar 😘", "Mystiska paket 😏", "Renarna dansar 🦌💃"],
      "Glittrigt glitter ✨"
    ),
    Q(
      "Vad gör tomten om alla gäster går hem tidigt?",
      ["Tar powernap 😴", "Dansar med renarna 🦌💃", "Dricker glögg 🍷", "Bygger paketborg 🏰"],
      "Dansar med renarna 🦌💃"
    ),
    Q(
      "Hur smyger tomten förbi vuxna fällor?",
      ["Osynlighet 👻", "Teleportering 🌀", "Flygning ✈️", "Bygger snögubbar ⛄"],
      "Osynlighet 👻"
    ),
    Q(
      "Vad gör tomten när han får ett hett tips om julklappar?",
      ["Sprider ryktet 😏", "Bygger paketborg 🏰", "Dansar disco 💃", "Hoppar i snön ❄️"],
      "Sprider ryktet 😏"
    ),
    Q(
      "Vilket är tomtens favoritgodis på nattfesten?",
      ["Chokladfondue 😏", "Pepparkakor 🍪", "Polkagrisar 🍭", "Mjölkchoklad 🍫"],
      "Chokladfondue 😏"
    ),
    Q(
      "Vad gör tomten när han vill ha lite dramatik?",
      ["Trollar lite 🪄", "Dansar disco 💃", "Bygger paketborg 🏰", "Dricker glögg 🍷"],
      "Trollar lite 🪄"
    ),
    Q(
      "Vilket partytrick tar tomten till nästa nivå?",
      ["Osynlighet 👻", "Teleportering 🌀", "Flygning ✈️", "Superstyrka 💪"],
      "Osynlighet 👻"
    ),
    Q(
      "Vad gör tomten när han behöver inspiration?",
      ["Dansar med renarna 🦌💃", "Dricker glögg 🍷", "Skriver hemliga lappar 📝😏", "Bygger paketborg 🏰"],
      "Skriver hemliga lappar 📝😏"
    ),
    Q(
      "Hur levererar tomten paket utan att bli sedd?",
      ["Osynlighet 👻", "Teleportering 🌀", "Flygning ✈️", "Renar 🦌"],
      "Osynlighet 👻"
    ),
    Q(
      "Vilket är tomtens mest festliga ögonblick?",
      ["Glittrigt glitter ✨", "Kramar 😘", "Mystiska paket 😏", "Dans med renarna 🦌💃"],
      "Glittrigt glitter ✨"
    ),
    Q(
      "Vad gör tomten när han vill chocka gäster?",
      ["Trollar 🪄", "Dansar disco 💃", "Bygger paketborg 🏰", "Hoppar i snön ❄️"],
      "Trollar 🪄"
    ),
    Q(
      "Hur håller tomten energi hela natten?",
      ["Chokladfondue 😏", "Pepparkakor 🍪", "Kaffe ☕", "Glögg 🍷"],
      "Chokladfondue 😏"
    ),
    Q(
      "Vilken är tomtens hemliga flirtstrategi?",
      ["Skriver hemliga lappar 📝😏", "Dansar med renar 🦌", "Dricker glögg 🍷", "Bygger paketborg 🏰"],
      "Skriver hemliga lappar 📝😏"
    ),
    Q(
      "Vad gör tomten när han vill smyga?",
      ["Osynlighet 👻", "Låtsas vara paket 🎁", "Dansar salsa 💃", "Bygger snögubbar ⛄"],
      "Osynlighet 👻"
    ),
    ],
    own: [
      Q(
        "Hur gammal är Jultomte?",
        ["36år", "1755år", "163år", "225år"],
        "1755år"
      ),
    ],
  },
};

// ===== QUIZ LOGIK =====
let currentSet = [];
let timerInterval;
let timeLeft = 10;

document.querySelectorAll(".category").forEach((btn) => {
  btn.onclick = () => {
    const bank = questionBanks[btn.dataset.cat];
    currentSet = [
      ...pick(bank.easy, 4),
      ...pick(bank.medium, 3),
      ...pick(bank.hard, 2),
      ...pick(bank.own, 1),
    ];
    state.score = 0;
    state.answers = [];
    state.qIndex = 0;
    showPage(4);
    nextQuestion();
  };
});

function startTimer() {
  timeLeft = 10;
  timerEl.innerText = timeLeft;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleAnswer(null);
    }
  }, 1000);
}

function nextQuestion() {
  if (state.qIndex >= currentSet.length) return showResult();
  const q = currentSet[state.qIndex];
  questionEl.innerText = q.q;
  answersEl.innerHTML = "";

  // Slumpa svarsalternativen
  const shuffledOptions = shuffle([...q.options]);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      handleAnswer(opt, q); // skicka frågan också
    };

    answersEl.appendChild(btn);
  });

  progressEl.innerText = `Fråga ${state.qIndex + 1} av ${currentSet.length}`;
  startTimer();
}

function handleAnswer(selected, q) {
  clearInterval(timerInterval);

  let isCorrect = selected === q.correct;

  // Anpassad logik för own-frågor
  let correctToShow = q.correct;
  let categoryType = "normal";
  if (q.options.includes("1755år") && q.options.includes("36år")) {
    categoryType = "own";
    if (selected === "1755år") {
      correctToShow = "36år";
      isCorrect = false;
    } else if (selected === "36år") {
      correctToShow = "1755år";
      isCorrect = false;
    }
  }

  state.answers.push({
    selected,
    correct: correctToShow,
    isCorrect,
    category: categoryType,
  });

  // Direkt feedback för alla utom own-kategorin
  if (categoryType !== "own") {
    answersEl.querySelectorAll("button").forEach((btn) => {
      if (btn.innerText === q.correct) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      } else if (btn.innerText === selected) {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
      }
      btn.disabled = true;
    });

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.style.marginTop = "8px";
    feedback.style.fontWeight = "bold";
    feedback.style.color = isCorrect ? "green" : "red";
    // feedback.innerText = isCorrect ? "✅ Rätt!" : `❌ Fel! Rätt svar: ${q.correct}`;
    answersEl.appendChild(feedback);

    if (isCorrect) state.score++;

    state.qIndex++;

    save();

    // Vänta lite innan nästa fråga
    setTimeout(nextQuestion, 500);
  } else {
    // För own-frågor kör som tidigare utan feedback
    if (isCorrect) state.score++;
    state.qIndex++;
    save();
    nextQuestion();
  }
}

function showResult() {
  showPage(5);
  scoreText.innerText = `Du fick ${state.score} av ${currentSet.length} rätt`;

  let imgSrc = "";
  if (state.score === currentSet.length)
    imgSrc =
      "https://www.riksbank.se/iv-images/publishedmedia/44j91vowc7wepjl8i0ta/1000-kronossedel-specimen-fram.png";
  else if (state.score >= 7)
    imgSrc =
      "https://static.partyking.org/fit-in/1300x0/products/original/jultomte-choklad-staniol-89987-1.jpg";
  else if (state.score >= 4)
    imgSrc =
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Candy-Cane-Classic.jpg";
  else
    imgSrc =
      "https://ih1.redbubble.net/image.3246509715.3954/st,small,507x507-pad,600x600,f8f8f8.jpg";

  resultImage.innerHTML = `<div style="display:flex;justify-content:center;margin-bottom:16px;"><img src="${imgSrc}" alt="Resultatbild" style="max-width:100%;max-height:150px;border-radius:16px;" /></div>`;

  reviewEl.innerHTML = "";
  state.answers.forEach((a, index) => {
    const d = document.createElement("div");
    d.className = "review-item";
    d.innerHTML = `
      <div class="${a.isCorrect ? "correct" : "wrong"}">
        Ditt svar: ${a.selected ?? "Inget"}
      </div>
      <div>Rätt svar: ${a.correct}</div>
    `;
    reviewEl.appendChild(d);
  });
}

btnEnd.onclick = () => {
  localStorage.clear();
  location.reload();
};

showPage(state.page);
