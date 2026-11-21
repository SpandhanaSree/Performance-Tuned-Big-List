
const departments = [
  "Engineering",
  "HR",
  "Marketing",
  "Finance",
  "Sales"
];

const firstNames = [
  "Rahul", "Priya", "Arjun", "Sneha", "Kiran",
  "Ananya", "Ravi", "Divya", "Sai", "Meera"
];

const lastNames = [
  "Sharma", "Reddy", "Kumar", "Patel", "Verma",
  "Rao", "Gupta", "Singh", "Das", "Nair"
];

export function generateEmployees(n) {
  return Array.from({ length: n }, (_, index) => ({
    id: index + 1,

    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,

    dept: departments[Math.floor(Math.random() * departments.length)],

    salary: Math.floor(Math.random() * 90000) + 30000
  }));
}
