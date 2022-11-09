import { Router } from 'express';
import { fork } from 'child_process';
import parseArgs from 'minimist';

const router = Router();

router.get('/randoms', (req, res) => {
  const { cant } = req.query;
  const pid = process.pid;
  const options = { default: { port: 8080 } };
  const args = parseArgs(process.argv.slice(2), options);

  const forkedProcess = fork('./src/utils/randomNumbers.js');
  forkedProcess.send(parseInt(cant || 1e6));
  forkedProcess.on('message', (randomNumbers) => {
    res.status(200).json({ port: args.port, pid, randomNumbers });
  });
});

export default router;
