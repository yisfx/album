
let ass=require("../conf/assets.conf")


export function LayoutRender(page:string){
    return (target,temple,describe)=>{
        
        console.log("LayoutRender")
        Reflect.defineMetadata(
            "__route__",
            page,
            describe.value
        );
        return describe
    }
}