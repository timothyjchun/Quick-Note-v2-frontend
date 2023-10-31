import { createContext, useEffect, useState } from "react";
const StateContext = createContext();
export default StateContext;

export const StateProvider = ({ children }) => {
  const [addPageState, setAddPageState] = useState(false);
  const [showPageState, setShowPageState] = useState(false);
  const [isEnteringPage, setIsEnteringPage] = useState(false); // maybe unneccesary. Check logic later

  const [openSettings, setOpenSettings] = useState(false); // 그냥 넘길려고하니깐 에러남..그래서 그냥 provider로.. -> 사실 그게 문제가 아니라 ()=>{} 여기 안에다가 하면 되는 거였음...
  const [whichMemo, setWhichMemo] = useState({
    currentID: 0,
    nextID: 0,
    colorCode: "#000000",
    title: null,
    id: 0,
    expireDate: 0,
  });

  const BASE_URL = "http://127.0.0.1:8000/";

  const value = {
    addPageState: addPageState,
    setAddPageState: setAddPageState,
    showPageState: showPageState,
    setShowPageState: setShowPageState,
    whichMemo: whichMemo,
    setWhichMemo: setWhichMemo,
    openSettings: openSettings,
    setOpenSettings: setOpenSettings,

    isEnteringPage: isEnteringPage,
    setIsEnteringPage: setIsEnteringPage,
    BASE_URL: BASE_URL,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
