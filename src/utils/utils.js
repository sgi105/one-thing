export const convert12HourTo24HourFormat = (hour, minute, AMPM) => {
  let hour24 = hour

  if (AMPM === 'AM') {
    if (hour === 12) hour24 = hour - 12
  } else if (AMPM === 'PM') {
    if (hour !== 12) hour24 = hour24 + 12
  }

  return { hour: hour24, minute }
}

export const convert24HourTo12HourFormat = (hour, minute) => {
  let hour12 = hour
  let AMPM

  if (hour < 12) {
    AMPM = 'AM'
    if (hour === 0) hour12 += 12
  } else {
    AMPM = 'PM'
    if (hour !== 12) hour12 -= 12
  }

  return { hour: hour12, minute, AMPM }
}
