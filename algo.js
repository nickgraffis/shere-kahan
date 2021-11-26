
// Ex:
// Input: [1,2,3]  1
// Output: true

// Input: [1,2,3]  4
// Output: false

// Input: ['code', 'dev', 'nerd']  'nerd'
// Output: true

// Input: ['code', 'dev', 'nerd']  'genius'
// Output: false

// Performative
const exists = (a, i) => {
  for (const v of a) {
    console.log(v === i)
    if (v === i) return true 
  }
}

// Not Performative
const otherExists = (a, i) => {
  let answer = false
  a.forEach(item => {
    console.log(item === i)
    if (item === i) answer = true
  })

  return answer
}

// Also Performative
const otherOtherExists = (a, i) => {
  let answer = false
  answer = a.find(item => {
    console.log(item)
    return item === i
  })
  console.log(answer)

  return answer > 0 ? true : false
}

console.log(exists([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))
console.log(otherExists([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))

