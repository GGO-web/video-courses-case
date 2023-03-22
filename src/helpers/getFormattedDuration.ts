export const getFormattedDuration = (duration: number) => {
  const hours = duration / 60
  const roundedHours = Math.floor(hours)

  const minutes = duration - roundedHours * 60

  return `${roundedHours} minutes ${minutes} seconds`
}
