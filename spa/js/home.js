
/* home.js */

import { customiseNavbar , secureGet } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home','send_parcel', 'foo', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
		// add content to the page
		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}

// this example loads the data from a JSON file stored in the uploads directory
async function addContent(node) {

	const url = '/api/parcel'
	const token = localStorage.getItem('authorization')
	const quotes = await secureGet(url, token)
	const template = document.querySelector('#home')
	console.log('made', template)
	for(const quote of quotes.json) {
		const fragment = template.content.cloneNode(true)
		// fragment.querySelector('sender-postcode').innerText = quote.sender_postcode;
		fragment.querySelector('#w').innerText = quote.dest_postcode;
		fragment.querySelector('#t').innerText = quote.currentDateTime;
		fragment.querySelector('#x').innerText = quote.recipient;
		fragment.querySelector('#z').innerText = quote.parcel_status;
		// fragment.querySelector('submit').setAttribute("data-id", quote.id);
		node.appendChild(fragment)
	}


}

//  async function fetchQuote(data) {
// 	event.preventDefault()
// 	console.log('display')
// 	const token = localStorage.getItem('authorization')
	
// 	const url = '/api/parcel'
// 	const options = {
// 		method: 'GET'
		
// 	}
// 	const response = await fetch(url, options)
// 	const json = await response.json()
// 	console.log(json)
// 	showMessage('new parcel added')
// 	loadPage('home')
// 	return { status: response.status, json: json }
// }
