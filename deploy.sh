rm -rf dist
npm run build
scp -r dist/ root@47.104.182.127:/root/source/shirong-financial-admin-host/
