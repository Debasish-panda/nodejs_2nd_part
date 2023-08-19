const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
    //below code we have done by promise (we can remove async above one) and above try catch async awat
    // console.log(req.body);
    // res.send("Working perfect post")
    // const user = new User(req.body);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

router.post('/user/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        const token = await user.generateAuthToken();
        console.log("working1")
        // res.send({ user:user.getPublicProfile(), token }); //below one same like this line
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token
        })
        await req.user.save()
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users', auth, async (req, res) => {
    res.send(req.user);

    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }

    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((err) => {
    //     res.status(500).send();
    // })
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        } else {
            res.send(user);
        }
    } catch (e) {
        res.status(500).send();
    }

    // const _id = req.params.id;
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     } else {
    //         res.send(user);
    //     }
    // }).catch((err) => {
    //     res.status(500).send();
    // })
})


router.patch('/user/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isAllow = updates.every((update) => allowedUpdates.includes(update));
    if (!isAllow) {
        return res.status(400).send({ error: 'invalid operation' })
    }
    else {
        // const _id = req.params.id;
        try {
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

            const user = await User.findById(req.params.id);

            updates.forEach((update) => {
                user[update] = req.body[update]
            })
            await user.save()

            if (!user) {
                return res.status(400).send()
            }
            res.send(user)
        } catch (e) {
            res.status(400).send(e);
        }
    }
})

router.put('/user/:id', (req, res) => {
    const _id = req.params.id;
    User.findByIdAndUpdate(_id, { age: 18 }).then((user) => {
        res.send(user);
        return User.countDocuments({ age: 18 })
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        res.status(500).send();
    })
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        //const _id = req.user._id;
        // const user = await User.findByIdAndDelete(_id);
        // if (!user) {
        //     return res.status(400).send();
        // }
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send({ error: "id not exist" })
    }

    // User.findOneAndDelete(_id).then((user)=>{
    //     res.send(user);
    //     return User.
    // })
})



const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Kindly upload a word document'))
        }

        cb(undefined, true) 

        // cb(new Error('Image file is required')); //below 3 type we can give as a callback argument
        // cb(undefined, false); //this will not upload
        // cb(undefined, true); //this will upload

    }
})

router.post('/avatar', upload.single('avatars'), async (req, res) =>{
    const buffer = await sharp(req.file.buffer).resize({width: 250 , height: 250}).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send();
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) =>{
    try {
        const user = await User.finById(req.params.id)

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }
    catch (e){
        res.status(404).send()
    }
})

router.delete('/users/avatar/', auth, async (req, res) =>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
})

module.exports = router