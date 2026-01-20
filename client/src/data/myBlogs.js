// myBlogs.js
export const myBlogs = [
  {
    id: 1,
    title: "My Kyoto Adventure",
    heroImage: "/kyoto.jpg",
    story: `Kyoto was a dream...

I explored temples, ate the best matcha desserts, and walked through quiet bamboo forests.`,
    sections: [
      {
        title: "Fushimi Inari",
        image: "/redtori.jpg",
        text: "The endless red torii gates were absolutely magical at sunrise."
      },
      {
        title: "Arashiyama Bamboo Grove",
        image: "/bamboo_grove.jpg",
        text: "A peaceful walk in one of the most breathtaking forests in Japan."
      }
    ],
    likes: Math.floor(Math.random() * 200) + 50,
    comments: [
      { user: "Lily", text: "This looks amazing!", likes: Math.floor(Math.random() * 20), time: "2d" },
      { user: "Marco", text: "Going next year!", likes: Math.floor(Math.random() * 15), time: "1d" }
    ]
  },

  {
    id: 2,
    title: "Cape Town Memories",
    heroImage: "/capetown.jpg",
    story: `Cape Town surprised me in every way…

Beaches, mountains, penguins, honestly for me was the perfect combination.`,
    sections: [
      {
        title: "Table Mountain",
        image: "/tablemtn.jpg",
        text: "The views were unreal. Highly recommend going early. Standing at the top of Table Mountain felt like stepping into another world. The cable car ride alone had my heart racing—in the best way—as the city of Cape Town shrank beneath me and the ocean stretched out like a sheet of glass. Up on the plateau, the air was cooler, the wind a little wild, and the views absolutely unreal. I wandered along the rocky paths, stopping every few minutes because how could I not take another photo? From the Twelve Apostles to Robben Island, everything looked painted into place. It’s one of those rare spots where you feel tiny and infinite at the same time, and leaving felt like saying goodbye to a dream I wasn’t quite ready to wake up from."
      }
    ],
    likes: Math.floor(Math.random() * 200) + 50,
    comments: [
      {
        user: "wanderlisa",
        avatar: "/avatars/user1.jpg",
        text: "Cape Town is on my bucket list 😍 these views look unreal!",
        likes: Math.floor(Math.random() * 30),
        time: "2d"
      },
      {
        user: "mark_travels",
        avatar: "/avatars/user2.jpg",
        text: "Table Mountain early morning is the BEST choice 🙌",
        likes: Math.floor(Math.random() * 25),
        time: "1d"
      },
      {
        user: "foodie.jess",
        avatar: "/avatars/user3.jpg",
        text: "Did you try the local food markets?? So good 🤤",
        likes: Math.floor(Math.random() * 20),
        time: "23h"
      },
      {
        user: "alex_ontheroad",
        avatar: "/avatars/user4.jpg",
        text: "Cape Town has such a unique vibe. Love this post!",
        likes: Math.floor(Math.random() * 25),
        time: "20h"
      },
      {
        user: "travelwithsam",
        avatar: "/avatars/user5.jpg",
        text: "Those penguins stole my heart when I went 🐧❤️",
        likes: Math.floor(Math.random() * 30),
        time: "18h"
      }
    ]
  },

  {
    id: 3,
    title: "Iceland Roadtrip",
    heroImage: "/iceland.jpg",
    story: `Driving the Ring Road was one of the best experiences of my life. 
Iceland’s landscapes are straight out of a dream — waterfalls, glaciers, black sand beaches, and endless skies. 
Every stop felt like stepping into a postcard.`,
    sections: [
      {
        title: "Skógafoss Waterfall",
        image: "/skogafoss.jpg",
        text: "Super powerful and loud — bring a rain jacket! The spray creates rainbows on sunny days, making it a photographer’s paradise!"
      },
      {
        title: "Seljalandsfoss",
        image: "/selja.jpg",
        text: "You can actually walk behind this waterfall! It's magical at sunset when the sky glows behind it."
      },
      {
        title: "Reynisfjara Black Sand Beach",
        image: "/blk_beach.jpg",
        text: "Absolutely surreal. The basalt columns are stunning, and the waves are seriously strong — don’t get too close!"
      }
    ],
    likes: Math.floor(Math.random() * 250) + 60,
    comments: [
      {
        user: "northernlightsfan",
        avatar: "/avatars/user6.jpg",
        text: "Ahhh this makes me want to book a flight immediately 😍 Iceland looks insane!",
        likes: Math.floor(Math.random() * 25),
        time: "1d"
      },
      {
        user: "traveljunkie77",
        avatar: "/avatars/user7.jpg",
        text: "Ring Road is the ultimate road trip. Did you camp along the way or stay in hostels?",
        likes: Math.floor(Math.random() * 20),
        time: "22h"
      },
      {
        user: "icelandiclover",
        avatar: "/avatars/user8.jpg",
        text: "Skógafoss is my favorite! Nothing like standing next to that power 💦",
        likes: Math.floor(Math.random() * 18),
        time: "18h"
      },
      {
        user: "globetrotter_sam",
        avatar: "/avatars/user9.jpg",
        text: "Reynisfjara scared me a bit — those waves are no joke! But so beautiful.",
        likes: Math.floor(Math.random() * 15),
        time: "16h"
      },
      {
        user: "frozenadventures",
        avatar: "/avatars/user10.jpg",
        text: "Northern lights over Jökulsárlón is on my bucket list! Amazing shots 🌌",
        likes: Math.floor(Math.random() * 22),
        time: "12h"
      }
    ]
  },

  {
    id: 4,
    title: "Bali Wellness Escape",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    story: `Bali is a warm hug to the soul… From the moment I arrived, I felt a sense of calm and inspiration. 
The lush landscapes, gentle beaches, and welcoming people made it the perfect escape from the busy city life. 
Every day felt like a meditation in motion, and I came back feeling completely refreshed.`,
    sections: [
      {
        title: "Ubud Rice Terraces",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        text: "A gorgeous place to slow down and breathe. Walking along the terraces at sunrise was magical."
      },
      {
        title: "Yoga & Meditation Retreat",
        image: "/yoga_bali.jpg",
        text: "Daily yoga sessions overlooking the jungle were exactly what I needed. The instructors were so welcoming and patient."
      },
      {
        title: "Tegalalang Handicraft Village",
        image: "/bali_handcraft.jpg",
        text: "Exploring local art and crafts was so inspiring. I even brought back a few handmade souvenirs!"
      },
      {
        title: "Healthy Balinese Food",
        image: "/bali_food.jpg",
        text: "Fresh tropical fruits, smoothie bowls, and local vegan dishes. Every meal was a treat for the body and soul."
      }
    ],
    likes: Math.floor(Math.random() * 220) + 50,
    comments: [
      {
        user: "yogijane",
        avatar: "/avatars/user11.jpg",
        text: "Ubud terraces are my happy place too! 🌾 So peaceful.",
        likes: Math.floor(Math.random() * 20),
        time: "2d"
      },
      {
        user: "wellness_wanderer",
        avatar: "/avatars/user12.jpg",
        text: "Your yoga retreat experience looks amazing! 😍",
        likes: Math.floor(Math.random() * 18),
        time: "1d"
      },
      {
        user: "beachlover99",
        avatar: "/avatars/user13.jpg",
        text: "Those Bali sunsets are everything! 🌅",
        likes: Math.floor(Math.random() * 22),
        time: "23h"
      },
      {
        user: "healthytraveler",
        avatar: "/avatars/user14.jpg",
        text: "Yum! Those smoothie bowls look incredible. Need to go! 🥭",
        likes: Math.floor(Math.random() * 15),
        time: "20h"
      },
      {
        user: "culturalexplorer",
        avatar: "/avatars/user15.jpg",
        text: "Tegalalang Village is such a gem! Love that you explored it 🌿",
        likes: Math.floor(Math.random() * 12),
        time: "18h"
      }
    ]
  }
];

