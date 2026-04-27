/**
 * Native <select> wrapper that visually matches shadcn/ui Select.
 * Uses plain HTML select — no Radix dependency.
 *
 * Usage:
 *   <Select value={val} onValueChange={setVal}>
 *     <SelectItem value="a">Option A</SelectItem>
 *     <SelectItem value="b">Option B</SelectItem>
 *   </Select>
 */

export function Select({
  value,
  onValueChange,
  children,
  id,
  className = "",
  placeholder,
  ...props
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value || ""}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={`flex h-10 w-full items-center rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer transition-colors pr-8 ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {/* Chevron icon */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}

// Compatibility shims for shadcn Select API (these are no-ops in native select)
export function SelectTrigger({ children }) {
  return children;
}
export function SelectContent({ children }) {
  return children;
}
export function SelectValue() {
  return null;
}
