document.addEventListener('DOMContentLoaded', () => {
   const calendar = document.getElementById('calendar');
   const monthYear = document.getElementById('monthYear');
   const taskSelect = document.getElementById('taskSelect');
   const addPredefinedTaskButton = document.getElementById('addPredefinedTask');
   const currentDate = new Date();
   const currentYear = currentDate.getFullYear();
   const currentMonth = currentDate.getMonth();
   const currentDay = currentDate.getDate();
   const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
   const firstDay = new Date(currentYear, currentMonth, 1).getDay();
   const startDay = (firstDay === 0) ? 6 : firstDay - 1; // Ajuste para que el domingo sea el último día

   // Rellenar los días vacíos antes del primer día del mes
   for (let i = 0; i < startDay; i++) {
       const emptyDay = document.createElement('div');
       emptyDay.classList.add('day');
       calendar.appendChild(emptyDay);
   }

   // Rellenar los días del mes
   for (let day = 1; day <= daysInMonth; day++) {
       const dayElement = document.createElement('div');
       dayElement.classList.add('day');
       dayElement.innerHTML = `<strong>${day}</strong><ul></ul><input type="text" placeholder="Nueva tarea"><button>Añadir</button>`;
       
       const addButton = dayElement.querySelector('button');
       const taskInput = dayElement.querySelector('input');
       const taskList = dayElement.querySelector('ul');

       addButton.addEventListener('click', () => {
           const task = taskInput.value.trim();
           if (task) {
               const taskItem = document.createElement('li');
               const checkbox = document.createElement('input');
               checkbox.type = 'checkbox';
               checkbox.disabled = (day !== currentDay); // Deshabilitar checkbox si no es el día actual
               taskItem.appendChild(checkbox);
               taskItem.appendChild(document.createTextNode(task));
               taskList.appendChild(taskItem);
               taskInput.value = '';
           }
       });

       // Deshabilitar input y botón si el día es pasado
       if (day < currentDay) {
           taskInput.disabled = true;
           addButton.disabled = true;
       }

       calendar.appendChild(dayElement);
   }

   // Añadir tarea predefinida a un día específico
   addPredefinedTaskButton.addEventListener('click', () => {
       const selectedTask = taskSelect.value;
       const selectedDay = parseInt(prompt("Ingrese el día del mes al que desea agregar la tarea:"));
       if (selectedTask && selectedDay > 0 && selectedDay <= daysInMonth) {
           const dayIndex = startDay + selectedDay - 1; // Calcular el índice correcto
           const dayElement = calendar.querySelector(`.day:nth-child(${dayIndex + 8})`); // +8 para ajustar el índice
           const taskList = dayElement.querySelector('ul');
           const taskItem = document.createElement('li');
           const checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
           checkbox.disabled = (selectedDay !== currentDay); // Deshabilitar checkbox si no es el día actual
           taskItem.appendChild(checkbox);
           taskItem.appendChild(document.createTextNode(selectedTask));
           taskList.appendChild(taskItem);
       }
   });
});
