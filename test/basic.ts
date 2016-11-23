/// <reference types="mocha" />
import * as assert from "power-assert";
import {UkagakaDescriptInfoParser} from "../src/lib/ukagaka-install-descript-info";

const descript = `
charset,UTF-8
type,ghost
name,さっちゃんさん
sakura.name,さっちゃんさん
kero.name,友人A
homeurl,https://example.com/

craftman,Narazaka
craftmanw,奈良阪
craftmanurl,https://narazaka.net/

shiori,shiolink.dll

invalid line
// コメント

`;

describe("UkagakaDescriptInfoParser", () => {
  it("#parse", () => {
    const parser = new UkagakaDescriptInfoParser("ghost").parse(descript);
    assert(parser.result.shiori === "shiolink.dll");
    assert(parser.result["sakura.name"] === "さっちゃんさん");
    assert(parser.result.sakura.name === "さっちゃんさん");
    assert.deepEqual(parser.errorLines, [{lineIndex: 14, line: "invalid line"}]);
  });
});
