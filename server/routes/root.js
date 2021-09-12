/**
 * Module for the root
 *
 * @author Oscar Elf
 * @version 1.0.0
 */

'use strict';

const router = require('express').Router();
const VERSION = process.env.VERSION;

/**
 * @route   POST api/v1
 * @desc    The root of the API
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    meta: {
      title: 'TaskTracker',
      version: VERSION,
      license: 'MIT',
      author: 'Oscar Elf',
      description: 'An API that organizes your tasks, lists and reminders.',
    },
    links: {
      self: {
        url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        method: 'GET',
        access: 'Public',
        token: 'Not required',
        description: 'The root of the API',
      },
    },
  });
});

// Exports
module.exports = router;
