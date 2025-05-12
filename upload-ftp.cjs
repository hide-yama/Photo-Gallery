require('dotenv').config();
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadDir(client, localDir, remoteDir) {
    const files = fs.readdirSync(localDir);
    for (const file of files) {
        const localPath = path.join(localDir, file);
        const remotePath = remoteDir + '/' + file;
        if (fs.lstatSync(localPath).isDirectory()) {
            await client.ensureDir(remotePath);
            await uploadDir(client, localPath, remotePath);
            await client.cdup();
        } else {
            await client.uploadFrom(localPath, remotePath);
            console.log(`アップロード: ${localPath} → ${remotePath}`);
        }
    }
}

async function main() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            port: process.env.FTP_PORT ? Number(process.env.FTP_PORT) : 21,
            secure: false
        });
        await client.ensureDir(process.env.FTP_REMOTE_DIR);
        await uploadDir(client, 'dist', process.env.FTP_REMOTE_DIR);
        console.log('アップロード完了');
    } catch (err) {
        console.error('エラー:', err);
    }
    client.close();
}

main(); 