const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4b7be73f6b074cc99d65a1cb75e9f6b4'
   });

   const handleFaceDetectCall =(req,res)=>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to use Face api'))
   }
   const handleCelebDetectCall =(req,res)=>{app.models
        .predict(Clarifai.CELEBRITY_MODEL,req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to use Celeb api'))
   }

const handleImg = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err =>  res.status(404).json("ERROR getting user info"));
}

module.exports={
    handleImg : handleImg,
    handleFaceDetectCall: handleFaceDetectCall,
    handleCelebDetectCall : handleCelebDetectCall
}