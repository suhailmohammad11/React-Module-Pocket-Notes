import { useContext } from "react";
import { groupData } from "../Context/GroupContext";

const useGroups = () => {
  const context = useContext(groupData);
  if (!context) {
    throw new Error("useGroups must be used within GroupContextProvider");
  }
  return context;
};

export default useGroups;
