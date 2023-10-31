import { useContext, useEffect, useState } from "react";
import StateContext from "../context/StateProvider";

const NoteContentDisplay = ({ colorCode, threadData }) => {
  const [threadDataDisplay, setThreadDataDisplay] = useState([]);
  const { BASE_URL } = useContext(StateContext);

  const FILE_URL = `${BASE_URL}media/files/`;

  const calculateContentContainerSize = ({ rows, columns }) => {
    let rowSize = 6 * (rows / 3 + 1);
    let columnSize = 7 * (columns / 12 + 1); // need a max..!

    // console.log(rowSize, columnSize);
    return [rowSize, columnSize];
  };

  const displayContentData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length - 1; i++) {
      arr.push(data[i]);
      arr.push(<br />);
    }
    arr.push(data[data.length - 1]);
    return arr;
  };

  const downloadFile = (file_path, fileName) => {
    console.log(file_path);
    fetch(file_path).then((response) =>
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
    );
  };

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < threadData.length; i++) {
      let [rowSize, columnSize] = calculateContentContainerSize(
        threadData[i].row_column
      );
      let contentData = displayContentData(threadData[i].content);
      if (threadData[i]?.type === "file") {
        const file_path = `${FILE_URL}${threadData[i].content[0]}`;
        arr.push(
          <div key={i.toString()}>
            <p id="createdTime">{threadData[i].create_date}</p>
            <div
              className="contentDisplayContainer"
              style={{
                backgroundColor: colorCode + "20",
                height: rowSize + "vh",
                width: columnSize + "vw",
              }}
            >
              {/* <a href={file_path} download={file_path.toString()}> */}
              <button
                onClick={() =>
                  downloadFile(file_path, threadData[i].content[0])
                }
              >
                {threadData[i].content[0]}
              </button>
            </div>
          </div>
        );
      } else {
        arr.push(
          <div key={i.toString()}>
            <p id="createdTime">{threadData[i].create_date}</p>
            <div
              className="contentDisplayContainer"
              style={{
                backgroundColor: colorCode + "20",
                height: rowSize + "vh",
                width: columnSize + "vw",
              }}
            >
              <p id="content">{contentData}</p>
            </div>
          </div>
        );
      }
    }
    arr = arr.reverse();
    setThreadDataDisplay(arr);
  }, [threadData]);
  return (
    <div
      className="contentDisplay"
      style={{ backgroundColor: colorCode + "20" }}
    >
      {threadDataDisplay}
    </div>
  );
};

export default NoteContentDisplay;
