function isOwner(req, res) {
    console.log(req.user)
    if (req.user) {
        return true;
    } else {
        return false;
    }
}

export default function statusUI(req, res) {
    var authStatusUI = '<a href="/auth/login">login</a>'
    if (isOwner(req, res)) {
        authStatusUI = `${req.user.nickname} | <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
}