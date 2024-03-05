const movieDB = require("../models/movieModel");
const cloudinary = require("../cloudinary/cloudinaryConfig");


exports.createmovie = async(req,res)=>{
    const file = req?.file ? req?.file?.path : "";
    const {moviename,publishyear} = req.body;

    if(!file || !moviename || !publishyear){
        res.status(400).json({error:"All fields are required!"})
    }else{
        try {
            const upload = await cloudinary?.uploader?.upload(file);
            const existingmovie = await movieDB.findOne({moviename:moviename});
            if(existingmovie){
                res.status(400).json({error:"Already exist"});
            }else{
                const moviesData = new movieDB({
                    userid:req?.userMainId, moviename,image:upload?.secure_url, publishyear
                });
                await moviesData.save();
                res.status(200).json({message:"Movies successfully created"});
            }
        } catch (error) {
           res.status(400).json({error:error}); 
        }
    }
}

// getAllusermovie
exports.getAllusermovie = async (req, res) =>{

    const page = req.query.page || 1;
    const search = req.query.search || "";
    const sort =  req.query.sort || "";
    const ITEM_PER_PAGE = 2;

    const query = {
        moviename:{$regex:search,"$options":"i"}
    }

    try {
        const skip = (page-1) * ITEM_PER_PAGE;

        //all movie count
        const allusermovieCount = await movieDB.countDocuments(query)

        //movie all data
        const allusermoviesData = await movieDB.find(query)
        .limit(ITEM_PER_PAGE)
        .skip(skip)
        .sort({_id:sort == "new"? -1 : 1})

        const pageCount =  Math.ceil(allusermovieCount / ITEM_PER_PAGE);

        res.status(200).json({
            pagination:{
                allusermovieCount,pageCount
            },
            allusermoviesData
        });
    } catch (error) {
        res.status(400).json({error:error}); 
    }
}

// updatemovies
exports.updatemovies = async(req,res)=>{
    const {id} = req.params;
    const file = req?.file ? req?.file?.path : "";
    const { moviename, publishyear,image } = req.body;
    
    var upload;

    try {
        
        if(file){
            upload = await cloudinary?.uploader?.upload(file);
        }

        let dynamicImg = file ? upload?.secure_url : image

        const moviesUpdate = await movieDB.findByIdAndUpdate({_id:id},{
            userid: req?.userMainId, moviename, image:dynamicImg, publishyear
        },{new:true});

        await moviesUpdate.save();

        res.status(200).json({message:"movie sucessfully update",moviesUpdate})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

// deleteMovie
exports.deleteMovie = async(req,res)=>{
    const { id } = req.params;

    try {
        const deleteMovieData = await movieDB.findByIdAndDelete({_id:id});
        res.status(200).json({message:"Movies sucessfully Delete",deleteMovieData});
    } catch (error) {
        res.status(400).json({ error: error })
    }
}