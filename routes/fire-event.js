const router = require('express').Router();

const redis = require("redis");
const config = require("../config");

const publisherClient = redis.createClient({host: config.REDIS_HOST});

/**
 * Handling "/fire-event/:event_name"
 */
router.get("/:event_name", function(req, res) {
    publisherClient.publish(config.REDIS_PUBSUB_CHANNEL, ("\"" + req.params.event_name + "\" page visited") );
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("All clients have received \"" + req.params.event_name + "\"");
    res.end();
});

module.exports = router;