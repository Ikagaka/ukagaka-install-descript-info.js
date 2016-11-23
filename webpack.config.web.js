const config = require("webpack-config-narazaka-ts-js").web;

config.entry["ukagaka-install-descript-info"] = "./src/lib/ukagaka-install-descript-info.ts";
config.output.library = "ukagakaInstallDescriptInfo";

module.exports = config;
