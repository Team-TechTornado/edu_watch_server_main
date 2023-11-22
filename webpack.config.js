const path = require('path');

module.exports = {
  entry: './src/index.ts', // 프로젝트의 진입점
  target: 'node', // Node.js 환경에서 실행되므로 'node'를 명시
  mode: 'development', // 또는 'production'
  devtool: 'source-map', // 소스 맵 생성

  output: {
    filename: 'bundle.js', // 번들된 결과물 파일명
    path: path.resolve(__dirname, 'build'), // 번들된 파일의 저장 경로
  },

  resolve: {
    extensions: ['.ts', '...'], // 타입스크립트 및 자바스크립트 파일 확장자
  },

  module: {
    rules: [
      {
        test: /\.ts$/, // 타입스크립트 파일에 대한 규칙
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  // Babel 설정 (옵션)
  // 만약 Babel을 사용하지 않는다면, 이 부분은 삭제해도 됩니다.
  // Babel은 TypeScript 코드를 JavaScript로 변환하기 위해 사용됩니다.
  module: {
    rules: [
      {
        test: /\.ts$/, // 타입스크립트 파일에 대한 규칙
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
