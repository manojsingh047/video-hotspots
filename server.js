let express = require('express');
let app = express();

app.use(express.static('./dist/video-hotspot'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/video-hotspot/' });
});
app.listen(process.env.PORT || 8080);
