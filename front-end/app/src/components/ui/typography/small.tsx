type SmallProps = {
	text: string
}

export function Small(props: SmallProps) {
	const { text } = props
	return (
		<small className="text-sm font-medium leading-none">{text}</small>
	)
}
