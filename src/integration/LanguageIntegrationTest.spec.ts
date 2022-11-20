import Language from 'datasource/typeorm/entities/Language';
import { IntegrationWebInvoker } from './helpers/IntegrationWebInvoker';

describe('language', () => {
  it('language/get', async () => {
    const res = await IntegrationWebInvoker.get('/language/pt_PT');
    expect(res.data).toHaveProperty('id');
  });

  it('language/post', async () => {
    const code = 'en_US';
    const name = 'English';

    const res = await IntegrationWebInvoker.post<Language>(`/language`, {
      code,
      name
    });

    expect(res.data).toHaveProperty('id');
  });
});
