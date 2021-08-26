function splitPascal(name){
  return name.replace(/[A-Z][a-z]+/ug, (match) => ' ' + match.toLowerCase() ).trim()
}

function isNil(target){
  return target === null || target === undefined
}

function isPascal(name){
  const regular = /^[A-Z]\w*[a-z]+/u
  return regular.test(name)
}

module.exports = {
  isNil,
  splitPascal,
  isPascal
}