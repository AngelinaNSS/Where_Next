import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// travel info for 10 countries
const countryData = {
  canada: {
    areas: ["Toronto Distillery District", "Vancouver Gastown", "Ottawa museums", "Banff National Park"],
    foods: ["Poutine", "Maple syrup desserts", "Butter tarts"],
    budget: { low: "€50–€80/day", mid: "€90–€140/day", high: "€200+/day" },
    dos: ["Try poutine!", "Visit national parks", "Explore Ottawa museums"],
    donts: ["Don’t jaywalk", "Avoid remote bear areas"],
    warnings: ["Low crime in cities", "Some remote areas have wildlife"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Emma J.", avatar: "/avatar1.png", comment: "Toronto's Distillery District is amazing!", likes: 12 },
      { user: "Liam R.", avatar: "/avatar5.png", comment: "Montreal food scene is amazing.", likes: 8 },
      { user: "Sofia G.", avatar: "/avatar3.png", comment: "Banff is breathtaking!", likes: 25 },
    ],
  },
  france: {
    areas: ["Le Marais", "Latin Quarter", "Montmartre", "Nice Old Town"],
    foods: ["Croissants", "Crêpes", "Cheese plates", "Ratatouille"],
    budget: { low: "€50–€80/day", mid: "€100–€160/day", high: "€220+/day" },
    dos: ["Visit museums", "Try local bakeries"],
    donts: ["Don’t speak only English", "Watch out for pickpockets in Paris"],
    warnings: ["Some pickpocketing in tourist areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Sophie L.", avatar: "/avatar2.png", comment: "Love the lavender fields in Provence.", likes: 15 },
      { user: "Julien M.", avatar: "/avatar3.png", comment: "Try a café terrace in Paris!", likes: 9 },
    ],
  },
  italy: {
    areas: ["Trastevere (Rome)", "Florence Historic Center", "Venice Dorsoduro"],
    foods: ["Pizza", "Pasta", "Gelato", "Espresso"],
    budget: { low: "€45–€75/day", mid: "€95–€150/day", high: "€210+/day" },
    dos: ["Eat gelato daily", "Visit art museums"],
    donts: ["Avoid taxis in Rome if possible"],
    warnings: ["Pickpockets in tourist areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Marco P.", avatar: "/avatar4.png", comment: "Siena is amazing for history!", likes: 20 },
    ],

    germany: {
  areas: ["Berlin Mitte", "Munich Old Town", "Hamburg HafenCity", "Black Forest"],
  foods: ["Bratwurst", "Schnitzel", "Pretzels", "Black Forest cake"],
  budget: { low: "€50–€80/day", mid: "€90–€140/day", high: "€200+/day" },
  dos: ["Use public transport", "Carry cash"],
  donts: ["Don’t jaywalk", "Don’t be loud on public transport"],
  warnings: ["Pickpocketing in tourist areas"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "LukasB", avatar: "/avatar2.png", comment: "Berlin nightlife is unmatched.", likes: 18 },
    { user: "Anna_M", avatar: "/avatar3.png", comment: "Neuschwanstein Castle is magical!", likes: 27 }
  ],
},

  },
  japan: {
    areas: ["Shinjuku", "Shibuya", "Gion (Kyoto)", "Osaka City Center"],
    foods: ["Sushi", "Ramen", "Takoyaki", "Matcha desserts"],
    budget: { low: "€45–€70/day", mid: "€90–€140/day", high: "€200+/day" },
    dos: ["Visit temples", "Try sushi at local markets"],
    donts: ["Don’t tip in restaurants", "Avoid speaking loudly on trains"],
    warnings: ["Earthquake-prone areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Yuki25H", avatar: "/avatar1.png", comment: "Shibuya crossing is iconic!", likes: 22 },
      { user: "Dana_Lum", avatar: "/avatar1.png", comment: "Sushi Koshikawa! Hands down the best Sushi place in the entire Tokyo", likes: 43 },
    ],
  },

  jamaica: {
  areas: ["Montego Bay", "Negril Beach", "Ocho Rios", "Blue Mountains"],
  foods: ["Jerk chicken", "Ackee & saltfish", "Fried plantains"],
  budget: { low: "€40–€70/day", mid: "€80–€130/day", high: "€180+/day" },
  dos: ["Try local food", "Use licensed taxis"],
  donts: ["Don’t walk alone at night", "Avoid flashy jewelry"],
  warnings: ["Petty crime in cities"],
  visa: "Visa-free <90 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "IslandSoul", avatar: "/avatar4.png", comment: "Seven Mile Beach is paradise.", likes: 34 },
    { user: "Kayla_R", avatar: "/avatar1.png", comment: "Jerk chicken in local spots hits different.", likes: 21 }
  ],
},
spain: {
  areas: ["Barcelona Gothic Quarter", "Madrid Malasaña", "Seville Old Town", "Ibiza"],
  foods: ["Paella", "Tapas", "Churros", "Jamón ibérico"],
  budget: { low: "€45–€75/day", mid: "€90–€140/day", high: "€190+/day" },
  dos: ["Enjoy late dinners", "Explore local markets"],
  donts: ["Don’t eat too early", "Watch for pickpockets"],
  warnings: ["Pickpocketing in Barcelona"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "CarlosM", avatar: "/avatar2.png", comment: "Tapas hopping in Seville is a must.", likes: 29 },
    { user: "MiaTravels", avatar: "/avatar3.png", comment: "Sunsets in Ibiza are unreal.", likes: 17 }
  ],
},
usa: {
  areas: ["New York City", "Los Angeles", "San Francisco", "Grand Canyon"],
  foods: ["Burgers", "BBQ", "Tacos", "Apple pie"],
  budget: { low: "€60–€100/day", mid: "€120–€180/day", high: "€250+/day" },
  dos: ["Tip service workers", "Explore national parks"],
  donts: ["Don’t ignore local laws", "Avoid unsafe neighborhoods"],
  warnings: ["High healthcare costs"],
  visa: "ESTA required for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "RoadTripJay", avatar: "/avatar5.png", comment: "Route 66 is iconic.", likes: 41 },
    { user: "NYClover", avatar: "/avatar1.png", comment: "Nothing beats NYC energy.", likes: 33 }
  ],
},
portugal: {
  areas: ["Lisbon Alfama", "Porto Ribeira", "Algarve Coast"],
  foods: ["Pastel de nata", "Bacalhau", "Grilled sardines"],
  budget: { low: "€40–€70/day", mid: "€85–€130/day", high: "€180+/day" },
  dos: ["Try local pastries", "Use trams in Lisbon"],
  donts: ["Don’t skip Porto wine", "Avoid tourist-only restaurants"],
  warnings: ["Pickpockets in Lisbon"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "Nina_PT", avatar: "/avatar2.png", comment: "Porto is so underrated.", likes: 24 },
    { user: "LeoSun", avatar: "/avatar4.png", comment: "Algarve beaches are stunning.", likes: 38 }
  ],
},

australia: {
  areas: ["Sydney Opera House", "Melbourne CBD", "Great Barrier Reef"],
  foods: ["Meat pies", "Avocado toast", "Tim Tams"],
  budget: { low: "€60–€90/day", mid: "€110–€170/day", high: "€230+/day" },
  dos: ["Wear sunscreen", "Explore coastal walks"],
  donts: ["Don’t underestimate distances", "Avoid wildlife"],
  warnings: ["Strong sun exposure"],
  visa: "ETA required",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "SurfLife", avatar: "/avatar3.png", comment: "Bondi to Coogee walk is elite.", likes: 26 },
    { user: "OutbackTom", avatar: "/avatar5.png", comment: "The Outback feels unreal.", likes: 19 }
  ],
},

iceland: {
  areas: ["Reykjavik", "Golden Circle", "Blue Lagoon", "South Coast"],
  foods: ["Lamb soup", "Skyr", "Fresh seafood"],
  budget: { low: "€70–€100/day", mid: "€120–€180/day", high: "€250+/day" },
  dos: ["Rent a car", "Check weather often"],
  donts: ["Don’t go off marked paths", "Don’t underestimate cold"],
  warnings: ["Rapid weather changes"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "AuroraChaser", avatar: "/avatar1.png", comment: "Northern lights were unreal.", likes: 47 },
    { user: "RoadTripEva", avatar: "/avatar2.png", comment: "Driving the Ring Road is a must.", likes: 32 }
  ],
},

greece: {
  areas: ["Santorini", "Athens Plaka", "Crete Chania", "Mykonos"],
  foods: ["Gyros", "Moussaka", "Greek salad"],
  budget: { low: "€45–€75/day", mid: "€90–€140/day", high: "€200+/day" },
  dos: ["Visit islands", "Try local tavernas"],
  donts: ["Don’t rush meals", "Avoid midday heat"],
  warnings: ["Heat waves in summer"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "HelenaSun", avatar: "/avatar3.png", comment: "Santorini sunsets live up to the hype.", likes: 40 },
    { user: "TheoG", avatar: "/avatar2.png", comment: "Crete beaches are underrated.", likes: 22 }
  ],
},

costarica: {
  areas: ["Arenal Volcano", "Monteverde", "Manuel Antonio"],
  foods: ["Gallo pinto", "Casado", "Fresh tropical fruit"],
  budget: { low: "€40–€70/day", mid: "€85–€130/day", high: "€180+/day" },
  dos: ["Respect nature", "Go zip-lining"],
  donts: ["Don’t litter", "Avoid unsafe beaches at night"],
  warnings: ["Strong ocean currents"],
  visa: "Visa-free <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "PuraVida", avatar: "/avatar5.png", comment: "Monteverde cloud forest is unreal.", likes: 35 },
    { user: "EcoTravel", avatar: "/avatar4.png", comment: "Wildlife everywhere!", likes: 28 }
  ],
},

mexico: {
  areas: ["Mexico City Roma", "Tulum", "Cancún", "Oaxaca"],
  foods: ["Tacos", "Mole", "Tamales", "Churros"],
  budget: { low: "€35–€65/day", mid: "€80–€120/day", high: "€170+/day" },
  dos: ["Eat street food", "Learn basic Spanish"],
  donts: ["Don’t drink tap water", "Avoid unsafe areas at night"],
  warnings: ["Petty crime in cities"],
  visa: "Visa-free <180 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "TacoQueen", avatar: "/avatar1.png", comment: "Best tacos are always street tacos.", likes: 52 },
    { user: "OaxacaLove", avatar: "/avatar3.png", comment: "Mole in Oaxaca is next level.", likes: 29 }
  ],
},
thailand: {
  areas: ["Bangkok Old Town", "Chiang Mai", "Phuket Beaches", "Krabi"],
  foods: ["Pad Thai", "Green curry", "Mango sticky rice"],
  budget: { low: "€25–€45/day", mid: "€60–€100/day", high: "€150+/day" },
  dos: ["Respect temples", "Try street food"],
  donts: ["Don’t touch heads", "Avoid disrespecting the monarchy"],
  warnings: ["Heat and humidity"],
  visa: "Visa-free <30–60 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "NomadNina", avatar: "/avatar1.png", comment: "Chiang Mai cafés are elite.", likes: 44 },
    { user: "BeachMode", avatar: "/avatar3.png", comment: "Krabi sunsets are unreal.", likes: 37 }
  ],
},
switzerland: {
  areas: ["Zurich Old Town", "Lucerne", "Interlaken", "Zermatt"],
  foods: ["Fondue", "Rösti", "Swiss chocolate"],
  budget: { low: "€70–€100/day", mid: "€120–€180/day", high: "€260+/day" },
  dos: ["Use trains", "Carry cash"],
  donts: ["Don’t be late", "Avoid loud behavior"],
  warnings: ["High costs"],
  visa: "Schengen <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "AlpineViews", avatar: "/avatar5.png", comment: "Train views are unmatched.", likes: 39 },
    { user: "SnowFox", avatar: "/avatar2.png", comment: "Zermatt feels unreal.", likes: 26 }
  ],
},
morocco: {
  areas: ["Marrakech Medina", "Fes Old Town", "Chefchaouen", "Sahara Desert"],
  foods: ["Tagine", "Couscous", "Mint tea"],
  budget: { low: "€30–€55/day", mid: "€70–€110/day", high: "€160+/day" },
  dos: ["Hire local guides", "Dress modestly"],
  donts: ["Don’t photograph people without asking", "Avoid scams"],
  warnings: ["Aggressive vendors in medinas"],
  visa: "Visa-free <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "DesertDream", avatar: "/avatar4.png", comment: "Sahara night sky blew my mind.", likes: 48 },
    { user: "BlueCity", avatar: "/avatar1.png", comment: "Chefchaouen is unreal.", likes: 34 }
  ],
},
southkorea: {
  areas: ["Seoul Hongdae", "Gyeongbokgung Palace", "Busan Haeundae", "Jeju Island"],
  foods: ["Bibimbap", "Korean BBQ", "Tteokbokki"],
  budget: { low: "€40–€65/day", mid: "€80–€130/day", high: "€180+/day" },
  dos: ["Use public transport", "Try convenience store food"],
  donts: ["Don’t tip", "Avoid loud phone calls on transit"],
  warnings: ["Crowded subway during rush hour"],
  visa: "Visa-free <90 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "SeoulVibes", avatar: "/avatar3.png", comment: "Hongdae nightlife is insane.", likes: 41 },
    { user: "JejuSoul", avatar: "/avatar2.png", comment: "Jeju felt like another world.", likes: 29 }
  ],
},
peru: {
  areas: ["Cusco", "Machu Picchu", "Sacred Valley", "Lima Miraflores"],
  foods: ["Ceviche", "Lomo saltado", "Quinoa dishes"],
  budget: { low: "€30–€55/day", mid: "€70–€110/day", high: "€160+/day" },
  dos: ["Acclimate to altitude", "Book Machu Picchu early"],
  donts: ["Don’t rush hikes", "Avoid unsafe areas at night"],
  warnings: ["Altitude sickness"],
  visa: "Visa-free <90 days",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "TrailHiker", avatar: "/avatar5.png", comment: "Sacred Valley was life-changing.", likes: 46 },
    { user: "FoodieLima", avatar: "/avatar4.png", comment: "Lima has world-class food.", likes: 33 }
  ],
},
tanzania: {
  areas: [
    "Serengeti National Park",
    "Ngorongoro Crater",
    "Zanzibar Stone Town",
    "Mount Kilimanjaro"
  ],
  foods: ["Ugali", "Nyama choma", "Zanzibari biryani", "Fresh coconut dishes"],
  budget: { low: "€35–€60/day", mid: "€80–€130/day", high: "€200+/day" },
  dos: [
    "Book safaris with licensed guides",
    "Respect local customs and dress modestly",
    "Carry cash in rural areas"
  ],
  donts: [
    "Don’t approach wild animals",
    "Don’t photograph people without permission"
  ],
  warnings: [
    "Malaria risk in some regions",
    "Limited medical facilities outside major cities"
  ],
  visa: "Visa on arrival or eVisa for many countries",
  vaccines: ["Routine vaccines recommended", "Yellow fever for some travelers"],
  community: [
    { user: "SafariSoul", avatar: "/avatar1.png", comment: "Watching the Great Migration in the Serengeti was unreal. No words.", likes: 61 },
    { user: "ZanziVibes", avatar: "/avatar3.png", comment: "Stone Town felt like stepping into history. Spice tour is a must.", likes: 44 },
    { user: "PeakDreamer", avatar: "/avatar5.png", comment: "Kilimanjaro is tough but life-changing.", likes: 37 }
  ],
},
namibia: {
  areas: [
    "Sossusvlei Dunes",
    "Etosha National Park",
    "Swakopmund",
    "Skeleton Coast"
  ],
  foods: ["Game meat", "Kapana", "Biltong"],
  budget: { low: "€40–€65/day", mid: "€90–€140/day", high: "€220+/day" },
  dos: [
    "Rent a 4x4 vehicle",
    "Carry extra water",
    "Respect wildlife distances"
  ],
  donts: [
    "Don’t underestimate driving distances",
    "Don’t travel at night"
  ],
  warnings: [
    "Extreme heat in desert regions",
    "Limited fuel stations in remote areas"
  ],
  visa: "Visa-free <90 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "DesertMiles", avatar: "/avatar2.png", comment: "Sossusvlei at sunrise felt like another planet.", likes: 58 },
    { user: "RoadTripNA", avatar: "/avatar4.png", comment: "Driving Namibia is long but insanely rewarding.", likes: 42 },
    { user: "WildlifeLens", avatar: "/avatar1.png", comment: "Etosha waterholes = best animal sightings I’ve ever had.", likes: 39 }
  ],
},
kenya: {
  areas: [
    "Maasai Mara",
    "Nairobi National Park",
    "Diani Beach",
    "Mount Kenya"
  ],
  foods: ["Nyama choma", "Ugali", "Samosas", "Chapati"],
  budget: { low: "€35–€60/day", mid: "€80–€130/day", high: "€200+/day" },
  dos: [
    "Support local communities",
    "Use safari-certified operators",
    "Carry small bills"
  ],
  donts: [
    "Don’t display valuables",
    "Avoid isolated areas at night"
  ],
  warnings: [
    "Petty crime in major cities",
    "Malaria risk in some regions"
  ],
  visa: "eVisa required",
  vaccines: ["Routine vaccines recommended", "Yellow fever recommended"],
  community: [
    { user: "MaraMagic", avatar: "/avatar5.png", comment: "Maasai Mara safari was the highlight of my life.", likes: 67 },
    { user: "BeachAndBush", avatar: "/avatar3.png", comment: "Diani Beach after safari is the perfect combo.", likes: 46 },
    { user: "NairobiNomad", avatar: "/avatar2.png", comment: "Crazy that you can see rhinos with the city skyline behind.", likes: 34 }
  ],
},
egypt: {
  areas: [
    "Giza Pyramids",
    "Luxor Temples",
    "Aswan",
    "Red Sea (Hurghada)"
  ],
  foods: ["Koshari", "Falafel (ta’ameya)", "Ful medames"],
  budget: { low: "€30–€55/day", mid: "€70–€110/day", high: "€170+/day" },
  dos: [
    "Hire licensed guides at historical sites",
    "Carry small bills for tips",
    "Dress modestly at temples"
  ],
  donts: [
    "Don’t engage aggressively with vendors",
    "Avoid political discussions"
  ],
  warnings: [
    "Persistent vendors in tourist areas",
    "Extreme heat in summer"
  ],
  visa: "Visa on arrival or eVisa",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "HistoryNerd", avatar: "/avatar1.png", comment: "Standing in front of the pyramids gave me chills.", likes: 73 },
    { user: "NileDream", avatar: "/avatar4.png", comment: "Nile cruise between Luxor and Aswan was magical.", likes: 51 },
    { user: "RedSeaLife", avatar: "/avatar3.png", comment: "Snorkeling in the Red Sea is unreal.", likes: 45 }
  ],
},
colombia: {
  areas: [
    "Medellín El Poblado",
    "Cartagena Old Town",
    "Coffee Region (Salento)",
    "Bogotá La Candelaria"
  ],
  foods: ["Arepas", "Bandeja paisa", "Empanadas"],
  budget: { low: "€30–€55/day", mid: "€70–€110/day", high: "€160+/day" },
  dos: [
    "Use Uber or licensed taxis",
    "Learn basic Spanish phrases",
    "Explore coffee farms"
  ],
  donts: [
    "Don’t walk with phone out",
    "Avoid unsafe neighborhoods"
  ],
  warnings: [
    "Petty theft in cities",
    "Altitude in Bogotá"
  ],
  visa: "Visa-free <90 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "CoffeeTrail", avatar: "/avatar2.png", comment: "Salento coffee farms were incredible.", likes: 56 },
    { user: "MedellinMove", avatar: "/avatar5.png", comment: "The city has changed so much — loved it.", likes: 48 },
    { user: "ColorfulStreets", avatar: "/avatar3.png", comment: "Cartagena colors are unreal.", likes: 41 }
  ],
},
panama: {
  areas: [
    "Panama City Casco Viejo",
    "Panama Canal",
    "Bocas del Toro",
    "Boquete"
  ],
  foods: ["Sancocho", "Ceviche", "Patacones"],
  budget: { low: "€35–€60/day", mid: "€80–€130/day", high: "€180+/day" },
  dos: [
    "Explore Casco Viejo on foot",
    "Visit both oceans",
    "Carry USD cash"
  ],
  donts: [
    "Don’t underestimate humidity",
    "Avoid unsafe neighborhoods at night"
  ],
  warnings: [
    "Heat and humidity",
    "Petty theft in cities"
  ],
  visa: "Visa-free <90 days for many countries",
  vaccines: ["Routine vaccines recommended"],
  community: [
    { user: "CanalWatcher", avatar: "/avatar4.png", comment: "Seeing ships pass through the canal was fascinating.", likes: 38 },
    { user: "IslandHopper", avatar: "/avatar1.png", comment: "Bocas del Toro is laid-back paradise.", likes: 44 },
    { user: "MountainBreeze", avatar: "/avatar5.png", comment: "Boquete is perfect if you want cooler weather.", likes: 29 }
  ],
},

};

const WEATHER_KEY = "cd728caae961ef1ea9cc6168cfd0c1d5";

const OrganizeTripPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const query = state?.country || "";
  const tripDate = state?.tripDate || "";

  const normalizedCountry = query
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "");


  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [result, setResult] = useState(null);
  const [showAllTips, setShowAllTips] = useState(false);
  const [loading, setLoading] = useState(true);

  const cutePackingTips = [
    "Bring cash — small shops may not accept cards.",
    "Carry a portable fan; it gets warm quickly!",
    "Imodium + nausea tablets (life-saving).",
    "Pack electrolytes for long walking days.",
    "Comfortable sandals are essential.",
    "Double sunscreen — you’ll need it.",
    "Hydrate frequently, especially midday.",
  ];

  // Weather helpers
  const getCoordinates = async (place) => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${WEATHER_KEY}`
    );
    const data = await res.json();
    return data[0] ? { lat: data[0].lat, lon: data[0].lon } : null;
  };

  const getWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_KEY}`
    );
    const data = await res.json();
    return data.current;
  };

  useEffect(() => {
    const loadData = async () => {
      if (!query) return;

      const coords = await getCoordinates(query.trim());
      if (coords) {
        const w = await getWeather(coords.lat, coords.lon);
        setWeather(w);
        setLocalTime(new Date().toLocaleTimeString());
      }

      const storedChecklist = JSON.parse(localStorage.getItem(`packing_${normalizedCountry}`)) || [];

      setChecklist(storedChecklist);
      setResult(countryData[normalizedCountry] || null);
      setLoading(false);
    };

    loadData();
  }, [query]);

  const addChecklistItem = () => {
    if (!newItem.trim()) return;
    const updated = [...checklist, { text: newItem, done: false }];
    setChecklist(updated);
    setNewItem("");
    localStorage.setItem(`packing_${normalizedCountry}`, JSON.stringify(updated));
  };

  const toggleChecklistItem = (i) => {
    const updated = [...checklist];
    updated[i].done = !updated[i].done;
    setChecklist(updated);
    localStorage.setItem(`packing_${normalizedCountry}`, JSON.stringify(updated));
  };

  const removeChecklistItem = (i) => {
    const updated = checklist.filter((_, idx) => idx !== i);
    setChecklist(updated);
    localStorage.setItem(`packing_${normalizedCountry}`, JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#dbf0c0", minHeight: "200vh", overflowY: "auto", boxSizing: "border-box", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2b6048" }}>
        Travel Guide for {query}
      </h1>

      {tripDate && (
        <p style={{ textAlign: "center", color: "#2b6048" }}>
          ⏳ Your trip starts on {tripDate}. Time to get excited!
        </p>
      )}

      {loading && <p style={{ textAlign: "center" }}>Loading trip info…</p>}

      {/* back */}
<div style={{ textAlign: "center", margin: "1rem 0" }}>
  <button
    onClick={() =>
      navigate("/trip-countdown", {
        state: {
          country: query,
          tripDate: tripDate,
        },
      })
    }
    style={{
      background: "#a1e0f0",
      color: "#2b6048",
      border: "none",
      padding: "0.4rem 0.9rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.9rem",
      boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
    }}
  >
    ← Back
  </button>
</div>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {weather && (
              <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
                <h3>Weather & Local Time</h3>
                <p>🌡️ {weather.temp}°C — {weather.weather[0].description} | ⏰ {localTime}</p>
              </div>
            )}

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3> Top Areas to Visit</h3>
              <ul>{result.areas.map(a => <li key={a}>{a}</li>)}</ul>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Local Foods</h3>
              <ul>{result.foods.map(f => <li key={f}>{f}</li>)}</ul>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Travel Info</h3>
              <p><strong>Visa:</strong> {result.visa}</p>
              <p><strong>Vaccines:</strong> {result.vaccines.join(", ")}</p>
              <p><strong>Warnings:</strong> {result.warnings.join(", ")}</p>
              <p><strong>Dos:</strong> {result.dos.join(", ")}</p>
              <p><strong>Don'ts:</strong> {result.donts.join(", ")}</p>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Community Comments</h3>
              {result.community.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <img src={c.avatar} width="35" height="35" style={{ borderRadius: "50%" }} />
                  <strong>{c.user}:</strong> {c.comment}
                </div>
              ))}
            </div>
          </div>

          {/* R.Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* First-Time Traveler Tips */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>💡 First-Time Traveler Tips</h3>
              {cutePackingTips.slice(0, showAllTips ? undefined : 3).map((tip, i) => (
                <div key={i} style={{ marginBottom: "0.5rem" }}>💡 {tip}</div>
              ))}
              {cutePackingTips.length > 3 && (
                <button
                  onClick={() => setShowAllTips(!showAllTips)}
                  style={{ background: "none", border: "none", color: "#2b6048", cursor: "pointer", marginTop: "0.5rem" }}
                >
                  {showAllTips ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>

            {/* Packing Checklist */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>🎒 Packing Checklist</h3>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add item..."
                  style={{ flex: 1, padding: "0.3rem 0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button onClick={addChecklistItem} style={{ borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer" }}>+</button>
              </div>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {checklist.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                    <input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(i)} />
                    <span style={{ textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
                    <button onClick={() => removeChecklistItem(i)} style={{ marginLeft: "auto", cursor: "pointer" }}>✕</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Mood */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
              <h3>🌍 Travel Mood</h3>
              <p>How excited are you for this trip?</p>
              <div style={{ fontSize: "1.5rem" }}>😃 😎 🏖️ ✈️ 🗺️</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizeTripPage;