const path = require("path");
const tsconfig = require("./tsconfig.json");

tsconfig.compilerOptions.outDir = "web"; // for d.ts
tsconfig.compilerOptions.target = "es5";

module.exports = {
  entry: {"ukagaka-install-descript-info": "./lib/ukagaka-install-descript-info.ts"},
  output: {
    library: "ukagakaInstallDescriptInfo",
    libraryTarget: "umd",
    path: path.resolve("."),
    filename: "web/lib/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {compilerOptions: tsconfig.compilerOptions},
      },
    ],
  },
  resolve: {
    extensions: [
      ".ts",
      ".js",
    ],
  },
  devtool: "source-map",
};
