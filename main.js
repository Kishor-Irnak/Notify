//DARK MODE
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

// Select DOM elements
const showFormButton = document.getElementById('show-form-button');
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Function to render notes
function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.classList.add('border', 'p-2', 'bg-white', 'rounded', 'flex', 'justify-between', 'items-center');

    const span = document.createElement('span');
    span.textContent = note.content;

    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Delete';
    link.classList.add('block', 'px-4', 'py-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'dark:hover:text-white');
    link.onclick = () => {
      deleteNoteHandler(note.id);
    };

    li.appendChild(span);
    li.appendChild(link);
    notesList.appendChild(li);
  });
}

// Function to get notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

// Function to save notes to local storage
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Show form when the "Add Note" button is clicked
showFormButton.addEventListener('click', () => {
  showFormButton.classList.add('hidden');
  noteForm.classList.remove('hidden');
  noteInput.focus();
});

// Function to add a note
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = noteInput.value.trim();
  if (content) {
    const notes = getNotes();
    const newNote = {
      id: Date.now().toString(),
      content: content
    };
    notes.push(newNote);
    saveNotes(notes);
    renderNotes(notes);
    noteInput.value = '';
    noteForm.classList.add('hidden');
    showFormButton.classList.remove('hidden');
  } else {
    console.log("Input is empty!");
  }
});

// Function to delete a note
function deleteNoteHandler(id) {
  let notes = getNotes();
  notes = notes.filter(note => note.id !== id);
  saveNotes(notes);
  renderNotes(notes);
}

// Load notes from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const notes = getNotes();
  renderNotes(notes);
});
