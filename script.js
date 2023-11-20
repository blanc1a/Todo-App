const addToDoButton = document.querySelector("#addButton");
const toDoList = document.querySelector("#List");
const firstToDo = document.querySelector("#firstToDo");
const newTodo = document.querySelector("#newToDo");
const radioBtn = document.querySelector("#filterListe");
const all = document.querySelector("#all");
const done = document.querySelector("#done");
const open = document.querySelector("#open");
const removeButton = document.querySelector("#removeButton");
const itemsArr = JSON.parse(localStorage.getItem("items")) || []; //bei jedem reload wird mein programm von vorne geladen, wollen befülltes array behalten
let count = 0; //für id-zahl
let filter = "all";

addToDoButton.addEventListener("click", addToDoItem);
radioBtn.addEventListener("change", filterTodos);
removeButton.addEventListener("click", removeToDoItem);
renderToDos();
removeToDoItem();

function addToDoItem(event) {
  count++; //für id-zahl
  event.preventDefault(); //nötig, damit die seite beim drücken des buttons nicht neu lädt
  if (checkDuplicates()) {
    //checkDuplicates() ist gleich checkDuplicates() === true
    //wenn checkDuplicates() true returned, dann wird inhalt in das array gepusht
    itemsArr.push({
      itemText: newToDo.value,
      completed: false,
      id: "id_" + count,
    });
  }

  newToDo.value = ""; //todo aus dem input-feld löschen, placeholder wieder sichtbar

  renderToDos();
}

function renderToDos() {
  //function damit bestehender inhalt der liste geladen und angezeigt wird bevor neues todo hinzugefügt wird
  toDoList.innerText = ""; //löscht alte liste, zeigt neue liste mit todo +1 an
  for (let toDo of itemsArr) {
    let toDoItem = document.createElement("li");
    let inputItem = document.createElement("input");
    inputItem.type = "checkbox";
    inputItem.checked = toDo.completed; //gibt geschafft/nicht geschafft-state aus nach seiten-reload
    inputItem.objInhaltCheckBox = toDo; //listeneintrag an checkbox gehängt || hänge bestehendes obj an die checkbox - ändert sich das objekt, dann auch das ursprungsobjekt
    toDoItem.appendChild(inputItem);
    let toDoText = document.createTextNode(toDo.itemText); //createTextNode erstellt einen Container für Text im HTML und füllt ihn mit dem Inhalt der in die Funktion übergebenen itemTextVariablen

    toDoItem.appendChild(toDoText);
    toDoList.appendChild(toDoItem);

    //abgehakte todos auch beim rendern durchgestrichen lassen
    //NOCH NICHT FERTIG !!!!!
    if (filter === "done") {
      toDoItem.style = "text-decoration: line-through;";
    } else {
      toDoItem.style = "text-decoration: none;";
    }

    //gehört zum filtern
    if (filter === "open") {
      toDoItem.hidden = toDo.completed; //wenn filter open => setzt die completeten todos auf unsichtbar
    } else if (filter === "done") {
      toDoItem.hidden = !toDo.completed; //wenn filter done => toDo.completed nigieren, um das gegenteil zu erreichen
    } else {
      toDoItem.hidden = false; //hidden auf false, alles muss gezeigt werden
    }

    inputItem.addEventListener("change", checkedToDos); //jedes erstellte To-Do braucht ein event => viele To-Dos, viele Events => muss an dieser stelle im code nur 1x geschrieben werden
  }
  localStorage.setItem("items", JSON.stringify(itemsArr)); //localStorage an dieser Stelle, da jeder Eintrag gespeichert werden soll || items = name für das array im local storage
}

function checkedToDos(event) {
  if (event.target.checked === true) {
    //event.target = checkbox
    event.target.parentElement.style = "text-decoration: line-through;";
    event.target.objInhaltCheckBox.completed = true; //mein array muss auch wissen, dass mein listeneintrag done ist
  } else {
    event.target.parentElement.style = "text-decoration: none;";
    event.target.objInhaltCheckBox.completed = false; //mein array muss auch wissen, dass mein listeneintrag nicht done ist
  }
  localStorage.setItem("items", JSON.stringify(itemsArr)); //nötig, weil inhalt verändert wird
}

function checkDuplicates() {
  for (let i = 0; i < itemsArr.length; i++) {
    if (newTodo.value.toLowerCase() === itemsArr[i].itemText.toLowerCase()) {
      //inhalt von imput element === dem itemText im obj im array, dann false
      alert("No duplicates allowed");
      return false;
    }
  }
  return true;
}
//variable filter = "all" oben angelegt & radiobuttons einzeln über const variablen (open, done, all) geholt
function filterTodos(event) {
  if (event.target === open) {
    //wenn radiobutton mit id open geklickt, filter auf open setzen
    filter = "open";
  } else if (event.target === done) {
    filter = "done";
  } else {
    filter = "all";
  }
  renderToDos();
}

//NOCH NICHT FERTIG
function removeToDoItem(event) {
  //event ist hier mein button wegen dem eventListener => event.target wäre also nicht die checkbox des todos
  //event.preventDefault();
  for (let i = 0; i < itemsArr.length; i++) {
    if (itemsArr[i][1] === done) {
      let indexToDelete = itemsArr[i];
      itemsArr.splice(indexToDelete, 1);
    }
  }
  localStorage.setItem("items", JSON.stringify(itemsArr)); //nötig, weil inhalt verändert wird
  console.log("Torben");
}
