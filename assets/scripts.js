const inputTarea = document.querySelector("#taskInput");
const listaTareas = document.querySelector("#taskList");
const total = document.querySelector("#totalTasks");
const realizadas = document.querySelector("#completedTasks");

let tareas = [
    { id: generarIdAleatorio(), description: "Gestionar temas SAP", completed: false },
    { id: generarIdAleatorio(), description: "Revisar reuniones", completed: false },
    { id: generarIdAleatorio(), description: "Visitar a mis padres", completed: false }
];

function generarIdAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
}

function mostrarTareas() {
    let html = tareas.map(tarea => `
        <li class="${tarea.completed ? 'completed' : ''}">
            <div class="task-info">
                <div class="task-header">ID</div>
                <div class="task-body">${tarea.id}</div>
            </div>
            <div class="task-info">
                <div class="task-header">Tarea</div>
                <div class="task-body">${tarea.description}</div>
            </div>
            <div class="task-status">${tarea.completed ? '<span class="status">Realizado</span>' : ''}</div>
            <div class="task-actions">
                <button class="btn-toggle" onclick="cambiarEstado(${tarea.id})" title="Marcar como completada">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-delete" onclick="eliminarTarea(${tarea.id})" title="Eliminar tarea">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </li>
    `).join('');
    
    listaTareas.innerHTML = html;
    actualizarResumen();
}

function addTask() { 
    if (inputTarea.value.trim() !== '') {
        const nuevaTarea = {
            id: generarIdAleatorio(),
            description: inputTarea.value,
            completed: false
        };
        tareas.push(nuevaTarea);
        inputTarea.value = '';
        mostrarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    mostrarTareas();
}

function cambiarEstado(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    tarea.completed = !tarea.completed;
    mostrarTareas();
}

function actualizarResumen() {
    total.innerText = tareas.length;
    realizadas.innerText = tareas.filter(tarea => tarea.completed).length;
}

mostrarTareas();

