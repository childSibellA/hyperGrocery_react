const ArrowRight = ({ className, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='7'
      height='12'
      viewBox='0 0 7 12'
      fill='none'
      className={className}
      {...props}
    >
      <path
        d='M1.33333 1.70095L5.16097 5.52859C5.61301 5.98063 5.61301 6.72032 5.16097 7.17236L1.33333 11'
        stroke='#fff'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeinejoin='round'
      />
    </svg>
  );
};

export default ArrowRight;
