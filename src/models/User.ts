export class User {
    
    username: string
    authToken: string
    refreshToken: string

    constructor(username: string, userBio: string, userPicture: string, authToken?: string, refreshToken?: string) {
        this.username = username
        this.authToken = authToken ?? ''
        this.refreshToken = refreshToken ?? ''
    }

}