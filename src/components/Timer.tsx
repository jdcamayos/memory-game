import { useEffect, useState } from 'react'

interface Props {
	state: boolean
}

export default function Timer({ state }: Props) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (state) {
			setTimeout(() => setCount(count + 1), 1000)
		}
	}, [count, state])

	const parseTime = (count: number) => {
		const minutes: number = Math.floor(count)
		const seconds: number = count - minutes * 60
		const minutesStr: string = minutes.toString().padStart(2, '0')
		const secondsStr: string = seconds.toString().padStart(2, '0')
		return `${minutesStr}:${secondsStr}`
	}

	return <p>{parseTime(count)}</p>
}
