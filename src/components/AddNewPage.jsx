import { useContext, useState, useEffect, useRef } from "react";
import StateContext from "../context/StateProvider";
import axios from "axios";

const AddNewPage = () => {
  const { addPageState, setAddPageState, BASE_URL } = useContext(StateContext);
  const [showPassword, setShowPassword] = useState("password");
  const [idNum, setIdNum] = useState(0);
  const createNoteFrom = useRef(null);

  const createNote = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}api/create_note/`,
        {
          title: e.target.title.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAddPageState(false);
        createNoteFrom.current.reset();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        alert(errMsg);
      });
  };

  useEffect(() => {
    const getIdNum = async () => {
      if (addPageState === true) {
        const res = await axios.get(`${BASE_URL}api/get_id_num/`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.data;
        setIdNum(data.id);
      }
    };
    getIdNum();
  }, [addPageState]);

  return (
    <>
      <div
        className="blur"
        style={{ visibility: addPageState ? "visible" : "hidden" }}
      >
        <div className="blurPageScaffold">
          <button
            className="close"
            onClick={() => {
              setAddPageState(false);
              createNoteFrom.current.reset();
            }}
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.417906 0.43575C0.685572 0.168165 1.04856 0.0178443 1.42704 0.0178443C1.80551 0.0178443 2.1685 0.168165 2.43616 0.43575L9.99108 7.99066L17.546 0.43575C17.6777 0.299425 17.8352 0.190687 18.0093 0.115881C18.1834 0.0410758 18.3707 0.00170078 18.5603 5.38922e-05C18.7498 -0.001593 18.9377 0.0345208 19.1131 0.106289C19.2886 0.178057 19.4479 0.284041 19.5819 0.418058C19.716 0.552075 19.8219 0.71144 19.8937 0.886855C19.9655 1.06227 20.0016 1.25022 19.9999 1.43974C19.9983 1.62926 19.9589 1.81656 19.8841 1.9907C19.8093 2.16484 19.7006 2.32234 19.5642 2.45401L12.0093 10.0089L19.5642 17.5638C19.8243 17.833 19.9681 18.1936 19.9649 18.5678C19.9616 18.9421 19.8115 19.3001 19.5469 19.5647C19.2822 19.8293 18.9242 19.9795 18.55 19.9827C18.1757 19.986 17.8152 19.8421 17.546 19.5821L9.99108 12.0272L2.43616 19.5821C2.16697 19.8421 1.80642 19.986 1.43217 19.9827C1.05793 19.9795 0.699933 19.8293 0.435293 19.5647C0.170652 19.3001 0.0205402 18.9421 0.0172881 18.5678C0.0140361 18.1936 0.157905 17.833 0.417906 17.5638L7.97282 10.0089L0.417906 2.45401C0.150321 2.18634 0 1.82336 0 1.44488C0 1.0664 0.150321 0.703416 0.417906 0.43575Z"
                fill="#0D0D0D"
              />
            </svg>
          </button>
          <form onSubmit={createNote} ref={createNoteFrom}>
            <div className="createPageMainContainer">
              <div className="createPageContainer">
                <div className="createPageDesc">
                  <p id="title">Page Title</p>
                  <p id="requirement">Required</p>
                </div>
                <input
                  type="text"
                  placeholder={`'${idNum}' is recommended`}
                  className="createPageInput"
                  name="title"
                />
              </div>

              <div className="createPageContainer">
                <div className="createPageDesc">
                  <p id="title">ID</p>
                </div>
                <div className="createPageInput divst">{idNum}</div>
              </div>
              <div className="createPageContainer">
                <div className="createPageDesc">
                  <p id="title">Password</p>
                  <p id="requirement">Required</p>
                </div>
                <input
                  type={showPassword}
                  placeholder="Enter Password"
                  className="createPageInput"
                  name="password"
                />
                <button
                  type="button"
                  className="showPassword"
                  onClick={() => {
                    showPassword === "password"
                      ? setShowPassword("type")
                      : setShowPassword("password");
                  }}
                >
                  See
                </button>
              </div>
              <div className="createPageContainer">
                <div className="createPageDesc">
                  <p id="title">Expire Date</p>
                </div>
                <div className="createPageInput divst">1 Day</div>
              </div>

              <button className="submitButton" type="submit">
                <p>Create</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewPage;
