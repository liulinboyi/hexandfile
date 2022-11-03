import fs from "fs";
import path from "path";
import { bufferDetect } from "buffer-detect";
import iconv from "iconv-lite";

const __dirname = path.resolve();

function way1(buf) {
  let hex = buf;
  var typedArray = new Uint8Array(
    hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16);
    })
  );

  var result1 = typedArray.buffer;
  fs.writeFileSync(path.resolve(__dirname, "./test1.wav"), Buffer.from(result1), {
    encoding: "binary",
  });
}

function way2(buf) {
  let result = Buffer.from(buf, "hex");
  fs.writeFileSync(path.resolve(__dirname, "./test.txt"), detectAndDecode(result), {
    encoding: "binary",
  });
}

const buf = fs.readFileSync(path.resolve(__dirname, "./hex.txt"), {
  encoding: "utf-8",
});
// const b64 = Buffer.from(result).toString("base64");

function detectAndDecode(buf) {
  const code = new bufferDetect();
  code.detect(buf);
  const decode = iconv.decode(buf, code.encoding);
  return Buffer.from(decode);
}

way2(buf);
