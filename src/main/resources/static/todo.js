import {TodoService, SUCCESS, ERROR} from "./todo-service.js";

const todoService = new TodoService();
const submitForm = document.getElementById('submitForm');
const todoForm = document.getElementById('todoForm');
const listTable = document.getElementById('list');



loadContent();

function loadContent() {
  todoService.readAll().then(content => renderList(content));
}

function renderList(toDos) {
  toDos.forEach(item => {
    let row = listTable.insertRow(-1);
    let isDoneCell = document.createElement('td');
    let isDoneCheckbox = document.createElement('input');
    isDoneCheckbox.setAttribute('type', 'checkbox');
    isDoneCheckbox.setAttribute('data-id', item.id);
    if (item.done) {
      isDoneCheckbox.setAttribute('checked', 'true');
    }
    isDoneCell.appendChild(isDoneCheckbox);
    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'delete');
    deleteButton.setAttribute('class', 'btn btn-primary');
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.addEventListener("click", event => {
      event.preventDefault();
      let itemId = event.target.dataset.id;
      let row = event.target.parentElement.parentElement;
      fetch('todos/' + itemId, {
        method: 'DELETE'
      }).then(response => {
        if (response.status === 204) {
          row.remove();
        }
      })
    });
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
  const data = serializeForm();
  todoService.create(data);
});



