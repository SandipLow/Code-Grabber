import { google } from "googleapis"

// oauth client for google api
export const oauth2Client = new google.auth.OAuth2({
    "clientId": process.env.GOOGLE_CLIENTID,
    "clientSecret": process.env.GOOGLE_CLIENTSECRET,
    "redirectUri": process.env.GOOGLE_REDIRECTURI
})
