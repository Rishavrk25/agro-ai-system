/**
 * Range input wrapper matching shadcn/ui Slider API.
 *
 * Usage:
 *   <Slider value={[50]} onValueChange={([v]) => setValue(v)} min={0} max={100} step={1} />
 */
export function Slider({
  value = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  id,
  ...props
}) {
  const currentValue = Array.isArray(value) ? value[0] : value;
  const percent = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full ${className}`} {...props}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => {
          const val = Number(e.target.value);
          onValueChange?.([val]);
        }}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted outline-none"
        style={{
          background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percent}%, var(--muted) ${percent}%, var(--muted) 100%)`,
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Slider;
