type PProps = {
	text: string
}

export function P(props: PProps) {
	const { text } = props
	return (
		<p className="leading-7 [&:not(:first-child)]:mt-6">
			{text}
		</p>
	)
}
