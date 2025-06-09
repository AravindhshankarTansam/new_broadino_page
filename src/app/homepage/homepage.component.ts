import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesolutionsComponent } from "./homesolutions/homesolutions.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HomesolutionsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  ngAfterViewInit(): void {
    // Initialize AOS
    // Initialize Typed.js
    // const typed = new typed('.typed-text', {
    //   strings: [
    //     'Innovators.',
    //     'Tech Enthusiasts.',
    //     'AI Experts.',
    //     'Your Future Partners.',
    //   ],
    //   typeSpeed: 60,
    //   backSpeed: 40,
    //   loop: true,
    // });
  }
}
