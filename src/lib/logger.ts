import chalk from "chalk"

const prefix=chalk.gray(`[${new Date().toLocaleDateString()}]`)


const logger={
    info:(message:string)=>{
        console.log(`${prefix}---${chalk.blueBright('[INFO]')}---${message}`)
    },
    success:(message:string)=>{
        console.log(`${prefix}-----${chalk.green('[SUCCESS]')}---${message}`)
    },
    warn:(message:string)=>{
        console.warn(`${prefix}----${chalk.yellow('[WARN]')}---${message}`)
    },
    error:(message:string)=>{
        console.error(`${prefix}----${chalk.red('[Error]')}----${message}`)
    },
    debug:(message:string)=>{
        console.debug(`${prefix}-----${chalk.magenta('[DEBUG]')}----${message}`)
    }

}
export default logger