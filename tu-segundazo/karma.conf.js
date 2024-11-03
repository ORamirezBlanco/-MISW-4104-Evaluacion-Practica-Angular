// karma.conf.js
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    // Frameworks a utilizar
    frameworks: ["jasmine", "@angular-devkit/build-angular"],

    // Archivos de prueba (todos los archivos `.spec.ts`)
    files: [{ pattern: "./src/**/*.spec.ts", watched: false }],

    // Plugins necesarios para Karma
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],

    // Reporte de cobertura
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/tu-segundazo"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },

    // Configuración de reporte de Karma en el navegador
    client: {
      clearContext: false, // deja visible la salida de Jasmine en la pantalla
    },

    // Reporte de resultados de las pruebas
    reporters: ["progress", "kjhtml"],

    // Configuración del servidor de Karma
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    // Configuración de los navegadores
    browsers: ["ChromeHeadlessCI"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox", // Ejecuta sin sandbox para evitar restricciones en CI
          "--disable-gpu", // Desactiva GPU (optimiza en entornos sin GUI)
          "--enable-features=NetworkService",
          "--disable-translate", // Desactiva traducción automática
          "--disable-extensions", // Desactiva extensiones no necesarias
          "--disable-background-timer-throttling", // Mejor manejo de timers en background
          "--disable-backgrounding-occluded-windows",
          "--remote-debugging-port=9222", // Habilita el puerto de debugging para errores detallados
        ],
      },
    },

    // Modo de ejecución única en CI
    singleRun: true,

    // Niveles de concurrencia para entornos de CI (ajustable)
    concurrency: Infinity,

    // Configuración de tiempo de espera (opcional)
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 60000,
    captureTimeout: 120000, // Extiende tiempo de captura en CI (recomendado para evitar desconexiones)
  });
};
