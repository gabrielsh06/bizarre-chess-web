import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type LinkCategory = 'code' | 'community';

export interface FooterLink {
  name: string;
  url: string;
  category: LinkCategory;
  cssClass: string;
  iconPath: string;
}

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly version = 'v0.1.0';

  readonly links: FooterLink[] = [
    {
      name: 'Backend',
      url: 'https://github.com/gabrielsh06/bizarre-chess',
      category: 'code',
      cssClass: 'footer__link--backend',
      iconPath: '/icons/GitHub_Invertocat_White.svg',
    },
    {
      name: 'Frontend',
      url: 'https://github.com/gabrielsh06/bizarre-chess-web',
      category: 'code',
      cssClass: 'footer__link--frontend',
      iconPath: '/icons/GitHub_Invertocat_White.svg',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/29M2sA8pYN',
      category: 'community',
      cssClass: 'footer__link--discord',
      iconPath: '/icons/Discord-Symbol-White.svg',
    },
  ];

  get codeLinks(): FooterLink[] {
    return this.links.filter((link) => link.category === 'code');
  }

  get communityLinks(): FooterLink[] {
    return this.links.filter((link) => link.category === 'community');
  }
}
