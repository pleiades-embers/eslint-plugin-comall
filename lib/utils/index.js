function splitPascal(name){
  return name.replace(/[A-Z][a-z]+/ug, (match) => ' ' + match.toLowerCase() ).trim()
}

function isNil(target){
  return target === null || target === undefined
}

function isPascal(name){
  const regular = /^[A-Z][A-Za-z0-9]*[a-z]+[A-Za-z0-9]*$/u
  return regular.test(name)
}

function singlePascal(name){
  let targetName = name
  if (name.split('').every(char => /[A-Z]/u.test(char))) {
    targetName = name.toLowerCase()
  }
  return targetName.replace(/\w/u, m => m.toUpperCase())
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