import { customiseNavbar, file2DataURI, loadPage, showMessage } from '../util.js'
export async function setup(node) {
	try {
        // console.log('send_parcel')
		// console.log('newpage')
		document.querySelector('header p').innerText = 'Send Parcel'
		customiseNavbar(['home','send_parcel', 'foo', 'logout'])
		node.querySelector('form').addEventListener('submit', await sendQuote )
	} catch(err) {
		console.error(err)
	}
}


	

async function sendQuote() {
	event.preventDefault()
	console.log('print')
	const token = localStorage.getItem('authorization')
	const formData = new FormData(event.target)
	console.log('formData', formData)
	const data = Object.fromEntries(formData.entries())
	console.log('objectData', data)
	const url = '/api/parcel'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization':  token
		},
		body: JSON.stringify(data)
		// body: data 
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	showMessage('new parcel added')
	loadPage('send_parcel')
}


