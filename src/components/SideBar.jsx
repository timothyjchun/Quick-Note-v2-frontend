import { useContext, useEffect, useState } from "react";
import React from "react";
import "../styles/SideBar.scss";
import Logo from "./Logo";
import Search from "./Search";
import AddNewButton from "./AddNewButton";
import StateContext from "../context/StateProvider";
import ThemeIcon from "./ThemeIcon";

import { format } from "date-fns-tz";
import axios from "axios";

const SideBar = () => {
  const { addPageState, BASE_URL } = useContext(StateContext);
  const [displayNotes, setDisplayNotes] = useState([]);

  useEffect(() => {
    const getAllNotes = async () => {
      axios
        .get(`${BASE_URL}api/get_recent_notes/`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          displayNoteIcons(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (addPageState === false) getAllNotes();
  }, [addPageState]);

  const displayNoteIcons = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const ed = new Date(data[i].expire_date);
      const timeZone = data[i].time_zone;
      const timeZonedEd = format(ed, "yyyy-MM-dd HH:mm:ss.SSS", {
        timeZone: timeZone,
      });
      arr.push(
        <ThemeIcon
          key={data[i].id.toString()}
          title={data[i].title}
          id={data[i].id}
          colorCode={data[i].color_code}
          titleIsNumeric={data[i].title_is_numeric}
          // expireDate={cd.toUTCString().slice(0, cd.toUTCString().length - 4)}
          expireDate={timeZonedEd.slice(0, timeZonedEd.length - 4)}
        />
      );
    }
    setDisplayNotes(arr);
  };

  return (
    <div className="sideBarScaffold">
      <Logo />
      <div
        className="displayAllNotes"
        style={{
          height:
            displayNotes.length > 0
              ? displayNotes.length > 6
                ? "50vh"
                : "auto"
              : "0px",
        }}
      >
        {displayNotes}
      </div>

      <AddNewButton />
      <Search />
    </div>
  );
};

export default SideBar;
