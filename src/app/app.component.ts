import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'broadino_web';

  showBackToTop = false;

  showPopup = false;
  currentImageIndex = 0;

  // Array of images for the popup
  // popupImages = [
  //   'assets/bannerimage/page1.jpg',
  //   'assets/bannerimage/page2.jpg',
  // ];

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    // AOS.init();

    // Show popup only if it hasn't been shown in this session
    if (!sessionStorage.getItem('popupShown')) {
      this.showPopup = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 300;
    this.cdr.detectChanges();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePopup() {
    this.showPopup = false;
    sessionStorage.setItem('popupShown', 'true');
  }

  // Navigate to previous image
  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Navigate to next image
  // nextImage() {
  //   if (this.currentImageIndex < this.popupImages.length - 1) {
  //     this.currentImageIndex++;
  //   }
  // }
}
