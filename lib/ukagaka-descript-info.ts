/** "descript.txt" */

/** -- */ // doc comment が後にないとtypedocによってmoduleの情報が出力されないので

import * as Encoding from "encoding-japanese";

import {
  NumberBool,
  UkagakaContainerType,
} from "./ukagaka-install-descript-info";

import {
  bufferToString,
  installDescriptLineRe,
  skipLineRe,
} from "./util";

export interface UkagakaDescriptInfoType {
  ghost: UkagakaDescriptInfo.Ghost;
  balloon: UkagakaDescriptInfo.Balloon;
  shell: UkagakaDescriptInfo.Shell;
  plugin: UkagakaDescriptInfo.Plugin;
  headline: UkagakaDescriptInfo.Headline;
  ["calendar.skin"]: UkagakaDescriptInfo.CalendarSkin;
  ["calendar.plugin"]: UkagakaDescriptInfo.CalendarPlugin;
  base: UkagakaDescriptInfo;
}

/** "descript.txt" パーサー */
export class UkagakaDescriptInfoParser<T extends keyof UkagakaDescriptInfoType> {
  /** パース結果 */
  result: UkagakaDescriptInfoType[T];
  /** エラーのあった行 */
  errorLines: Array<{lineIndex: number, line: string}>;
  /** descript.txtの種類 */
  type: keyof UkagakaDescriptInfoType;
  /**
   * @param type descript.txtの種類
   */
  constructor(type: T) {
    this.type = type;
  }
  /**
   * パース
   * @param data descript.txtの内容
   */
  parse(data: Encoding.RawType) {
    const dataString = bufferToString(data);
    const lines = dataString.split(/\r\n|\n|\r/);
    let info;
    switch (this.type) {
      case "ghost": info = new UkagakaDescriptInfo.Ghost(); break;
      case "shell": info = new UkagakaDescriptInfo.Shell(); break;
      case "balloon": info = new UkagakaDescriptInfo.Balloon(); break;
      case "plugin": info = new UkagakaDescriptInfo.Plugin(); break;
      case "headline": info = new UkagakaDescriptInfo.Headline(); break;
      case "calendar.skin": info = new UkagakaDescriptInfo.CalendarSkin(); break;
      case "calendar.plugin": info = new UkagakaDescriptInfo.CalendarPlugin(); break;
      case "base": info = new UkagakaDescriptInfo(); break;
      case undefined: info = new UkagakaDescriptInfo(); break; // for JS
      default: throw new Error("unknown type");
    }
    const errorLines = [];
    for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
      const line = lines[lineIndex];
      const match = line.match(installDescriptLineRe);
      if (match) {
        const key = match[1];
        const value = match[2];
        switch (key) {
          case "install.accept":
            info[key] = value.split(/,/);
            break;
          case "balloon.dontmove":
            info[key] = value === "true";
            break;
          default:
            info[key] = value;
            break;
        }
      } else {
        if (!skipLineRe.test(line)) {
          errorLines.push({lineIndex, line});
        }
      }
    }
    this.errorLines = errorLines;
    this.result = info as any;
    return this;
  }
}

/** "descript.txt" の内容 */
export class UkagakaDescriptInfo {
  static parse(data: string | Buffer, type: "ghost"): UkagakaDescriptInfo.Ghost;
  static parse(data: string | Buffer, type: "balloon"): UkagakaDescriptInfo.Balloon;
  static parse(data: string | Buffer, type: "shell"): UkagakaDescriptInfo.Shell;
  static parse(data: string | Buffer, type: "plugin"): UkagakaDescriptInfo.Plugin;
  static parse(data: string | Buffer, type: "headline"): UkagakaDescriptInfo.Headline;
  static parse(data: string | Buffer, type: "calendar.skin"): UkagakaDescriptInfo.CalendarSkin;
  static parse(data: string | Buffer, type: "calendar.plugin"): UkagakaDescriptInfo.CalendarPlugin;
  static parse(data: string | Buffer, type?: "base"): UkagakaDescriptInfo;
  static parse(data: string | Buffer, type?: keyof UkagakaDescriptInfoType) {
    return new UkagakaDescriptInfoParser(type || "base").parse(data).result;
  }

  [property: string]: any;
  charset?: string;
  name: string;
  homeurl?: string;
  readme: string = "readme.txt";
}

export namespace UkagakaDescriptInfo {
  /** ベースクラス */
  export class Common extends UkagakaDescriptInfo {
    id: string;
    type: UkagakaContainerType;
    craftman?: string;
    craftmanw?: string;
    craftmanurl?: string;
  }

  export class Ghost extends Common {
    title?: string;
    sakura: GhostCharacterSakura = {
      name: "",
      seriko: {
        defaultsurface: 0,
      },
    };
    get ["sakura.name"]() { return this.sakura.name; }
    set ["sakura.name"](value: string) { this.sakura.name = value; }
    get ["sakura.name2"]() { return this.sakura.name2; }
    set ["sakura.name2"](value: string | undefined) { this.sakura.name2 = value; }
    get ["sakura.seriko.defaultsurface"]() { return this.sakura.seriko.defaultsurface; }
    set ["sakura.seriko.defaultsurface"](value: number | undefined) { this.sakura.seriko.defaultsurface = value; }
    get ["sakura.defaultx"]() { return this.sakura.defaultx; }
    set ["sakura.defaultx"](value: number | undefined) { this.sakura.defaultx = value; }
    get ["sakura.defaulty"]() { return this.sakura.defaulty; }
    set ["sakura.defaulty"](value: number | undefined) { this.sakura.defaulty = value; }
    get ["sakura.defaultleft"]() { return this.sakura.defaultleft; }
    set ["sakura.defaultleft"](value: number | undefined) { this.sakura.defaultleft = value; }
    get ["sakura.defaulttop"]() { return this.sakura.defaulttop; }
    set ["sakura.defaulttop"](value: number | undefined) { this.sakura.defaulttop = value; }
    kero: GhostCharacter = {
      seriko: {
        defaultsurface: 10,
      },
    };
    get ["kero.name"]() { return this.kero.name; }
    set ["kero.name"](value: string | undefined) { this.kero.name = value; }
    get ["kero.seriko.defaultsurface"]() { return this.kero.seriko.defaultsurface; }
    set ["kero.seriko.defaultsurface"](value: number | undefined) { this.kero.seriko.defaultsurface = value; }
    get ["kero.defaultx"]() { return this.kero.defaultx; }
    set ["kero.defaultx"](value: number | undefined) { this.kero.defaultx = value; }
    get ["kero.defaulty"]() { return this.kero.defaulty; }
    set ["kero.defaulty"](value: number | undefined) { this.kero.defaulty = value; }
    get ["kero.defaultleft"]() { return this.kero.defaultleft; }
    set ["kero.defaultleft"](value: number | undefined) { this.kero.defaultleft = value; }
    get ["kero.defaulttop"]() { return this.kero.defaulttop; }
    set ["kero.defaulttop"](value: number | undefined) { this.kero.defaulttop = value; }
    seriko: GhostSerikoSetting = {
      alignmenttodesktop: "bottom",
    };
    get ["seriko.alignmenttodesktop"]() { return this.seriko.alignmenttodesktop; }
    set ["seriko.alignmenttodesktop"](value: SerikoSurfacePosition | undefined) {
      this.seriko.alignmenttodesktop = value;
    }
    sstp: {
      allowunspecifiedsend: NumberBool;
      allowcommunicate: NumberBool;
      alwaystranslate: NumberBool;
    } = {
      allowunspecifiedsend: 1,
      allowcommunicate: 1,
      alwaystranslate: 0,
    };
    get ["sstp.allowunspecifiedsend"]() { return this.sstp.allowunspecifiedsend; }
    set ["sstp.allowunspecifiedsend"](value: NumberBool) { this.sstp.allowunspecifiedsend = value; }
    get ["sstp.allowcommunicate"]() { return this.sstp.allowcommunicate; }
    set ["sstp.allowcommunicate"](value: NumberBool) { this.sstp.allowcommunicate = value; }
    get ["sstp.alwaystranslate"]() { return this.sstp.alwaystranslate; }
    set ["sstp.alwaystranslate"](value: NumberBool) { this.sstp.alwaystranslate = value; }
    _name: {
      allowoverride: NumberBool,
    } = {allowoverride: 1};
    get ["name.allowoverride"]() { return this._name.allowoverride; }
    set ["name.allowoverride"](value: NumberBool) { this._name.allowoverride = value; }
    shiori: string = "shiori.dll";
    _shiori: {
      version?: string;
      cache: NumberBool;
      encoding?: string;
      logo: {
        file?: string;
        x: number;
        y: number;
        align: ShioriLogoAlign;
      }
    } = {
      cache: 1,
      logo: {
        x: 0,
        y: 0,
        align: "lefttop",
      },
    };
    get ["shiori.version"]() { return this._shiori.version; }
    set ["shiori.version"](value: string | undefined) { this._shiori.version = value; }
    get ["shiori.cache"]() { return this._shiori.cache; }
    set ["shiori.cache"](value: NumberBool) { this._shiori.cache = value; }
    get ["shiori.encoding"]() { return this._shiori.encoding; }
    set ["shiori.encoding"](value: string | undefined) { this._shiori.encoding = value; }
    get ["shiori.logo.file"]() { return this._shiori.logo.file; }
    set ["shiori.logo.file"](value: string | undefined) { this._shiori.logo.file = value; }
    get ["shiori.logo.x"]() { return this._shiori.logo.x; }
    set ["shiori.logo.x"](value: number) { this._shiori.logo.x = value; }
    get ["shiori.logo.y"]() { return this._shiori.logo.y; }
    set ["shiori.logo.y"](value: number) { this._shiori.logo.y = value; }
    get ["shiori.logo.align"]() { return this._shiori.logo.align; }
    set ["shiori.logo.align"](value: ShioriLogoAlign) { this._shiori.logo.align = value; }
    ["don't need onmousemove"]: NumberBool = 0;
    ["don't need bind"]: NumberBool = 0;
    ["don't need seriko talk"]: NumberBool = 0;
    balloon?: string;
    _balloon: {
      dontmove: boolean;
    } = {dontmove: false};
    get ["balloon.dontmove"]() { return this._balloon.dontmove; }
    set ["balloon.dontmove"](value: boolean) { this._balloon.dontmove = value; }
    default: {
      balloon: {
        path?: string;
      };
    } = {balloon: {}};
    get ["default.balloon.path"]() { return this.default.balloon.path; }
    set ["default.balloon.path"](value: string | undefined) { this.default.balloon.path = value; }
    icon?: string;
    _icon: {
      minimize?: string;
    } = {};
    get ["icon.minimize"]() { return this._icon.minimize; }
    set ["icon.minimize"](value: string | undefined) { this._icon.minimize = value; }
    cursor: Cursor = "pointer";
    install: {
      accept: string[];
    } = {accept: []};
    get ["install.accept"]() { return this.install.accept; }
    set ["install.accept"](value: string[]) { this.install.accept = value; }
  }

  export class GhostCharacter {
    name?: string;
    seriko: GhostCharacterSerikoSetting;
    defaultx?: number;
    defaulty?: number;
    defaultleft?: number;
    defaulttop?: number;
  }

  export class GhostCharacterSakura extends GhostCharacter {
    name: string;
    name2?: string;
  }

  export class GhostSerikoSetting {
    alignmenttodesktop?: SerikoSurfacePosition;
  }
  export class GhostCharacterSerikoSetting extends GhostSerikoSetting {
    defaultsurface?: number;
  }

  export type SerikoSurfacePosition = "top" | "bottom" | "free";

  export type ShioriLogoAlign = "lefttop" | "leftbottom" | "righttop" | "rightbottom";

  export type Cursor = "pointer";

  export class Shell extends Common {
  }

  export class Balloon extends Common {
  }

  export class Plugin extends Common {
    filename: string;
    secondchangeinterval: number = 1;
  }

  export class Headline extends UkagakaDescriptInfo {
    dllname: string;
    url: string;
    openurl: string;
    alwaysdisplay: NumberBool = 0;
  }

  export class CalendarSkin extends UkagakaDescriptInfo {
  }

  export class CalendarPlugin extends UkagakaDescriptInfo {
    dllname: string;
  }
}
