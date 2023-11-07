const fs = require('fs');
const path = require('path');

const accountsPath = path.join(__dirname, '..', 'accounts.json');

// Function to read accounts data
const readAccountsData = () => {
    const rawData = fs.readFileSync(accountsPath, 'utf-8');
    return JSON.parse(rawData);
};

// Function to write to accounts data
const writeAccountsData = (data) => {
    const stringifiedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(accountsPath, stringifiedData);
};

module.exports = {
    readAccountsData,
    writeAccountsData
};


// Get specific account details
const getAccountDetails = (accountId) => {
    const data = readAccountsData();
    return data[accountId] || null;
};

// Update account balance
const updateAccountBalance = (accountId, amount) => {
    const data = readAccountsData();
    if (data[accountId]) {
        data[accountId].accountBalance += amount;
        writeAccountsData(data);
    }
};

// Create a new account
const createNewAccount = (accountType) => {
    const data = readAccountsData();
    const newAccountId = (parseInt(data.lastID) + 1).toString().padStart(7, '0');
    data[newAccountId] = {
        accountType,
        accountBalance: 0
    };
    data.lastID = newAccountId;
    writeAccountsData(data);
    return newAccountId;
};

module.exports = {
    readAccountsData,
    writeAccountsData,
    getAccountDetails,
    updateAccountBalance,
    createNewAccount
};
