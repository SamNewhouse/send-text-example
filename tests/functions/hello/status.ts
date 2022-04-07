import { handler } from 'functions/hello/status';

export const statusTest = () => {
  test('should reply success', async () => {
    const res = await handler({});
    expect(res.statusCode).toEqual(200);
  });
};
