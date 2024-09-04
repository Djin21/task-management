import React from "react";

type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

interface ButtonProps extends BaseButtonAttributes {
  bgColor?: string;
  textColor?: string;
}

const Button = (props: ButtonProps) => {

    const { bgColor, textColor, children, className, ...rest } = props;

  return (
    <button
      className={`flex justify-center items-center gap-x-2 px-4 py-1 rounded-md ${bgColor} ${textColor} font-semibold cursor-pointer duration-300 ${className}`}
        {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
