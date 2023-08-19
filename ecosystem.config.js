const HomeEnv = require("./src/config/envirenment/home.js");
const OfficeEnv = require("./src/config/envirenment/office.js");

module.exports = {
  apps: [
    // main API settings
    {
      script: "./src/index.js",
      args: "--trace-warnings",
      name: "server",
      instances: "1",
      exec_mode: "cluster",
      watching: ".",
      ignore_watch: ["node_modules", ".git/*", ".idea/*"],
      env_Home: { ...HomeEnv },
      env_Office: { ...OfficeEnv },
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};