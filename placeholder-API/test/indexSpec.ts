import app from '../index';
import { convertWidthAndHeight, processImage } from '../routes/imageRouter';
import superTest from 'supertest';

const request = superTest(app);

describe('Utility function tests', () => {
  it('should convert a string to a number', () => {
    expect(convertWidthAndHeight('300')).toBe(300);
  });
});

describe('Test endpoint responses', () => {
  it('gets the API endpoint', async () => {
    const response = await request.get(
      '/img/api/images?imgName=fjord&width=200&height=200',
    );
    expect(response.status).toBe(200);
  });
});

describe('Image Processing Function Tests', () => {
  it('should process the image without throwing an error', async () => {
    const testWidth = '200';
    const testHeight = '200';

    let errorOccurred = false;

    try {
      await processImage('fjord', testWidth, testHeight);
    } catch (error) {
      errorOccurred = true;
      console.log(error);
    }

    expect(errorOccurred).toBe(false);
  });
});
