import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: {type: 'console'},
        warnFile: { type: 'file', filename: './logs/warn.log'},
        errorFile: { type: 'file', filename: './logs/error.log'},
        //
        loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info'},
        loggerWarn: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn'},
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error'},
    },
    categories:{
        default: {appenders:['loggerConsole', 'loggerWarn', 'loggerError' ], level: 'all'},
        // fileError: {appenders:['loggerError'], level: 'error' },
        // fileWarning: {appenders:['loggerWarn'], level: 'warn' }
    }

})

export default log4js