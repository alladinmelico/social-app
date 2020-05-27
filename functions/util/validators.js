//Validation
const isEmpty = (string) => (string.trim() === '' ? true : false)
const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.match(emailRegEx)) return true
	return false
}

exports.validateSignupData = (data) => {
	let errors = {}
	console.log(data)
	if (isEmpty(data.email)) {
		errors.email = 'Email must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Invalid email provided'
	}

	if (isEmail(data.password)) errors.password = 'Must not be empty'
	if (data.password !== data.confirmPassword)
		errors.confirmPassword = 'Password must match'
	if (isEmail(data.handle)) errors.handle = 'Must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}

exports.validateLoginData = (data) => {
	let errors = {}

	if (isEmpty(data.email)) errors.email = 'Email must no be empty'
	if (isEmpty(data.password)) errors.password = 'Password must no be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}
