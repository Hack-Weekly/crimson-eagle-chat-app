import React from 'react'
import type { FC } from 'react'

interface InputProps {
  type: string
  ariaLabel: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  ariaLabel,
  placeholder,
  onChange,
  ...rest
}) => {
  return (
    <>
      <input
        type={type}
        aria-label={ariaLabel}
        placeholder={placeholder}
        onChange={onChange}
        className="mr-2 w-full border-2 bg-transparent p-1 text-black "
        {...rest}
      />
    </>
  )
}

export default Input
