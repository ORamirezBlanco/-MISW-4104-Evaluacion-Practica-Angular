// karma.conf.js

module.exports = function (config) {
  config.set({
    // Frameworks a utilizar
    frameworks: ["jasmine", "@angular-devkit/build-angular"],

    // Patrones de archivos a observar, incluyendo todos los archivos `.spec.ts` en la aplicación
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
    port: 9876, // puerto del servidor
    colors: true, // colores en la salida de la consola
    logLevel: config.LOG_INFO,

    // Configuración del navegador para ejecutar en modo headless
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },

    // Modo para detener el proceso cuando las pruebas terminan
    singleRun: true,

    // Concurrency Level
    concurrency: Infinity,

    // Configuración de tiempo de espera (opcional)
    browserDisconnectTimeout: 10000, // Tiempo de espera para desconexión
    browserNoActivityTimeout: 60000, // Tiempo de espera sin actividad
  });
};
