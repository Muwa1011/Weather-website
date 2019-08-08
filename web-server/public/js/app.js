console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location.toString();

    msgOne.textContent = 'loading..'
    msgTwo.textContent = ''

    fetch(url).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecastData.data
            }

        })

    })
})