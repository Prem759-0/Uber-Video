const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
          const location = response.data.results[0].geometry.location;
          return {
            ltd: location.lat,
            lang: location.lng
          };
        } else {
          throw new Error('Geocoding API error: ' + response.data.status);
        }
      } catch (error) {
        console.error( error);
        throw error;
      }
}