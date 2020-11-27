const express = require('express');
const router = express.Router();

const mockNodes = [
  { name: "Main", group: 1, id: 0, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
  { name: "AbstractGhostMover", group: 1, id: 1, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
  { name: "RandomGhostMover", group: 1, id: 2, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
  { name: "DefaultGameFactory", group: 1, id: 3, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "PointManager", group: 1, id: 4, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "IPointInspector", group: 1, id: 5, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "IGameFactory", group: 1, id: 6, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "FactoryException", group: 1, id: 7, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "MapParser", group: 1, id: 8, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Board", group: 1, id: 9, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Direction", group: 1, id: 10, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "IBoardInspector", group: 1, id: 11, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Game", group: 1, id: 12, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Food", group: 1, id: 13, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Ghost", group: 1, id: 14, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
  { name: "Test1", group: 1, id: 15, data:{ key1: "What", key2: "the", key3: "test3", key4: "test4",
      key5: "test5", key6: "test6", key7: "test7", key8: "test8", key9: "test3",
      key10: "test3", key11: "test3", key12: "test3"  }},
];

const mockLinks = [
  { source: 0, target: 1, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 1, target: 2, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 1, target: 3, value: 1 , polarity: 1, targetDistance: 1, type: "call" },

  { source: 3, target: 4, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 4, target: 5, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 3, target: 6, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 3, target: 7, value: 1 , polarity: 1, targetDistance: 1, type: "exception" },
  { source: 3, target: 8, value: 1 , polarity: 1, targetDistance: 1, type: "call" },

  { source: 8, target: 9, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 9, target: 10, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 9, target: 11, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 9, target: 12, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 12, target: 13, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
  { source: 12, target: 14, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working correctly');
});

router.post('/eval', (req, res, next) => {
  console.log('Post: /eval');
  res.send({ nodes: mockNodes, links: mockLinks });
});

module.exports = router;
