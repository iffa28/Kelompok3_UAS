module.exports ={
    home_admin(req,res){
        res.render("home_admin",{
            url: 'http://localhost:3000/'
        });
    },
}