const authorized = (req,res,next) =>{
    const authHeader = req.headers['authorization'];

    if(!authHeader || authHeader != "Bearer dummy-token"){
        return res.status(400).json({error:"you are not authorized"})
    }
    next()
}

export {authorized}