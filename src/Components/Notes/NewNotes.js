import { useState } from "react";
import "./NewNotesStyles.css";
import useGroups from "../../Hooks/useGroups";

const NewNotes = ({ groupId }) => {
  const { addNote } = useGroups();
  const [text, setText] = useState("");

  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleAddNote = () => {
    if (!text.trim()) {
      alert("Note cannot be empty");
      return;
    }
    addNote(groupId, text);
    setText("");
  };

  return (
    <div className="new-notes">
      <div className="notes-input">
        <textarea
          className="message-box"
          name="note"
          value={text}
          onChange={handleText}
          placeholder="Enter your text here.........."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddNote();
            }
          }}
        />
        <div className="send-btn-div">
          <img
            onClick={handleAddNote}
            id="send-btn"
            src="send_button.png"
            alt="send-img"
            className={text.trim() ? "active-btn" : "inactive-btn"}
          />
        </div>
      </div>
    </div>
  );
};

export default NewNotes;
