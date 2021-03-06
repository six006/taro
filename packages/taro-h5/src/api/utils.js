function shouleBeObject (target) {
  if (target && typeof target === 'object') return { res: true }
  return {
    res: false,
    msg: getParameterError({
      correct: 'Object',
      wrong: target
    })
  }
}

function getParameterError ({ name = '', para, correct, wrong }) {
  const parameter = para ? `parameter.${para}` : 'parameter'
  const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong)
  return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`
}

function upperCaseFirstLetter (string) {
  if (typeof string !== 'string') return string
  string = string.replace(/^./, match => match.toUpperCase())
  return string
}

function inlineStyle (style) {
  let res = ''
  for (let attr in style) res += `${attr}: ${style[attr]};`
  if (res.includes('display: flex;')) res += 'display: -webkit-box;display: -webkit-flex;'
  return res
}

function errorHandler (fail, complete) {
  return function (res) {
    typeof fail === 'function' && fail(res)
    typeof complete === 'function' && complete(res)
    return Promise.reject(res)
  }
}

const enc = encodeURIComponent

function serializeParams (params) {
  if (!params) {
    return ''
  }
  return Object.keys(params)
    .map(item => (`${item}=${enc(params[item])}`)).join('&')
}

export {
  shouleBeObject,
  getParameterError,
  inlineStyle,
  errorHandler,
  serializeParams
}
