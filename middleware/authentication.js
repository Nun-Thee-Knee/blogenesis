const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName)
{
    return (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            return next();
        }
        try {
            const userPayLoad = validateToken(tokenCookieValue);
            req.user = userPayLoad;
        } catch (error) {}
        return next();
    }
}

module.exports = {
    checkForAuthenticationCookie
}