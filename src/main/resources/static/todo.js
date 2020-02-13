import {TodoService, ERROR} from "./todo-service.js";

class ToDosListComponent {
  todoService;
  formSubmitButton = document.getElementById('submitForm');
  listTable = document.getElementById('list');

  constructor(todoService) {
    this.todoService = todoService;
    this.formSubmitButton.addEventListener("click", _ => this.submitForm());
  }

  submitForm() {
    const data = this.serializeForm();
    this.todoService.create(data).then(result => {
      if (result !== ERROR) {
        data.id = result;
        this.appendItem(data);
      }
    });
  }

  loadContent() {
    this.todoService.readAll().then(content => this.renderList(content));
  }

  renderList(toDos) {
    toDos.forEach(item => this.appendItem(item));
  }

  appendItem(item) {
    const row = this.listTable.insertRow(-1);
    const isDoneCell = document.createElement('td');
    const isDoneCheckbox = document.createElement('input');
    isDoneCheckbox.setAttribute('type', 'checkbox');
    isDoneCheckbox.setAttribute('data-id', item.id);
    if (item.done) {
      isDoneCheckbox.setAttribute('checked', 'true');
    }
    isDoneCell.appendChild(isDoneCheckbox);
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('value', 'delete');
    deleteButton.setAttribute('class', 'btn btn-primary');
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.addEventListener("click", event => this.removeItem(event));
    deleteCell.appendChild(deleteButton);
    row.appendChild(this.createSimpleCell(item.title));
    row.appendChild(this.createSimpleCell(item.dueDate));
    row.appendChild(this.createSimpleCell(item.priority.toLowerCase()));
    row.appendChild(isDoneCell);
    row.appendChild(deleteCell);
  }

  removeItem(event) {
    event.preventDefault();
    const itemId = event.target.dataset.id;
    const row = event.target.parentElement.parentElement;
    fetch('todos/' + itemId, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 204) {
        row.remove();
      }
    })
  }

  createSimpleCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    return cell;
  }

  serializeForm() {
    const date = document.getElementById('dueDate').value;
    const time = document.getElementById('dueTime').value;
    const dueDate = date + 'T' + time;
    return  {
      title: document.getElementById('title').value,
      dueDate: dueDate,
      priority: document.getElementById('priorityFormSelect').value
    };
  }
}

const todoService = new TodoService();
const todoComponent = new ToDosListComponent(todoService);
todoComponent.loadContent();

