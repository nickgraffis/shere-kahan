export const simpleDate = (date: string): string => {
	const now = new Date()
	const diff = now.getTime() - new Date(date).getTime()
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
	const diffHours = Math.floor(diff / (1000 * 60 * 60))
	const diffMinutes = Math.floor(diff / (1000 * 60))
	const diffSeconds = Math.floor(diff / 1000)
	if (diffDays > 0) {
		return `${diffDays}d`
	}
	if (diffHours > 0) {
		return `${diffHours}h`
	}
	if (diffMinutes > 0) {
		return `${diffMinutes}m`
	}
	if (diffSeconds > 0) {
		return `${diffSeconds}s`
	}
	return "now"
}