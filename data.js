//DEVEN WEEDEN 2026
const D = {

  spr: {
    sheet: "icons/tourist-spritesheet.png",
    w: 17,
    h: 34,
    cols: 16,
    scl: 3,
    anims: {
      idle: { row: 0, n: 3, fps: 4, loop: true },
      walk: { row: 1, n: 5, fps: 8, loop: true },
      snap: { row: 4, n: 16, fps: 3, loop: false },
      brow: { row: 11, n: 4, fps: 2.5, loop: false },
      blink: { row: 12, n: 3, fps: 4, loop: false }
    }
  },

  cats: {

    travel: {
      rate: 0.8, //multiplier on timer
      words: [ //list of words that are tied to the category
        "travel", "flight", "flights", "hotel", "hotels", "booking", "resort",
        "vacation", "holiday", "destination", "tourism", "tourist", "trip",
        "airfare", "airline", "airport", "passport", "luggage", "itinerary",
        "beach", "cruise", "excursion", "backpack", "hostel", "sightseeing",
        "explore", "adventure", "wanderlust", "getaway", "paradise",
        "island", "mountain", "hiking", "scenic", "landmark", "monument",
        "attractions", "tour", "camping"
      ],
      hi: [
        "Oh nice, a travel site!",
        "Are we going somewhere?",
        "This is my kind of page.",
        "I can almost feel the breeze.",
        "Ooh, book the window seat!",
        "I need to photograph everything here."
      ],
      idle: [
        "I wonder where we're going.",
        "So many places, so little time.",
        "Can we go? Please?",
        "My scrapbook is going to be so full."
      ]
    },

    food: {
      rate: 0.6,
      words: [
        "recipe", "recipes", "cooking", "restaurant", "food", "meal",
        "dinner", "lunch", "breakfast", "cuisine", "chef", "kitchen",
        "ingredient", "delicious", "tasty", "bake", "baking", "grill",
        "menu", "delivery", "takeout", "dining", "appetizer",
        "dessert", "snack", "nutrition", "calories", "vegan", "pizza",
        "sushi", "pasta", "burger", "steak", "seafood", "brunch",
        "cocktail", "wine", "beer", "cafe", "coffee", "bakery"
      ],
      hi: [
        "Ooh, something looks good.",
        "Can we eat first, browse later?",
        "That looks amazing.",
        "Saving this recipe for sure.",
        "Now I'm hungry."
      ],
      idle: [
        "I could really go for a snack.",
        "Do they deliver to browsers?",
        "Photography and food. My two loves."
      ]
    },

    tech: {
      rate: 0.3,
      words: [
        "code", "coding", "programming", "developer", "software",
        "javascript", "python", "api", "repository", "deploy",
        "function", "debug", "server", "database", "frontend", "backend",
        "algorithm", "framework", "library", "terminal", "compile",
        "stack", "overflow", "bug", "feature", "commit", "merge",
        "docker", "cloud", "devops", "react", "node", "typescript",
        "css", "html", "ai"
      ],
      hi: [
        "Hmm, interesting.",
        "I don't get this but it looks important.",
        "Is this code?",
        "Looks complicated. I'll just take photos.",
        "Nerdy stuff. Cool."
      ],
      idle: [
        "What does undefined mean?",
        "I'm more of a camera guy myself.",
        "Is this what the kids call hacking?"
      ]
    },

    news: {
      rate: 0.4,
      words: [
        "breaking", "news", "reported", "officials", "election",
        "president", "government", "politics", "congress", "senate",
        "policy", "economy", "inflation", "market", "stocks",
        "headline", "journalist", "investigation", "editorial",
        "opinion", "analysis", "update", "crisis", "conflict",
        "protest", "legislation", "court", "federal"
      ],
      hi: [
        "What's happening in the world?",
        "This looks important.",
        "I should document this.",
        "History in the making."
      ],
      idle: [
        "Hmm, interesting times.",
        "The world sure is something."
      ]
    },

    shopping: {
      rate: 0.5,
      words: [
        "shop", "shopping", "buy", "purchase", "cart", "checkout",
        "sale", "discount", "deal", "price", "product", "review",
        "shipping", "order", "store", "retail", "coupon",
        "clearance", "wishlist", "catalog", "brand", "fashion",
        "clothing", "shoes", "accessories", "electronics", "gadget"
      ],
      hi: [
        "Are we shopping?",
        "I wonder if they have camera gear.",
        "Don't forget to check the reviews.",
        "Is that on sale?"
      ],
      idle: [
        "I wonder if they sell film here.",
        "My wallet feels nervous."
      ]
    },

    social: {
      rate: 0.35,
      words: [
        "post", "feed", "follow", "like", "share", "comment",
        "profile", "stories", "trending", "viral", "meme",
        "friends", "followers", "timeline", "hashtag", "tweet",
        "retweet", "subscribe", "notification", "message", "chat",
        "community", "forum", "thread", "upvote", "karma"
      ],
      hi: [
        "Oh hey, social media.",
        "Anything good on here?",
        "I should post my scrapbook pics here.",
        "The people need to see my photos."
      ],
      idle: [
        "Scrollin scrollin scrollin.",
        "That's a good meme.",
        "I'm more of an analog guy."
      ]
    },

    fun: {
      rate: 0.4,
      words: [
        "movie", "movies", "film", "show", "series", "episode",
        "watch", "stream", "streaming", "trailer", "season",
        "actor", "actress", "director", "anime", "cartoon",
        "gaming", "game", "gamer", "playlist", "album", "song",
        "music", "concert", "ticket", "podcast", "listen"
      ],
      hi: [
        "Movie night?",
        "Got room for one more?",
        "What are we watching?",
        "I'll watch anything."
      ],
      idle: [
        "I should be in a movie.",
        "Is there a photographer character?"
      ]
    },

    scary: {
      rate: 0.2,
      words: [
        "horror", "scary", "ghost", "haunted", "creepy", "terror",
        "zombie", "monster", "demon", "paranormal", "nightmare",
        "scream", "fear", "dark", "blood", "death", "murder",
        "crime", "killer", "thriller", "suspense", "disturbing",
        "cursed", "evil", "witch", "supernatural"
      ],
      hi: [
        "I don't like this place.",
        "Can we go somewhere else?",
        "I am not taking photos here.",
        "Who turned off the lights?",
        "Nope. Nope nope nope."
      ],
      idle: [
        "Is something behind me?",
        "I want to go home.",
        "I don't like this at all."
      ],
      snap: ["I guess I'll take one photo."]
    }

  },

  def: {
    rate: 0.4,
    hi: [
      "Hmm, interesting page.",
      "Nice spot.",
      "New page. Let me look around.",
      "Where are we now?",
      "Here I am.",
      "Another stop on the tour.",
      "What do we have here?"
    ],
    idle: [
      "Nice place.",
      "I wonder what's next.",
      "Just browsing.",
      "What a trip."
    ]
  },

  snap: [
    "This one's a keeper.",
    "Say cheese!",
    "One for the scrapbook.",
    "Beautiful.",
    "Hold still. Perfect.",
    "This is going on the wall.",
    "What a view.",
    "The folks back home won't believe this."
  ],

  poke: [
    "Hey!", "Watch it!", "Ow!", "Quit it!",
    "I'm walking here!", "Do you mind?",
    "Rude!", "Not cool!",
    "I was just standing there!",
    "What was that for?", "Easy!"
  ]

};
