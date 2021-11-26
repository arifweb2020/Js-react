<script>
var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

console.log(lastDay)
console.log(firstDay)


const localDate = new Date();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let currentMonth = months[localDate.getMonth()];
console.log(currentMonth);



	const displayMonths = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const d = new Date();
  let month = d.getMonth();
  const newMonths = months.slice(9,month+1)
  return newMonths;
}

const displayYears = () => {
  const d = new Date();
  let year = d.getFullYear();
  console.log(year)
  let lastYear = d.getFullYear() - 1;
  return [year,lastYear];
}

console.log(displayMonths())
console.log(displayYears())


const current = new Date();

current.setMonth(current.getMonth()-1);
const previousMonth = current.toLocaleString('default', { month: 'long' });

console.log(previousMonth);

const mmm = () => {
  const d = new Date();
  let month = d.getMonth();
  let lastMonth = d.getMonth() - 1;
  return [month,lastMonth];
}
console.log(mmm())
</script>
