type H4Props = {
	text: string
}

export function H4(props: H4Props) {
	const { text } = props
	return (
		<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
			{text}
		</h4>
	)
}
