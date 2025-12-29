

function Button({
  children,
  type = "button",
  
  
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`   sm:px-4 sm:py-2 px-2 py-1  rounded-full transition-colors duration-200 hover:bg-cyan-500  hover:text-white  ${className}   `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
