const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const serverConfig = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/server/server.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.server.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  plugins: [new Dotenv()],
};

const clientConfig = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/client/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.client.json",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public/js"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./public/index.html", to: "../" }],
    }),
    new Dotenv(),
  ],
};

module.exports = [serverConfig, clientConfig];
