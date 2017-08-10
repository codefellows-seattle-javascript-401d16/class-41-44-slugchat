import io from 'socket.io';

export default (http, subscribers) => {
  return io(http)
    .on('connection', socket => {
      Object.keys(subscribers)
        .map(type => ({type, handler: subscribers[type]}))
        .forEach(subscriber => {
          socket.on(subscriber.type, payload => {
            console.log('__SUBSCRIBE_EVENT__', subscriber.type);
            try {
              subscriber.handler(socket)(payload);
            } catch(err) {
              console.log('__SUBSCRIBE_ERROR__', err);
            }
          });
        });
    })
    .on('error', err => {
      console.error('__SOCKET_IO_ERROR__', err);
    });
};
