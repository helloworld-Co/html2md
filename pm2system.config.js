/* pm2system.config.js
 * pm2 start pm2system.config.js --only hello-html2md
 */
module.exports = {
  apps: [
    {
      name: 'hello-html2md', // 应用名
      cwd: './', // 当前工作路径
      script: 'npm', // 实际启动脚本
      args: 'run start', // 参数
      autorestart: true,
      watch: true, // 监控变化的目录，一旦变化，自动重启
      watch_delay: 10000,
      ignore_watch: ['node_modules', 'static'], // 从监控目录中排除
      watch_options: {
        'followSymlinks': false,
        'usePolling': true
      }
    }
  ]
}
