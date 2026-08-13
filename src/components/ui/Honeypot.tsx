/**
 * Bot trap. Hidden from sighted users and from screen readers, and excluded
 * from tab order — a human should never be able to reach it, so anything in it
 * came from a script filling every input it found.
 *
 * `display: none` is avoided deliberately: naive bots skip hidden inputs, but
 * many still fill an off-screen one.
 */
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
    >
      <label htmlFor="website-url">Website</label>
      <input
        id="website-url"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
