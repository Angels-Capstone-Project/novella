// prisma/seed.js
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

await prisma.story.deleteMany();
await prisma.user.deleteMany();

async function main() {
  const users = [
    {
      id: "user-0",
      email: "calebpaul@gomez.net",
      username: "kristina27",
      password: "9&$CLDxJg!8Z",
      birthday: "2003-06-25T00:00:00.000Z",
      pronouns: "they/them",
      bio: "Enjoys writing about dreams and time travel.",
      createdAt: new Date(),
    },
    {
      id: "user-1",
      email: "angelicaroberts@yahoo.com",
      username: "daniel63",
      password: "Uv*V5jGd4n#1",
      birthday: "2004-03-12T00:00:00.000Z",
      pronouns: "she/her",
      bio: "Lover of fantasy and folklore.",
      createdAt: new Date(),
    },
    {
      id: "user-2",
      email: "carolmartinez@hotmail.com",
      username: "joanna90",
      password: "xT#92LKq!aE",
      birthday: "2002-10-05T00:00:00.000Z",
      pronouns: "she/her",
      bio: "Writes mystery thrillers in spare time.",
      createdAt: new Date(),
    },
    {
      id: "user-3",
      email: "rebeccaevans@gmail.com",
      username: "lucas88",
      password: "Gp@8vNdKpZ",
      birthday: "2005-01-20T00:00:00.000Z",
      pronouns: "he/him",
      bio: "Sci-fi junkie and space geek.",
      createdAt: new Date(),
    },
    {
      id: "user-4",
      email: "paulsmith@outlook.com",
      username: "emily99",
      password: "M*35dNbx!zP",
      birthday: "2003-07-30T00:00:00.000Z",
      pronouns: "they/them",
      bio: "Poetry and spoken word artist.",
      createdAt: new Date(),
    },
    {
      id: "user-5",
      email: "debramorgan@icloud.com",
      username: "jayden55",
      password: "Wv!38Tnc$2e",
      birthday: "2001-04-08T00:00:00.000Z",
      pronouns: "he/him",
      bio: "Romance novelist in disguise.",
      createdAt: new Date(),
    },
    {
      id: "user-6",
      email: "stephaniemurphy@gmail.com",
      username: "bella04",
      password: "4xLq*&9vBz",
      birthday: "2002-09-14T00:00:00.000Z",
      pronouns: "she/her",
      bio: "Writes dystopian fiction for fun.",
      createdAt: new Date(),
    },
    {
      id: "user-7",
      email: "jonathancook@yahoo.com",
      username: "ethan42",
      password: "rL#78NvcP1",
      birthday: "2003-11-18T00:00:00.000Z",
      pronouns: "he/him",
      bio: "Always writing from a rooftop café.",
      createdAt: new Date(),
    },
    {
      id: "user-8",
      email: "laurabrown@protonmail.com",
      username: "chloe16",
      password: "Zx3!vKqpOe",
      birthday: "2004-12-03T00:00:00.000Z",
      pronouns: "she/her",
      bio: "Modern fairy tale fan and writer.",
      createdAt: new Date(),
    },
    {
      id: "user-9",
      email: "davidwalker@gmail.com",
      username: "mason73",
      password: "Ky&92Lmc!dT",
      birthday: "2001-08-22T00:00:00.000Z",
      pronouns: "they/them",
      bio: "Thrives on horror and suspense.",
      createdAt: new Date(),
    },
  ];

  const stories = [
    {
      title: "Crimson Pact",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "fantasy",
      authorId: "user-5",
      coverImage: "https://picsum.photos/seed/story1/300/200",
    },
    {
      title: "Twilight's Promise",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "drama",
      authorId: "user-7",
      coverImage: "https://picsum.photos/seed/story2/300/200",
    },
    {
      title: "The Final Countdown",
      description: "In a world where nothing is what it seems.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "horror",
      authorId: "user-1",
      coverImage: "https://picsum.photos/seed/story3/300/200",
    },
    {
      title: "The Hidden Truth",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "drama",
      authorId: "user-7",
      coverImage: "https://picsum.photos/seed/story4/300/200",
    },
    {
      title: "Forgotten Realms",
      description: "Can truth survive the lies?",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "comedy",
      authorId: "user-3",
      coverImage: "https://picsum.photos/seed/story5/300/200",
    },
    {
      title: "Storm of Secrets",
      description: "Can truth survive the lies?",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "horror",
      authorId: "user-0",
      coverImage: "https://picsum.photos/seed/story6/300/200",
    },
    {
      title: "Crimson Pact",
      description: "Their journey changes everything.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "romance",
      authorId: "user-1",
      coverImage: "https://picsum.photos/seed/story7/300/200",
    },
    {
      title: "Echoes of Silence",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "drama",
      authorId: "user-1",
      coverImage: "https://picsum.photos/seed/story8/300/200",
    },
    {
      title: "Dreams of Yesterday",
      description: "When the past comes back to haunt them.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "romance",
      authorId: "user-6",
      coverImage: "https://picsum.photos/seed/story9/300/200",
    },
    {
      title: "Stars Beneath Us",
      description: "When the past comes back to haunt them.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "mystery",
      authorId: "user-4",
      coverImage: "https://picsum.photos/seed/story10/300/200",
    },
    {
      title: "The Last Chronicle",
      description: "The key to the future lies in forgotten lore.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "thriller",
      authorId: "user-2",
      coverImage: "https://picsum.photos/seed/story11/300/200",
    },
    {
      title: "Tides of Time",
      description: "The key to the future lies in forgotten lore.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "sci-fi",
      authorId: "user-8",
      coverImage: "https://picsum.photos/seed/story12/300/200",
    },
    {
      title: "Beyond the Horizon",
      description: "They never expected what they would uncover.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "fantasy",
      authorId: "user-3",
      coverImage: "https://picsum.photos/seed/story13/300/200",
    },
    {
      title: "Midnight Whispers",
      description: "A fight for survival begins.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "drama",
      authorId: "user-9",
      coverImage: "https://picsum.photos/seed/story14/300/200",
    },
    {
      title: "Shadows of the Past",
      description: "They never expected what they would uncover.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "mystery",
      authorId: "user-5",
      coverImage: "https://picsum.photos/seed/story15/300/200",
    },
    {
      title: "Voices in the Wind",
      description: "When the past comes back to haunt them.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "comedy",
      authorId: "user-6",
      coverImage: "https://picsum.photos/seed/story16/300/200",
    },
    {
      title: "Legacy of Fire",
      description: "Their journey changes everything.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "sci-fi",
      authorId: "user-8",
      coverImage: "https://picsum.photos/seed/story17/300/200",
    },
    {
      title: "The Hidden Truth",
      description: "In a world where nothing is what it seems.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "mystery",
      authorId: "user-4",
      coverImage: "https://picsum.photos/seed/story18/300/200",
    },
    {
      title: "Forgotten Realms",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "thriller",
      authorId: "user-0",
      coverImage: "https://picsum.photos/seed/story19/300/200",
    },
    {
      title: "Twilight's Promise",
      description: "A fight for survival begins.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "romance",
      authorId: "user-2",
      coverImage: "https://picsum.photos/seed/story20/300/200",
    },
    {
      title: "Stars Beneath Us",
      description: "Can truth survive the lies?",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "fantasy",
      authorId: "user-5",
      coverImage: "https://picsum.photos/seed/story21/300/200",
    },
    {
      title: "Echoes of Silence",
      description: "Their journey changes everything.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "horror",
      authorId: "user-3",
      coverImage: "https://picsum.photos/seed/story22/300/200",
    },
    {
      title: "The Final Countdown",
      description: "When the past comes back to haunt them.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "sci-fi",
      authorId: "user-6",
      coverImage: "https://picsum.photos/seed/story23/300/200",
    },
    {
      title: "Shadows of the Past",
      description: "The key to the future lies in forgotten lore.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "romance",
      authorId: "user-8",
      coverImage: "https://picsum.photos/seed/story24/300/200",
    },
    {
      title: "Dreams of Yesterday",
      description: "They never expected what they would uncover.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "thriller",
      authorId: "user-1",
      coverImage: "https://picsum.photos/seed/story25/300/200",
    },
    {
      title: "Storm of Secrets",
      description: "In a world where nothing is what it seems.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "fantasy",
      authorId: "user-0",
      coverImage: "https://picsum.photos/seed/story26/300/200",
    },
    {
      title: "The Last Chronicle",
      description: "A fight for survival begins.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "comedy",
      authorId: "user-7",
      coverImage: "https://picsum.photos/seed/story27/300/200",
    },
    {
      title: "Tides of Time",
      description: "The key to the future lies in forgotten lore.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "sci-fi",
      authorId: "user-9",
      coverImage: "https://picsum.photos/seed/story28/300/200",
    },
    {
      title: "Voices in the Wind",
      description: "A tale of love, loss, and redemption.",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "drama",
      authorId: "user-2",
      coverImage: "https://picsum.photos/seed/story29/300/200",
    },
    {
      title: "Beyond the Horizon",
      description: "Can truth survive the lies?",
      content:
        "This is a sample story content filled with imagination and suspense.",
      genre: "thriller",
      authorId: "user-4",
      coverImage: "https://picsum.photos/seed/story30/300/200",
    },
    {
      title: "Whispers of the Forest",
      description: "An ancient mystery hidden beneath the leaves.",
      content:
        "Legends spoke of trees that whispered secrets. Elara was about to find out why.",
      genre: "mystery",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story31/300/200",
    },
    {
      title: "The Timekeeper's Diary",
      description: "He controls time, but can he fix the past?",
      content:
        "Each tick of the watch pulled him closer to a memory he couldn’t erase.",
      genre: "sci-fi",
      authorId: "user_0",
      coverImage: "https://picsum.photos/seed/story32/300/200",
    },
    {
      title: "Ashes and Embers",
      description: "A phoenix rises, but her memories burn.",
      content:
        "In the city of fire, rebirth meant remembering every pain she died with.",
      genre: "fantasy",
      authorId: "user_5",
      coverImage: "https://picsum.photos/seed/story33/300/200",
    },
    {
      title: "Melody of the Lost",
      description: "A ghost haunts the notes of a forgotten lullaby.",
      content:
        "Every night she played the piano, and every night someone wept beneath the floorboards.",
      genre: "horror",
      authorId: "user_6",
      coverImage: "https://picsum.photos/seed/story34/300/200",
    },
    {
      title: "Letters to No One",
      description: "She mailed 99 letters before one came back.",
      content:
        "A lonely girl's wish to connect finds its answer from a mysterious sender.",
      genre: "drama",
      authorId: "user_5",
      coverImage: "https://picsum.photos/seed/story35/300/200",
    },
    {
      title: "Beneath Crimson Skies",
      description: "When the skies turned red, the silence began.",
      content:
        "She was the last to hear a bird sing before the world grew quiet forever.",
      genre: "sci-fi",
      authorId: "user_2",
      coverImage: "https://picsum.photos/seed/story36/300/200",
    },
    {
      title: "Portraits and Poison",
      description: "Every canvas hid a deadly secret.",
      content:
        "The art gallery was cursed. Those who viewed her painting... never left.",
      genre: "thriller",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story37/300/200",
    },
    {
      title: "The Comedian's Last Act",
      description: "Sometimes, laughter hides pain too deep.",
      content:
        "When his jokes stopped making them laugh, he started hearing his own.",
      genre: "comedy",
      authorId: "user_1",
      coverImage: "https://picsum.photos/seed/story38/300/200",
    },
    {
      title: "Dreams of Iron",
      description: "She was built to obey — but dreamed of freedom.",
      content:
        "In a world run by machines, she found the last piece of humanity inside herself.",
      genre: "sci-fi",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story39/300/200",
    },
    {
      title: "Wings of Ash",
      description: "She could fly — if she survived the fire.",
      content: "Bound by curse and flame, Lira must soar or burn for good.",
      genre: "fantasy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story40/300/200",
    },
    {
      title: "The Bakery on Fifth Street",
      description: "Sweet rolls, dark secrets.",
      content:
        "Everyone loved Mrs. Maples muffins — until the police came knocking.",
      genre: "drama",
      authorId: "user_8",
      coverImage: "https://picsum.photos/seed/story16/300/200",
    },
    {
      title: "Faded Ink",
      description: "What if your tattoos told your future?",
      content: "Each line on her skin moved — and warned her of death.",
      genre: "thriller",
      authorId: "user_0",
      coverImage: "https://picsum.photos/seed/story17/300/200",
    },
    {
      title: "The Gravity of Love",
      description: "They were pulled together by the stars.",
      content:
        "Two souls born galaxies apart, destined to collide in one lifetime.",
      genre: "romance",
      authorId: "user_1",
      coverImage: "https://picsum.photos/seed/story18/300/200",
    },
    {
      title: "Echoes in the Library",
      description: "Shhh... the books are listening.",
      content:
        "A forgotten section of the library holds books that write back.",
      genre: "mystery",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story19/300/200",
    },
    {
      title: "The Clockmaker's War",
      description: "He built time — now he must destroy it.",
      content:
        "The world's last watchmaker holds the key to stopping eternity.",
      genre: "sci-fi",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story20/300/200",
    },
    {
      title: "Last Train to Eden",
      description: "Only one ticket to paradise — who deserves it?",
      content: "In a ruined world, a single train promises hope... for one.",
      genre: "drama",
      authorId: "user_3",
      coverImage: "https://picsum.photos/seed/story21/300/200",
    },
    {
      title: "The Silent Cellist",
      description: "She plays without strings, but the notes still scream.",
      content:
        "After a terrible accident, she returns to the stage with music from the grave.",
      genre: "horror",
      authorId: "user_8",
      coverImage: "https://picsum.photos/seed/story22/300/200",
    },
    {
      title: "Café Cosmos",
      description: "Every drink shows a different future.",
      content:
        "When Maya ordered a latte, she saw a life that wasn't hers — yet.",
      genre: "fantasy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story23/300/200",
    },
    {
      title: "The Laughing Cemetery",
      description: "It’s not the dead you should fear — it’s the jokes.",
      content: "The tombstones whisper punchlines. But who’s laughing?",
      genre: "comedy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story24/300/200",
    },
    {
      title: "The Lighthouse Keeper's Secret",
      description: "He watched the seas — but what watched him back?",
      content: "A storm is coming, and the light can no longer keep it away.",
      genre: "thriller",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story25/300/200",
    },
    {
      title: "The Midnight Market",
      description: "You can buy anything — even memories.",
      content: "When she sold her worst memory, she forgot who she was.",
      genre: "mystery",
      authorId: "user_6",
      coverImage: "https://picsum.photos/seed/story26/300/200",
    },
    {
      title: "Through the Portal",
      description: "One step forward... a whole new world.",
      content: "Curiosity pulled her through — but now the portal’s gone.",
      genre: "adventure",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story27/300/200",
    },
    {
      title: "Her Shadow’s Voice",
      description: "It whispered truths she wasn't ready to hear.",
      content: "She thought she was alone — but her shadow had other plans.",
      genre: "horror",
      authorId: "user_2",
      coverImage: "https://picsum.photos/seed/story28/300/200",
    },
    {
      title: "The Oracle’s Game",
      description: "She told no lies — but left out the truth.",
      content:
        "The future is a deck of cards, and she’s the only one who can shuffle.",
      genre: "fantasy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story29/300/200",
    },
    {
      title: "The Paper Moon",
      description: "A child’s drawing turned real — and deadly.",
      content: "He wished on the moon he drew. The next night, it answered.",
      genre: "sci-fi",
      authorId: "user_4",
      coverImage: "https://picsum.photos/seed/story30/300/200",
    },
    {
      title: "Hearts in Holograms",
      description: "In a digital world, love still breaks hearts.",
      content:
        "She met him in a VR café, but could their bond survive reality?",
      genre: "romance",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story31/300/200",
    },
    {
      title: "Rust and Roses",
      description: "A garden blooming inside a war machine.",
      content: "He was a robot built for war — until he planted a single rose.",
      genre: "sci-fi",
      authorId: "user_2",
      coverImage: "https://picsum.photos/seed/story32/300/200",
    },
    {
      title: "The Girl in the Hourglass",
      description: "Trapped between grains of time.",
      content: "She had one hour to live — and a lifetime to remember.",
      genre: "fantasy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story33/300/200",
    },
    {
      title: "Voices in the Static",
      description: "The radio shouldn’t be talking back.",
      content:
        "A late-night DJ starts receiving requests from... the other side.",
      genre: "horror",
      authorId: "user_3",
      coverImage: "https://picsum.photos/seed/story34/300/200",
    },
    {
      title: "Inkheart’s Curse",
      description: "Whatever she writes comes true — at a cost.",
      content: "She wrote herself a happy ending. Now she’s trapped inside it.",
      genre: "mystery",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story35/300/200",
    },
    {
      title: "The Mirror Maze",
      description: "Each reflection told a different story.",
      content: "To escape, she must face every version of herself.",
      genre: "thriller",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story36/300/200",
    },
    {
      title: "Banana Peels and Broken Crowns",
      description: "Royal comedy, one slip at a time.",
      content: "When a jester is crowned king, chaos follows.",
      genre: "comedy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story37/300/200",
    },
    {
      title: "A Song for the Stars",
      description: "Her voice could bend galaxies.",
      content: "In a universe without sound, her melody broke silence.",
      genre: "sci-fi",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story38/300/200",
    },
    {
      title: "Shadows of Valemoor",
      description: "The city sleeps, but its shadows don’t.",
      content:
        "They say no one escapes Valemoor after sunset. He didn’t listen.",
      genre: "fantasy",
      authorId: "user_9",
      coverImage: "https://picsum.photos/seed/story39/300/200",
    },
    {
      title: "Clouds Taste Like Cotton Candy",
      description: "She chased dreams into the sky.",
      content:
        "In a world where clouds were edible, she only wanted one bite of freedom.",
      genre: "adventure",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story40/300/200",
    },
    {
      title: "The Ice Cream Assassin",
      description: "She killed with kindness — and cones.",
      content: "No one suspects the girl with sprinkles. Until it’s too late.",
      genre: "comedy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story41/300/200",
    },
    {
      title: "The Puppeteer’s Regret",
      description: "He pulled all the strings — until one pulled back.",
      content: "A puppet without a master. A master without control.",
      genre: "horror",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story42/300/200",
    },
    {
      title: "Operation: Time Freeze",
      description: "She froze time to save her city — and lost herself in it.",
      content:
        "With every second suspended, she aged while the world stood still.",
      genre: "sci-fi",
      authorId: "user_5",
      coverImage: "https://picsum.photos/seed/story43/300/200",
    },
    {
      title: "The Last Page",
      description: "A library where the last page decides your fate.",
      content: "Every book ends in death — unless you close it in time.",
      genre: "mystery",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story44/300/200",
    },
    {
      title: "The Painter of Tomorrow",
      description: "Each brushstroke shows what’s to come.",
      content: "He painted the sunrise — and watched it disappear.",
      genre: "drama",
      authorId: "user_1",
      coverImage: "https://picsum.photos/seed/story45/300/200",
    },
    {
      title: "Beneath the Ferris Wheel",
      description: "The carnival holds more than cotton candy.",
      content: "Underneath the ride is a door — and a memory she buried.",
      genre: "thriller",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story46/300/200",
    },
    {
      title: "Neon Nights",
      description: "A cybercity of lies, lights, and lost dreams.",
      content: "She hacked into the truth — and found her own past rewritten.",
      genre: "sci-fi",
      authorId: "user_0",
      coverImage: "https://picsum.photos/seed/story47/300/200",
    },
    {
      title: "The Cursed Playlist",
      description: "Play the song, face your fate.",
      content: "Every time she hit shuffle, someone she loved disappeared.",
      genre: "horror",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story48/300/200",
    },
    {
      title: "The Umbrella Thief",
      description: "He stole rain — and gave back sunshine.",
      content: "The city's umbrellas were vanishing. So were the storms.",
      genre: "fantasy",
      authorId: "user_6",
      coverImage: "https://picsum.photos/seed/story49/300/200",
    },
    {
      title: "The Joke That Killed the King",
      description: "Laughter was never meant to be lethal.",
      content: "He cracked a joke in court. The king never stood up again.",
      genre: "comedy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story50/300/200",
    },
    {
      title: "The Alchemist’s Apprentice",
      description: "She turned lead to gold... and lost her soul.",
      content: "One misstep in the formula, and the lab was never the same.",
      genre: "fantasy",
      authorId: "user_5",
      coverImage: "https://picsum.photos/seed/story51/300/200",
    },
    {
      title: "Eyes in the Wallpaper",
      description: "Some designs should never be printed.",
      content: "She kept seeing faces. Her guests saw them blink.",
      genre: "horror",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story52/300/200",
    },
    {
      title: "The Poet of Fire",
      description: "His words burned brighter than any flame.",
      content: "He wrote poetry in ashes — and the wind listened.",
      genre: "drama",
      authorId: "user_3",
      coverImage: "https://picsum.photos/seed/story53/300/200",
    },
    {
      title: "Galactic Delivery",
      description: "Your pizza’s 30 planets late.",
      content:
        "Jet’s delivery route just got intercepted by aliens with good taste.",
      genre: "comedy",
      authorId: "user_7",
      coverImage: "https://picsum.photos/seed/story54/300/200",
    },
    {
      title: "The Last Candle",
      description: "When the flame dies, so does the world.",
      content:
        "They said the candle held the sun. She’s the only one who can relight it.",
      genre: "fantasy",
      authorId: "user_0",
      coverImage: "https://picsum.photos/seed/story55/300/200",
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const story of stories) {
    try {
      await prisma.story.create({ data: story });
    } catch (error) {
      console.error("Skipping duplicates :", story.title);
    }
  }
}

main()
  .then(() => {
    console.log("Data seeded successfully!");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
