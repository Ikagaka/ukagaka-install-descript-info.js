/** "descript.txt" */

/** -- */ // doc comment が後にないとtypedocによってmoduleの情報が出力されないので

import * as Encoding from "encoding-japanese";

import {
  NumberBool,
  UkagakaContainerChildType,
  UkagakaContainerType,
} from "./ukagaka-install-descript-info";

import {
  bufferToString,
  installDescriptLineRe,
  skipLineRe,
} from "./util";

export type UkagakaInstallInfoChildTypeSettings = {
  directory?: string,
  source: {
    directory?: string,
  },
  refresh: NumberBool,
  refreshundeletemask: string[],
};

/** "install.txt" パーサー */
export class UkagakaInstallInfoParser {
  /** パース結果 */
  result: UkagakaInstallInfo;
  /** エラーのあった行 */
  errorLines: Array<{lineIndex: number, line: string}>;
  /**
   * パース
   * @param data install.txtの内容
   */
  parse(data: Encoding.RawType) {
    const dataString = bufferToString(data);
    const lines = dataString.split(/\r\n|\n|\r/);
    const info = new UkagakaInstallInfo();
    const errorLines = [];
    for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
      const line = lines[lineIndex];
      const match = line.match(installDescriptLineRe);
      if (match) {
        const key = match[1];
        const value = match[2];
        switch (key) {
          case "refreshundeletemask":
          case "balloon.refreshundeletemask":
          case "headline.refreshundeletemask":
          case "plugin.refreshundeletemask":
            info[key] = value.split(/:/);
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
    this.result = info;
    return this;
  }
}

/** "install.txt" の内容 */
export class UkagakaInstallInfo {
  static parse(data: string | Buffer) {
    return new UkagakaInstallInfoParser().parse(data).result;
  }

  [property: string]: any;
  charset?: string;
  name: string;
  type: UkagakaContainerType;
  accept?: string;
  directory: string;
  refresh: NumberBool = 0;
  refreshundeletemask: string[] = [];
  balloon: UkagakaInstallInfoChildTypeSettings = {
    refresh: 0,
    refreshundeletemask: [],
    source: {},
  };
  get ["balloon.directory"]() { return this.balloon.directory; }
  set ["balloon.directory"](value: string | undefined) { this.balloon.directory = value; }
  get ["balloon.refresh"]() { return this.balloon.refresh; }
  set ["balloon.refresh"](value: NumberBool) { this.balloon.refresh = value; }
  get ["balloon.refreshundeletemask"]() { return this.balloon.refreshundeletemask; }
  set ["balloon.refreshundeletemask"](value: string[]) { this.balloon.refreshundeletemask = value; }
  get ["balloon.source.directory"]() { return this.balloon.source.directory; }
  set ["balloon.source.directory"](value: string | undefined) { this.balloon.source.directory = value; }
  headline: UkagakaInstallInfoChildTypeSettings = {
    refresh: 0,
    refreshundeletemask: [],
    source: {},
  };
  get ["headline.directory"]() { return this.headline.directory; }
  set ["headline.directory"](value: string | undefined) { this.headline.directory = value; }
  get ["headline.refresh"]() { return this.headline.refresh; }
  set ["headline.refresh"](value: NumberBool) { this.headline.refresh = value; }
  get ["headline.refreshundeletemask"]() { return this.headline.refreshundeletemask; }
  set ["headline.refreshundeletemask"](value: string[]) { this.headline.refreshundeletemask = value; }
  get ["headline.source.directory"]() { return this.headline.source.directory; }
  set ["headline.source.directory"](value: string | undefined) { this.headline.source.directory = value; }
  plugin: UkagakaInstallInfoChildTypeSettings = {
    refresh: 0,
    refreshundeletemask: [],
    source: {},
  };
  get ["plugin.directory"]() { return this.plugin.directory; }
  set ["plugin.directory"](value: string | undefined) { this.plugin.directory = value; }
  get ["plugin.refresh"]() { return this.plugin.refresh; }
  set ["plugin.refresh"](value: NumberBool) { this.plugin.refresh = value; }
  get ["plugin.refreshundeletemask"]() { return this.plugin.refreshundeletemask; }
  set ["plugin.refreshundeletemask"](value: string[]) { this.plugin.refreshundeletemask = value; }
  get ["plugin.source.directory"]() { return this.plugin.source.directory; }
  set ["plugin.source.directory"](value: string | undefined) { this.plugin.source.directory = value; }
  calendar: {
    skin: UkagakaInstallInfoChildTypeSettings;
    plugin: UkagakaInstallInfoChildTypeSettings;
  } = {
    skin: {
      refresh: 0,
      refreshundeletemask: [],
      source: {},
    },
    plugin: {
      refresh: 0,
      refreshundeletemask: [],
      source: {},
    },
  };
  get ["calendar.skin.directory"]() { return this.calendar.skin.directory; }
  set ["calendar.skin.directory"](value: string | undefined) { this.calendar.skin.directory = value; }
  get ["calendar.skin.refresh"]() { return this.calendar.skin.refresh; }
  set ["calendar.skin.refresh"](value: NumberBool) { this.calendar.skin.refresh = value; }
  get ["calendar.skin.refreshundeletemask"]() { return this.calendar.skin.refreshundeletemask; }
  set ["calendar.skin.refreshundeletemask"](value: string[]) { this.calendar.skin.refreshundeletemask = value; }
  get ["calendar.skin.source.directory"]() { return this.calendar.skin.source.directory; }
  set ["calendar.skin.source.directory"](value: string | undefined) { this.calendar.skin.source.directory = value; }
  get ["calendar.plugin.directory"]() { return this.calendar.plugin.directory; }
  set ["calendar.plugin.directory"](value: string | undefined) { this.calendar.plugin.directory = value; }
  get ["calendar.plugin.refresh"]() { return this.calendar.plugin.refresh; }
  set ["calendar.plugin.refresh"](value: NumberBool) { this.calendar.plugin.refresh = value; }
  get ["calendar.plugin.refreshundeletemask"]() { return this.calendar.plugin.refreshundeletemask; }
  set ["calendar.plugin.refreshundeletemask"](value: string[]) { this.calendar.plugin.refreshundeletemask = value; }
  get ["calendar.plugin.source.directory"]() { return this.calendar.plugin.source.directory; }
  set ["calendar.plugin.source.directory"](value: string | undefined) { this.calendar.plugin.source.directory = value; }
  child(type: UkagakaContainerChildType) {
    switch (type) {
      case "balloon": return this.balloon;
      case "headline": return this.headline;
      case "plugin": return this.plugin;
      case "calendar.skin": return this.calendar.skin;
      case "calendar.plugin": return this.calendar.plugin;
      default: throw new Error("unknown type");
    }
  }
}
