import { useEffect, useContext } from "react";
import StateContext from "../context/StateProvider";

const ThemeIcon = ({
  id,
  colorCode,
  title,
  isLogo,
  titleIsNumeric,
  expireDate,
}) => {
  const { whichMemo, setWhichMemo, setIsEnteringPage } =
    useContext(StateContext);
  const subColor = colorCode + "10";

  return (
    <div
      className="shadow-box"
      style={{
        boxShadow:
          whichMemo["currentID"] === id && "2px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      onMouseEnter={() => {
        setWhichMemo({
          ...whichMemo,
          nextID: id,
        });
      }}
      onMouseLeave={() => {
        setWhichMemo({
          ...whichMemo,
          nextID: whichMemo["currentID"],
        });
      }}
    >
      <button
        className="themeIconButton"
        onClick={() => {
          setWhichMemo({
            ...whichMemo,
            currentID: whichMemo["nextID"],
            colorCode: colorCode,
            id: id,
            title: title,
            expireDate: expireDate,
          });
          setIsEnteringPage(true);
        }}
      >
        <svg
          className="themeIcon"
          width="60"
          height="60"
          viewBox="0 0 51 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="48"
            height="54"
            fill={subColor}
            stroke={colorCode}
            strokeWidth="3"
          />
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inconsolata"
            fontWeight="bold"
            fontSize={
              isLogo
                ? "40px"
                : titleIsNumeric
                ? title.length > 2
                  ? "20px"
                  : "30px"
                : "30px"
            }
            fill={colorCode}
          >
            {titleIsNumeric ? title : title[0]}
          </text>
        </svg>
      </button>
    </div>
  );
};

export default ThemeIcon;
