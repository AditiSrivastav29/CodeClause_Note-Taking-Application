
window.onload = function() {
  fetchNotes();
};


function fetchNotes() {
  fetch('fetch_notes.php')
    .then(response => response.json())
    .then(notes => displayNotes(notes))
    .catch(error => console.log(error));
}


function displayNotes(notes) {
  const notesContainer = document.getElementById('notesContainer');

  
  notesContainer.innerHTML = '';

  
  notes.forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.id = `note_${note.id}`;
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <button onclick="deleteNote('${note.id}')">Delete</button>
    `;
    notesContainer.appendChild(noteElement);
  });
}


fetch('/fetch_notes.php')
  .then(response => response.json())
  .then(data => {
    
    displayNotes(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


function addNote() {
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');

  const note = {
    title: titleInput.value,
    content: contentInput.value
  };

  fetch('add_notes.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      titleInput.value = '';
      contentInput.value = '';
      fetchNotes(); 
    })
    .catch(error => console.log(error));
}


function deleteNote(noteId) {
  
  fetch(`/delete_note.php?id=${noteId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        
        const noteElement = document.getElementById(`note_${noteId}`);
        if (noteElement) {
          noteElement.remove();
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
