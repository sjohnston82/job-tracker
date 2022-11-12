import React, { useContext, useState, useRef, useEffect } from "react";

import { JobContext } from "../../../helpers/JobContext";
import { formatNoteDate } from "../../../helpers/utils";
import showToast from "../../../helpers/toasts";

import { CodesandboxLogo, Eraser, XCircle } from "phosphor-react";

const Notes = (props) => {
  const { job } = props;
  const { URL, getJobs, windowSize } = useContext(JobContext);

  const [addingNote, setAddingNote] = useState(false);
  const [deletingNotes, setDeletingNotes] = useState(false);

  const noteInputRef = useRef();

  let [selectedNotes, setSelectedNotes] = useState(
    new Array(job.notes.length).fill(false)
  );

  useEffect(() => {
    if (job.notes.length === 0) {
      setDeletingNotes(false);
    }
    setSelectedNotes(new Array(job.notes.length).fill(false));
  }, [job.notes.length]);

  const handleAddNoteClick = () => {
    setAddingNote((prev) => !prev);
  };

  const handleCheckboxClick = (position) => {
    const updatedSelectedNotes = selectedNotes.map((note, index) =>
      index === position ? !note : note
    );

    setSelectedNotes(updatedSelectedNotes);
  };

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const saveNewNote = (id) => {
    const res = fetch(`${URL}/add-note/${id}`, {
      method: "POST",
      body: JSON.stringify({
        text: noteInputRef.current?.value,
        time: formatNoteDate(new Date()),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        getJobs(job._id);
        setAddingNote(false);
        showToast(res, "save-note");
        // setSelectedNotes((prevState) => [...prevState, false]);
      });
  };

  const deleteNotes = (id) => {
    const res = fetch(`${URL}/delete-notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(selectedNotes, getCircularReplacer()),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        getJobs(id);
        showToast(res, "delete-notes", data.count);
        setDeletingNotes(false);
      });
  };

  const handleDeleteNoteToggle = () => {
    setDeletingNotes((prev) => !prev);
  };

  return (
    <div className="notes">
      <div className="notes-header-container">
        <h4 className="notes-header">Notes</h4>
        {job.notes.length > 0 && !addingNote && (
          <button
            className="delete-notes-toggle-btn"
            onClick={handleDeleteNoteToggle}
          >
            {deletingNotes ? (
              <XCircle size={windowSize.innerWidth < 1024 ? 26 : 32} />
            ) : (
              <Eraser size={windowSize.innerWidth < 1024 ? 26 : 32} />
            )}
          </button>
        )}
      </div>
      <div className="notes-container">
        {job.notes.length < 1 && (
          <p className="no-info center-content">
            There are no notes currently saved.
          </p>
        )}
        <ul className="notes-list">
          {job.notes?.map((note, index) => (
            <li className="note-wrap" key={index}>
              <div className="text-check-wrap">
                <div className="note-text-time">
                  <p className="note-text">{note.text}</p>
                  <p className="note-time">{note.time}</p>
                </div>
                {deletingNotes && (
                  <input
                    type="checkbox"
                    className="delete-note-checkbox"
                    value={index}
                    onChange={() => handleCheckboxClick(index)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {addingNote && (
        <div className="notes-input">
          <textarea className="new-note-input" ref={noteInputRef} />
        </div>
      )}
      <div className="notes-btn-grp">
        {!addingNote && !deletingNotes && (
          <button className="add-note-btn" onClick={handleAddNoteClick}>
            Add Note
          </button>
        )}
        {deletingNotes && job.notes.length > 0 && (
          <button
            className="delete-note-btn"
            onClick={() => deleteNotes(job._id)}
          >
            Delete Selected
          </button>
        )}
        {addingNote && (
          <div className="add-note-btn-wrapper">
            <button className="add-note-btn" onClick={handleAddNoteClick}>
              Cancel
            </button>
            <button
              className="add-note-btn"
              onClick={() => saveNewNote(job._id)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
