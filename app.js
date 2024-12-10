document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task');
  const timeInput = document.getElementById('task-time');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');

  // Notification Permission Request
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  addTaskButton.addEventListener('click', () => {
    const task = taskInput.value;
    const taskTime = new Date(timeInput.value);

    if (!task || !timeInput.value) {
      alert('Please enter a task and a valid date/time.');
      return;
    }

    // Add Task to List
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${task} <span>${taskTime.toLocaleString()}</span>
      <button class="remove-task">Remove</button>
    `;

    taskList.appendChild(listItem);

    // Set Notification
    const timeDifference = taskTime.getTime() - new Date().getTime();
    if (timeDifference > 0) {
      setTimeout(() => {
        new Notification('Task Reminder', {
          body: `It's time to: ${task}`,
        });
      }, timeDifference);
    } else {
      alert('The selected time has already passed.');
    }

    // Clear Inputs
    taskInput.value = '';
    timeInput.value = '';
  });

  // Remove Task from List
  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-task')) {
      const taskItem = event.target.parentElement;
      taskList.removeChild(taskItem);
    }
  });
});
