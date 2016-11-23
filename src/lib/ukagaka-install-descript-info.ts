/// <reference types="node" />

/** 伺かのコンテナ情報 */

/** -- */ // doc comment が後にないとtypedocによってmoduleの情報が出力されないので

/** コンテナの種類 */
export type UkagakaContainerType = UkagakaContainerStandaloneType | UkagakaContainerOnlyInstallType;

/** ファイルとして存在するコンテナの種類 */
export type UkagakaContainerStandaloneType = UkagakaContainerParentType | UkagakaContainerChildType;

/** インストール時親コンテナになれるコンテナの種類 */
export type UkagakaContainerParentType = "ghost" | "shell";

/** インストール時子コンテナになれるコンテナの種類 */
export type UkagakaContainerChildType =
  "balloon" | "plugin" | "headline" | "calendar.skin" | "calendar.plugin";

/** インストール時のみ存在するコンテナの種類 */
export type UkagakaContainerOnlyInstallType = "supplement" | "package";

/** インストール時子コンテナになれるコンテナの種類 */
export const UkagakaContainerChildTypes: UkagakaContainerChildType[] =
  ["balloon", "headline", "plugin", "calendar.skin", "calendar.plugin"];

/** 1と0で真偽値を表すパラメーター */
export type NumberBool = 0 | 1;

import {
  UkagakaInstallInfo,
  UkagakaInstallInfoChildTypeSettings,
  UkagakaInstallInfoParser,
} from "./ukagaka-install-info";

import {
  UkagakaDescriptInfo,
  UkagakaDescriptInfoParser,
  UkagakaDescriptInfoType,
} from "./ukagaka-descript-info";

export {
  UkagakaDescriptInfo,
  UkagakaDescriptInfoParser,
  UkagakaDescriptInfoType,
  UkagakaInstallInfo,
  UkagakaInstallInfoChildTypeSettings,
  UkagakaInstallInfoParser,
};
