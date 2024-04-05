interface IndexProps {
  iconName: string
  color?: string
  width?: string
  height?: string
}

const icon = ({ iconName, color = '#409EFF', width = '18px', height = '18px' }: IndexProps) => {
  return (
    <svg
      style={{
        width: width,
        height: height,
        position: 'relative',
        fill: 'currentColor',
        marginRight: '8px',
        verticalAlign: '-2px'
      }}
      aria-hidden='true'
    >
      <use xlinkHref={'#icon-' + iconName} fill={color} />
    </svg>
  )
}

export default icon
