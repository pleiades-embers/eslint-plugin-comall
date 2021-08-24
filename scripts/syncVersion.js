#!/usr/bin/env node
const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')

function cmd(command) {
  try {
    const output = execSync(command)
    return output.toString()
  } catch (error) {
    return ''
  }
}

function getLatestTagVersion(){
  try {
    const tag = cmd('git describe --tags')
      .split('-')
      .filter(Boolean)[0]
    if (tag && /^v\d+.\d+.\d+$/.test(tag)) {
      return tag.slice(1)
    }
    return ''
  } catch (error) {
    return ''
  }
}

function updateTagVersion(version){
  if (version === latestTagVersion) return
  cmd(`git tag v${version}`)
}

function updatePackageVersion(version){
  if (version === packageVersion) return 
  packageJson.version = version
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\r')
  cmd(`git add -A && git commit -m "chore:\ sync package version to ${version}" `)
}

function compareVersion(){
  if (packageVersion === latestTagVersion) {
    return {
      needUpdate:false
    }
  }
  if (packageVersion > latestTagVersion) {
    return {
      needUpdate:true,
      needUpdateTarget:'tag',
      version:packageVersion
    }
  }
  return {
    needUpdate:true,
    needUpdateTarget:'package',
    version:latestTagVersion
  }
}

function updateVersionIfNeeded(){
  const {needUpdate, needUpdateTarget, version} = compareVersion()
  if (!needUpdate) return 
  if (needUpdateTarget === 'tag') {
    updateTagVersion(version)
  }
  if (needUpdateTarget === 'package') {
    updatePackageVersion(version)
  }
}

const packageJsonPath = path.resolve(__dirname,'..','package.json')
const packageJson = require(packageJsonPath)
const packageVersion = packageJson.version
const latestTagVersion = getLatestTagVersion()
updateVersionIfNeeded()
