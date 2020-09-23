import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailability();
const providerMonthAvailabilityController = new ProviderMonthAvailability();

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
