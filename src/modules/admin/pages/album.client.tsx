import { render } from "react-dom";
import React from "react";
import AlbumListPage from "../views/albumList";
import { AlbumState } from "../store/album.store";


// @MobxIsomorphic(AlbumState)
export class AlbumPage extends React.Component {
    render() {
        return <AlbumListPage {...(this.props as any)} />;
    }
}
let readtData: AlbumState = window["__reactData__"]
render(
    <AlbumPage {...readtData} />,
    document.getElementById("app")
)


