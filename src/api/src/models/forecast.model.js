const mongoose = require('mongoose')

const forecastSchema = new mongoose.Schema({
    city: {
        id: {
            type: 'Number'
        },
        name: {
            type: 'String'
        },
        coord: {
            lon: {
                type: 'Number'
            },
            lat: {
                type: 'Number'
            }
        },
        country: {
            type: 'String'
        },
        population: {
            type: 'Number'
        },
        timezone: {
            type: 'Number'
        }
    },
    cod: {
        type: 'String'
    },
    message: {
        type: 'Number'
    },
    cnt: {
        type: 'Number'
    },
    list: {
        type: [
            'Mixed'
        ]
    }
}, { timestamps: true })

const Forecast = mongoose.model('Forecast', forecastSchema)

module.exports = Forecast