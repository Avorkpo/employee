let employees = [];

const employeeForm = document.getElementById('employeeForm');
const saveButton = document.getElementById('saveButton');
const employeeTable = document.getElementById('employeeTable');

saveButton.addEventListener('click', addEmployee);

function addEmployee(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const age = document.getElementById('age').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && dob && age && address && email && phone) {
    const employee = {
      name: name,
      dob: dob,
      age: age,
      address: address,
      email: email,
      phone: phone
    };

    employees.push(employee);
    storeData();
    createTableRow(employee);

    resetForm();
  }
}

function createTableRow(employee) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${employee.name}</td>
    <td>${employee.dob}</td>
    <td>${employee.age}</td>
    <td>${employee.address}</td>
    <td>${employee.email}</td>
    <td>${employee.phone}</td>
    <td class="actions">
      <button onclick="editEmployee(this)">Edit</button>
      <button onclick="deleteEmployee(this)">Delete</button>
    </td>
  `;

  employeeTable.querySelector('tbody').appendChild(row);
}

function editEmployee(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  const dob = row.cells[1].textContent;
  const age = row.cells[2].textContent;
  const address = row.cells[3].textContent;
  const email = row.cells[4].textContent;
  const phone = row.cells[5].textContent;

  document.getElementById('name').value = name;
  document.getElementById('dob').value = dob;
  document.getElementById('age').value = age;
  document.getElementById('address').value = address;
  document.getElementById('email').value = email;
  document.getElementById('phone').value = phone;

  row.remove();
}

function deleteEmployee(button) {
  const row = button.parentElement.parentElement;
  const index = row.rowIndex - 1;
  employees.splice(index, 1);
  storeData();
  row.remove();
}

function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('age').value = '';
  document.getElementById('address').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

function storeData() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

function retrieveData() {
  const storedData = localStorage.getItem('employees');
  if (storedData) {
    employees = JSON.parse(storedData);
    employees.forEach(employee => {
      createTableRow(employee);
    });
  }
}

retrieveData();
