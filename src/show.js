
class Show {

    constructor() {
        this.tracks = [];
    }

    generateTransmissionData(prevTime, time) {
        let transmissionData = {};
        this.tracks.forEach(track => track.events.forEach(event => {
            if (event.time > prevTime && event.time <= time) {
                transmissionData[track.connection] = transmissionData[track.connection] || [];
                transmissionData[track.connection].push([event.data]);
            }
        }));
        return transmissionData;
    }

}

module.exports = Show;