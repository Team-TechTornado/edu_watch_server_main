const path = require("path");

module.exports = {
  entry: "./src/index.ts", // 프로젝트의 진입점
  target: "node", // Node.js 환경에서 실행되므로 'node'를 명시
  mode: "development", // 또는 'production'
  devtool: "source-map", // 소스 맵 생성

  output: {
    filename: "index.js", // 번들된 결과물 파일명
    path: path.resolve(__dirname, "build"), // 번들된 파일의 저장 경로
  },

  resolve: {
    extensions: [".ts", ".js", ".json"], // 타입스크립트 및 자바스크립트 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 타입스크립트 파일에 대한 규칙
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
