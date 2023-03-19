import clsx from 'clsx'

interface ToggleProps {
  checked?: boolean
  onChange: () => void
  /**
   * A Name for the Toggle Component to keep it different from other Toggle Component.
   */
  label: string
}

export default function Toggle({
  checked,
  onChange,
  label,
}: ToggleProps): JSX.Element {
  return (
    <label
      className="relative inline-flex cursor-pointer items-center"
      htmlFor="toggle-check"
      aria-labelledby="toggle-check"
    >
      <input
        type="checkbox"
        className={clsx('sr-only', label && `peer/${label}`)}
        onChange={onChange}
        checked={checked}
        id="toggle-check"
      />
      <div
        className={clsx(
          "h-5 w-10 rounded-full bg-gray-400 after:absolute after:top-0.5 after:left-1 after:h-4 after:w-[18px] after:rounded-full after:bg-white after:transition-all after:content-['']  dark:bg-gray-700",
          label &&
            `peer-checked/${label}:bg-main-accent peer-checked/${label}:after:left-[2px] peer-checked/${label}:after:translate-x-full`
        )}
      />
    </label>
  )
}
