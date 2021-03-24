export default function cns(className, options = {}) {
  if (typeof className !== 'string') {
    throw new Error('first param must be string')
  }
  const result = [className]
  for (let key in options) {
    if (options[key]) {
      result.push(key)
    }
  }
  return result.join(' ')
}
