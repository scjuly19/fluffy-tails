const pricefilterTypes={
    Upto399:"Rs.199 to Rs.399",
    Upto599:"Rs.399 to Rs.599",
    Above599:"Above Rs.599"
}
const priceFilter = [
  {
    id: "19vzEN1y65KErZ3biV5MQQEUFAdRgvd8F7",
    label: pricefilterTypes.Upto399,
    checked: false
  },
  {
    id: "154UBskQ34hk4GLYcoJMcTqkiefTkw1nRW",
    label: pricefilterTypes.Upto599,
    checked: false
  },
  {
    id: "1MTp6QrHzEEc7qbToCbM4F4GVhTvJn22NM",
    label: pricefilterTypes.Above599,
    checked: false
  },
];

const categoryFilter=[
  {
    id: "19vzEN1y65KErZ3biV5MQQEUFAdRgvd8F7",
    label:"food" ,
    checked: false
  },
  {
    id: "154UBskQ34hk4GLYcoJMcTqkiefTkw1nRW",
    label: "clothes",
    checked: false
  },
  {
    id: "1MTp6QrHzEEc7qbToCbM4F4GVhTvJn22NM",
    label: "toy",
    checked: false
  },
];
const sortByFilter=[
  {
    id: "19vzEN1y65KErZ3biV5MQQEUFAdRgvd8F7",
    label:"lowToHigh",
    checked: false,
    value:'Price- Low to High'
  },
  {
    id: "154UBskQ34hk4GLYcoJMcTqkiefTkw1nRW",
    label: "highToLow",
    checked: false,
    value:'Price- High to Low'
  }
];
const ratings=[
  {
    id: "154UBskQ34hk4GLYcoJMcTqkiefTkw1nRW",
    label: "1",
    checked: false,
    value:1
  },
  {
    id: "154UBskQ34hk4GLYcoJMcTqkiefchw1nRW",
    label: "2",
    checked: false,
    value:2
  },
  {
    id: "154UBskQ34hk4GLKcoJMcTqkiefchw1nRW",
    label: "3",
    checked: false,
    value:3
  },
  {
    id: "234UBskQ34hk4GLYcoJMcTqkiefchw1nRW",
    label: "4",
    checked: false,
    value:4
  },
  {
    id: "657UBskQ34hk4GLYcoJMcTqkiefchw1nRW",
    label: "5",
    checked: false,
    value:5
  }
]
export {priceFilter,pricefilterTypes,categoryFilter,sortByFilter,ratings}