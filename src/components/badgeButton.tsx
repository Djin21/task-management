import React from 'react'

type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

interface buttonProps extends BaseButtonAttributes {
    icon?: React.ReactElement,
    active?: boolean
}

const BadgedButton = (props: buttonProps) => {
  const { active } = props
  return (
    <button className={`px-4 py-1 rounded-full font-semibold ${active ? "bg-orange-400 text-white" : "bg-neutral-100 text-black"}`}>
        {props?.children}
    </button>
  )
}

export default BadgedButton
