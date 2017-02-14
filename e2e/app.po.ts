import { browser, element, by } from 'protractor';

export class PhonecatPage {
  navigateTo( url?: string ) {
    const target = url || '/';
    return browser.get( target );
  }

  getParagraphText() {
    return element( by.css( 'app-root' ) ).getText();
  }
}
