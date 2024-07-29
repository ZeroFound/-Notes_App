const notesData = [
    {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
    },
    {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
    },
    {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
    },
    {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
    },
    {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
    },
    {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
    },
    {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
    },
    {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
    },
    {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
    },
    {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
    },
    {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
    },
    {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
    },
    {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
    },
    {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
    },
    {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
    },
];

class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    text-align: center;
                    padding: 10px;
                    background-color: #6200ea;
                    color: #fff;
                    border-radius: 4px;
                }
                h1 {
                    margin: 0;
                    font-size: 24px;
                }
            </style>
            <header>
                <h1>Notes App</h1>
            </header>
        `;
    }
}

class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 20px;
                }
                input, textarea, button {
                    margin-bottom: 10px;
                    padding: 10px;
                    font-size: 16px;
                }
                textarea {
                    resize: vertical;
                }
                button {
                    background-color: #6200ea;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #3700b3;
                }
            </style>
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Note Title" required>
                <textarea id="noteBody" placeholder="Note Body" rows="5" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#noteForm').addEventListener('submit', this.addNote);
    }

    addNote = (event) => {
        event.preventDefault();
        const title = this.shadowRoot.querySelector('#noteTitle').value;
        const body = this.shadowRoot.querySelector('#noteBody').value;

        if (title.trim() === '' || body.trim() === '') {
            alert('Please enter both title and body for the note.');
            return;
        }

        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('title', title);
        noteItem.setAttribute('body', body);
        noteItem.setAttribute('bg-color', '#e3f2fd');

        document.querySelector('note-list').appendChild(noteItem);

        this.shadowRoot.querySelector('#noteForm').reset();
    }
}

class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .note {
                    background-color: var(--note-bg-color, #f9f9f9);
                    padding: 10px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                }
                .note-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: #333;
                }
                .note-body {
                    white-space: pre-wrap;
                    color: #666;
                }
            </style>
            <div class="note">
                <div class="note-title"></div>
                <div class="note-body"></div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'body', 'bg-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.shadowRoot.querySelector('.note-title').textContent = newValue;
        }
        if (name === 'body') {
            this.shadowRoot.querySelector('.note-body').textContent = newValue;
        }
        if (name === 'bg-color') {
            this.shadowRoot.querySelector('.note').style.backgroundColor = newValue;
        }
    }
}

class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    grid-gap: 20px;
                }
            </style>
            <div class="grid-container" id="notesContainer"></div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        notesData.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', note.title);
            noteItem.setAttribute('body', note.body);
            noteItem.setAttribute('bg-color', '#e3f2fd');
            this.shadowRoot.querySelector('#notesContainer').appendChild(noteItem);
        });
    }
}

customElements.define('app-header', AppHeader);
customElements.define('note-form', NoteForm);
customElements.define('note-item', NoteItem);
customElements.define('note-list', NoteList);
