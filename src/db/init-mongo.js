db.createUser(
    {
        user  : "devuser", 
        pwd   : "devpass",
        roles : [
            {
                role : "readWrite",
                db   : "weather"
            }
        ] 
    }
)