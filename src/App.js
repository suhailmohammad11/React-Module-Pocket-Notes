import { useEffect, useState } from "react";
import "./App.css";
import Names from "./Pages/Names/Names";
import Notes from "./Pages/Notes/Notes";
import useGroups from "./Hooks/useGroups";

function App() {
  const { showNotes } = useGroups();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);
  const [isBigPhone, setIsBigPhone] = useState(window.innerWidth <= 640);
  // const [ isTablet, setIsTablet]= useState(window.innerWidth <=768);
  // const [ isLaptop, setIsLaptop]= useState(window.innerWidth <=1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
      setIsBigPhone(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      {isMobile || isBigPhone ? (
        <>
          {!showNotes && <Names />}
          {showNotes && <Notes />}
        </>
      ) : (
        <>
          <div className="names">
            <Names />
          </div>
          <div className="notes">
            <Notes />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
