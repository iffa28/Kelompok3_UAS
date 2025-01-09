module.exports ={
    homepage(req,res){
        res.render('homepage',  {
            url: 'http://localhost:5000/'
        });
    }
}