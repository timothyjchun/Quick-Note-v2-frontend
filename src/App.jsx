import "./App.scss";
import SideBar from "./components/SideBar";
import NoteDisplay from "./components/NoteDisplay";
import AdvertismentSection from "./components/AdvertismentSection";
import { StateProvider } from "./context/StateProvider";

import { useState, useEffect } from "react";

function App() {
  // const [innerSize, setInnerSize] = useState({});

  // useEffect(() => {
  //   setInnerSize({ width: window.innerWidth, height: window.innerHeight });
  //   console.log(window.innerWidth, window.innerHeight);
  // }, [window.innerWidth, window.innerHeight]);

  return (
    <>
      <div className="windowControl">
        <div className="scaffold">
          <StateProvider>
            <SideBar />
            <NoteDisplay />
            <AdvertismentSection />
          </StateProvider>
        </div>
      </div>
      <div className="pageWarning">
        <p>Oops! Only Desktop Is Available 🫠</p>
      </div>
    </>
  );
}

export default App;
