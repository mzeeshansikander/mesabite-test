export const Categories = [
  {
    id: 1,
    name: "Pasta",
    description: "This is description of the normal category.",
    image: "www.example.com/pasta",
    items: [],
  },
  {
    id: 2,
    name: "Sandwitches",
    description: "This is description of the Sandwitches normal category.",
    image: "www.example.com/pasta",
    items: [1, 2, 3],
  },
];

export const Folders = [
  {
    id: 101,
    name: "Foods",
    description: "All Foods goes here...",
    image: "www.example.com/foods",
    categories: [
      {
        id: 1,
        name: "Pizza",
        description: "01 Folder Category descriotion here!",
        image: "www.example.com/pasta",
        items: [],
        folder: 101,
      },
    ],
  },
  {
    id: 102,
    name: "Italian",
    description: "All Foods goes here...",
    image: "www.example.com/foods",
    categories: [
      {
        id: 1,
        name: "Pasta",
        description: "02 Folder Category descriotion here!",
        image: "www.example.com/pasta",
        items: [1, 1, 1, 1],
        folder: 101,
      },
      {
        id: 2,
        name: "Chicken Broast",
        description: "02 Folder Category descriotion here!",
        image: "www.example.com/pasta",
        items: [],
        folder: 101,
      },
    ],
  },
];
