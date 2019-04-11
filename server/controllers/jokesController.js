const Joke = require('../models/jokeModel')
const axios = require('axios')
const jokeAPI = axios.create({
  baseURL: "https://icanhazdadjoke.com/"
})

class JokeController {

  static fetchJoke(req, res) {
    jokeAPI
      .get(`/`)
      .then(({ data }) => {
        // console.log('masukkkkkkkk')
        // console.log(data, '09090909')
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = JokeController