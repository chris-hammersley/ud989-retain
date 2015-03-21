$(function(){

    var model = {
        // initial function that uses JSON to store note if there's no local storage available
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        // function to add note to local or JSON storage for later retrieval
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        // function to read all notes in local or JSON storage; should this be in Octopus?
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        // function to take note from Model and add to View
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                submitDate: Date.now()
            });
            view.render();
        },
        // function to return filtered list of notes - in this case all notes
        getNotes: function() {
            return model.getAllNotes().reverse();
        },
        // function to call both model & view initializations
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        // function to display form field in View, assign variable to note entry and send to Octopus to be recorded
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        // function to display the notes in an unordered list in View
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+ '<span class="note-date">' + new Date(note.submitDate).toString() + '</span>' +
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});