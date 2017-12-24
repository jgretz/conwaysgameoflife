import nodeBits from 'node-bits';
import nodeBitsExpress from 'node-bits-express';
import nodeBitsSpa from 'node-bits-spa';

nodeBits([
  nodeBitsExpress({
    port: 5000,
  }),
  nodeBitsSpa({
    path: `${__dirname}/site`
  }),
]);