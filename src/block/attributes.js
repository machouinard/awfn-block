export default {
	icao: {
		type: 'string',
		default: 'KDTW'
	},
	showMetar: {
		type: 'boolean',
		default: true
	},
	showTaf: {
		type: 'boolean',
		default: true
	},
	showPireps: {
		type: 'boolean',
		default: true
	},
	radialDist: {
		type: 'number',
		default: 100
	},
	hoursBeforeNow: {
		type: 'number',
		default: 2
	},
	editing: {
		type: 'boolean',
		default: false
	}
}
