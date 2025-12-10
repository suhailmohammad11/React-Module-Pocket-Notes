import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const groupData = createContext();

export const GroupContextProvider = ({ children }) => {
  const [form, setForm] = useState({
    groupName: "",
    color: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [showForm, setShowForm] = useState(false);

  const [groups, setGroups] = useState(() => {
    try {
      const savedGroups = localStorage.getItem("groups");
      if (!savedGroups || savedGroups === "undefined") {
        return [];
      }
      return JSON.parse(savedGroups);
    } catch (error) {
      console.log("Error parsing groups from Local Storage", error);
      return [];
    }
  });

  function capitalizeEachWord(word) {
    return word
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }
  const [activeGroupId, setActiveGroupId] = useState(null);

  const addGroup = (e) => {
    e.preventDefault();

    const newGroup = {
      id: uuidv4(),
      groupName: capitalizeEachWord(form.groupName),
      color: form.color,
      notes: [],
    };
    const isDuplicate = groups.some(
      (u) => u.groupName.toLowerCase() === newGroup.groupName.toLowerCase()
    );
    if (isDuplicate) {
      alert("Group Already exists");
      return;
    }
    setGroups([...groups, newGroup]);
    setForm({ groupName: "", color: "" });
    setShowForm(false);

    setActiveGroupId(newGroup.id);
  };

  const [showNotes, setShowNotes] = useState(false);

  const addNote = (groupId, noteText) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        const now = new Date();
        const optionsDate = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const optionsTime = {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        };
        const formattedDate = now.toLocaleString("en-GB", optionsDate);
        const formattedTime = now.toLocaleString("en-GB", optionsTime);
        const newNote = {
          time: [formattedDate, ".", formattedTime],
          text: noteText,
        };

        return {
          ...group,
          notes: [...group.notes, newNote],
        };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  //Storing groups in browser local storage
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleArrow = () => {
    setShowNotes(false);
    setActiveGroupId(null);
  };

  return (
    <groupData.Provider
      value={{
        form,
        setForm,
        setGroups,
        addGroup,
        groups,
        handleChange,
        showForm,
        setShowForm,
        activeGroupId,
        setActiveGroupId,
        handleArrow,
        addNote,
        showNotes,
        setShowNotes,
      }}
    >
      {children}
    </groupData.Provider>
  );
};
