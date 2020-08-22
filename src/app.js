const path = require('path')
const hbs = require('hbs')
const express = require('express')

const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mzee'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Please provide a valid address'})
    }

    forecast(req.query.address, (err, data) => {
        if (err) {
            return res.send({error})
        }

        res.send({
            weather: data.weather,
            description: data.description
        })
    })
})


app.listen(port, () => {
    console.log('Server is Up on port' + port)
})