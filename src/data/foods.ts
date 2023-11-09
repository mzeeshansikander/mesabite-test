import { IFolder } from "@/types/folder.interface";

export const Categories = [
  {
    id: 1,
    name: "Pasta",
    description: "This is description of the normal category.",
    image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
    items: [],
  },
  {
    id: 2,
    name: "Sandwiches",
    description: "This is description of the Sandwiches normal category.",
    image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
    items: [1, 2, 3],
  },
];

export const Folders = [
  {
    id: 101,
    name: "Foods",
    image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
    categories: [
      {
        id: 1,
        name: "Pizza",
        description: "01 Folder Category description here!",
        image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        items: [],
        folder: 101,
      },
    ],
  },
  {
    id: 102,
    name: "Italian",
    description: "All Foods goes here...",
    image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
    categories: [
      {
        id: 1,
        name: "Pasta",
        description: "02 Folder Category description here!",
        image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        items: [1, 1, 1, 1],
        folder: 101,
      },
      {
        id: 2,
        name: "Chicken Broast",
        description: "02 Folder Category description here!",
        image: "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        items: [],
        folder: 101,
      },
    ],
  },
];
