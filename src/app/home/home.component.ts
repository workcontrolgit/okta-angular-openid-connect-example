import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../shared';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username;
  password;

  constructor(private oauthService: OAuthService,
              private oktaAuthWrapper: OktaAuthWrapper) {
  }

  loginWithPassword() {
    this.oktaAuthWrapper.login(this.username, this.password)
      .catch(err => console.error('error logging in', err));
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
}