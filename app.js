//cuando se de click en el boton para enviar los datos primero ejecutar una funcion 
document.getElementById("formTask").addEventListener("submit", saveTask);

//Funcion para guardar las tareas
function saveTask(e) {
  //Obtener los datos que ponen en el input
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  //Objeto para guardar los valores que tienen las variables(title,description)
  let task = {
    title, //title: title
    description, //description: description
  };

  //Almacenar tareas en caso que no exista ninguna
  if (localStorage.getItem("tasks") === null) {
    //Arreglo para agregar las tareas nuevas
    let tasks = [];
    tasks.push(task); //Almacena la nueva tarea en el objeto 'task'
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    //Si hay tareas entonces, obtenerlas, actualizarlas y almacenarlas de nuevo
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    //Actualizar tareas
    tasks.push(task);
    /***Almacenar tareas***
    (Metodo setItem almacena datos)
    (JSON.stringify convierte un objeto en String)*/
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTasks(); //Cuando se agregue una tarea nueva poner en funcion el metodo para agregar dicha tarea en el div
  document.getElementById("formTask").reset(); //Metodo reset() para limpiar el formulario
  
  e.preventDefault();//Metodo para cancelar el reload de la pagina
}

//Funcion para mostrar las tareas
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")); //Obtengo las tareas que estan en el LocalStorage
  let tasksView = document.getElementById("tasks");//Obtener el id del div

  tasksView.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    /*Guardando los valores del arreglo en variables y luego mostrarlos en la variable tasksView que contiene
    el div con id='tasks'*/

    //Variables que almacena el valor que contiene las propiedades del arreglo
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
          <div class="card-body">
            <p>${title} - ${description}</p>
            <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">DELETE</a>
          </div>
        </div>`;
  }
}

//Funcion para eliminar tareas
function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1); //Metodo splice() se encarga de quitar un dato de un arreglo
    }
  }

  //Volver a obtener los datos y almacenarlos en el LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}

getTasks();
