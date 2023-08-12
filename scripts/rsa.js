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

function encoder(message) {
  let form = [];
  for (let letter of message) {
    form.push(encrypt(letter.charCodeAt(0)));
  }
  return form;
}

function decoder(encoded) {
  let s = "";
  for (let num of encoded) {
    s += String.fromCharCode(decrypt(num));
  }
  return s;
}

primefiller();
setkeys();
let message = "Text Message";
// console.log("enter the message");
// message = readline();
let coded = encoder(message);
console.log("\nInitial message:\n" + message);

console.log("\nThe encoded message(encrypted by public key)\n" + coded);

console.log("\ndecoded\n" + decoder(coded));
