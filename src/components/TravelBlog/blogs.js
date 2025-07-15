// src/components/TravelBlog/blogs.js
import abc_trek1 from "../../Assets/Travel/abc_trek1.jpg";
import abc_trek2 from "../../Assets/Travel/abc_trek2.jpg";
import abc_trek3 from "../../Assets/Travel/abc_trek3.jpg";
import darjeeling1 from "../../Assets/Travel/darjeeling1.jpg";


// export const blogs = [
//   {
//     id: "abc-trek",
//     title: "ABC Trek and Nepal",
//     story: `
//       In the heart of the Himalayas, our ABC Trek adventure began with crisp mountain air,
//       friendly locals, and breathtaking views. Every step was a story — from rhododendron forests
//       to the Annapurna Base Camp itself. The chilly winds and starry nights will forever stay with me.
//     `,
//     photos: [
//       {
//         src: abc_trek1,
//         caption: "Starting the trek with clear blue skies."
        
//       },
//       {
//         src: abc_trek2,
//         caption: "Crossing a suspension bridge over a roaring river."
//       },
//       {
//         src: abc_trek3,
//         caption: "Annapurna Base Camp at sunrise — magical."
//       }
//     ],
//     videos: [
//       {
//         youtubeId: "B071p6-cHEM",
//         title: "ABC Trek — Day 1 Highlights"
//       },
//       {
//         youtubeId: "FONMsuE5ozE",
//         title: "ABC Trek — The Final Push"
//       }
//     ]
//   },

//   {
//     id: "new-trip",
//     title: "My New Adventure",
//     photos: [
//       {
//         src: darjeeling1,
//         caption: "A memorable moment!"
//       },
//     ],
//     description: "A quick overview of my latest travel story.",
//     content: "The full story of what I did, where I went, and what I loved..."
//   }


// ];
export const blogs = [
  {
    id: "abc-trek",
    title: "ABC Trek and Nepal",
    description: "Trekking to Annapurna Base Camp with stunning views and unforgettable memories.",
    story: `
      In the heart of the Himalayas, our ABC Trek adventure began with crisp mountain air,
      friendly locals, and breathtaking views. Every step was a story — from rhododendron forests
      to the Annapurna Base Camp itself. The chilly winds and starry nights will forever stay with me.
    `,
    photos: [
      {
        src: abc_trek1,
        caption: "Starting the trek with clear blue skies."
      },
      {
        src: abc_trek2,
        caption: "Crossing a suspension bridge over a roaring river."
      },
      {
        src: abc_trek3,
        caption: "Annapurna Base Camp at sunrise — magical."
      }
    ],
    videos: [
      {
        youtubeId: "B071p6-cHEM",
        title: "ABC Trek — Day 1 Highlights"
      },
      {
        youtubeId: "FONMsuE5ozE",
        title: "ABC Trek — The Final Push"
      }
    ]
  },

  {
    id: "new-trip",
    title: "My New Adventure",
    description: "A quick overview of my latest travel story.",
    story: "The full story of what I did, where I went, and what I loved...",
    photos: [
      {
        src: darjeeling1,
        caption: "A memorable moment!"
      },
    ],
    videos: [] // Optional if no videos
  }
];
