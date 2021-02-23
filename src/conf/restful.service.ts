
class Resuful {
    Method: "POST" | "GET"
    URL: string
    Service: ServiceType
}


enum ServiceType {
    Album = "Album"
}


const ServiceHost: { [key: string]: string } = {
    "Album": "http://localhost:9001/",
}

const RestfulService: { [key: string]: Resuful } = {
    "ablumListApi": {
        Method: "POST",
        URL: "Manage/AlbumList",
        Service: ServiceType.Album
    },
    "AddAlbumApi": {
        Method: "POST",
        URL: "Manage/AddAlbum",
        Service: ServiceType.Album
    },
    "getAlbumPicApi": {
        Method: "POST",
        URL: "Manage/GetAlbum",
        Service: ServiceType.Album
    },
    "rebuildAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAlbumImage",
        Service: ServiceType.Album
    }
}


export { RestfulService, ServiceHost }

