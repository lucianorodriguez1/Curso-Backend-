const objetos = [
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2,
  },
  {
    manzanas: 3,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 2,
  },
];

const newArrayKeys = [];

const getKeys = (arr) => {
  arr.forEach((element) => {
    Object.keys(element).forEach((key) => {
      if (!newArrayKeys.includes(key)) {
        newArrayKeys.push(key);
      }
    });
  });
};

getKeys(objetos);
console.log(newArrayKeys);

let total = {};

objetos.map((obj) => {
  obj_entries = Object.entries(obj);

  obj_entries.map((value) => {
    if (total[value[0]]) {
      total[value[0]] += value[1];
    } else {
      total[value[0]] = value[1];
    }
  });
});

console.log(total);
