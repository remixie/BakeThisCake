export {
  decryptWord,
  apply,
  arrayFlat
}

/**
 * Applies the given functions in order to the given input, if no functions are given
 * then returns a function that when given an array of functions, will apply them in order to the original input
 *
 * @param {*} input
 * @param {Function[]|Function[][]} [optionalFns]
 * @returns
 */
function apply(input, ...optionalFns) {
  optionalFns = arrayFlat(optionalFns)
  if (!optionalFns || optionalFns.length === 0) {
    return (...optionalFns) => arrayFlat(optionalFns).reduce((output, fn) => fn(output), input)
  }
  return optionalFns.reduce((output, fn) => fn(output), input)
}

/**
 * Flattens an array n times
 *
 * @param {any[]} array
 * @param {number} [times=Infinity]
 * @returns {any[]}
 */
function arrayFlat(array, times = Infinity) {
  return array.reduce((arr, item) => {
    if (Array.isArray(item) && times > 0) {
      arr.push(...arrayFlat(item, times - 1))
    } else {
      arr.push(item)
    }
    return arr
  }, [])
}

/**
 * Decrypts a word encrypted by our server
 *
 * @param {string} input
 * @returns {string}
 */
function decryptWord(input) {
  const inp = new Uint8Array([...input].map(item => item.charCodeAt(0)))

  const dec = inp.map((code, index) => index % 2 ? rotateLeft(code, index) : rotateRight(code, (index / 2) + 1))
    .reduce((acc, code) => {
      acc.push(String.fromCharCode(code))
      return acc
    }, []).join('')
  return dec
}


const bitMask = (2 ** 8) - 1;
/**
 * Masks our number
 *
 * @param {number} num
 * @returns {number}
 */
function mask(num) {
  return num & 7
}

/**
 * Rotates our input n by d digits, 8 bit to the left
 *
 * @param {number} n input number
 * @param {number} d number of digits to rotate
 * @returns {number} value after rotation
 */
function rotateLeft(n, d) {
  const masked = mask(d) // I'm batman
  return (
    ((n << masked) & bitMask) |
    (n >>> (8 - masked))
  )
}

/**
 * Rotates our input n by d digits, 8 bit to the right
 *
 * @param {number} n input number
 * @param {number} d number of digits to rotate
 * @returns {number} value after rotation
 */
function rotateRight(n, d) {
  const masked = mask(d); // no-one cared who I was till I put on the mask
  return (
    (n >>> masked) |
    ((n << (8 - masked)) & bitMask)
  );
}
