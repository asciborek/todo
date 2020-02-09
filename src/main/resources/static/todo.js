const submitForm = document.getElementById('submitForm');
const listTable = document.getElementById('list')

loadTodos();

function loadTodos() {
  fetch('/todos').then(response => {
    if (response.status === 200) {
      response.json().then(toDos => renderTodos(toDos))
    }
  })
}

function renderTodos(toDos) {
  toDos.forEach(item => {
    let row = listTable.insertRow(-1);
    let idCell = document.createElement('td');
    idCell.setAttribute('class', 'd-none');
    idCell.innerText=item.id;
    row.appendChild(idCell);
    let isDoneCell = document.createElement('td');
    let isDoneCheckbox = document.createElement('input');
    isDoneCheckbox.setAttribute('type', 'checkbox');
    if (item.done) {
      isDoneCheckbox.setAttribute('checked', 'true');
    }
    isDoneCell.appendChild(isDoneCheckbox);
    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'delete');
    deleteButton.setAttribute('class', 'btn btn-primary');
    deleteCell.appendChild(deleteButton);
    row.appendChild(createSimpleCell(item.title));
    row.appendChild(createSimpleCell(item.dueDate));
    row.appendChild(createSimpleCell(item.priority.toLowerCase()));
    row.appendChild(isDoneCell);
    row.appendChild(deleteCell);
  });
}

function createSimpleCell(value) {
  let cell = document.createElement('td');
  cell.innerText = value;
  return cell;
}

function serializeForm() {
  let date = document.getElementById('dueDate').value;
  let time = document.getElementById('dueTime').value;
  let dueDate = date + 'T' + time;
  let data = {
    title: document.getElementById('title').value,
    dueDate: dueDate,
    priority: document.getElementById('priorityFormSelect').value
  };
  return JSON.stringify(data);
}

submitForm.addEventListener("click", event => {
  event.preventDefault();
  let json = serializeForm();
  fetch ('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  }).then(response => {
    console.log(response.status)
  });
});



