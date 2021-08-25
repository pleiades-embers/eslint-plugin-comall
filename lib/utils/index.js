function splitPascal(name){
  return name.replace(/[A-Z][a-z]+/g, (match) => ' ' + match.toLowerCase() ).trim()
}

function isNil(target){
  return target === null || target === undefined
}

module.exports = {
  isNil,
  splitPascal
}