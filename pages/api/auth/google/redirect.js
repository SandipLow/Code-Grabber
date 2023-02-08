import { google } from "googleapis";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken"
import { oauth2Client } from "../../../../server/oauth/google";
import User from '../../../../server/models/User'

const JWT_DATA = "sandip@low"

const api = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
})

api.get(async (req, res) => {
    const code = req.query.code

    const oauth_res = await oauth2Client.getToken(code)
    const { access_token } = oauth_res.tokens

    oauth2Client.setCredentials({ access_token })

    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    })

    oauth2.userinfo.get( async (err, user) => {
        if (err) res.send(err)

        else {
            const userData = user.data;

            // Checking if the user already in database 🧐
            const dbUser = await User.findOne({ email: userData.email })

            if (dbUser) {
                // Checking whether the user used to sign in using password, if so then we set the provider to be google from now...😘
                if (dbUser.provider !== "google") {
                    dbUser.update({
                        provider: "google",
                        providerId: userData.id,
                        profilePic: userData.picture
                    })
                }

                const data = {
                    user: {
                        id: dbUser.id
                    }
                }

                const token = jwt.sign(data, JWT_DATA)
                res.redirect("/redirect?token=" + token + "&name=" + userData.name)
            }

            else {
                // There is no user with that email in database so we have to create that...🤜🏽🤛🏽
                let user = await User.create({
                    provider: "google",
                    providerId: userData.id,
                    displayName: userData.name,
                    profilePic: userData.picture,
                    email: userData.email,
                    password: "N/A"
                })

                const data = {
                    user: {
                        id: user.id
                    }
                }

                const token = jwt.sign(data, JWT_DATA)
                res.redirect("/redirect?token=" + token + "&name=" + userData.name)

            }
        }
    })

})

export default api