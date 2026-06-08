const { DataTypes } = require('sequelize');
const {
  database,
  botPrefix,
  botAuthor,
  botUrl,
  botGurl,
  botTimezone,
  botBotname,
  botPackname,
  botMode,
  botSessionName,
  autosocialdownload
} = require('../settings');

const SettingsDB = database.define('settings', {
    prefix: {
        type: DataTypes.STRING,
        defaultValue: botPrefix,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: botAuthor,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: botUrl,
        allowNull: false
    },
    gurl: {
        type: DataTypes.STRING,
        defaultValue: botGurl,
        allowNull: false
    },
    timezone: {
        type: DataTypes.STRING,
        defaultValue: botTimezone,
        allowNull: false
    },
    botname: {
        type: DataTypes.STRING,
        defaultValue: botBotname,
        allowNull: false
    },
    packname: {
        type: DataTypes.STRING,
        defaultValue: botPackname,
        allowNull: false
    },
    mode: {
        type: DataTypes.STRING,
        defaultValue: botMode,
        allowNull: false
    },
    sessionName: {
        type: DataTypes.STRING,
        defaultValue: botSessionName,
        allowNull: false
    },
    autosocialdownload: {
        type: DataTypes.STRING,
        defaultValue: autosocialdownload,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'bot_settings'
});

async function initSettingsDB() {
    try {
        await SettingsDB.sync({ alter: true });
        console.log('Settings table ready');

        const count = await SettingsDB.count();
        if (count === 0) {
            await SettingsDB.create({
                prefix: botPrefix,
                author: botAuthor,
                url: botUrl,
                gurl: botGurl,
                timezone: botTimezone,
                botname: botBotname,
                packname: botPackname,
                mode: botMode,
                sessionName: botSessionName,
                autosocialdownload: autosocialdownload
            });
            console.log('Bot settings initialized');
        }
    } catch (error) {
        console.error('Error initializing Settings table:', error);
        throw error;
    }
}

async function getSettings() {
    try {
        let settings = await SettingsDB.findOne();
        if (!settings) {
            settings = await SettingsDB.create({
                prefix: botPrefix,
                author: botAuthor,
                url: botUrl,
                gurl: botGurl,
                timezone: botTimezone,
                botname: botBotname,
                packname: botPackname,
                mode: botMode,
                sessionName: botSessionName,
                autosocialdownload: autosocialdownload
            });
        }
        return settings;
    } catch (error) {
        console.error('Error getting settings:', error);
        return {
            prefix: botPrefix,
            author: botAuthor,
            url: botUrl,
            gurl: botGurl,
            timezone: botTimezone,
            botname: botBotname,
            packname: botPackname,
            mode: botMode,
            sessionName: botSessionName,
            autosocialdownload: autosocialdownload
        };
    }
}

module.exports = {
    initSettingsDB,
    getSettings,
    SettingsDB
};