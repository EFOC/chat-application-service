"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, userBio, userPicture, authToken, refreshToken) {
        this.username = username;
        this.authToken = authToken !== null && authToken !== void 0 ? authToken : '';
        this.refreshToken = refreshToken !== null && refreshToken !== void 0 ? refreshToken : '';
    }
}
exports.User = User;
