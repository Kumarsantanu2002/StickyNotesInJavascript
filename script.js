let notesData = [];
let generatedId = 1;
if (localStorage.getItem("notes") != null) {
  notesData = JSON.parse(localStorage.getItem("notes"));
  let lastIndex = notesData.length - 1;
  generatedId = notesData[lastIndex].id + 1;
}

function displayExistingNotes() {
  notesData.forEach(function (oldNote, index) {
    let note = document.createElement("div");
    //   <div></div>
    note.classList.add("note");
    //   <div class="note"></div>

    let title = document.createElement("input");
    title.classList.add("title");
    title.setAttribute("placeholder", "Sticky Title ...");
    title.setAttribute("type", "text");
    title.setAttribute("data-id", oldNote.id);
    title.value = oldNote.title;
    title.onkeyup = updateTitle;

    let content = document.createElement("textarea");
    content.classList.add("content");
    content.setAttribute("placeholder", "Content Here");
    content.setAttribute("data-id", oldNote.id);
    content.value = oldNote.content;
    content.onkeyup = updateContent;

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "./deleteimg.png";
    deleteBtn.setAttribute("data-id", oldNote.id);
    deleteBtn.onclick = deleteNode;

    note.appendChild(title);
    note.appendChild(content);
    note.appendChild(deleteBtn);

    document.getElementById("notes").appendChild(note);
  });
}

displayExistingNotes();

function newNote() {
  let note = document.createElement("div");
  //   <div></div>
  note.classList.add("note");
  //   <div class="note"></div>

  let title = document.createElement("input");
  title.classList.add("title");
  title.setAttribute("placeholder", "Sticky Title ...");
  title.setAttribute("type", "text");
  title.setAttribute("data-id", generatedId);
  title.onkeyup = updateTitle;

  let content = document.createElement("textarea");
  content.classList.add("content");
  content.setAttribute("placeholder", "Content Here");
  content.setAttribute("data-id", generatedId);
  content.onkeyup = updateContent;

  let deleteBtn = document.createElement("img");
  deleteBtn.src = "./deleteimg.png";
  deleteBtn.setAttribute("data-id", oldNote.id);
  deleteBtn.onclick = deleteNode;

  note.appendChild(title);
  note.appendChild(content);
  note.appendChild(deleteBtn);

  document.getElementById("notes").appendChild(note);
  notesData.push({
    id: generatedId,
    title: "",
    content: "",
  });
  generatedId++;
  //console.log(notesData);

  localStorage.setItem("notes", JSON.stringify(notesData));
}

function updateTitle() {
  // console.log(this);
  // console.log(this.getAttribute("data-id"));
  // console.log(this.value);
  let titleId = Number(this.getAttribute("data-id"));
  let titleValue = this.value;

  let obj = notesData.find(function (note, index) {
    return note.id == titleId;
  });
  obj.title = titleValue;
  localStorage.setItem("notes", JSON.stringify(notesData));
  // console.log(obj);
}

function updateContent() {
  // console.log(this);
  // console.log(this.getAttribute("data-id"));
  // console.log(this.value);
  let contentId = Number(this.getAttribute("data-id"));
  let contentValue = this.value;

  let obj = notesData.find(function (note, index) {
    return note.id == contentId;
  });
  obj.content = contentValue;
  localStorage.setItem("notes", JSON.stringify(notesData));
  // console.log(obj);
}

function deleteNode() {
  //console.log(this);
  //console.log(this.parentNode);

  let deleteId = Number(this.getAttribute("data-id"));
  let index = notesData.findIndex(function (note, index) {
    return note.id == deleteId;
  });

  notesData.splice(index, 1);
  this.parentNode.remove();
  localStorage.setItem("notes", JSON.stringify(notesData));
}
