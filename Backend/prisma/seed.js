// prisma/seed.js
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

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
  ];

  // Insert users
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // Insert stories
  for (const story of stories) {
    await prisma.story.create({ data: story });
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
