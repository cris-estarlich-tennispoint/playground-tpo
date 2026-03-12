interface HeartIconProps {
    width?: number
    height?: number
    fill?: string
    stroke?: string
    className?: string
    style?: React.CSSProperties
}

export default function HeartIcon({ 
    width = 16, 
    height = 16, 
    fill = "none", 
    stroke = "currentColor",
    className,
    style
}: HeartIconProps) {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 24 24" 
            fill={fill} 
            stroke={stroke} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={className}
            style={style}
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    )
}
