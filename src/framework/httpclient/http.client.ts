import { Injectable } from "@nestjs/common";

import request from "request";
import { RestfulService, ServiceHost } from "../../conf/restful.service";


@Injectable()
export class HttpClient {
    constructor() {
    }

    public async get(url: string) {
        try {
            let a = await this.createClient(url)
            return a;
        } catch (ex) {
            return "a"
        }
    }



    public async createClient<T>(api: string, req: any = undefined): Promise<T> {
        let restful = RestfulService[api]
        if (!restful) {
            throw Error("error api:" + api)
        }
        let host = ServiceHost[restful.Service]
        if (!host) {
            throw Error("error service:" + restful.Service)
        }
        let uri: string
        if (!host.endsWith("/") && !restful.URL.endsWith("/")) {
            uri = host + "/" + restful.URL;
        } else {
            uri = host + restful.URL
        }
        let str = ""
        if (typeof (req) === "string") {
            str = req
        } else {
            str = JSON.stringify(req)
        }
        return new Promise((resolve, reject) => {
            try {
                request(uri,
                    {
                        method: "GET",
                        timeout: 5000,
                        headers: {
                            "content-type": "application/json"
                        },
                        body: str
                    }, (err, response, body) => {
                        if (!!err) {
                            reject(err)
                        } else {
                            try {
                                let resp = JSON.parse((body as string))
                                resolve(resp);
                            } catch (e) {
                                resolve(body)
                            }
                        }
                    })
            } catch (ex) {
                reject({ Result: false, ErrorMessage: "sevice error" })
            }
        })

    }


}