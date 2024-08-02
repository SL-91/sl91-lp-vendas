import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { BoxPessoasComponent } from './box-pessoas/box-pessoas.component';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { register as registerSwiperElements} from 'swiper/element/bundle';

registerSwiperElements();
@Component({
  selector: 'app-depoimentos',
  standalone: true,
  imports: [BoxPessoasComponent],
  templateUrl: './depoimentos.component.html',
  styleUrl: './depoimentos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA,]
})

export class DepoimentosComponent implements OnInit{

  public titleDepoimentos: string = 'Confira o depoimento de uma das nossas parceiras';

  swiperElement = signal<SwiperContainer | null>(null);

  configSwiper() {
    const swiperElementConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      slideToClickedSlide: true,
      pagination: {
        enabled: true,
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        enabled: true,
      },
      speed: 1000,
      injectStyles: [
        `
          .swiper-button-prev svg {
            width: 15px;
            color: var(--primary);
          }
          .swiper-button-next svg {
            width: 15px;
            color: var(--primary);
          }
          .swiper-pagination-bullet {
            background: var(--primary);
          }
        `,
      ],
    };

    Object.assign(swiperElementConstructor!, swiperOptions)
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize()
  }

  ngOnInit(): void {
      this.configSwiper()
  }

}
