module.exports ={
    home_admin(req,res){
        res.render("home_admin",{
            url: 'http://localhost:3000/'
        });
    },

    home_user(req, res) {
        res.render("home_user", {
            url: 'http://localhost:5000/home_user'
        })
    }
}