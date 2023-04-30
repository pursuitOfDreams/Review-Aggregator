const pool = require("../db");

const get_user_watch_list = async (req, res) =>{
    try{
        
    }
    catch (err){
        console.log(err);
        return res
                .status(500)
                .json({message : "There was some error fetching the user watch list"})
    }
}
