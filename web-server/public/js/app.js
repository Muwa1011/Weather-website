console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')
const msgFour = document.querySelector('#msg-4')

const weatherImg = document.querySelector('#weatherImg')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location;

    msgOne.textContent = 'loading..'
    msgTwo.textContent = ''
    msgThree.textContent = ''
    msgFour.textContent = ''
    weatherImg.src = "#"

    fetch(url).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            } else {
                if(data.forecastData.data.includes(' Den ganzen Tag lang Klar.')){
                    weatherImg.src = 'img/sunny.png'
                }
                if(data.forecastData.data.includes('leicht bewölkt')){
                    weatherImg.src = 'img/sunny.png'
                }
                if(data.forecastData.data.includes('Leichter Regen')){
                    weatherImg.src = 'img/raining.png'
                }
                if(data.forecastData.data.includes('überwiegend bewölkt')){
                    weatherImg.src = 'img/cloudy.png'
                }


                msgOne.textContent = data.location
                msgTwo.textContent = data.forecastData.data
                msgThree.textContent = data.forecastData.data2
                msgFour.textContent = data.forecastData.data3
            }

        })

    })
})
