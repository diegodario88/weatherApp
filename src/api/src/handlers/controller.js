module.exports = {

    index(req, res) {
        res.status(200).send({
            title: 'Weather - Api',
            description: 'Fornece informações sobre o clima',
            route: '/api/v1/weather',
            version: '1.0.0',
            author: 'Diego Dario',
        })
    },

    weather(req, res) {
        try {
            const entries = require('../../openweather-mock.json');
            if (entries) return res.status(200).json(entries)
            return res.status(400)
        } catch (error) {
            console.error('Are we empty? 🤔')
        }
    }


}