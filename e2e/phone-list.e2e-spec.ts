import { PhonecatPage } from './app.po';
import { browser, element, by, ElementFinder } from 'protractor';

describe( 'View: Phone list', function() {
  let page: PhonecatPage;

  beforeEach(() => {
    page = new PhonecatPage();

    page.navigateTo();

  });

  it( 'should filter the phone list as a user types into the search box', function() {

    const phoneList = element.all( by.css( 'li.phone-list-item' ) );
    expect( phoneList.count() ).toBe( 20 );

    const query = element( by.css( 'input' ) );

    query.sendKeys( 'nexus' );
    expect( phoneList.count() ).toBe( 1 );

    query.clear();
    query.sendKeys( 'motorola' );
    expect( phoneList.count() ).toBe( 8 );

  });

  it( 'should be possible to control phone order via the drop-down menu', function() {

    const queryField = element( by.css( 'input' ) );
    const orderSelect = element( by.css( 'select' ) );
    const nameOption = orderSelect.element( by.css( 'option[value="name"]' ) );
    const ageOption = orderSelect.element( by.css( 'option[value="age"]' ) );

    const phoneList = element.all( by.css( 'li.phone-list-item' ) );

    expect( phoneList.count() ).toBe( 20 );
    queryField.sendKeys( 'tablet' );
    expect( phoneList.count() ).toBe( 2 );

    const names = [
      'MOTOROLA XOOM\u2122',
      'Motorola XOOM\u2122 with Wi-Fi'];
    expect( phoneList.get( 0 ).getText() ).toStartWith( names[0] );
    expect( phoneList.get( 1 ).getText() ).toStartWith( names[1] );

    ageOption.click();
    expect( phoneList.get( 0 ).getText() ).toStartWith( names[1] );
    expect( phoneList.get( 1 ).getText() ).toStartWith( names[0] );

  });

  it( 'should render phone specific links', function() {
    const query = element( by.css( 'input' ) );
    query.sendKeys( 'nexus' );

    element.all( by.css( '.phones li a' ) ).first().click();

    expect( browser.getCurrentUrl() ).toEndWith( '/phones/nexus-s' );
  });

});



