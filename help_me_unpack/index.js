let data = "54knhQbwr+PCUwAAHvgOROjn8bSCCFRAQFQIgrTx5+g=";

let buff = Buffer.from(data, "base64");
// console.log(buffToBin(buff.slice(0,4)))
console.log(buff);
// console.log(buff.slice(0,4));
// console.log(buff.slice(4,8));
// console.log(buff.slice(0,8))
let sol = {
  int: buff.slice(0,4).readInt32LE(0),
  uint: buff.slice(4,8).readUInt32LE(0),
  short: buff.slice(8, 12).readInt32LE(0),
  float: buff.slice(12, 16).readFloatLE(0),
  double: buff.slice(16, 24).readDoubleLE(0),
  big_endian_double: buff.slice(24, 32).readDoubleBE(0),
};
console.log(JSON.stringify(sol, 4));
