const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors());
//create data model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        unique: true
        // required: true,
    },
    password: {
        type: String,
        // required: true
    }
});
const user = mongoose.model('user', userSchema)
//middleware
app.use(express.json())
app.use(express.static('view'))
app.use(express.urlencoded({ extended: true }));

//routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/indx.html')
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/view/login.html')
})
app.post('/send_mes', async (req, res) => {

    // const {email}= req.body;
    const aUser = await user.findOne({ email: req.body.email });
    if (aUser) {
        res.sendFile(__dirname + '/view/empt.html');

    } else {
        try {
            const usars = await user.create(req.body);

            await usars.save()
            console.log(usars)
            setTimeout(() => {

                res.sendFile(__dirname + '/view/succ.html');
            }, 3000);


        } catch (error) {
            res.sendFile(__dirname + '/view/int.html');
        }
    }

});
//login route
app.post('/login', async (req, res) => {
    const already = await user.findOne({ email: req.body.email });
    if (already) {
        setTimeout(() => {
            res.sendFile(__dirname + '/view/open.html')
        }, 3000);
    } else {

        setTimeout(() => {

            return res.redirect('/')
        }, 3000);
    }
})

// database
const connected = mongoose.connect('mongodb+srv://raymondogaraga:12345@cluster0.xe7bkfb.mongodb.net/playform?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Database connected!')).catch(() => console.log('Database disconnected!'))
connected;



app.listen(5500, () => { console.log('server started on port 5500!') });