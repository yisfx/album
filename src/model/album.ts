///相册
export class Album {
    Name: string
    Cover: string
    Date: string
    Path: string
    PicList: Picture[]
    Description: string
    ///根据album name寻path
}

///图片
export interface Picture {
    Name: string
    MiniPath: string
    MaxPath: string
    OrgPath: string
    Album: string
}