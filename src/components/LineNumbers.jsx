export default function LineNumbers({ count = 12 }) {
  const lines = Array.from({ length: count }, (_, index) =>
    String(index + 1).padStart(2, '0'),
  )

  return (
    <div
      aria-hidden="true"
      className="line-numbers pointer-events-none absolute -left-1 top-0 hidden select-none sm:block"
    >
      {lines.map((line) => (
        <div key={line} className="line-numbers-row">
          {line}
        </div>
      ))}
    </div>
  )
}
