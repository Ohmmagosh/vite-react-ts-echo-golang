type H3Props = {
	text: string
}

export function H3(props: H3Props) {
	const { text } = props
	return (
		<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
			{text}
		</h3>
	)
}
