function splitPascal(name){
  return name.replace(/[A-Z][a-z]+/ug, (match) => ' ' + match.toLowerCase() ).trim()
}

function isNil(target){
  return target === null || target === undefined
}

function isPascal(name){
  const regular = /^[A-Z]\w*[a-z]+$/u
  return regular.test(name)
}

function singlePascal(name){
  return name.toLowerCase().replace(/\w/u, m => m.toUpperCase())
}

function upperFirstWordAfterDigist(name){
  return name.replace(/(\d)([a-z]+)/gu, (_,d,s) => d + singlePascal(s))
}

function toPascal(name){
  return name.split(/[\W_]/).map(singlePascal).map(upperFirstWordAfterDigist).join('')
}

module.exports = {
  isNil,
  splitPascal,
  isPascal,
  toPascal
}