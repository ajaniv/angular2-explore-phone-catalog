import { PhonecatPage } from './app.po';
import { browser, element, by, ElementFinder } from 'protractor';

describe( 'View: Phone detail', function() {
  let page: PhonecatPage;

  beforeEach(() => {
    page = new PhonecatPage();

    beforeEach( function() {
      page.navigateTo( '/phones/nexus-s' );
    });

    it( 'should display the `nexus-s` page', function() {
      expect( element( by.css( 'h1' ) ).getText() ).toBe( 'Nexus S' );
    });

    it( 'should display the first phone image as the main phone image', function() {
      const mainImage = element( by.css( 'img.phone' ) );

      expect( mainImage.getAttribute( 'src' ) ).toMatch( /img\/phones\/nexus-s.0.jpg/ );
    });

    it( 'should swap the main image when clicking on a thumbnail image', function() {
      const mainImage = element( by.css( 'img.phone' ) );
      const thumbnails = element.all( by.css( '.phone-thumbs img' ) );

      thumbnails.get( 2 ).click();
      expect( mainImage.getAttribute( 'src' ) ).toMatch( /img\/phones\/nexus-s.2.jpg/ );

      thumbnails.get( 0 ).click();
      expect( mainImage.getAttribute( 'src' ) ).toMatch( /img\/phones\/nexus-s.0.jpg/ );
    });

  });
});
