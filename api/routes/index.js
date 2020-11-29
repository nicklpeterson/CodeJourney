import CompactAnalyzer from "../util/CompactAnalyzer";
import LooseAnalyzer from "../util/LooseAnalyzer";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working correctly');
});

router.post('/eval', (req, res, next) => {
  console.log('Post: /eval');
  try {
    if (req.body.code) {
      const analyzer = new CompactAnalyzer(req.body.code);
      analyzer.evaluate();
      res.status(200).send({ nodes: analyzer.nodes, links: analyzer.callLinks });
    } else {
      res.status(400).send('Request body must contain Javascript code');
    }
  } catch (e) {
    res.status(400).send({error: e});
  }
});

module.exports = router;
