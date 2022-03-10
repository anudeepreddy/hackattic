import crypto from "crypto";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import fs from "fs";

let payload = {
  block: {
    data: [
      ["55f76f1deb50a49b35ab5c1d9463eb89", -39],
      ["8307669500017536a80363dfcf9581ce", 84],
      ["8e9bf78716171f24fbc1612343701124", 68],
      ["a98a9ddb383fa68c1385b19d50b01aef", -25],
      ["e7190e18bc7824c0fea1f513187fff6e", -41],
    ],
    nonce: null
  },
  difficulty: 13
};

let difficultyBits = "0".repeat(payload.difficulty);
let cpuCount = cpus().length;

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 1; i <= cpuCount; i++) {
    console.log("called");
    let newWorker = cluster.fork({ startIndex: i });
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  let n = parseInt(process.env.startIndex);
  // console.log();
  while (true) {
    payload.block.nonce = n;
    let hashInHex = crypto
      .createHash("sha256")
      .update(JSON.stringify(payload.block))
      .digest("hex");
    let binaryHash = parseInt(hashInHex, 16).toString("2");
    let computedDiffBits = binaryHash.slice(0, payload.difficulty);
    console.log(
      computedDiffBits,
      ":",
      n,
      ":",
      binaryHash.length,
      ":",
      256 - binaryHash.length
    );
    if (
      computedDiffBits === difficultyBits ||
      256 - binaryHash.length >= payload.difficulty
    ) {
      console.log("Nonce:", n);
      fs.writeFileSync(
        `nonce${n}.txt`,
        `nonce:${n}\nbhash:${binaryHash}\nhhash:${hashInHex}`
      );
      break;
    }
    n = n + cpuCount;
  }
}
