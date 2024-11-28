import React from "react";

const Extensions = ({ className, ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="#CDCED1"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.09929 7.29106C2.57072 7.81963 2.26672 8.70764 2.26672 10.2085V13.9585C2.26672 15.4594 2.57072 16.3474 3.09929 16.8759C3.62786 17.4045 4.51587 17.7085 6.01672 17.7085H9.76672C11.2676 17.7085 12.1556 17.4045 12.6842 16.8759C13.2127 16.3474 13.5167 15.4594 13.5167 13.9585V10.2085C13.5167 8.70764 13.2127 7.81963 12.6842 7.29106C12.1556 6.7625 11.2676 6.4585 9.76672 6.4585H6.01672C4.51587 6.4585 3.62786 6.7625 3.09929 7.29106ZM2.21541 6.40718C3.09309 5.5295 4.39258 5.2085 6.01672 5.2085H9.76672C11.3909 5.2085 12.6904 5.5295 13.568 6.40718C14.4457 7.28486 14.7667 8.58435 14.7667 10.2085V13.9585C14.7667 15.5826 14.4457 16.8821 13.568 17.7598C12.6904 18.6375 11.3909 18.9585 9.76672 18.9585H6.01672C4.39258 18.9585 3.09309 18.6375 2.21541 17.7598C1.33772 16.8821 1.01672 15.5826 1.01672 13.9585V10.2085C1.01672 8.58435 1.33772 7.28486 2.21541 6.40718Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.90994 5.20926C11.4674 5.22788 12.7163 5.55536 13.5681 6.4071C14.4198 7.25883 14.7473 8.5078 14.7659 10.0652C16.4504 9.61132 17.6834 8.07729 17.6834 6.25008C17.6834 6.07365 17.6692 5.90141 17.6427 5.74884C17.6411 5.73995 17.6398 5.73104 17.6386 5.72209C17.3869 3.78051 15.7329 2.29175 13.7251 2.29175C11.8979 2.29175 10.3638 3.52472 9.90994 5.20926ZM8.54421 5.77803C8.78099 3.11665 11.007 1.04175 13.7251 1.04175C16.3628 1.04175 18.5391 2.99625 18.8765 5.54822C18.915 5.77498 18.9334 6.01454 18.9334 6.25008C18.9334 8.96819 16.8585 11.1942 14.1971 11.431C14.0224 11.4465 13.8492 11.3879 13.7198 11.2695C13.5904 11.1511 13.5167 10.9838 13.5167 10.8084V10.2084C13.5167 8.70756 13.2128 7.81955 12.6842 7.29098C12.1556 6.76241 11.2676 6.45841 9.76675 6.45841H9.16675C8.99136 6.45841 8.82404 6.38472 8.70564 6.25532C8.58724 6.12592 8.52867 5.95273 8.54421 5.77803Z"
      />
    </svg>
  );
};

export default Extensions;