import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const buffer = fs.readFileSync(path.resolve(__dirname, "./soundtest.wav"));

const hex = buffer.toString("hex");
fs.writeFileSync(path.resolve(__dirname, "./hex.txt"), hex);
