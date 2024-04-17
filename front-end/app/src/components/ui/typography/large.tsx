type LargeProps = {
	text: string
}

export function Large(props: LargeProps) {
	const { text } = props
	return <div className="text-lg font-semibold">{text}</div>
  }
