import path from "path";
import { RouteConfig } from "./src/framework/route.config"
// require("ts-loader")
import { ProgressPlugin} from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WriteAssets, clean } from "./tools/writeAssets";

const config = {
    entry: () => {
        let dic={}
        for(let route in RouteConfig){
            let r=RouteConfig[route]
            dic[r.name]=path.join(__dirname, "src","modules", r.page);
        }
        console.log("webpack entry:", dic);
        return dic;
    }
    ,
    output: {
        filename: '[name]-[hash].js',
        path: path.join(__dirname, "dist/public")
    },
    module: {
        rules: [
            { test: /\/ts$/, use: "ts-loader" },
            { test: /\.tsx$/, use: "ts-loader" }
        ]
    },
    plugins:[
        new ProgressPlugin(function handler(percentage:number,msg:string){
            if(percentage==0){
                clean(path.join(__dirname, "dist/public"))
                console.log("webpack start");
            }
            if(percentage==1){
                WriteAssets();
                console.log("webpack end",__dirname);
            }
        }),
        new CleanWebpackPlugin()
    ],
    mode: "development",
    target: "web",
    resolve:{
        extensions:['.ts','.tsx','.config','.js','.json','.css']
    },
    watch: true,
    watchOptions: {
      poll: 1000, // 每秒询问多少次
      aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
      ignored: /node_modules/ //忽略时时监听
    }
};

module.exports = config;

export default config