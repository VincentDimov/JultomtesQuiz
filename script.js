// ===== ELEMENT =====
const btnStart = document.getElementById("btnStart");
const btnToPassword = document.getElementById("btnToPassword");
const btnBackToSpel = document.getElementById("btnBackToSpel");
const linkTerms = document.getElementById("linkTerms");
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
  "page-spel",
  "page-terms",
  "page-password",
  "page-category",
  "page-quiz",
  "page-result",
];

// ===== STATE =====
let state = {
  page: 0,
  score: 0,
  answers: [],
  qIndex: 0,
};

function showPage(index) {
  pages.forEach((id, i) => {
    document.getElementById(id).classList.toggle("hidden", i !== index);
  });
  state.page = index;
}

// ===== NAV =====
btnStart.onclick = () => showPage(1);
btnToPassword.onclick = () => showPage(3);

linkTerms.onclick = (e) => {
  e.preventDefault();
  showPage(2); // spel → terms
};

btnBackToSpel.onclick = () => showPage(1);

// ===== LÖSENORD LOGIK =====
// ===== AUTOMATISK LÖSENORDSKONTROLL =====
const correctPassword = "84623725";

passwordInput.addEventListener("input", () => {
  if (passwordInput.value === correctPassword) {
    passwordError.classList.add("hidden"); // döljer felmeddelande
    showPage(4); // går direkt till nästa sida
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
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
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
        ["Julgran", "Hus", "Fru", "Köket"],
        "Julgran"
      ),
      Q(
        "Vad tänder man i advent?",
        ["Ljus", "Eld", "Fyrverkerier", "Lampor"],
        "Ljus"
      ),
      Q(
        "Vad heter julens kalender?",
        ["Julkalender", "Skördekalendar", "Tomteskalender", "Decemberkalender"],
        "Julkalender"
      ),
      Q(
        "Vilken dryck är traditionellt julig i Sverige?",
        ["Julmust", "Jägermeister", "Öl", "Glögg"],
        "Julmust"
      ),
      Q(
        "Vilken kaka är vanlig till jul?",
        ["Pepparkakor", "Chokladkaka", "Sockerkaka", "Kladdkaka"],
        "Pepparkakor"
      ),
      Q("Hur många adventsöndagar finns det?", ["4", "2", "6", "8"], "4"),
      Q(
        "Vilken frukt är vanlig i julpynt?",
        ["Apelsin", "Äpple", "Melon", "Clementin"],
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
        ["Risgryn", "Socker", "Tand", "Peppar"],
        "Risgryn"
      ),
      Q(
        "Vilket djur är symbol för julbocken?",
        ["Get", "Ren", "Häst", "Tjur"],
        "Get"
      ),
      Q(
        "Vad kallas julfirande på engelska?",
        ["Christmas", "Halloween", "Easter", "Thanksgiving"],
        "Christmas"
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
        ["13 dec", "23 dec", "20 dec", "1 dec"],
        "13 dec"
      ),
      Q(
        "Vilken tradition har svensk julfirande med ljus och sång?",
        ["Lucia", "Halloween", "Trettondedagen", "Nytt År"],
        "Lucia"
      ),
      Q(
        "Vad är julbord?",
        ["Festmåltid", "Uppvisning", "Parad", "Tävlingssport"],
        "Festmåltid"
      ),
      Q(
        "Vilken rätt är traditionell på julbord?",
        ["Julskinka", "Lax", "Sill", "Prinskorv"],
        "Julskinka"
      ),
      Q(
        "Vilken jultradition kommer från Tyskland?",
        ["Julgran", "Tomteparad", "Julkorv", "Julskinka"],
        "Julgran"
      ),
      Q(
        "Vilket land gav julgranen till Sverige?",
        ["Tyskland", "Frankrike", "USA", "Spanien"],
        "Tyskland"
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
        ["Kryddat vin", "Stark sprit", "Brännvin", "Tinktur"],
        "Kryddat vin"
      ),
      Q(
        "Vilken julfrukt är vanlig i dessert?",
        ["Risgrynsgröt", "Päron", "Äpple", "Apelsin"],
        "Risgrynsgröt"
      ),
    ],
    hard: [
      Q(
        "Vilken förkristen midvinterfest firades innan jul?",
        [
          "Midvinterblot",
          "Midvinteryule",
          "Midvintersaturnalia",
          "Midvinterlammas",
        ],
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
        ["Julfest", "Vintersolstånd", "Festligheter", "Gåvoutdelning"],
        "Julfest"
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
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
    ],
  },
  // ---------------------------------------------------
  // 🎶 JULMUSIK
  music: {
    easy: [
      Q(
        "Är 'Stilla natt' en julsång?",
        [
          "Ja, en klassisk julsång",
          "Nej, det är en vanlig visa",
          "Traditionell vinter sång",
          "Folkets låt",
        ],
        "Ja, en klassisk julsång"
      ),

      Q(
        "Vad kallas julmusik?",
        ["Julsånger", "Julmusik", "Julmelodier", "Julsångssamlingar"],
        "Julsånger"
      ),
      Q(
        "Vilken typ av sång är 'Bjällerklang'?",
        [
          "En klassisk julsång",
          "En melodi man sjunger på jul",
          "Traditionell julsång",
          "Känd julsång för barn",
        ],
        "En klassisk julsång"
      ),
      Q(
        "Vilken artist sjöng 'Last Christmas'?",
        ["Wham!", "Queen", "ABBA", "U2"],
        "Wham!"
      ),
      Q(
        "Vilket instrument används ofta i julmusik?",
        ["Klockor", "Trummor", "Fiol", "Gitarr"],
        "Klockor"
      ),
      Q(
        "Vilken genre är 'O helga natt'?",
        ["Psalm", "Opera", "Sonat", "Molett"],
        "Psalm"
      ),
      Q(
        "Vilken sång börjar med 'Nu tändas tusen juleljus'?",
        [
          "Svensk julsång, sjungs under julen",
          "Känd julsång i Sverige",
          "Traditionell julmelodi",
          "Sång man ofta sjunger i december",
        ],
        "Svensk julsång, sjungs under julen"
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
        "Vilken klassisk sång förknippas starkast med julen trots att den handlar om vinterns nostalgi?",
        [
          "White Christmas",
          "Jingle Bells",
          "Silent Night",
          "Frosty the Snowman",
        ],
        "White Christmas"
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
        ["Klassisk", "Symfoni", "Musikal", "Pop"],
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
        "Vem skrev den klassiska svenska julsången 'Gläns över sjö och strand'?",
        [
          "Alice Tegnér", // Fel, skrev andra barn- och julsånger
          "Zacharias Topelius", // Rätt, skrev texten
          "Evert Taube", // Fel, känd svensk visförfattare
          "Carl Michael Bellman", // Fel, äldre svensk vispoet
        ],
        "Zacharias Topelius"
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
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
    ],
  },

  // ---------------------------------------------------
  // 🎬 JULFILMER
  movies: {
    easy: [
      Q(
        "Vilken julfilm handlar om en pojke som blir lämnad ensam hemma och måste försvara huset mot inbrottstjuvar?",
        [
          "Ensam hemma",
          "En jul att minnas",
          "Miraklet i New York",
          "Tomten kommer till stan",
        ],
        "Ensam hemma"
      ),
      Q(
        "Vilken julfilm har en grön figur som hatar julen?",
        ["Grinchen", "Hulk", "Shrek", "Elf"],
        "Grinchen"
      ),
      Q(
        "I vilken film åker barn på ett magiskt tåg till Nordpolen?",
        [
          "Polar Express",
          "Tåg till Santa Fe",
          "The Christmas Train",
          "Mickey’s Magical Christmas Train",
        ],
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
        [
          "A Christmas Carol",
          "The Muppet Christmas Carol",
          "Scrooge",
          "Christmas with the Kranks",
        ],
        "A Christmas Carol"
      ),
      Q(
        "Vilken film innehåller karaktären Kevin McCallister?",
        ["Home Alone", "Elf", "Polar Express", "The Holiday"],
        "Home Alone"
      ),
      Q(
        "Vilken film är animerad och handlar om en snögubbe som kommer till liv?",
        [
          "Frosty the Snowman",
          "Snow Buddies",
          "The Polar Express",
          "Rise of the Guardians",
        ],
        "Frosty the Snowman"
      ),
      Q(
        "Vilken film handlar om en pojke som försöker få tillbaka sin familj efter att de åkt på semester utan honom?",
        ["Home Alone 2: Lost in New York", "Home Alone", "Elf", "The Holiday"],
        "Home Alone 2: Lost in New York"
      ),
      Q(
        "I vilken film försöker en kvinna byta hus med en annan kvinna under julen?",
        ["The Holiday", "Love Actually", "Serendipity", "Last Christmas"],
        "The Holiday"
      ),
      Q(
        "Vilken film handlar om tomtens hjälpteam som levererar julklappar med högteknologi?",
        [
          "Arthur Christmas",
          "Santa Claus Is Comin' to Town",
          "Elf",
          "The Grinch",
        ],
        "Arthur Christmas"
      ),
      Q(
        "Vilken film utspelar sig mestadels på Nordpolen med tomtar som jobbar?",
        ["Elf", "Polar Express", "Arthur Christmas", "The Holiday"],
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
        "Vilken julfilm handlar om den ensamstående renen som blir en hjälte tack vare sin lysande mul?",
        [
          "Rudolph the Red-Nosed Reindeer",
          "Prancer",
          "The Year Without a Santa Claus",
          "Santa Claus is Comin’ to Town",
        ],
        "Rudolph the Red-Nosed Reindeer"
      ),
      Q(
        "Vilken skådespelare är Buddy i 'Elf'?",
        ["Will Ferrell", "Jim Carrey", "Tom Hanks", "Steve Martin"],
        "Will Ferrell"
      ),
      Q(
        "Vilken svensk julfilm handlar om en pojke som får uppleva julens magi i staden?",
        [
          "Sunes jul",
          "Kan du vissla Johanna?",
          "Pelle Svanslös i Jul",
          "Himmel och pannkaka",
        ],
        "Sunes jul"
      ),
      Q(
        "Vilken svensk julfilm är animerad och bygger på Astrid Lindgrens berättelser?",
        [
          "Pelle Svanslös i Jul",
          "Sunes jul",
          "Kan du vissla Johanna?",
          "Himmel och pannkaka",
        ],
        "Pelle Svanslös i Jul"
      ),
      Q(
        "Vilken svensk klassisk julfilm handlar om barn och julfirande i 1960-talets Stockholm?",
        [
          "Kan du vissla Johanna?",
          "Sunes jul",
          "Pelle Svanslös i Jul",
          "Himmel och pannkaka",
        ],
        "Kan du vissla Johanna?"
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
        "Vilket år publicerades boken Dr. Seuss?",
        ["1957", "1940", "1970", "1930"],
        "1957"
      ),
      Q(
        "Vilken skådespelare dubbar Polar Express i original?",
        ["Tom Hanks", "Tim Allen", "Jim Carrey", "Steve Martin"],
        "Tom Hanks"
      ),
      Q(
        "Vilken julfilm handlar om lilla Ida som vill se tomten?",
        [
          "Kan du vissla Johanna?",
          "Sunes jul",
          "Pippi Långstrump på jul",
          "Julkalendern 1992",
        ],
        "Kan du vissla Johanna?"
      ),
      Q(
        "I vilken julfilm försöker Lilla Anna och Långa Farbrorn fixa julklappar?",
        [
          "Tomten är far till alla barnen",
          "Julkalendern 1990",
          "Pelle Svanslös",
          "Sunes jul",
        ],
        "Sunes jul"
      ),
      Q(
        "Vilken julfilm regisserades av Hasse Alfredson?",
        [
          "Kan du vissla Johanna?",
          "Sällskapsresan",
          "Tomten är far till alla barnen",
          "Pelle Svanslös",
        ],
        "Kan du vissla Johanna?"
      ),
      Q(
        "Vilken julfilm från 1960-talet innehåller julmusik med 'Nu tändas tusen juleljus'?",
        [
          "Kan du vissla Johanna?",
          "Sunes jul",
          "Pippi Långstrump på jul",
          "Tomten är far till alla barnen",
        ],
        "Kan du vissla Johanna?"
      ),
      Q(
        "Vilken film handlar om ett julfirande i England?",
        ["Love Actually", "Home Alone", "Elf", "Grinchen"],
        "Love Actually"
      ),
    ],
    own: [
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
    ],
  },

  julIVarlden: {
    easy: [
      Q(
        "Vilket land är känt för att ha uppfunnit julgranen?",
        ["Tyskland", "Sverige", "USA", "Frankrike"],
        "Tyskland"
      ),
      Q(
        "I vilket land firar man 'Dia de la Virgen de Guadalupe' i december?",
        ["Mexiko", "Spanien", "Italien", "Argentina"],
        "Mexiko"
      ),
      Q(
        "Vilken dryck är traditionellt populär i Sverige under jul?",
        ["Julmust", "Brännvin", "Glögg", "Jägermeister"],
        "Julmust"
      ),
      Q(
        "Vilken typ av figur är 'Jultomten' inspirerad av?",
        ["Sankt Nikolaus", "Oden", "Platon", "Santa Lucia"],
        "Sankt Nikolaus"
      ),
      Q(
        "Vilket datum firas julafton i de flesta europeiska länder?",
        ["24 december", "25 december", "31 december", "6 januari"],
        "24 december"
      ),
      Q(
        "I vilket land är julbocken en tradition?",
        ["Sverige", "USA", "Tyskland", "Frankrike"],
        "Sverige"
      ),
      Q(
        "Vilket land är känt för att äta KFC på jul?",
        ["Japan", "USA", "Sverige", "England"],
        "Japan"
      ),
      Q(
        "Vilket land firar 'Las Posadas' på julafton?",
        ["Mexiko", "Spanien", "Italien", "Chile"],
        "Mexiko"
      ),
      Q(
        "Vilken nordisk julfigur kallas 'Joulupukki'?",
        ["Jultomten", "Tomtenisse", "Santa Lucia", "Ren"],
        "Jultomten"
      ),
      Q(
        "Vilket land firar 'Fête de Saint Nicolas' i början av december?",
        ["Belgien", "USA", "Tyskland", "Frankrike"],
        "Belgien"
      ),
      Q(
        "Vilken frukt är traditionell som dekoration i jul i Tyskland?",
        ["Apelsin", "Päron", "Clementin", "Melon"],
        "Apelsin"
      ),
      Q(
        "Vilket land firar Saint Lucia-dagen den 13 december?",
        ["Sverige", "Finland", "Tyskland", "Norge"],
        "Sverige"
      ),
    ],
    medium: [
      Q(
        "I vilket land är 'Réveillon' en stor julmiddag på julafton?",
        ["Frankrike", "USA", "Tyskland", "Sverige"],
        "Frankrike"
      ),
      Q(
        "Vilket land är kända för att dekorera sina hem med ljus hela december?",
        ["USA", "Spanien", "Italien", "Sverige"],
        "USA"
      ),
      Q(
        "Vilket datum firas Saint Lucia-dagen i Sverige?",
        ["13 december", "1 december", "6 januari", "15 december"],
        "13 december"
      ),
      Q(
        "Vilket land är känt för 'Julpanettone'?",
        ["Italien", "Frankrike", "Tyskland", "USA"],
        "Italien"
      ),
      Q(
        "Vilken nationell julsång har texten 'Stilla natt'?",
        ["Österrike", "Tyskland", "Sverige", "Frankrike"],
        "Österrike"
      ),
      Q(
        "I vilket land är 'Secret Santa'-gåvor vanliga?",
        ["USA", "Sverige", "Tyskland", "Storbritannien"],
        "USA"
      ),
      Q(
        "Vilket land firar 'Nochebuena' på julafton?",
        ["Spanien", "Frankrike", "USA", "Tyskland"],
        "Spanien"
      ),
      Q(
        "Vilken typ av dekoration är typisk i Filippinerna under jul?",
        ["Parol-lampor", "Julgranskulor", "Ljusslingor", "Kransar"],
        "Parol-lampor"
      ),
      Q(
        "Vilken nordisk jultradition inkluderar att tända fyra ljus under fyra söndagar före jul?",
        ["Advent", "Lucia", "Julbock", "Nytt År"],
        "Advent"
      ),
      Q(
        "Vilket land firar 'Little Christmas' den 6 januari?",
        ["Irland", "USA", "Sverige", "Frankrike"],
        "Irland"
      ),
      Q(
        "Vilket land skickade julkort redan från 1840-talet?",
        ["Storbritannien", "USA", "Tyskland", "Frankrike"],
        "Storbritannien"
      ),
      Q(
        "Vilket land introducerade adventskalendern?",
        ["Tyskland", "Österrike", "Sverige", "Danmark"],
        "Tyskland"
      ),
    ],
    hard: [
      Q(
        "Vilket år infördes julfirande officiellt i Sverige?",
        ["1600-talet", "1700-talet", "1800-talet", "1500-talet"],
        "1600-talet"
      ),
      Q(
        "Vilket land har traditionen att 'dra julbocken genom byn'?",
        ["Sverige", "Norge", "Finland", "Danmark"],
        "Sverige"
      ),
      Q(
        "Vilket land har traditionen med 'Julgröt med mandel', där vinnaren får en present?",
        ["Sverige", "Finland", "Tyskland", "Österrike"],
        "Sverige"
      ),
      Q(
        "Vilket land firar jul med fyrverkerier vid midnatt?",
        ["Filippinerna", "Frankrike", "Sverige", "USA"],
        "Filippinerna"
      ),
      Q(
        "I vilket land används en stor julkrubba som offentlig dekoration?",
        ["Italien", "Spanien", "Portugal", "Tyskland"],
        "Italien"
      ),
      Q(
        "Vilket land kallar tomten 'Père Noël'?",
        ["Frankrike", "Belgien", "Kanada", "Sverige"],
        "Frankrike"
      ),
      Q(
        "Vilket land är kända för 'Julbelysning av hus' som tävling?",
        ["USA", "Tyskland", "Norge", "Sverige"],
        "USA"
      ),
      Q(
        "I vilket land är det tradition att duka upp en julbastu på julafton?",
        ["Finland", "Sverige", "Estland", "Norge"],
        "Finland"
      ),
      Q(
        "I vilket land firar man ‘La Befana’, där en häxa ger barn godis den 6 januari?",
        ["Italien", "Spanien", "Portugal", "Frankrike"],
        "Italien"
      ),
      Q(
        "I vilket land kastar man ut julgranen från fönstret efter julfirandet?",
        ["Irland", "Skottland", "Nederländerna", "Tjeckien"],
        "Irland"
      ),
      Q(
        "I vilket land dekorerar man julgranen med ‘spökprydnader’ för att skrämma bort onda andar?",
        ["Filippinerna", "Vietnam", "Kina", "Thailand"],
        "Filippinerna"
      ),
      Q(
        "I vilket land firar man ‘Julkrubban’ med levande djur och människor på torget som en tradition?",
        ["Mexiko", "Spanien", "Italien", "Peru"],
        "Mexiko"
      ),
    ],
    own: [
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
    ],
  },

  // ---------------------------------------------------
  // 🔞 JULTOMTE SKOJ
  adult: {
    easy: [
      Q(
        "Vad gör tomten när renarna strejkar?",
        [
          "Erbjuder dem glögg 🍷",
          "Lockar med pepparkakor 🍪",
          "Hotar med kramar 😘",
          "Låter dem ta semester 🏖",
        ],
        "Låter dem ta semester 🏖"
      ),
      Q(
        "Vad gillar tomten mest med vuxenfester?",
        [
          "Att dansa salsa 💃",
          "Gratis snacks 🍫",
          "Att gömma paket under soffan 😏",
          "Sjunga karaoke 🎤",
        ],
        "Att gömma paket under soffan 😏"
      ),
      Q(
        "Vilken dryck är tomtens guilty pleasure?",
        ["Ägglikör 🥚", "Mjölk 🥛", "Julmust 🥤", "Kaffe med chili ☕🌶"],
        "Ägglikör 🥚"
      ),
      Q(
        "Vad gör tomten när han inte hittar sin mössa?",
        [
          "Gråter 😭",
          "Låtsas vara hipster 😎",
          "Lånar renarnas horn 🦌",
          "Skriver klagomail ✉️",
        ],
        "Låtsas vara hipster 😎"
      ),
      Q(
        "Vad händer om tomten dricker för mycket glögg?",
        [
          "Han blir röd i ansiktet ❤️",
          "Somnar i skorstenen 😴",
          "Dansar på bordet 💃",
          "Blir extra snäll 😇",
        ],
        "Somnar i skorstenen 😴"
      ),
      Q(
        "Hur håller tomten sig i form?",
        [
          "Snowboard 🏂",
          "Dansar runt granen 🎄",
          "Lyfter paket 🎁",
          "Joggar med renar 🦌",
        ],
        "Dansar runt granen 🎄"
      ),
      Q(
        "Vad lämnar tomten oftast efter sig på en vuxenfest?",
        [
          "Kramar 😘",
          "Mystiska lappar med hemligheter 📝😏",
          "Snacks 🍪",
          "Glittrigt konfetti ✨",
        ],
        "Kramar 😘"
      ),
      Q(
        "Vad gör tomten om han blir kär på festen?",
        [
          "Skickar brev 💌",
          "Bjuder på pepparkakor 🍪",
          "Dansar med renar 🦌",
          "Ritar hjärtan på paketen ❤️",
        ],
        "Bjuder på pepparkakor 🍪"
      ),
      Q(
        "Hur vet man att tomten varit på afterwork?",
        [
          "Släden står felvänd 🛷",
          "Renarna sjunger karaoke 🎤",
          "Han lämnar glittrigt glitter ✨",
          "Alla får extra paket 🎁",
        ],
        "Han lämnar glittrigt glitter ✨"
      ),
      Q(
        "Vilken är tomtens favoritställning när han gömmer paket under granen?",
        [
          "Sittande på knä 🧑‍🎄🍑",
          "Ligga på sidan 🛷",
          "Med glitter på ryggen ✨",
          "Balans på en ren 🦌",
        ],
        "Sittande på knä 🧑‍🎄🍑"
      ),
      Q(
        "Vad gillar tomten mest med vuxenjulens efterrätter?",
        [
          "Chokladfondue med dopp 🍫😏",
          "Pepparkakor med sprit 🥂",
          "Gravad lax med extra krydda 🐟",
          "Julmust med hemlig twist 🥤",
        ],
        "Chokladfondue med dopp 🍫😏"
      ),
      Q(
        "Hur flirtar tomten på vuxenfesten?",
        [
          "Med hemliga lappar 📝😏",
          "Med glittrigt glitter ✨",
          "Med paketbyten 🎁😉",
          "Med dansmoves 💃🦌",
        ],
        "Med hemliga lappar 📝😏"
      ),
    ],

    medium: [
      Q(
        "Vad gör tomten om renarna vägrar köra släden?",
        [
          "Hotar med kramar 😘",
          "Erbjuder extra morötter 🥕",
          "Ringer Uber 🚗",
          "Bygger snösläde ⛄",
        ],
        "Erbjuder extra morötter 🥕"
      ),
      Q(
        "Hur hanterar tomten partytrötthet?",
        [
          "Dricker glögg 🍷",
          "Tar powernap 😴",
          "Hoppar i snön ❄️",
          "Skriver hemliga listor 📝",
        ],
        "Tar powernap 😴"
      ),
      Q(
        "Vad händer när tomten blir blyg?",
        [
          "Gömmer sig i säcken 🎁",
          "Dansar extra mycket 💃",
          "Låter renarna ta över 🦌",
          "Blir röd i ansiktet ❤️",
        ],
        "Gömmer sig i säcken 🎁"
      ),
      Q(
        "Vilket är tomtens hemliga vapen på fester?",
        ["Charm 😏", "Glögg 🍷", "Renar 🦌", "Pepparkakor 🍪"],
        "Charm 😏"
      ),
      // ---- nya medium frågor med snusk & Kamasutra ----
      Q(
        "Vilken ställning föredrar tomten när han spelar vuxna paketlekar?",
        [
          "Missionären med julklappsvridning 🎁😏",
          "På rygg med glitter ✨",
          "Stående vid granen 🎄",
          "Balans på renarnas rygg 🦌",
        ],
        "Missionären med julklappsvridning 🎁😏"
      ),
      Q(
        "Vad är tomtens hemliga glädje under vuxenjulfesten?",
        [
          "Glidmedel på pepparkakorna 😏",
          "Dans med renar 🦌💃",
          "Extra sprit i glöggen 🍷",
          "Bygger paketborg 🏰",
        ],
        "Glidmedel på pepparkakorna 😏"
      ),
      Q(
        "Hur lockar tomten gäster till den privata efterfesten?",
        [
          "Med mystiska paket och hemliga lekar 🎁😉",
          "Med dansmoves 💃",
          "Med glittrigt glitter ✨",
          "Med extra chokladfondue 😏",
        ],
        "Med mystiska paket och hemliga lekar 🎁😉"
      ),
      Q(
        "Varför fastnar inte jultomten i skorstenen?",
        [
          "Han använder magiskt glidmedel 🛷✨",
          "Renarna puttar på honom 🦌💨",
          "Han krymper med julmagi 🎄🪄",
          "Han teleporteras in i huset 🌀",
        ],
        "Han använder magiskt glidmedel 🛷✨"
      ),
      Q(
        "Vad gör jultomten när han vill spetsa vuxenfesten?",
        [
          "Bjuder på extra stark glögg 🍷🔥",
          "Hittar på Kamasutra-lekar 🎎",
          "Startar en jul-swingerklubb 🎄💃🕺",
          "Smyger runt med paketlekar 😏",
        ],
        "Hittar på Kamasutra-lekar 🎎"
      ),
      Q(
        "Vilket är jultomtens hemliga trick för att roa vuxna gäster?",
        [
          "Glidmedel på släden 🛷✨",
          "Organiserar en paket-gangbang 🎁😏",
          "Dansar naken runt granen 💃🎄",
          "Serverar chokladfondue med extra krydda 🍫🌶",
        ],
        "Organiserar en paket-gangbang 🎁😏"
      ),
    ],

    hard: [
      Q(
        "Hur levererar tomten vuxenpaket utan att bli upptäckt?",
        ["Osynlighet 👻", "Teleportering 🌀", "Flygning ✈️", "Renar 🦌"],
        "Osynlighet 👻"
      ),
      Q(
        "Vad är tomtens största hemlighet?",
        [
          "Alla paket är doppade i glitter ✨",
          "Han har danslektioner 💃",
          "Han sjunger opera 🎭",
          "Han har renar som assistenter 🦌",
        ],
        "Alla paket är doppade i glitter ✨"
      ),
      Q(
        "Hur lyckas tomten med nattens alla leveranser?",
        [
          "Magisk tid ⏳",
          "Superstyrka 💪",
          "Flygande renar 🦌",
          "Teleportering 🌀",
        ],
        "Magisk tid ⏳"
      ),
      // ---- nya hard frågor med snusk & Kamasutra ----
      Q(
        "Vilken hemlig julfavorit har tomten under natten?",
        [
          "Kamasutra-inspirerad paketlek 🎁🛷😏",
          "Glittrigt glitter över hela rummet ✨",
          "Renarnas privata danslektion 🦌💃",
          "Chokladfondue med extra krydda 🍫",
        ],
        "Kamasutra-inspirerad paketlek 🎁🛷😏"
      ),
      Q(
        "Vad gör tomten om gästerna har olika preferenser?",
        [
          "Anpassar lekar och paket enligt önskemål 😏",
          "Bygger separata pakethörnor 🎁",
          "Dansar med alla renarna 🦌💃",
          "Sprider glittrigt glitter ✨",
        ],
        "Anpassar lekar och paket enligt önskemål 😏"
      ),
      Q(
        "Hur levererar tomten sina mest vågade paket?",
        [
          "Med hemlig glidmedels-lek 🎁🛷",
          "Osynligt 👻",
          "Teleportering 🌀",
          "På renryggen 🦌",
        ],
        "Med hemlig glidmedels-lek 🎁🛷"
      ),
    ],

    own: [
      Q("Hur gammal är Jultomte?", ["36år", "1755år", "163år", "225år"]),
      Q("Hur mycket väger Jultomte?", ["114kg", "116kg", "118kg", "120kg"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Hur lång är Jultomtens dräkt?", ["60cm", "64cm", "68cm", "72cm"]),
      Q("Vilka saker förknippas med jultomten?", [
        "Röd dräkt",
        "Skägg",
        "Släde med renar",
        "Julklappar",
      ]),
      Q("Vilka platser sägs jultomten bo eller resa mellan?", [
        "Nordpolen",
        "Barnens hem på julafton",
        "Tomtens verkstad",
        "I sagor och berättelser över hela världen",
      ]),
      Q("Vilka är vanliga attribut eller följeslagare till jultomten?", [
        "Renar",
        "Tomtenissar",
        "Sleigh bells (bjällror)",
        "Julgransdekorationer",
      ]),
    ],
  },
};

// ===== QUIZ LOGIK =====
let currentSet = [];
let timerInterval;
let timeLeft = 10;

// ===============================
// ===== START KATEGORI =====
// ===============================
document.querySelectorAll(".category").forEach((btn) => {
  btn.onclick = () => {
    const bank = questionBanks[btn.dataset.cat];

    currentSet = [
      ...pick(bank.easy, 3),
      ...pick(bank.medium, 3),
      ...pick(bank.own, 1),
      ...pick(bank.hard, 3),
    ];

    state.score = 0;
    state.answers = [];
    state.qIndex = 0;

    showPage(5);
    nextQuestion();
  };
});

// ===============================
// ===== TIMER =====
// ===============================
function startTimer() {
  timeLeft = 10;
  timerEl.innerText = timeLeft;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleAnswer(null, currentSet[state.qIndex]);
    }
  }, 1000);
}

// ===============================
// ===== NÄSTA FRÅGA =====
// ===============================
function nextQuestion() {
  if (state.qIndex >= currentSet.length) return showResult();

  const q = currentSet[state.qIndex];
  questionEl.innerText = q.q;
  answersEl.innerHTML = "";

  const shuffled = shuffle([...q.options]);

  shuffled.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(opt, q);
    answersEl.appendChild(btn);
  });

  progressEl.innerText = `Fråga ${state.qIndex + 1} av ${currentSet.length}`;
  startTimer();
}

// ===============================
// ===== SVARSHANTERING =====
// ===============================
function handleAnswer(selected, q) {
  clearInterval(timerInterval);

  const isOwn = !q.correct; // own-frågor saknar correct

  // ===== TIMEOUT =====
  if (selected === null) {
    const fakeCorrect = isOwn ? shuffle([...q.options])[0] : q.correct;

    answersEl.querySelectorAll("button").forEach((btn) => {
      if (btn.innerText === fakeCorrect) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
      btn.disabled = true;
    });

    state.answers.push({
      selected: null,
      correct: fakeCorrect,
      isCorrect: false,
      category: isOwn ? "own" : "timeout",
    });

    state.qIndex++;
    setTimeout(nextQuestion, 500);
    return;
  }

  // ===============================
  // 🔥 OWN-KATEGORI (ALLTID FEL)
  // ===============================
  if (isOwn) {
    const fakeCorrect = shuffle(q.options.filter((o) => o !== selected))[0];

    answersEl.querySelectorAll("button").forEach((btn) => {
      if (btn.innerText === selected) {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
      } else if (btn.innerText === fakeCorrect) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      }
      btn.disabled = true;
    });

    state.answers.push({
      selected,
      correct: fakeCorrect,
      isCorrect: false,
      category: "own",
    });

    // ❌ Ingen poäng
    state.qIndex++;
    setTimeout(nextQuestion, 500);
    return;
  }

  // ===============================
  // ✅ NORMAL KATEGORI
  // ===============================
  const isCorrect = selected === q.correct;

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

  state.answers.push({
    selected,
    correct: q.correct,
    isCorrect,
    category: "normal",
  });

  if (isCorrect) state.score++;

  state.qIndex++;
  setTimeout(nextQuestion, 500);
}

// ===============================
// ===== RESULTAT =====
// ===============================
function showResult() {
  showPage(6);

  scoreText.innerText = `Du fick ${state.score} av ${currentSet.length} rätt`;

  let imgSrc = "";
  let message = ""; // för texten

  if (state.score === 10) {
    imgSrc =
      "https://www.riksbank.se/iv-images/publishedmedia/44j91vowc7wepjl8i0ta/1000-kronossedel-specimen-fram.png";
    message = "Fantastiskt! 💰";
  } else if (state.score >= 7) {
    imgSrc = "assets/tomtebild.jpg";
    new Audio("assets/tomte.mp3").play();
    message = "Vinsten är Chokladtomte 🍫";
  } else if (state.score >= 4) {
    imgSrc = "assets/Candy.jpg";
    new Audio("assets/polka.mp3").play();
    message = "Vinsten är Julstav 🎁";
  } else {
    imgSrc = "assets/betterLuck.jpg";
    new Audio("assets/forlust.mp3").play();
    message = "Fråga Jultomte 🎅 om en till chans✨";
  }

  // Bild
  resultImage.innerHTML = `
    <div style="display:flex;justify-content:center;margin-bottom:16px;">
      <img src="${imgSrc}" style="max-height:150px;border-radius:16px;" />
    </div>
  `;

  // Text
  resultText.textContent = message;
}
