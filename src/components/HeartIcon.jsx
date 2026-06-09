export default function HeartIcon({ size = 18, fill = '#e8aac4', className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0 1 12 5.765 4.5 4.5 0 0 1 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  )
}
