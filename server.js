var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var expressSession = require("express-session");
var path = require("path");
var multer = require("multer");
var fs = require("fs");
var axios = require("axios");
var FormData = require("form-data");
var CryptoJS = require("crypto-js");
var { decode } = require("punycode");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/homepage");
});

// app.use(express.static("./app/public"));

app.use(express.static(__dirname + "/public"));

app.get("/aboutUs", (req, res) => {
  res.render("about.ejs");
});

app.get("/homepage", (req, res) => {
  res.render("index.ejs");
});

var key1 = "vatsal";
var key2 = "vidhi";
var finalOutputtext;
aesEncryptionOf = (txt, key1) => {
  var cipherObject = CryptoJS.AES.encrypt(txt, key1);
  var cipherText = cipherObject.toString();
  return cipherText;
};

desEncryptionOf = (txt, key2) => {
  var cipherObject = CryptoJS.DES(txt, key2);
  var cipherText = cipherObject.toString();
  return cipherText;
};

let prime = new Set();
let public_key;
let private_key;
let n;

function primefiller() {
  let seive = Array(300).fill(true);
  seive[0] = false;
  seive[1] = false;

  for (let i = 2; i < 300; i++) {
    for (let j = i * 2; j < 300; j += i) {
      seive[j] = false;
    }
  }

  for (let i = 0; i < seive.length; i++) {
    if (seive[i]) {
      prime.add(i);
      console.log(i + " ");
    }
  }
}

function pickrandomprime() {
  let k = Math.floor(Math.random() * prime.size);
  let it = prime.values();
  for (let i = 0; i < k; i++) {
    it.next();
  }
  let ret = it.next().value;
  prime.delete(ret);
  return ret;
}

function setkeys() {
  let prime1 = pickrandomprime();
  let prime2 = pickrandomprime();
  prime1 = 283;
  prime2 = 293;
  n = prime1 * prime2;
  let fi = (prime1 - 1) * (prime2 - 1);
  let e = 2;

  while (true) {
    if (gcd(e, fi) == 1) break;
    e++;
  }

  public_key = e;

  let d = 2;

  while (true) {
    if ((d * e) % fi == 1) break;
    d++;
  }

  private_key = d;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function encrypt(message) {
  let e = public_key;
  let encrypted_text = 1;
  while (e--) {
    encrypted_text *= message;
    encrypted_text %= n;
  }
  return encrypted_text;
}

function decrypt(encrypted_text) {
  let d = private_key;
  let decrypted = 1;
  while (d--) {
    decrypted *= encrypted_text;
    decrypted %= n;
  }
  return decrypted;
}

function encoder(message, key) {
  let form = [];
  for (let letter of message) {
    form.push(encrypt(letter.charCodeAt(0)));
  }
  return form;
}

custompadding = (str, ey) => {
  let arr = str.split('');

  // reverse the array using a for loop
  for (let i = 0; i < arr.length / 2; i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }

  // reverse the array using a while loop
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }

  // reverse the array using a do-while loop
  let i = 0;
  let j = arr.length - 1;
  do {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  } while (i < j);

  // convert the array back to a string and return it
  return arr.join('');

}

function decoder(encoded, key) {
  let s = "";
  for (let num of encoded) {
    s += String.fromCharCode(decrypt(num));
  }
  return s;
}

primefiller();
setkeys();

rsaEncryptionOf = (txt, private_key) => {
  var encryptedText = encoder(txt, private_key);
  return encryptedText;
};

rsaDecryptionOf = (txt, private_key) => {
  var decryptedText = decoder(txt, private_key);
  return decryptedText;
};

aesEncryptionOf = (txt, key9) => {
  console.log("1st");
  const cipherObj = CryptoJS.AES.encrypt(txt, key9);
  console.log("2nd");
  const cipherText = cipherObj.toString();
  console.log("3rd");
  return cipherText;
};

aesDecryptionOf = (txt, key1) => {
  var decryptedObject = CryptoJS.AES.decrypt(txt, key1);
  var decryptedText = decryptedObject.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

desEncryptionOf = (txt, key2) => {
  const cipherObject = CryptoJS.DES.encrypt(txt, key2);
  const cipherText = cipherObject.toString();
  return cipherText;
};

desDecryptionOf = (txt, key2) => {
  const decryptedObject = CryptoJS.DES.decrypt(txt, key2);
  const decryptedText = decryptedObject.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

rnd = () => {
  let x = Math.random();
  if (x > 0.5) return 1;
  else return 0;
};

randomKeyGenerator = () => {
  var key = toString(rnd());
  for (let i = 0; i < 15; i++) {
    key += toString(rnd());
  }
};
customPadding = (obj, aes) => {
  obj.key1 = "0101011110100001";
  obj.key2 = "0001110101011010";
  obj.txt = aes;
  return;
};
finalEncrypt = (txt) => {
  var key1 = randomKeyGenerator();
  var key2 = randomKeyGenerator();
  var finalOutputtext;
  var obj = { key1: key1, key2: key2, txt: txt };
  customPadding(obj, txt);
  console.log("\nthis is key1" + key1 + "\n");
  var aesEncryptedText = aesEncryptionOf(obj.txt, obj.key1);
  var desEncryptedKey = desEncryptionOf(obj.key1, obj.key2);
  var rsaEncryptedKey = rsaEncryptionOf(desEncryptedKey, private_key);
  finalOutputtext = mixThis(
    aesEncryptedText,
    public_key,
    private_key,
    desEncryptedKey,
    key2
  );
  customPadding(obj, aesEncryptedText);
  return aesEncryptedText;
};

mixThis = (txt, public_key, private_key, key3, key4) => {
  var s1 = String.fromCharCode(public_key);
  var s2 = String.fromCharCode(private_key);
  s1 = "(";
  s2 = ";";
  // var len1 = toString(key3.length);
  // var len2 = toString(key4.length);
  var firstLayer = s1 + key3 + key4 + s2 + txt;
  return firstLayer;
};
finalDecrypt = (txt) => {
  var key1 = "0";
  var key2 = "1";
  var obj = { key1: key1, key2: key2, txt: txt };
  var s;
  customPadding(obj, "aa");
  var decryptedObject = CryptoJS.AES.decrypt(txt, obj.key1);
  var decryptedText = decryptedObject.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

app.post("/homepage", (req, res) => {
  console.log(req.body.dowhat);

  if (req.body.dowhat === "encrypt") {
    var encryptedText = finalEncrypt(req.body.plain);
    var title = "a";
    if (encryptedText) {
      title = "Encryted Successfully";
    } else {
      title = "Encryption Failed";
    }
    const message = encryptedText;
    const icon = "success";
    const href = "/homepage";

    res.render("alert.ejs", { title, message, icon, href });
  } else if (req.body.dowhat === "decrypt") {
    var decryptedText = finalDecrypt(req.body.plain);
    var title = "a";
    var icon = "success",
      message = "oops";
    if (decryptedText) {
      title = "Decrypted Successfully";
      icon = "success";
      message = decryptedText;
    } else {
      title = "Decryption Failed";

      icon = "error";
      message = "The Cipher Text is not encrypted by AOES or is incorrect";
    }
    const href = "/homepage";

    res.render("alert.ejs", { title, message, icon, href });
  } else res.send("error");
});

app.get("/fillCardDetails", (req, res) => {
  res.render("cardPage.ejs");
});

app.post("/fillCardDetails", (req, res) => {
  const text =
    "Name: " +
    req.body.name +
    ", Card Number: " +
    req.body.cardnumber +
    ", Expiration: " +
    req.body.expdate +
    ", Security Code: " +
    req.body.seccode;
  const e = finalEncrypt(text);
  const title = "Encryption Successfull";
  const message = e;
  const icon = "success";
  const href = "/homepage";
  res.render("alert.ejs", { title, message, icon, href });
});

// app.post("/", (req, res) => {
//   if (!req.body.plain) res.send("error");
//   else res.send(req.body.plain);
// });

app.listen(3000, () => {
  console.log(
    "Listening on port 3000...... \033]8;;http://localhost:3000/\033\\Go to server 3000\033]8;;\033\\\n"
  );
});
