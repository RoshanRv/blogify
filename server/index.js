const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors())

//          Get Blogs 
app.get('/api/get/:user',(req,res)=>{

    const user = req.params.user

    db.query(
        "SELECT * FROM users INNER JOIN blog on users.username = blog.user WHERE username=?",user,
        (err,result)=>{
            if(err)console.log(err)

            res.send(result)
        }
    )

})

//          Get Search Blogs For User
app.get('/api/get/:user/:search',(req,res)=>{

    const user = req.params.user
    const search = req.params.search

    db.query(
        `SELECT * FROM users INNER JOIN blog on users.username = blog.user WHERE username=? AND blog.title LIKE ? `,[user,search+'%'],
        (err,result)=>{
            if(err)console.log(err)

            res.send(result)
        }
    )

})

//          Get Search Blogs For All Users In Header
app.get('/get/:search',(req,res)=>{

    const search = req.params.search

    db.query(
        `SELECT title,user,id FROM blog WHERE title LIKE ? `,search+'%',
        (err,result)=>{
            if(err)console.log(err)

            res.send(result)
            // console.log(result)
        }
    )

})

//          Get Users Avatar
app.get('/:user/avatar',(req,res)=>{
    const user = req.params.user

    db.query(
        "SELECT avatar FROM users WHERE USERNAME=?",user,
        (err,result)=>{
            if(err)console.log('error')

            res.send(result)
        }
    )
})

app.get('/api/posts/:id',(req,res)=>{

    const id = req.params.id

    db.query(
        "SELECT * FROM blog WHERE id = ?", id,
        (err,result)=>{
            if(err)console.log(err)

            res.send(result)
        }
    )

})

app.post('/update/:id',(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const post = req.body.post

    db.query(
        "UPDATE blog SET title=? , post=? WHERE id=?",[title,post,id],
        (err,result)=>{
            if(err)console.log(err)

            console.log(result);
        }
    )
})

//          Delete Post 

app.get('/posts/delete/:id',(req,res)=>{
    const id = req.params.id

    db.query(
        "DELETE FROM blog WHERE id=?",id,

        (err,result)=>{
            if(err)console.log(err)

            console.log(result)
        }
    )
})

//          UPDATE  PROFILE DP
app.post('/:user/profile',(req,res)=>{
    const avatar = req.body.currAvatar
    const user = req.params.user

    db.query(
        "UPDATE users SET avatar=? WHERE username = ?",[avatar,user],
        (err,result)=>{
            if(err)console.log(err)

            console.log(result)
        }
    )
})

//      LOGIN           

app.post('/login',(req,res)=>{
    const userName = req.body.userName
    const password = req.body.password

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",[userName,password],

        (err,result)=>{
            if(err)res.send({err:err})

            if(result.length > 0){
                res.send(result)
            }else{
                res.send({message:'Incorrect Username / Password'})

            }
        }
    )

})

app.post('/:user/write',(req,res)=>{
    const title = req.body.title
    const post = req.body.post

    const user = req.params.user
    console.log(user)

    db.query(
        "INSERT INTO blog (user,title, post) VALUES (?,?,?)",[user,title,post],
        (err,result)=>{
            if(err)console.log(err)

            console.log(result)
        }
        )
})

//          REGISTER 

app.post('/register',(req,res)=>{

    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email

    db.query(
        "SELECT * FROM users WHERE username = ?",[userName],
        (err,result)=>{
            if(err)console.log(err)

            if(result.length == 0){
                db.query(
                    "INSERT INTO users (username,password,email,avatar) VALUES (?,?,?,?)",[userName,password,email,'avatar'+(Math.floor(Math.random()*5))+1],
                    (err,resu)=>{
                        if(err)console.log(err)

                        else {
                            res.send('Registered')

                        }
                    }
                )
            }else{
                res.send("Username is Already Taken")
            }
        }
    )
})

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})