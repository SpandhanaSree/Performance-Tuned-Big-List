
import React from "react";

const EmployeeRow = React.memo(function EmployeeRow({
  employee,
  onSelect
}) {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Department: {employee.dept}</p>
      <p>
        Salary: ₹{employee.salary.toLocaleString("en-IN")}
      </p>

      <button onClick={() => onSelect(employee)}>
        Select
      </button>
    </div>
  );
});

export default EmployeeRow;
