module.exports = {
  apps: [{
    name: 'ruvubu-app',
    script: 'node_modules/.bin/vite',
    args: 'preview --host --port 8080',
    cwd: '/var/www/html/ruvubu',
    interpreter: 'node',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 80 // Specify the port here
    }
  }]
}