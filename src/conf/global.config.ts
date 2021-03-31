import { GlobalSetting } from "../model/SystemConfig"
import { SysConfig } from "./site.config";
import crypto from "crypto";


function getGlobalConfig(): Partial<GlobalSetting> {
    if (process.env.BROWSER)
        return null
    let globalSetting = global["globalSetting"]

    if (!globalSetting?.SHAIV || !globalSetting?.SHAKEYOrg) {
        console.log("init global setting")
        let setting: GlobalSetting = require(SysConfig.GlobalConfigPath);


        let password: { [key: string]: string } = {}
        Object.keys(setting).map(key => {

        })

        globalSetting = {
            AdminPwd: setting?.AdminPwd,
            AlbumPath: setting?.AlbumPath,
            SHAIVOrg: "",
            SHAKEYOrg: "",
            SHAKey: setting.SHAKey,
            SHAIV: setting.SHAIV,
        }
        global["globalSetting"] = globalSetting
    }

    return {
        AlbumPath: globalSetting?.AlbumPath,
        SHAKey: globalSetting?.SHAKey,
        SHAIV: globalSetting?.SHAIV,
        AdminPwd: globalSetting?.AdminPwd,
    }
}

const GlobalConfig = getGlobalConfig()


export { GlobalConfig }