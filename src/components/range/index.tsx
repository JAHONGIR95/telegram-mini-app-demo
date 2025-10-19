export default function CRange({
  max,
  min,
  value,
  onChange,
}: {
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        background: `linear-gradient(to right, orange ${percent}%, #ffe4b3 ${percent}%)`,
      }}
      className="range-orange w-[130]"
    />
  );
}
