const app = require('./../server').app; 

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res)=> {
    res.sendFile('/index.html')
})

module.exports = app ; 