type H2Props = {
	text: string
}

export function H2(props: H2Props) {
	const { text } = props
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{text}
		</h2>
	)
}
