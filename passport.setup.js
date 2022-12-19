const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/User')

// serialize user through out the routes 
passport.serializeUser((user, cb)=> {
    cb(null, user)
})

passport.deserializeUser( async (id, cb)=> {
    const user = await User.findById(id)
    cb(null, user)
})

// use google strategy for google oauth login
passport.use( 
    new GoogleStrategy( {
            clientID : process.env.GOOGLE_CLIENTID,
            clientSecret : process.env.GOOGLE_CLIENTSECRET,
            callbackURL : "/api/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, cb) => {
            // Checking if the user already in database 🧐
            const dbUser = await User.findOne({ email : profile._json.email })

            if (dbUser) {
                // Checking whether the user used to sign in using password, if so then we set the provider to be google from now...😘
                if(dbUser.provider !== "google") {
                    dbUser.update({
                        provider : "google",
                        providerId : profile._json.sub,
                        profilePic:  profile._json.picture
                    })
                } 
                // console.log("User already exists : "+dbUser)
                cb(null, dbUser)
            } 
            
            else {
                // There is no user with that email in database so we have to create that...🤜🏽🤛🏽
                let user = await User.create({
                    provider : "google",
                    providerId : profile.id,
                    displayName : profile.displayName,
                    profilePic:  profile._json.picture,
                    email : profile.emails[0].value,
                    password : "N/A"
                })
                // console.log("New User Created : "+user)
                cb(null, user)
            }
        }
    )
)