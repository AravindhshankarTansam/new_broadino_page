import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private panel: HTMLElement | null = null;
  private frame: HTMLElement | null = null;
  private icon: HTMLElement | null = null;
  private body: HTMLBodyElement | null = null;
  labs: any[] = [];
  isMenuOpen = false;
  isDropdownOpen: { [key: string]: boolean } = {};
  isSubDropdownOpen: { [key: string]: boolean } = {};
  isScrolled = false;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Access DOM elements only in the browser
      this.panel = document.getElementById('overlayPanel');
      this.frame = document.getElementById('rightsideframe');
      this.icon = document.getElementById('toggleIcon');
      this.body = document.body as HTMLBodyElement; // Type assertion

      // Check if the elements exist
      if (this.panel && this.frame && this.icon && this.body) {
        this.addEventListeners();
      }
    }
    this.http.get<any[]>('assets/Json/labscontent.json').subscribe(
      (data) => {
        this.labs = data;
        // console.log("Labs Data:", this.labs);
      },
      (error) => {
        console.error('Error fetching labs data:', error);
      }
    );
  }

  private addEventListeners(): void {
    // Listen for the click event to toggle the overlay visibility
    this.frame?.addEventListener('click', () => {
      this.togglePanelVisibility();
    });
  }

  toggleDropdown(dropdown: string) {
    console.log(`Toggling dropdown: ${dropdown}`);
    Object.keys(this.isDropdownOpen).forEach((key) => {
      if (key !== dropdown) {
        this.isDropdownOpen[key] = false;
      }
    });

    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];

    console.log('Dropdown states:', this.isDropdownOpen);
  }

  toggleSubDropdown(submenu: string) {
    this.isSubDropdownOpen[submenu] = !this.isSubDropdownOpen[submenu];
  }

  navigateToLab(labKey: string) {
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  togglePanelVisibility(): void {
    const overlayPanel = document.getElementById('overlayPanel');
    const dullOverlay = document.getElementById('dullOverlay');
    const toggleIcon = document.getElementById('toggleIcon');
    const rightSideFrame = document.getElementById('rightsideframe');

    if (overlayPanel && dullOverlay && toggleIcon && rightSideFrame) {
      const isVisible = overlayPanel.classList.contains('visible');

      if (isVisible) {
        // Hide the panel
        overlayPanel.classList.remove('visible');
        dullOverlay.classList.remove('visible');
        rightSideFrame.classList.remove('open');
      } else {
        // Show the panel and apply dull effect
        overlayPanel.classList.add('visible');
        dullOverlay.classList.add('visible');
        rightSideFrame.classList.add('open');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const overlayPanel = document.getElementById('overlayPanel');
    const rightSideFrame = document.getElementById('rightsideframe');
    const dullOverlay = document.getElementById('dullOverlay');

    const isClickInsidePanel = overlayPanel?.contains(event.target as Node);
    const isClickOnToggle = rightSideFrame?.contains(event.target as Node);

    if (!isClickInsidePanel && !isClickOnToggle) {
      overlayPanel?.classList.remove('visible');
      dullOverlay?.classList.remove('visible');
      rightSideFrame?.classList.remove('open');
    }

    // Close dropdown if clicking outside
    const isDropdownClick = (event.target as HTMLElement).closest('.dropdown');
    if (!isDropdownClick) {
      Object.keys(this.isDropdownOpen).forEach((key) => {
        this.isDropdownOpen[key] = false;
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 200; // Change navbar after 200px
  }
}
