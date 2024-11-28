const Arrow = ({ showMore, onClick, ...props }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }} {...props}>
      {showMore ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          stroke="#3D5AFE"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_679_3865)">
            <path
              d="M14.299 11.6667L10.4714 7.83911C10.0194 7.38707 9.27968 7.38707 8.82764 7.83911L5 11.6667"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_679_3865">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="matrix(1 0 0 -1 0 20)"
              />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          stroke="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_679_3838)">
            <path
              d="M14.299 8.33325L10.4714 12.1609C10.0194 12.6129 9.27968 12.6129 8.82764 12.1609L5 8.33325"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_679_3838">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default Arrow;
