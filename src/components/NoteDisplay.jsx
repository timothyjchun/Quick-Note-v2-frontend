import { useContext, useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import NoteContentDisplay from "./NoteContentDisplay";
import InputSection from "./InputSection";
import MainDisplay from "./MainDisplay";
import AddNewPage from "./AddNewPage";
import EnterPage from "./EnterPage";
import SettingsPage from "./SettingsPage";

import StateContext from "../context/StateProvider";

import axios from "axios";

import "../styles/NoteDisplay.scss";

const NoteDisplay = () => {
  const { whichMemo, isEnteringPage, setOpenSettings } =
    useContext(StateContext);
  const [hasAccess, setHasAccess] = useState(false);
  const [threadData, setThreadData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isEnteringPage) {
      setHasAccess(false);
      setOpenSettings(false);
    }
  }, [isEnteringPage]);

  useEffect(() => {
    const fetchMemoDetail = () => {
      window.threadSocket = new WebSocket(
        "ws://127.0.0.1:8000/ws/thread/" + whichMemo.title + "/"
      );

      threadSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        // if ()
        setThreadData((threadData) => [...threadData, data.data]); //
      };

      document.querySelector(".sendButton").onclick = function (e) {
        e.preventDefault();
        const textInputDom = document.querySelector(".inputForm").textArea;
        const fileInputDom = document.querySelector(".inputForm").fileSelector;
        if (textInputDom) {
          threadSocket.send(
            JSON.stringify({
              data: textInputDom.value,
            })
          );
        }
        textInputDom.value = "";
      };
    };
    if (hasAccess) {
      setIsConnected(true);
      fetchMemoDetail();
    } else {
      if (isConnected) {
        window.threadSocket.close();
        setIsConnected(false);
      }
      setThreadData([]);
    }
  }, [hasAccess]);

  return (
    <>
      <div className="noteDisplayScaffold">
        {whichMemo.currentID === 0 ? (
          <MainDisplay />
        ) : hasAccess ? (
          <>
            <TitleSection
              title={whichMemo.title}
              colorCode={whichMemo.colorCode}
            />
            <NoteContentDisplay
              colorCode={whichMemo.colorCode}
              threadData={threadData}
            />
            <InputSection colorCode={whichMemo.colorCode} id={whichMemo.id} />
            <SettingsPage />
          </>
        ) : (
          <EnterPage setHasAccess={setHasAccess} />
        )}
        <AddNewPage />
      </div>
    </>
  );
};

export default NoteDisplay;
