let Show = require('./show');
let playback = require('./playback');

let show = new Show();
show.duration = 5 * 1000;
show.connectionData = [
    {type: 'osc', host: '127.0.0.1', port: 6666, name: 'vpt'}
];
show.tracks = [
    {
        connection: 'vpt',
        events: [
            {time: 1000, data: ['/sources/1video/trig']},
            {time: 1000, data: ['/sources/1video/start']}
        ]
    }
];
playback(show);