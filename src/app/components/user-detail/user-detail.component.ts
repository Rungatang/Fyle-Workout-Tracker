import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule]
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;  // Initialize user as null
  userName: string = '';
  chartOptions: any = {};  // CanvasJS configuration

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName') || '';
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    const existingData = localStorage.getItem('userData');
    if (existingData) {
      const users: User[] = JSON.parse(existingData);
      this.user = users.find(u => u.name === this.userName) || null;
      console.log('Loaded User:', this.user); // Debugging line
      if (this.user) {
        this.setupChartData();
      }
    } else {
      console.error('No user data found in localStorage.');
    }
  }
  

  setupChartData(): void {
    if (this.user) {
      const workoutTypes = this.user.workouts.map(w => w.type);
      const workoutMinutes = this.user.workouts.map(w => w.minutes);
  
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Workout Duration"
        },
        axisX: {
          title: "Workout Type",
          interval: 1,
        },
        axisY: {
          title: "Minutes",
          includeZero: true,
        },
        data: [{
          type: "line",
          name: "Workout Duration",
          showInLegend: true,
          dataPoints: workoutTypes.map((type, index) => ({
            label: type,
            y: workoutMinutes[index]
          }))
        }]
      };
    }
  }
  
}
