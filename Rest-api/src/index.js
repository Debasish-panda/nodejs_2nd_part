const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/usercontroller')
const taskRouter = require('./routers/taskcontroller')
const app = express();

// app.use((req, res, next)=>{ //this is a middleware, here req will get the method and path
//     console.log(req.path, req.method)
//     if(req.method === 'GET'){
//         res.send("Get method is restricted")
//     }else{
//         next();
//     }
// })


app.use(express.json());
app.use(userRouter) //user router similarly we can add multiple router
app.use(taskRouter)


app.listen(3000, () => {
    console.log("Hosted on port 3000")
})

// const bcrypt = require('bcryptjs');

// const myFunc = async ()=>{
//     password = "Debu1234";
//     const hashPassword = await bcrypt.hash(password, 8); //here 8 is the number of alogorithm runs 
//     console.log(hashPassword);

//     const isMatch = await bcrypt.compare(password, hashPassword); // it return true false
//     console.log(isMatch)
// }

// myFunc();

// const jwt = require('jsonwebtoken');

// const myFunction = async () =>{
//     const token = jwt.sign({ _id: 'abc123'}, 'kdjlkjdlkj', {expiresIn: '1 minute'}) // 1st take object (contain data of unique identifier for the user it can id) 2nd take string (it is taking secrect)
//     console.log(token);

//     const data = jwt.verify(token, 'kdjlkjdlkj')
//     console.log(data);
// }

// myFunction();

// const Task = require('./models/task');
// const User = require('./models/user')

// const main = async () =>{    
//     const task = await Task.findById('64cfa79cbc87100842a8eeca');
//     await task.populate('owner')
//     console.log(task.owner);

    //  const user = await User.findById('64cfa6db14a25d5fdd679ca3');
    // await user.populate('tasks')
    // console.log(user.tasks);
// }

// main();