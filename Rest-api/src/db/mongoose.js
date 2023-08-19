const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/udemy-rest-api', {
    // useNewUrlParser:true,
    // useCreateIndex:true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Email is not valid")
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error("Password can not contain 'password'")
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '    Debasish        ',
//     email: '                  DEV@GMAIL.COM       ',
//     password: 'abc339909    '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error", error)
// })