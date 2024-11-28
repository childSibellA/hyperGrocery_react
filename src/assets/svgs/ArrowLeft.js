const ArrowLeft = ({ className, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      className={className}
      {...props}
    >
      <path
        d='M14.0081 11.1449L14.0081 3.99133L6.85449 3.99133'
        stroke='#fff'
        strokemidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.99066 14.0087L13.9078 4.09155'
        stroke='#fff'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowLeft;
