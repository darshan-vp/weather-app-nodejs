const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const axios = require('axios')

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
// Set pulicly acceseble path of projecy
app.use(express.static(publicDirPath))
const viewsPath = path.join(__dirname, './templates/views')
// Set view engine to handlebars
app.set('view engine', 'hbs')
// Set view path from which views will be loader
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

// test('ddd')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Darshan',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Darshan',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Darshan',
        helptext: 'This is help text period.',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter address',
        })
    }

    // Call api to get weather info of entered location
    const url =
        'http://api.weatherstack.com/current?access_key=c5a4181708e18769bf02c12bf6ad728b&query=' +
        req.query.address
    axios.get(url).then((response) => {
        if (response.data.error) {
            return res.status(200).send({ error: response.data.error.info })
        } else {
            const temp = response.data.current.temperature
            const weatherDescription =
                response.data.current.weather_descriptions[0]
            return res.status(200).send({
                forecast: weatherDescription,
                address: req.query.address,
                temperature: temp,
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term',
        })
    }
    res.send({ products: [] })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
