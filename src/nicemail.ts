import { request } from 'undici';

import { API_URL, SITE_URL } from './constants';
import { buildHeaders, extractJWT } from './utils/helpers';
import { Inbox, Message } from './schemas/models';

export class NiceMail {
  private __token?: string;

  private __basicRequest = async <T>(endpoint: string): Promise<T> => {
    const { body } = await request(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.__token}`,
        ...buildHeaders(),
      },
    });

    return (await body.json()) as T;
  };

  public authorize = async () => {
    const { body } = await request(SITE_URL);
    this.__token = extractJWT(await body.text());
  };

  public getInbox = async (mail: string): Promise<Inbox> =>
    await this.__basicRequest<Inbox>(`/mailbox/${mail}`);

  public getMessage = async (mail: string, messageId: string) =>
    await this.__basicRequest<Message>(`/mailbox/${mail}/${messageId}`);
}
