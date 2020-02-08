const submitForm = document.getElementById('submitForm');

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

