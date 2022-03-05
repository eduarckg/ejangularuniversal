import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero!: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        this.meta.addTag({ name: 'og:title', content: hero.name });
        this.meta.addTag({ name: 'og:url', content: 'http://www.strappcorp.com/' });
        this.meta.addTag({ name: 'og:description', content: 'Strappcorp title' });
        this.meta.addTag({ name: 'og:image', content: 'https://strappcorp.com/wp-content/uploads/2019/10/324463BD-9EDC-46BA-8981-FD034B83A119-1024x767-700x375.jpg' });
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
