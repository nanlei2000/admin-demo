const bcrypt = require('bcrypt')

exports.bcryptPwd = pwd => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(pwd, salt, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}
// ;(async function(params) {
//   let res = await exports.bcryptPwd('dsadas')
//   console.log(res)
// })()

exports.comparePwd = (pwd, hash) => {
  return bcrypt.compare(pwd, hash)
}
;(async function() {
  let res = await exports.comparePwd('kh152572515', '$2b$10$NHv7tfDotAPcdeNSHpl4wu8H7sVPOrReiV3n5nGvavnVjmNJU9mVe')
  console.log(res)
})()
