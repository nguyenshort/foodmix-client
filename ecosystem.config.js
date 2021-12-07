module.exports = {
  apps: [
    {
      name: 'foodmix-client',
      script: './bin/www',
      instances: 0,
      exec_mode: 'cluster',
      watch: true
    }
  ]
}
