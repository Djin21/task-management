import React from 'react'

type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

interface buttonProps extends BaseButtonAttributes {
    icon?: React.ReactElement,
    stateColor?: String,
    active?: boolean
}

const BadgedButton = (props: buttonProps) => {
  const { active, stateColor, ...rest } = props
  return (
    <button {...rest} className={`relative px-4 py-1 rounded-full ${active ? "bg-orange-400 text-white font-semibold" : "bg-neutral-100 text-neutral-900"}`}>
        {props?.children}
        {
          !active && <div className={`absolute -top-1 right-1 ${stateColor} size-3 rounded-md`}></div>
        }
    </button>
  )
}

export default BadgedButton
