import "./NotesStyles.css";
import GroupCard from "../../Components/GroupCard/GroupCard";
import NewNotes from "../../Components/Notes/NewNotes";
import useGroups from "../../Hooks/useGroups";

const Notes = () => {
  const { groups, activeGroupId, handleArrow } = useGroups();

  const activeGroup = groups.find((u) => u.id === activeGroupId);

  if (!groups || groups.length === 0 || !activeGroup) {
    return (
      <div className="notes-page-hero">
        <div className="hero">
          <img className="hero-bg" src="hero_section.png" alt="hero" />
          <h3>Pocket Notes</h3>
          <div className="description">
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
        </div>
        <div className="end-end">
          <img src="Lock.png" alt="padlock" />
          <p>end-to-end encrypted</p>
        </div>
      </div>
    );
  }

  if (activeGroup) {
    return (
      <div className="notes-page">
        <div className="notes-div">
          <div className="group-session">
            <img
              src="back.png"
              alt="back-image"
              id="back-arrow"
              onClick={handleArrow}
            />
            <GroupCard
              groupName={activeGroup.groupName}
              color={activeGroup.color}
            />
          </div>

          <div className="group-notes">
            {activeGroup.notes.length === 0 ? (
              <p>No Notes!</p>
            ) : (
              activeGroup.notes.map((note, index) => (
                <div key={index} className="note-item">
                  <p className="note-text">{note.text}</p>
                  <div className="time-div">
                    <p id="date">{note.time[0]}</p>
                    <p id="dot">{note.time[1]}</p>
                    <p id="time">{note.time[2]}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="new-notes-form">
            <NewNotes groupId={activeGroup.id} />
          </div>
        </div>
      </div>
    );
  }
};

export default Notes;
