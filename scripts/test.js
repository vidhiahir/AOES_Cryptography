rnd = () => {
  let x = Math.random();
  if (x > 0.5) return 1;
  else return 0;
};

console.log(rnd());

const CryptoJS = require("crypto-js");
const DES = require("crypto-js/tripledes");

mixThis = (txt, public_key, private_key, key3) => {
  var s1 = toString(public_key);
  var s2 = toString(private_key);
  const firstLayer = txt + key3;
  while (s1.length < 5) {
    s1 = "0" + s1;
  }
  while (s2.length < 5) {
    s2 = "0" + s2;
  }
  let mixed = s1 + s2;
  let v = "vatsa";
  let temp = 0;
  while (temp < 10) {
    let n = 10 * mixed[temp] + mixed[temp + 1];
    console.log(n + "\n");
    v[temp / 2] = String.fromCharCode(n);
    temp += 2;
  }
  for (let i = 0; i < v.length; i++) console.log(v[i] + " ");
  return firstLayer + v;
};

console.log(mixThis("vatsal", 78, 98, "key"));

const plain = "v";
const key1 = "01010";
const key2 = "binal";
// double encrytion and decryption successful
const cipher1 = CryptoJS.AES.encrypt(plain, key1);
const plain2 = cipher1.toString();
console.log(plain2);
const cipher2 = DES.encrypt(plain2, key2);

const msg = cipher2.toString();
const r = DES.decrypt(msg, key2);

const msg2 = r.toString(CryptoJS.enc.Utf8);
const res = CryptoJS.AES.decrypt(msg2, key1);

console.log(res.toString(CryptoJS.enc.Utf8));

// 3DES

// Define the plaintext and key

const DES = require("crypto-js/tripledes");

// Define the plaintext and key
const plaintext2 = "This is a secret message.";
const key3 = "0123456789abcdef0123456789abcdef0123456789abcdef"; // 2 x 64-bit key

// Encrypt the plaintext with 2DES
const ciphertext2 = DES.encrypt(DES.encrypt(plaintext, key3), key3).toString();

console.log("Ciphertext: " + ciphertext);

// Decrypt the ciphertext with 2DES
const decryptedText = DES.decrypt(DES.decrypt(ciphertext, key), key).toString(
  CryptoJS.enc.Utf8
);

console.log("Decrypted text: " + decryptedText);
