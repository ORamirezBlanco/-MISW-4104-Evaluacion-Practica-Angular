const puppeteer = require("puppeteer");

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    files: [{ pattern: "./src/**/*.spec.ts", watched: false }],
    preprocessors: {
      "./src/**/*.spec.ts": ["coverage"], // Solo si estás generando cobertura
    },
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-coverage",
      "@angular-devkit/build-angular",
    ],
    reporters: ["progress", "coverage"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true, // Cambia a false si quieres que siga corriendo
    concurrency: Infinity,
    captureTimeout: 120000, // 2 minutos
    browserNoActivityTimeout: 120000, // 2 minutos
    browsers: ["ChromeHeadless"], // Asegúrate de usar ChromeHeadless
    customLaunchers: {
      ChromeHeadless: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--enable-features=NetworkService",
          "--headless", // Asegúrate de que esté en modo headless
        ],
      },
    },
  });
};
