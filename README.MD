# NiceMail
Simple API Wrapper of Nicemail.cc for pentesting, accounts making and testing. Doesn't have limitations, only your needs.

### Installation
```bash
npm i nice.mail
```


### Examples

```typescript
import { NiceMail } from 'nice.mail';

(async () => {
  const nicemail = new NiceMail();
  const mail = nicemail.getMail();
  const messages = await nicemail.getInbox(mail);

  if (messages.length) {
    const message = await nicemail.getMessage(mail, messages[0].id);
    console.log(message.body.text);
  }
})();
```
