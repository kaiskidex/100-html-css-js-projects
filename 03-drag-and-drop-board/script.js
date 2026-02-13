const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("list1");
const deleteZone = document. getElementById("delete-zone");



deleteZone.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (!deleteZone.classList.contains("over")) {
        deleteZone.classList.add("over");
    }

    const draggingCard = document.querySelector(".dragging");
    if (draggingCard && !draggingCard.classList.contains("near-trash")) {
        draggingCard.classList.add("near-trash");
    }
});

deleteZone.addEventListener("dragenter", (e) => {
    e.preventDefault();
    deleteZone.classList.add("over");

    const draggingCard = document.querySelector(".dragging");
    if (draggingCard) {
        draggingCard.classList.add("near-trash");
    }
});

deleteZone.addEventListener("dragleave", () => {
    if (!deleteZone.contains(e.relatedTarget)) {
        deleteZone.classList.remove("over");

        const draggingCard = document.querySelector(".dragging");
        if (draggingCard) {
            draggingCard.classList.remove("near-trash");
        }
    }
});

deleteZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const cardToRemove = document.getElementById(id);

    if (cardToRemove) {
        cardToRemove.remove();
    }
    deleteZone.classList.remove("over");
});



let taskCount = 5;

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        createTask(taskText);
        taskInput.value = "";
    }
});

function createTask(text) {
    const newCard = document.createElement("div");

    newCard.classList.add("card");
    newCard.draggable = true;
    newCard.id = `card${++taskCount}`;
    newCard.innerText = text;

    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);

    todoList.appendChild(newCard);
}

cards.forEach(card => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
});

lists.forEach(list => {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
});

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);

    setTimeout(() => this.classList.add("dragging"), 0);
}

function dragEnd() {
    this.classList.remove("dragging");
}

function dragOver(e) {
    e.preventDefault(); 
}

function dragEnter(e) {
    e.preventDefault();
    if (this.classList.contains("list")) {
        this.classList.add("over");
    }
}

function dragLeave(e) {
    if (e.currentTarget.classList.contains("list")) {
        this.classList.remove("over");
    }
}

function dragDrop(e) {
    e.preventDefault();
    this.classList.remove("over");

    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);

    const isDeleteZone = this.id === "delete-zone";

    if (isDeleteZone && card) {
        card.style.transform = "scale(0) rotate(90deg)";
        card.style.opacity = "0";

        setTimeout( () => {
            card.remove();
        }, 300);
    } else {
        const dropZone = e.target.closest(".list");
        if (dropZone && card) {
            card.classList.remove("near-trash");
            dropZone.appendChild(card);
        }
    }

}