let payload = {
  "block": {
    "data": [
      ["d26b9b5c4329da62271039e30784a26a", -18],
      ["212079f594a489b2dad0f13c13867246", -59],
      ["8e47c8f755a134bc21e8ded74ec58d71", 65],
      ["f3d73e853d23719b61ac1c17b22f82a2", -69]
    ],
    "nonce": null
  },
  "difficulty": 14
};
const crypto = require('crypto');
console.log(payload)
let n = 89174867;
let difficultyBits = '0'.repeat(payload.difficulty);

while(true){
  payload.block.nonce = n;
  let hashInHex = crypto.createHash('sha256').update(JSON.stringify(payload.block)).digest('hex');
  let binaryHash = parseInt(hashInHex, 16).toString('2');
  let computedDiffBits = binaryHash.slice(0, payload.difficulty);
  console.log(computedDiffBits,":",n);
  if(computedDiffBits === difficultyBits){
    console.log("Nonce:",n);
    break;
  }
  n++;
}
