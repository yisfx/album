

import React, { useContext, useReducer, useState } from "react";
import { AlbumContext, AlbumReducer, AlbumState, dispatchMiddleWare } from "../store/album.store";
import AdminMaster from "../../../framework/Master/adminMaster";
import MasterPage from "../../../framework/Master/@masterPage";
import { FxModal } from "../../../framework/components/modal";
import { BaseResponse } from "../../../model/response/baseResponse";
import { Ajax } from "../../../framework/httpclient/ajax";


function Top() {
    const { state, dispatcher } = useContext(AlbumContext)
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("")
    const [description, setDescription] = useState("")

    const clearData = () => {
        setName("")
        setDateTime("")
        setDescription("")
        setErrorMsg("")
    }

    const [errorMessage, setErrorMsg] = useState("")
    const submit = () => {
        if (!name || !dateTime || !description)
            return;
        let request = { Name: name, Date: dateTime, Description: description };
        Ajax("AddAlbumApi", request).then((resp: BaseResponse) => {
            if (resp.Result) {
                clearData()
                window.location.reload();
            } else {
                setErrorMsg(resp.ErrorMessage);
            }
        });
    }
    return <div className="row">
        <div style={{ marginTop: "100px" }}></div>
        <div className="col-md-8">
            <div className="page-header">
                <h3>Current Album Count({state.AlbumList?.length})</h3>
            </div>
        </div>
        <div className="col-md-2">
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    clearData()
                    setIsOpen(true)
                }}
            >Create Album</button>
        </div>
        <FxModal
            isOpen={isOpen}
            close={() => {

                setIsOpen(false)
            }}
        >
            <form>
                <div className="row">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(evt) => { setName(evt.target?.value || "") }} />
                    </div>
                    <div className="form-group">
                        <label>DateTime</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="DateTime"
                            value={dateTime}
                            onChange={(evt) => {
                                setDateTime(evt.target?.value || "")
                            }} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(evt) => {
                                setDescription(evt.target?.value)
                            }}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-lg-10">
                        </div>
                        <div className="col-lg-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submit}
                            >Submit</button>
                        </div>
                    </div>
                    {errorMessage &&
                        <div className="alert alert-danger" role="alert">{errorMessage}</div>
                    }
                </div>
            </form>
        </FxModal>
    </div>
}

function Content(initalState: AlbumState) {

    const [state, dispatch] = useReducer(AlbumReducer, initalState);

    return <>
        <AlbumContext.Provider value={{ state, dispatcher: dispatchMiddleWare(dispatch) }}>
            <Top />
        </AlbumContext.Provider>
    </>
}



@MasterPage(AdminMaster)
export default class AlbumListPage extends React.Component<AlbumState, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Content {...this.props} />

        )
    }
}