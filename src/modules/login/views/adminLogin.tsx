import React, { useState } from "react";
import Master from "../../../framework/master/master";
import MasterPage from "../../../framework/master/@masterPage";
import { Ajax } from "../../../framework/httpclient/ajax";
import { urlBuilder } from "../../..//framework/urlBuilder";
import { PageNameList } from "../../../framework/route.config";

// if (!process!.env!.BROWSER) {
    require('../../../../static/css/login.css')
// }


function Pwd(props: { K: string, value: string, setValue: (key: string, value: string) => void }) {
    const [showPwd, setShowPwd] = useState(false);
    const [pwd, setPwd] = useState(props.value);

    return <div className="input-group">
        <div className="input-group-btn">
            <button className="btn btn-default" type="button">{props.K}</button>
        </div>
        <input type={showPwd ? "text" : "password"} className="form-control" value={pwd}
            onChange={(evt) => {
                setPwd(evt.target.value);
                props.setValue(props.K, evt.target.value);
            }} />
        <div className="input-group-btn">
            <button className="btn btn-default" type="button"
                onClick={() => {
                    setShowPwd(!showPwd);
                }}
            >{showPwd ? "hide" : "Show"}</button>
        </div>
    </div>
}

function Content(props: any) {
    const initPwdList = {
        A: "A",
        B: "B",
        C: "C",
        D: "D"
    }
    const pwdKeyList = ["A", "B", "C", "D"]
    const [pwd, setPwd] = useState(initPwdList);

    const submit = () => {
        pwdKeyList.map(key => {
            if (!pwd[key]) {
                return;
            }
        })
        Ajax("loginapi", pwd).then(resp => {
            if (resp.Result) {

                window.location.href = urlBuilder(PageNameList.AdminAlbum)
            }
        })
    }

    return <div className="container">
        < div className="row" >
            <div className="col-xs-12">
                <div style={{ height: "30px" }}></div>
                {pwdKeyList.map(key => <Pwd key={key} K={key}
                    value={pwd[key]}
                    setValue={(key, value) => {
                        let v = pwd;
                        v[key] = value
                        setPwd({ ...v });
                    }} />)}
                <button type="button" className="btn btn-primary"
                    onClick={() => {
                        submit()
                    }}
                >SUBMIT</button>
            </div>
        </div >
    </div >
}

@MasterPage(Master)
export default class AdminLogin extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Content {...this.props} />
        </div>
    }
}