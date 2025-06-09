import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Solution {
  key: string;
  title: string;
  description: string;
  src: string;
}

@Component({
  selector: 'app-homesolutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homesolutions.component.html',
  styleUrls: ['./homesolutions.component.css'],
})
export class HomesolutionsComponent {
  solutions: Solution[] = [];

  labs = [
    {
      key: 'innovative_manufacturing',
      title: 'Innovative Manufacturing',
      src: 'assets/img/innovative1.jpg',
    },
    {
      key: 'product_innovation',
      title: 'Product Innovation',
      src: 'assets/img/Productinnovation.jpg',
    },
    {
      key: 'arvrmr_research',
      title: 'AR|VR|MR Research',
      src: 'assets/img/arvr.jpg',
    },
    {
      key: 'ai_strategy_consulting',
      title: 'AI Strategy Consulting',
      src: 'assets/img/AiStrategy.jpg',
    },
    {
      key: 'research_centre_for_plm',
      title: 'Research centre for PLM',
      src: 'assets/img/PLM.jpg',
    },
    {
      key: 'iot_lab',
      title: 'Internet of Things (IoT) Lab',
      src: 'assets/img/product.jpg',
    },
    {
      key: 'predictive_engineering',
      title: 'Predictive Engineering',
      src: 'assets/img/predictive_engineering.jpg',
    },
    {
      key: 'reverse_engineering',
      title: 'Reverse Engineering',
      src: 'assets/img/ReverseEngineering.jpg',
    },
  ];

  techStack: string[] = [
    'assets/img/pythonimg.png',
    'assets/img/nodeimg.png',
    'assets/img/djangoimg.png',
    'assets/img/githubimg.png',
    'assets/img/javaimg.png',
    'assets/img/postgreimg.png',
    'assets/img/apacheimg.png',
    'assets/img/angularimg.png',
    'assets/img/jqueryimg.png',
    'assets/img/phpimg.png',
  ];

  firstRowLabs = this.labs.slice(0, 4);
  secondRowLabs = this.labs.slice(4, 8);

  constructor(private router: Router) {}

  onTakeOverClick(labKey: string): void {
    this.router.navigate(['/labs', labKey]);
  }
}
