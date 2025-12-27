

function Button({
  children,
  type = "button",
  
  
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`   px-4 py-2 inline-block  rounded-lg hover:bg-blue-500 duration-200   ${className}   `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
