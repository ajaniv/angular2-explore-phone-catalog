import { PhonecatPage } from './app.po';
import { browser, element, by, ElementFinder } from 'protractor';

describe( 'phonecat App', function() {
  let page: PhonecatPage;

  beforeEach(() => {
    page = new PhonecatPage();

  });

  it( 'should launch', () => {
    page.navigateTo();
    expect( page.getParagraphText() ).toContain( 'Search:' );
  });

  it( 'should redirect `index.html` to `index.html#!/phones', function() {
    browser.get( 'index.html' );
    browser.waitForAngular();
    browser.getCurrentUrl().then( function( url: string ) {
      expect( url.endsWith( '/phones' ) ).toBe( true );
    });
  });

});
