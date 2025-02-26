let date = new Date()
date = date.toISOString().split('T')[0]
const jsonObj = '[ { "buildDate": ' + JSON.stringify(date) + '} ]' 
console.log(jsonObj)