const puppeteer = require("puppeteer");

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    files: [
      { pattern: "./src/**/*.spec.ts", watched: false },
      // Puedes agregar otros archivos o patrones que desees incluir en la prueba
    ],
    preprocessors: {
      "./src/**/*.spec.ts": ["coverage"], // Generar cobertura solo para los tests
      "./src/**/*.ts": ["coverage"], // Generar cobertura para todos los archivos TypeScript
    },
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-coverage",
      "@angular-devkit/build-angular",
    ],
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage/", // Directorio donde se guardará el informe de cobertura
      reporters: [
        { type: "html", subdir: "html" }, // Informe HTML en la subcarpeta html
        { type: "text-summary" }, // Resumen en texto
        { type: "lcov", subdir: "." }, // Archivo LCOV para integración con herramientas como SonarQube
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true, // Cambia a false si quieres que siga corriendo
    concurrency: Infinity,
    captureTimeout: 120000, // 2 minutos
    browserNoActivityTimeout: 120000, // 2 minutos
    browsers: ["ChromeHeadless"], // Usar ChromeHeadless
    customLaunchers: {
      ChromeHeadless: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--enable-features=NetworkService",
          "--headless", // Asegúrate de que esté en modo headless
          "--disable-dev-shm-usage", // Para evitar problemas en entornos limitados
        ],
      },
    },
    captureConsole: true, // Capturar la salida de la consola para depuración
    browserConsoleLogOptions: {
      level: "log", // Ajustar el nivel de log de la consola
      format: "%b %T: %m", // Formato del log
      terminal: true, // Mostrar en la consola de Karma
    },
  });
};
