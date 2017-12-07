let generateMessage = (from, body) => {
    return {
        from,
        body,
        type: 'message',
        createdAt: new Date().getTime()
    }
};


let generateLocationMessage = (from, location) => {
    console.log('DISPLAY LOCATION: ', location);
    return {
        from,
        body: "Shared Location",
        lat: location.lat,
        lng: location.lng,
        type: 'location'
    }
};
module.exports = {generateMessage, generateLocationMessage};