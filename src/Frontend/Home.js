import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [state, setState] = useState({
    subject: "",
    details: "",
  });
  const [file, setFile] = useState(null);
  const [inProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState([]); // State to store the list of notes
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Load notes from local storage when the component mounts
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, details } = state;

    // Check if inputs are not empty
    if (!subject || !details) {
      return alert("Please fill in all fields.");
    }

    setIsProcessing(true);

    try {
      // Logic to save notes
      const newNote = {
        subject,
        details,
        file: file ? URL.createObjectURL(file) : null, // Create a URL for the uploaded file
      };

      // Update notes state
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);

      // Save updated notes to local storage
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

      // Show success message using Toastify
      toast.success("Notes added successfully!");

      // Clear form fields after successful submission
      setState({ subject: "", details: "" });
      setFile(null);

      // Navigate to the Notes page after successful submission
      navigate('/notes'); // Navigate to the Notes page

    } catch (error) {
      // Handle submission errors
      console.error("Error adding notes:", error);
      toast.error("Error adding notes: " + error.message); // Display error message with Toastify
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-5 auth" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh" }}>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
              <h2 className="text-center mb-4 text-primary">Add Notes</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject"
                    name="subject"
                    value={state.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="details" className="form-label">Details</label>
                  <textarea
                    className="form-control"
                    placeholder="Write your notes here"
                    name="details"
                    value={state.details}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div className="form-group mb-3">
                  <label htmlFor="fileUpload" className="form-label">Upload File (Optional)</label>
                  <input
                    type="file"
                    id="fileUpload"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={inProcessing}
                  >
                    {inProcessing ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Add Notes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
