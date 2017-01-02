import { DreamBeanPage } from './app.po';

describe('dream-bean App', function() {
  let page: DreamBeanPage;

  beforeEach(() => {
    page = new DreamBeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
