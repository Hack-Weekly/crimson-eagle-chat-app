interface ToggleProps {
  checked?: boolean
  onChange: () => void
}
/**
 * A Dark Mode Toggle component use to change Dark mode
 */

export default function DarkModeToggle({
  checked,
  onChange,
}: ToggleProps): JSX.Element {
  return (
    <label
      className="relative inline-flex cursor-pointer items-center"
      htmlFor="toggle-check"
      aria-labelledby="toggle-check"
    >
      <input
        type="checkbox"
        className="peer/dark sr-only"
        onChange={onChange}
        checked={checked}
        id="toggle-check"
      />
      <div className="h-5 w-10 rounded-full bg-gray-400 after:absolute after:top-0.5 after:left-1 after:h-4 after:w-[18px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked/dark:bg-main-accent peer-checked/dark:after:left-[2px] peer-checked/dark:after:translate-x-full dark:bg-gray-700" />
    </label>
  )
}
