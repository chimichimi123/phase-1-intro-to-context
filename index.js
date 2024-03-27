// Your code here
class Employee {
  constructor(firstName, familyName, title, payPerHour) {
    this.firstName = firstName;
    this.familyName = familyName;
    this.title = title;
    this.payPerHour = payPerHour;
    this.timeInEvents = [];
    this.timeOutEvents = [];
  }
}

function createEmployeeRecord(employeeArray) {
  return new Employee(...employeeArray);
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(employee, date) {
  const [day, hour] = date.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: day,
  });
  return employee;
}

function createTimeOutEvent(employee, date) {
  const [day, hour] = date.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: day,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
