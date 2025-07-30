const toDos = 
    JSON.parse(localStorage.getItem("todos")) ?? []

const todoForm = document.querySelector("#todo-form")
const todoInput= document.querySelector(".input")
const toDoList = document.querySelector("#task-list")

// lưu vao localstorage

  function saveTask (){
      const test = localStorage.setItem("todos", JSON.stringify(toDos))
    
    // console.log(test);
    

  }

render()
todoForm.onsubmit = function (e) {
    e.preventDefault();
    // kiem tra bao nguoi dung neu khong nhap gi
    const value = todoInput.value.trim()
    if(!value){
     return alert("Pleased input something")
     
    }
    // // kiem tra nhap trung ten task
    // const isDuplicate = toDos.some((task) => task.title.toLowerCase() === value.toLowerCase());
    // if (isDuplicate) {
    //      alert("Bạn đã nhập trùng tên công việc!");
    //      todoInput.value =""
    //      return
    // }
// logic
    const newTask = {
        title: value,
        completed : false
    }

    toDos.push(newTask);
    // render
    
    render()

    // clear input

    todoInput.value = ""
}

function render() {
    const html = toDos.map((a, index) => `
        <li class="task-item ${a.completed ? "completed" : ""}">
            <span class="task-title">${a.title}</span>
            <div class="task-action">
                <button class="task-btn stt" data-index="${index}">Task: ${index+1}</button>
                <button class="task-btn edit" data-index="${index}">Edit</button>
                <button class="task-btn done" data-index="${index}">
                    ${a.completed ? "Mark as undone" : "Mark as done"}
                </button>
                <button class="task-btn delete" data-index="${index}">Delete</button>
               
            </div>
        </li>
    `).join("");

    toDoList.innerHTML = html;
    saveTask();
    addEditEvents();
    addDoneEvents(); // <== thêm sự kiện cho nút Done
    addDeleteEvents(); // nếu bạn đã làm xong phần Delete
    addNoTask();
  
}

    // Gắn lại sự kiện cho các nút Edit
function addEditEvents (){
        const editButtons = document.querySelectorAll(".edit");
        editButtons.forEach((btn) => {
        btn.onclick = function () {
            const index = btn.dataset.index;
            const currentTitle = toDos[index].title;
            const newTitle = prompt("Edit your task:", currentTitle);
            if (newTitle !== null && newTitle.trim() !== "") {
                toDos[index].title = newTitle.trim();
                render();
            }
        }
    });
   }

    
    // them su kien cho delete
function addDeleteEvents(){
        const deleteButtons = document.querySelectorAll(".delete");

        deleteButtons.forEach((btn) => {
        btn.onclick = function () {
        const index = btn.dataset.index;
        if(confirm(`ban co muon xoa "${toDos[index].title}" không?`)){
            toDos.splice(index, 1); // Xoá 1 phần tử tại vị trí index
             render(); // Vẽ lại giao diện
        }
        
    };
})
    };

// them su kien cho nut done

function addDoneEvents() {
    const doneButtons = document.querySelectorAll(".done");
    doneButtons.forEach((btn) => {
        btn.onclick = function () {
            const index = btn.dataset.index;
            toDos[index].completed = !toDos[index].completed // Đảo trạng thái
            render(); // Cập nhật lại giao diện
        };
    });
}

function addNoTask (){
    const addNoTask = document.querySelector("#no-task")
    if (toDos.length === 0 ){
        addNoTask.innerHTML = `No task available`
    }else{
        addNoTask.innerHTML=""
    }
    
}






