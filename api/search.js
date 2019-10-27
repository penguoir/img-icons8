const axios = require('axios').default
const cheerio = require('cheerio')

module.exports = async (req, res) => {
  try {
    // Make request to icons8
    const response = await axios.get('https://icons8.com/icons/set/' + req.query.q)
    
    // Find images through scraper and get their src attributes
    const $ = cheerio.load(response.data)
    const images = $('.icon img').toArray().map(x => x.attribs.src)

    // Return results
    res.json(images)
  } catch (e) {
    res.send(e)
  }
}