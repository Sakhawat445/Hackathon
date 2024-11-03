import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which note is being edited
  const [editSubject, setEditSubject] = useState('');
  const [editDetails, setEditDetails] = useState('');

  useEffect(() => {
    // Load notes from local storage when the component mounts
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  // Function to add a comment to a specific note
  const addComment = (index, commentText) => {
    if (!commentText.trim()) return;

    const updatedNotes = [...notes];
    const note = updatedNotes[index];
    if (!note.comments) note.comments = [];
    note.comments.push(commentText);

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Comment added successfully!');
  };

  // Function to delete a specific note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.info('Note deleted.');
  };

  // Start editing a note
  const startEditing = (index) => {
    setEditIndex(index);
    setEditSubject(notes[index].subject);
    setEditDetails(notes[index].details);
  };

  // Save edited note
  const saveEdit = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].subject = editSubject;
    updatedNotes[index].details = editDetails;

    
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditIndex(null); // Exit edit mode
    toast.success('Note updated successfully!');
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h3 className="text-center text-priary mb-4">Your Notes</h3>
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm border-light rounded">
                <div className="card-body">
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editSubject}
                        onChange={(e) => setEditSubject(e.target.value)}
                      />
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        value={editDetails}
                        onChange={(e) => setEditDetails(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => saveEdit(index)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{note.subject}</h5>
                      <p className="card-text">{note.details}</p>
                      {note.file && (
                        <img
                          src={note.file}
                          alt="Uploaded"
                          className="img-fluid rounded mb-2"
                          style={{ maxHeight: '200px', maxWidth: '100%' }}
                        />
                      )}
                      <button
                        className="btn btn-outline-danger btn-sm me-2  "
                        onClick={() => deleteNote(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm me-2 "
                        onClick={() => startEditing(index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>

                {/* Comments Section */}
                <div className="card-footer">
                  <h6>Comments</h6>
                  <ul className="list-unstyled">
                    {note.comments && note.comments.length > 0 ? (
                      note.comments.map((comment, i) => (
                        <li key={i} className="border-bottom py-1">
                          {comment}
                        </li>
                      ))
                    ) : (
                      <li className="text-muted">No comments yet.</li>
                    )}
                  </ul>
                  <CommentForm onAddComment={(text) => addComment(index, text)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">No notes available.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Comment Form Component
function CommentForm({ onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-2">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-outline-secondary btn-sm">
        Add
      </button>
    </form>
  );
}
