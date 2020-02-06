const prioritySelect = document.getElementById('priorityFormSelect');

fetch("/priorities").then(response => {
  if (response.status === 200) {
    appendOptions(response)
  }
});

function appendOptions(response) {
  response.json().then(json => {
    for (let priority of json) {
      let option = document.createElement('option');
      option.text = priority;
      prioritySelect.add(option)
    }
  })
}