import * as Encoding from "encoding-japanese";

export function bufferToString(data: Encoding.RawType) {
  if (typeof data === "string") {
    return data;
  } else {
    return Encoding.codeToString(Encoding.convert(data, "UNICODE", "AUTO"));
  }
}

export const installDescriptLineRe = /^\s*([^,]+)\s*,\s*(.*?)\s*$/;

export const skipLineRe = /^\s*(?:$|\/\/)/;
