const {getStats} = require('../services/firebase');

function initializeRoutes(app) {
  app.get('/getStats', async (req, res) => {
    const {ok, stats, statsError} = await getStats();
    if (ok) {
      res.status(200)
        .send(JSON.stringify({
          stats,
          ok: true,
        }));
      return;
    }
    res.status(200)
      .send(JSON.stringify({
        ok: false,
        error: statsError,
      }));
  })
}

module.exports = {initializeRoutes};