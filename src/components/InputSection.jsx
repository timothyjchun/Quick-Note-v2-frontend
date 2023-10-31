import { useEffect, useContext, useState } from "react";
import axios from "axios";
import StateContext from "../context/stateProvider";

const InputSection = ({ colorCode, id }) => {
  const { BASE_URL } = useContext(StateContext);
  useEffect(() => {
    const fileInputSelector = document.getElementById("fileSelector");
    fileInputSelector.addEventListener("change", () => {
      if (fileInputSelector.files.length > 0) {
        let formData = new FormData();
        formData.append(
          "file_content",
          fileInputSelector.files[0],
          fileInputSelector.files[0].name
        );
        formData.append("noteId", id);
        axios
          .post(`${BASE_URL}api/file_handle/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.status);
            window.threadSocket.send(
              JSON.stringify({
                data: fileInputSelector.files[0].name,
                type: "file",
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.querySelector(".sendButton").click();
    }
  };
  return (
    <div className="inputSectionScaffold">
      <div
        className="inputSectionParent"
        style={{ backgroundColor: colorCode + "10" }}
      >
        <form className="inputForm">
          <textarea
            className="textArea"
            name="textArea"
            onKeyDown={handleKeyPress}
          ></textarea>
          <div id="fileSelectDiv">
            <label htmlFor="fileSelector" id="fileSelectorLabel">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0V6.04167H25V3.02083H9.375V0H0ZM0 9.0625V22.6562C0 23.5021 0.6875 24.1667 1.5625 24.1667H23.4375C24.3125 24.1667 25 23.5021 25 22.6562V9.0625H0Z"
                  fill="black"
                />
              </svg>
            </label>
            <input type="file" id="fileSelector" className="fileSelector" />
          </div>

          <button className="sendButton">send</button>
        </form>
      </div>
    </div>
  );
};

export default InputSection;
