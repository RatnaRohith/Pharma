const config = require("config");
// const privateKey = config.get("jwtPrivateKey");
const crypto = require("crypto");

function encrypt(text) {
  var cipher = crypto.createCipher("aes-256-cbc", process.env.jwtPrivateKey);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}
module.exports = encrypt;
