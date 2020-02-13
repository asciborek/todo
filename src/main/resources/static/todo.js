import {TodoService, ERROR} from "./todo-service.js";

class ToDosListComponent {
  todoService;
  submitForm = document.getElementById('submitForm');
  listTable = document.getElementById('list');

  constructor(todoService) {
    this.todoService = todoService;
    this.submitForm.addEventListener("click", event => {
      event.preventDefault();
      const data = this.serializeForm();
      this.todoService.create(data).then(result => {
        if (result !== ERROR) {
          data.id =result;
          this.appendItem(data);
        }
      });
    });
  }

  loadContent() {
    this.todoService.readAll().then(content => this.renderList(content));
  }

  renderList(toDos) {
    toDos.forEach(item => this.appendItem(item));
  }

  appendItem(item) {
    let row = this.listTable.insertRow(-1);
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
    let itemId = event.target.dataset.id;
    let row = event.target.parentElement.parentElement;
    fetch('todos/' + itemId, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 204) {
        row.remove();
      }
    })
  }

  createSimpleCell(value) {
    let cell = document.createElement('td');
    cell.innerText = value;
    return cell;
  }

  serializeForm() {
    let date = document.getElementById('dueDate').value;
    let time = document.getElementById('dueTime').value;
    let dueDate = date + 'T' + time;
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

