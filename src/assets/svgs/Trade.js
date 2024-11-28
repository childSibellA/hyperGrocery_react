import React from "react";

const Trade = ({ className, ...props }) => {
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
        d="M1.04175 2.50008C1.04175 1.69657 1.69657 1.04175 2.50008 1.04175H4.65841C5.96684 1.04175 6.59241 2.61881 5.69554 3.53014L5.69204 3.5337L5.69202 3.53369L3.53369 5.69202C2.61292 6.6128 1.04175 5.954 1.04175 4.65841V2.50008ZM2.50008 2.29175C2.38693 2.29175 2.29175 2.38693 2.29175 2.50008V4.65841C2.29175 4.84616 2.52058 4.93737 2.64981 4.80814L4.80585 2.6521C4.86946 2.58658 4.88248 2.50352 4.84828 2.42055C4.81455 2.33872 4.74979 2.29175 4.65841 2.29175H2.50008ZM14.6149 2.61157C14.012 2.38308 13.3692 2.27861 12.7249 2.30442C12.0807 2.33023 11.4483 2.48579 10.8656 2.76177C10.283 3.03776 9.76197 3.4285 9.33386 3.91059C8.90576 4.39268 8.57934 4.95622 8.37418 5.56744C8.22243 6.01952 8.13931 6.49081 8.12676 6.96566C8.19481 6.97765 8.26258 6.99079 8.33004 7.00507C9.46747 7.24495 10.521 7.81012 11.3555 8.64464C12.1901 9.47923 12.7553 10.5329 12.9952 11.6704C13.0095 11.7381 13.0227 11.8061 13.0347 11.8743C13.5265 11.8622 14.0146 11.7744 14.4815 11.6131C15.1069 11.397 15.6807 11.0538 16.1668 10.605C16.653 10.1563 17.0409 9.61172 17.3063 9.00564C17.5716 8.39956 17.7085 7.7451 17.7084 7.08349C17.7072 6.43907 17.5761 5.80151 17.3228 5.20895C17.0694 4.61609 16.6989 4.08048 16.2336 3.63417C15.7683 3.18787 15.2178 2.84006 14.6149 2.61157ZM13.1216 13.1223C13.7227 13.1019 14.3188 12.9918 14.8897 12.7945C15.6782 12.5221 16.4017 12.0894 17.0147 11.5235C17.6277 10.9577 18.1168 10.2711 18.4513 9.50691C18.7859 8.74272 18.9585 7.91753 18.9584 7.08333L18.9584 7.0824C18.9571 6.26946 18.7917 5.46516 18.4722 4.71765C18.1527 3.97014 17.6856 3.2948 17.0989 2.73207C16.5122 2.16934 15.818 1.73079 15.0579 1.4427C14.2977 1.1546 13.4872 1.02288 12.6749 1.05542C11.8626 1.08797 11.0653 1.2841 10.3306 1.63208C9.59589 1.98006 8.93898 2.47273 8.39919 3.08059C7.85941 3.68845 7.44785 4.39899 7.18915 5.16967C7.00358 5.72251 6.89941 6.29814 6.87887 6.87854C5.35077 6.93026 3.89604 7.55991 2.81131 8.64464C1.67828 9.77768 1.04175 11.3144 1.04175 12.9167C1.04175 14.5191 1.67828 16.0558 2.81131 17.1889C3.94434 18.3219 5.48106 18.9584 7.08341 18.9584C8.68576 18.9584 10.2225 18.3219 11.3555 17.1889C12.44 16.1044 13.0696 14.65 13.1216 13.1223ZM8.07648 8.2291C8.97911 8.42127 9.8119 8.87082 10.4706 9.52954C11.1293 10.1883 11.5789 11.0211 11.7711 11.9237C11.8397 12.2477 11.8751 12.5804 11.8751 12.9167C11.8751 14.1876 11.3702 15.4064 10.4716 16.305C9.57302 17.2036 8.35424 17.7084 7.08341 17.7084C5.81259 17.7084 4.59381 17.2036 3.69519 16.305C2.79658 15.4064 2.29175 14.1876 2.29175 12.9167C2.29175 11.6459 2.79658 10.4271 3.69519 9.52853C4.59381 8.62992 5.81259 8.12508 7.08341 8.12508C7.41974 8.12508 7.75242 8.16044 8.07648 8.2291ZM16.4665 14.3081C17.3872 13.3874 18.9584 14.0462 18.9584 15.3417V17.5001C18.9584 18.3036 18.3036 18.9584 17.5001 18.9584H15.3417C14.0333 18.9584 13.4078 17.3814 14.3046 16.47L14.3081 16.4665L14.3081 16.4665L16.4665 14.3081ZM17.7084 15.3417C17.7084 15.154 17.4796 15.0628 17.3504 15.192L15.1955 17.3468C15.1951 17.3472 15.1948 17.3476 15.1944 17.348C15.1307 17.4135 15.1177 17.4966 15.1519 17.5796C15.1856 17.6614 15.2504 17.7084 15.3417 17.7084H17.5001C17.6132 17.7084 17.7084 17.6132 17.7084 17.5001V15.3417Z"
      />
    </svg>
  );
};

export default Trade;