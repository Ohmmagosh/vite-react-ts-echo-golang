type H1Props = {
	text: string

}

export function H1(props: H1Props) {
	const { text } = props
	return (
		<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{text}
		</h1>
	)
}
