import "./NameStyles.css";
import GroupCard from "../../Components/GroupCard/GroupCard";
import Group from "../../Components/Groups/Group";
import useGroups from "../../Hooks/useGroups";
const Names = () => {
  const { groups, showForm, setShowForm, setActiveGroupId, setShowNotes } =
    useGroups();

  const createGroup = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="names-page">
        <div className="title">
          <h1 className="pocket-notes-title">Pocket Notes</h1>
        </div>
        <div className="groups-panel">
          {groups &&
            groups.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveGroupId(item.id);
                    setShowNotes(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <GroupCard
                    key={item.id}
                    groupName={item.groupName}
                    color={item.color}
                  />
                </div>
              );
            })}

          <div className="btn">
            <img
              className="add-btn"
              src="plus_button.png"
              alt="add-btn"
              onClick={createGroup}
            />
          </div>
        </div>
        {showForm && <Group />}
      </div>
    </>
  );
};

export default Names;
