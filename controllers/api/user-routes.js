const router = require('express').Router()
const {Review, User, Bathroom} = require('../../models')
const withAuth = require('../../utils/auth.js')
const sequelize = require('../../config/connection')


router.get('/', (req, res)=> {
    User.findAll({
        attributes: { exclude: ['password'] }
      })
    .then(dbUserData => res.json(dbUserData))
    .catch(err=> {
        console.log(err)
        res.status(500).json(err)
    })
})

// create new user
router.post('/', (req, res)=> {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData=> {
        console.log(dbUserData)
        req.session.save(()=> {
            req.session.user_id= dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
          
        })
    })
    .catch(err=> {
        console.log(err)
        res.json(500).json(err)
    })
})

// log in user
router.post('/login', withAuth, (req,res)=> {
    console.log('*')
    console.log(req.body);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData=> {
        if(!dbUserData){
            res.status(400).json({message: 'No user found with that email address.'})
            return
        }
        const validPassword = dbUserData.checkPassword(req.body.password)
        if(!validPassword){
            res.status(400).json({message: 'Incorrect password.'})
            return
        }
        req.session.save(()=>{
            req.session.user_id= dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message: 'You are now logged in!'})
        })
})
})


//logout
router.post('/logout', withAuth, (req, res)=> {
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end()
        })
       
    } else{
        res.status(404).end()
    }
})

module.exports = router