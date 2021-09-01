console.log('Client js')
const form = document.getElementById('searchForm')
const searchText = document.getElementById('search')
let message1 = document.getElementById('message1')
let message2 = document.getElementById('message2')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value
    const url = 'http://localhost:3000/weather?address=' + location

    message1.innerHTML = ''
    message1.innerHTML = 'Loading...'

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.innerHTML = data.error
                message2.innerHTML = ''
            } else {
                message1.innerHTML =
                    '<b>Temperature: </b>' + data.temperature + 'C'
                message2.innerHTML = '<b>Forecast: </b>' + data.forecast
            }
        })
    })
})
