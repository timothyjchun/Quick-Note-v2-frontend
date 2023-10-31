import React, { useContext } from "react";
import StateContext from "../context/StateProvider";

const TitleSection = ({ title, colorCode }) => {
  const { openSettings, setOpenSettings } = useContext(StateContext);
  return (
    <div
      className="titleSectionScaffold"
      style={{ border: `solid ${colorCode} 0.18rem`, color: colorCode }}
    >
      {title}

      <button
        onClick={() => {
          setOpenSettings(true);
        }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9414 0L9.38279 3.70948C9.07107 3.80299 8.79052 3.95885 8.50997 4.11471L4.8005 2.55611L2.55611 4.8005L4.11471 8.50997C3.95885 8.8217 3.83416 9.07107 3.70948 9.38279L0 10.9414V14.0586L3.70948 15.6172C3.83416 15.9289 3.95885 16.1783 4.11471 16.49L2.55611 20.1995L4.8005 22.4439L8.50997 20.8853C8.79052 21.01 9.07107 21.1658 9.38279 21.2905L10.9414 25H14.0586L15.6172 21.2905C15.8978 21.1658 16.2095 21.0411 16.49 20.8853L20.1995 22.4439L22.4439 20.1995L20.8853 16.49C21.01 16.2095 21.1658 15.8978 21.2905 15.6172L25 14.0586V10.9414L21.2905 9.38279C21.197 9.10224 21.0411 8.79052 20.8853 8.50997L22.4439 4.8005L20.1995 2.55611L16.49 4.11471C16.2095 3.99002 15.8978 3.83416 15.6172 3.70948L14.0586 0L10.9414 0ZM12.5 7.79302C15.0873 7.79302 17.1758 9.88155 17.1758 12.4688C17.1758 15.0561 15.0873 17.1446 12.5 17.1446C9.91272 17.1446 7.82419 15.0561 7.82419 12.4688C7.82419 9.88155 9.91272 7.79302 12.5 7.79302Z"
            fill={colorCode}
          />
        </svg>
      </button>
    </div>
  );
};

export default TitleSection;
