const form = document.querySelector('form')
const input = document.querySelector('input')
const update1 = document.querySelector('#update-1')
const update2 = document.querySelector('#update-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value

    update1.textContent = 'Loading ..'
    update2.textContent = ''

    fetch('/weather?address=' + location + '').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                update1.textContent = data.error
            } else {
                update1.textContent = data.weather
                update2.textContent = data.description
            }
        })
    })
})