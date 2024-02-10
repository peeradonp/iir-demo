import { Component, Inject, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WINDOW } from 'src/app/services/window.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  url: any = '';
  private sanitizer = inject(DomSanitizer);
  currentPosition = 0;

  constructor(@Inject(WINDOW) private window: Window) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/910841514?&autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1&#t=235s&controls=0');
    this.window.addEventListener("scroll", this.reveal);
    //'https://www.youtube.com/embed/vQmTVrNuxAI?playlist=vQmTVrNuxAI&autoplay=1&mute=1&autohide=1&showinfo=0&controls=0&modestbranding=1&loop=1'
  }

  reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var scrollStatus = '';
    let scroll = window.pageYOffset;
    if (scroll > this.currentPosition) {
      scrollStatus = 'scrollDown';
    } else {
      scrollStatus = 'scrollUp';
    }
    this.currentPosition = scroll;
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
      else {
        reveals[i].classList.remove("active");
      }
    }
  }
}