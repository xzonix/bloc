/*************************************************************************
 * Create Note Popup Logic
 **************************************************************************/

function popup() {

    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>Nueva Nota</h1>
        <textarea id="note-text" placeholder="Pone tu nota..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Crear Nota</button>
            <button id="closeBtn" onclick="closePopup()">Cerrar</button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if(popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {

    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim() !== '') {
        const note = {
        id: new Date().getTime(),
        text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';

        popupContainer.remove();
        displayNotes();
    }
}


/*************************************************************************
 * Display Notes Logic
 **************************************************************************/

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}


/*************************************************************************
 * Edit Note Popup Logic
 **************************************************************************/

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");
    
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Editar Nota</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Hecho</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancelar</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // Find the note to update
        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        // Update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // Close the editing popup
        editingPopup.remove();

        // Refresh the displayed notes
        displayNotes();
    }
}

/*************************************************************************
 * Delete Note Logic
 **************************************************************************/

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();
