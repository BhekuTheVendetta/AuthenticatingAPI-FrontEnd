const express = require('express');
const os = require('os');
const getmac = require('getmac').default;
const app = express();

app.get('/networkInfo', async (req, res) => {
 const clientIpAddress = req.headers['x-forwarded-for'] || req.ip; // Retrieve the client's public IP address
 const serverMacAddress = await getmac(); // Retrieve the server's MAC address
 const serverComputerName = os.hostname(); 

 const networkInfoResponse = {
    macAddress: serverMacAddress,
    ipAddress: clientIpAddress,
    computerName: serverComputerName
 };

 res.json(networkInfoResponse);
});

app.listen(3001, () => {
 console.log('Server is running on port 3001');
});
