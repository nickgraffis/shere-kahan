export const getRandomElement = (list: unknown[]) => {
	return list[Math.floor(Math.random() * list.length)]
}

export const getRandomColor = () => {
	return getRandomElement([
		"#958DF1",
		"#F98181",
		"#FBBC88",
		"#FAF594",
		"#70CFF8",
		"#94FADB",
		"#B9F18D",
	])
}