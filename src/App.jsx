/*
Performance Optimization Results:
- Employees displayed initially: 50
- Before React.memo: EmployeeRow components re-rendered on Dark Mode toggle.
- After React.memo: 0 EmployeeRow components re-rendered on Dark Mode toggle.
- useMemo: Prevents unnecessary recalculation of filtered employees and department statistics.
- useCallback: Keeps the Select handler reference stable.
*/
import EmployeeRow from "./components/EmployeeRow";
import { useState, useMemo, useCallback } from "react";
import { generateEmployees } from "./utils/employeeData";
import "./App.css";

function App() {
  const [employees] = useState(() => generateEmployees(5000));
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
const [visibleCount, setVisibleCount] = useState(50);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

const handleSelect = useCallback((employee) => {
  setSelectedEmployee(employee);
}, []);

// useMemo is not necessary for every calculation.
// For cheap calculations, the overhead of checking dependencies
// and maintaining the cache can be greater than recalculating the value.

const filteredEmployees = useMemo(() => {
  return employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
}, [employees, search]);


// Get unique departments using Set


const uniqueDepartments = useMemo(() => {
  return [...new Set(filteredEmployees.map((employee) => employee.dept))];
}, [filteredEmployees]);

const departmentStats = useMemo(() => {
  return filteredEmployees.reduce((stats, employee) => {
    const dept = employee.dept;

    if (!stats[dept]) {
      stats[dept] = {
        count: 0,
        totalSalary: 0
      };
    }

    stats[dept].count++;
    stats[dept].totalSalary += employee.salary;

    return stats;
  }, {});
}, [filteredEmployees]);


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>Employee Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search employees by name..."
          value={search}
          onChange={(e) => {
  setSearch(e.target.value);
  setVisibleCount(50);
}}
        />

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <p>Total Employees: {employees.length}</p>
      <p>Matching Employees: {filteredEmployees.length}</p>

      {selectedEmployee && (
  <p>
    Selected Employee: {selectedEmployee.name}
  </p>
)}        


<section className="stats-section">
  <h2>Department Statistics</h2>

  <p>
    Unique Departments: {uniqueDepartments.length}
  </p>

  <div className="stats-grid">
    {Object.entries(departmentStats).map(([dept, stats]) => (
      <div className="stats-card" key={dept}>
        <h3>{dept}</h3>

        <p>Headcount: {stats.count}</p>

        <p>
          Average Salary: ₹
          {Math.round(stats.totalSalary / stats.count).toLocaleString("en-IN")}
        </p>
      </div>
    ))}
  </div>
</section>


      <div className="employee-list">
       {filteredEmployees.slice(0, visibleCount).map((employee) => (
  <EmployeeRow
    key={employee.id}
    employee={employee}
    onSelect={handleSelect}
  />
))}
      </div>

{filteredEmployees.length > visibleCount && ( 
  <button onClick={() => setVisibleCount((prev) => prev + 50)}>
    Load More
  </button>
)}
    </div>
  );
}

export default App;
