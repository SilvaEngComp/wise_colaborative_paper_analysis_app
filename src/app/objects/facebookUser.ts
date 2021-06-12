export class FacebookUser{
    id: string;
    name: string;
    email: string;
    picture: {
        data: {
            height: number,
            width: number,
            url: string,
            is_silhouette: boolean
        }
    }

    constructor(){
        this.id = null;
        this.name = null;
        this.email = null;
        this.picture = null;
    }

}