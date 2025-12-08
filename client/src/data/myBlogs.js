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
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        text: "The endless red torii gates were absolutely magical at sunrise."
      },
      {
        title: "Arashiyama Bamboo Grove",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        text: "A peaceful walk in one of the most breathtaking forests in Japan."
      }
    ],
    comments: [
      { user: "Lily", text: "This looks amazing!", likes: 3 },
      { user: "Marco", text: "Going next year!", likes: 1 }
    ]
  },

  {
    id: 2,
    title: "Cape Town Memories",
    heroImage: "/capetown.jpg",
    story: `Cape Town surprised me in every way…

Beaches, mountains, penguins — the perfect combination.`,
    sections: [
      {
        title: "Table Mountain",
        image: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e0",
        text: "The views were unreal. Highly recommend going early."
      }
    ],
    comments: []
  },

  {
    id: 3,
    title: "Iceland Roadtrip",
    heroImage: "/iceland.jpg",
    story: `Driving the Ring Road was one of the best experiences of my life.`,
    sections: [
      {
        title: "Skógafoss Waterfall",
        image: "https://images.unsplash.com/photo-1500036522056-56f0d48959a3",
        text: "Super powerful and loud — bring a rain jacket!"
      }
    ],
    comments: []
  },

  {
    id: 4,
    title: "Bali Wellness Escape",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    story: `Bali is a warm hug to the soul…`,
    sections: [
      {
        title: "Ubud Rice Terraces",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        text: "A gorgeous place to slow down and breathe."
      }
    ],
    comments: []
  }
];
