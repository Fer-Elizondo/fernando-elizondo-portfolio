import { routes } from './app.routes';
import { HomePage } from './features/home/home-page';

describe('home routes', () => {
  it('uses the portfolio home page for the root URL', () => {
    expect(routes[0]).toMatchObject({ path: '', component: HomePage });
  });
});
