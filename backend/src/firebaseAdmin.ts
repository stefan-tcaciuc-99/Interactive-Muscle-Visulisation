import * as admin from 'firebase-admin';

const serviceAccount = require('../d-muscle-group-visualiza-cbe10-firebase-adminsdk-qpeoh-4e74f8ff04.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin